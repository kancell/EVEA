import { Button, Table, Tag, Space, message } from 'antd';
import { useState, useEffect } from 'react';
import { RepoQuestion } from '@/services/examManage';
import QuestionUpdate from '@/components/exam/question/QuestionUpdate';
import { history, useLocation } from 'umi';
import moment from 'moment';

export default function question() {
  const location = useLocation();
  const queryLocationData = location as unknown as queryLocation;
  const [page, setPage] = useState({
    current: 1,
    pages: 1,
    size: 10,
    total: 1,
  });
  const [questionList, setQuestionList] = useState<API.RepoQuestionPaging>();
  const getQuestionList = async (current = page.current, size = page.size) => {
    try {
      const questionList = await RepoQuestion({
        data: {
          current: current,
          size: size,
          params: {
            t: '',
            quType: '',
            repoId: queryLocationData?.query?.id,
          },
          t: moment().unix(),
        },
      });
      setPage({
        current: questionList.data.current,
        pages: questionList.data.pages,
        size: questionList.data.size,
        total: questionList.data.total,
      });
      setQuestionList(questionList.data);
      console.log(questionList.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQuestionList();
  }, []);
  const columns = [
    {
      title: '题型',
      dataIndex: 'quType_dictText',
      key: 'quType_dictText',
    },
    {
      title: '难度',
      dataIndex: 'level_dictText',
      key: 'level_dictText',
      render: (text: unknown, record: API.RepoQuestion) => {
        return <Tag color="blue">{record.level_dictText}</Tag>;
      },
    },
    {
      title: '章节',
      dataIndex: 'chapterId_dictText',
      key: 'chapterId_dictText',
      render: (text: unknown, record: API.RepoQuestion) => {
        return <div>{record.chapterId_dictText === '' ? '暂无' : record.chapterId_dictText}</div>;
      },
    },
    {
      title: '题目内容',
      dataIndex: 'content',
      key: 'content',
      render: (text: unknown, record: API.RepoQuestion) => {
        return <a className="truncate w-96 text-blue-500">{record.content}</a>;
      },
    },
    {
      title: '分析',
      dataIndex: 'analysis',
      key: 'analysis',
      render: (text: unknown, record: API.RepoQuestion) => {
        return <div className="truncate w-36">{record.analysis === '' ? '暂无' : record.analysis}</div>;
      },
    },
    {
      title: '修改',
      key: 'action',
      render: (text: unknown, record: API.RepoQuestion) => {
        return <Button type="primary">修改</Button>;
      },
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={questionList?.records}
        expandable={{
          expandRowByClick: true,
          expandedRowRender: (record) => <QuestionUpdate data={record}></QuestionUpdate>,
          rowExpandable: (record) => true,
        }}
        rowKey={'id'}
        pagination={{ defaultCurrent: page.current, total: page.total }}
        onChange={(pagination) => {
          getQuestionList(pagination.current, pagination.pageSize);
        }}
      />
    </>
  );
}
