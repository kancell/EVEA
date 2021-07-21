import { Button, Table } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { RepoManage } from '@/services/examManage';

export default function Repo() {
  const [page, setPage] = useState({
    current: 1,
    pages: 1,
    size: 10,
    total: 1,
  });
  const [RepoList, setRepoList] = useState<API.RepoManagePaging>();
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
      title: '题库分类',
      dataIndex: 'catId_dictText',
      key: 'catId_dictText',
    },
    {
      title: '试题数量',
      dataIndex: 'quCount',
      key: 'quCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '说明',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  return (
    <div>
      {RepoList && (
        <Table
          columns={columns}
          dataSource={RepoList.records}
          pagination={{ defaultCurrent: page.current, total: page.total }}
        />
      )}
    </div>
  );
}
