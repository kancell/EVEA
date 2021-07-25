import { Button, Table } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { paperReview } from '@/services/examManage';

export default function Exam() {
  const [page, setPage] = useState({
    current: 1,
    pages: 1,
    size: 10,
    total: 1,
  });
  const [examList, setExamList] = useState<API.ExamPaging>();
  const queryXExamList = async (current = page.current, size = page.size) => {
    try {
      const currentExamList = await paperReview({
        data: {
          current: current,
          size: size,
          params: {
            name: '',
          },
          t: moment().unix(),
        },
      });
      setPage({
        current: currentExamList.data.current,
        pages: currentExamList.data.pages,
        size: currentExamList.data.size,
        total: currentExamList.data.total,
      });
      setExamList(currentExamList.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    queryXExamList();
  }, []);

  const columns = [
    {
      title: '试卷名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '全部分类',
      dataIndex: 'openType',
      key: 'openType',
    },
    {
      title: '总分',
      dataIndex: 'totalScore',
      key: 'totalScore',
    },
    {
      title: '考试人数',
      dataIndex: 'examUser',
      key: 'examUser',
    },
    {
      title: '待阅试卷',
      dataIndex: 'unreadPaper',
      key: 'unreadPaper',
    },
  ];

  return (
    <div>
      {examList && (
        <Table
          columns={columns}
          dataSource={examList.records}
          rowKey={'id'}
          pagination={{ defaultCurrent: page.current, total: page.total }}
        />
      )}
    </div>
  );
}
