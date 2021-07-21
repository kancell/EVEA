import { Button, Table } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { ExamManage } from '@/services/examManage';

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
      const currentExamList = await ExamManage({
        data: {
          current: current,
          size: size,
          params: {
            title: '',
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
      title: '考试名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '开放类型',
      dataIndex: 'openType',
      key: 'openType',
    },
    {
      title: '考试类型',
      dataIndex: 'examType_dictText',
      key: 'examType_dictText',
    },
    {
      title: '限时',
      dataIndex: 'timeLimit',
      key: 'timeLimit',
    },
    {
      title: '总分',
      dataIndex: 'totalScore',
      key: 'totalScore',
    },
    {
      title: '及格分',
      dataIndex: 'qualifyScore',
      key: 'qualifyScore',
    },
  ];

  return (
    <div>
      {examList && (
        <Table
          columns={columns}
          dataSource={examList.records}
          pagination={{ defaultCurrent: page.current, total: page.total }}
        />
      )}
    </div>
  );
}
