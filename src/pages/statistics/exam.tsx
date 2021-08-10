import { Button, Table } from 'antd';
import { useState, useEffect } from 'react';
import { examStatis, userStatis } from '@/services/statistic';
import moment from 'moment';

export default function Exam() {
  const [page, setPage] = useState({
    current: 1,
    pages: 1,
    size: 10,
    total: 1,
  });
  const [examList, setExamList] = useState<API.ExamPaging>();
  const queryExamList = async (current = page.current, size = page.size) => {
    try {
      const currentExamList = await examStatis({
        data: {
          current: current,
          size: size,
          params: {},
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
    queryExamList();
  }, []);

  const columns = [
    {
      title: '统计时间',
      dataIndex: 'dateStr',
      key: 'dateStr',
    },
    {
      title: '考试人次',
      dataIndex: 'examCount',
      key: 'examCount',
    },
    {
      title: '考试人数',
      dataIndex: 'examUser',
      key: 'examUser',
    },
    {
      title: '通过人数',
      dataIndex: 'passUser',
      key: 'passUser',
    },
    {
      title: '通过率',
      dataIndex: 'passRate',
      key: 'passRate',
      render: (passRate: String) => <div>{passRate}%</div>,
    },
  ];

  return (
    <div>
      <div className="px-2 bg-white">
        {examList && (
          <Table
            columns={columns}
            dataSource={examList.records}
            rowKey={'dateStr'}
            pagination={{ defaultCurrent: page.current, total: page.total }}
            onChange={(pagination) => {
              queryExamList(pagination.current, pagination.pageSize);
            }}
          />
        )}
      </div>
    </div>
  );
}
