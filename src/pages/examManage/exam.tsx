import { Button, Table, Tag, Space } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { ExamManage } from '@/services/examManage';
import { history } from 'umi';

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
      title: '人工阅卷',
      dataIndex: 'hasSaq',
      key: 'hasSaq',
      render: (hasSaq: boolean) => <div>{hasSaq ? '是' : '否'}</div>,
    },
    {
      title: '考试状态',
      dataIndex: 'state',
      key: 'state',
      render: (state: number) => {
        const _stateReplace = new Map([
          [0, ['可开始', 'green']],
          [1, ['已禁用', 'red']],
          [2, ['未开始', 'geekblue']],
          [3, ['已结束', 'gray']],
        ]);
        const stateReplace = _stateReplace.get(state) as [string, string];
        return <Tag color={stateReplace[1]}>{stateReplace[0]}</Tag>;
      },
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
                history.push({
                  pathname: '/examManage/examUpdate',
                  query: {
                    type: 'update',
                    id: record.id,
                  },
                });
              }}
            >
              修改
            </Button>
            <Button
              danger
              className="mx-1"
              onClick={() => {
                console.log(record.id);
              }}
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <div className="bg-white p-2 mb-2">
        <Button type="primary" shape="round">
          添加新的考试
        </Button>
      </div>
      <div className="px-2 bg-white">
        {examList && (
          <Table
            columns={columns}
            dataSource={examList.records}
            rowKey={'id'}
            pagination={{ defaultCurrent: page.current, total: page.total }}
          />
        )}
      </div>
    </div>
  );
}
