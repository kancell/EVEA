import { Button, Table, Tag, Space, Collapse } from 'antd';
import { useState, useEffect } from 'react';
import { RepoQuestion } from '@/services/examManage';
import QuestionAdd from '@/components/exam/question/QuestionAdd';
import { history, useLocation } from 'umi';
import moment from 'moment';
import '@/style/questionadd.css';
const { Panel } = Collapse;

export default function question() {
  const location = useLocation();
  const queryLocationData = location as unknown as queryLocation;
  const [questionAddShow, setQuestionAddShow] = useState(0);
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
    } catch (error) {
      console.log(error);
    }
  };
  const refreshQuestionList = () => {
    getQuestionList();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
        return <div className="truncate w-96 cursor-pointer text-blue-500">{record.content}</div>;
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
  ];
  return (
    <>
      <div className="my-2">
        <Collapse activeKey={questionAddShow} onChange={() => setQuestionAddShow(questionAddShow === 0 ? 1 : 0)}>
          <Panel header="添加新的试题" key={1}>
            <QuestionAdd type="add" repoId={queryLocationData?.query?.id} refresh={refreshQuestionList}></QuestionAdd>
          </Panel>
        </Collapse>
      </div>

      <Table
        columns={columns}
        dataSource={questionList?.records}
        expandable={{
          expandRowByClick: true,
          expandedRowRender: (record) => (
            <QuestionAdd type="update" id={record.id} repoId={record.repoId} refresh={refreshQuestionList}></QuestionAdd>
          ),
          rowExpandable: (record) => true,
          expandedRowClassName: (record, index, indent): string => {
            return 'bg-gray-200';
          },
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
