import { RepoManage } from '@/services/examManage';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, Card, Input, Select, Form, DatePicker, Radio, Modal, Table } from 'antd';
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
            <Button type="primary" className="mx-1" onClick={() => {}}>
              选定
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <div className="flex">
      <div className="w-64">
        选定试题类型：
        <Input disabled value={props.questionType} />
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
  );
}
