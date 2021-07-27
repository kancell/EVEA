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
      title: '考试类型',
      dataIndex: 'examType_dictText',
      key: 'examType_dictText',
    },
    {
      title: '开放类型',
      dataIndex: 'openType',
      key: 'openType',
      render: (openType: number) => {
        const _typeReplace = new Map([
          [1, '完全公开'],
          [2, '部门公开'],
          [3, '需要密码'],
        ]);
        return <div>{_typeReplace.get(openType)}</div>;
      },
    },
    {
      title: '限时',
      dataIndex: 'timeLimit',
      key: 'timeLimit',
      render: (timeLimit: boolean, record: API.Exam) => {
        return (
          <>
            {timeLimit ? (
              <div>
                {record.startTime} - {record.endTime}
              </div>
            ) : (
              '不限时'
            )}
          </>
        );
      },
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
    {
      title: '操作',
      key: 'update',
      render: (text: unknown, record: API.Exam) => {
        return (
          <>
            <Button
              className="mx-1"
              onClick={() => {
                console.log(record.id);
              }}
            >
              批阅试卷
            </Button>
          </>
        );
      },
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
