/* 选题抽屉 */
import { RepoManage, RepoChapterGroup } from '@/services/examManage';
import { useState, useEffect } from 'react';
import moment from 'moment';
import InputNumber from '@/components/common/InputNumber';
import { Button, Card, Input, Select, Form, DatePicker, Radio, Modal, Table } from 'antd';

const { Option } = Select;

type ChapterGroupParams = {
  excludes?: string[];
  groups?: unknown[];
  quType?: string;
  repoId?: string;
};

export default function PaperSelect(props: { questionType?: string; paperSelectType?: string }) {
  const [page, setPage] = useState({
    current: 1,
    pages: 1,
    size: 10,
    total: 1,
  });
  const [repoManage, setRepoManage] = useState<API.RepoManage>();
  const [repoList, setRepoList] = useState<API.RepoManagePaging>();

  const queryRepoList = async (current = page.current, size = page.size) => {
    try {
      const currentRepoList = await RepoManage({
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
        current: currentRepoList.data.current,
        pages: currentRepoList.data.pages,
        size: currentRepoList.data.size,
        total: currentRepoList.data.total,
      });
      setRepoList(currentRepoList.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [chapterGroup, setChapterGroup] = useState<API.ChapterGroup[]>();
  const queryQuestionSum = async (data: ChapterGroupParams) => {
    try {
      const result = await RepoChapterGroup({
        data: data,
      });
      setChapterGroup(result.data);
    } catch (error) {}
  };

  useEffect(() => {
    queryRepoList();
  }, []);

  const columns = [
    {
      title: '题库名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '操作',
      key: 'update',
      render: (text: unknown, record: API.RepoManage) => {
        return (
          <>
            <Button
              type="primary"
              className="mx-1"
              onClick={() => {
                let params: ChapterGroupParams = {
                  excludes: [],
                  groups: [],
                  quType: props.questionType,
                  repoId: record.id,
                };
                queryQuestionSum(params);
              }}
            >
              选定
            </Button>
          </>
        );
      },
    },
  ];
  const [qq, setqq] = useState(0);
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="w-48 mx-4">
          <div className="mb-2">
            <Select disabled className="w-full" defaultValue={props.questionType}>
              <Option value="1">单选题</Option>
              <Option value="2">多选题</Option>
              <Option value="3">判断题</Option>
              <Option value="4">简答题</Option>
              <Option value="5">填空题</Option>
            </Select>
          </div>
          <div className="mb-2">
            <Select disabled className="w-full" defaultValue={props.paperSelectType}>
              <Option value="1">抽题组卷</Option>
              <Option value="2">选题组卷</Option>
              <Option value="3">随机组卷</Option>
            </Select>
          </div>
        </div>
        <div className="flex-grow">
          {repoList && (
            <Table
              size="small"
              bordered
              columns={columns}
              dataSource={repoList.records}
              rowKey={'id'}
              pagination={{ defaultCurrent: page.current, total: page.total }}
            />
          )}
        </div>
      </div>
      <InputNumber value={qq} onChange={(value: number) => setqq(value)}></InputNumber>
      <div>
        <Button
          onClick={() => {
            console.log(1);
            console.log(qq);
          }}
          type="primary"
        >
          提交
        </Button>
      </div>
    </div>
  );
}
