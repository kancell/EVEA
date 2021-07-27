import { Button, Table, Collapse, Input, TreeSelect, Checkbox } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { RepoManage } from '@/services/examManage';
const { Panel } = Collapse;

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
    {
      title: '操作',
      key: 'update',
      render: (text: unknown, record: API.RepoManage) => {
        return (
          <>
            <Button
              className="mx-1"
              onClick={() => {
                console.log(record.id);
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
      <div className="mb-2">
        <Collapse className="w-96">
          <Panel header="添加新的题库" key="1">
            <div className="flex flex-wrap">
              <div className={`w-96 p-2`}>
                <Input onChange={(e) => {}} addonBefore="新题库名称" placeholder="输入名称" />
              </div>
              <div className={`w-96 p-2`}>
                <TreeSelect
                  disabled
                  className="w-full"
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="题库分类"
                  treeDefaultExpandAll
                />
              </div>
              <div className={`w-96 p-2`}>
                <Input onChange={(e) => {}} addonBefore="备注" placeholder="输入备注" />
              </div>
              <div className="p-2">
                <Checkbox>用于考试</Checkbox>
              </div>
              <div className="p-2">
                <Checkbox>用于训练</Checkbox>
              </div>
            </div>
            <div className="p-2">
              <Button className="w-full" type="primary">
                新增题库
              </Button>
            </div>
          </Panel>
        </Collapse>
      </div>
      {RepoList && (
        <Table
          columns={columns}
          dataSource={RepoList.records}
          rowKey={'id'}
          pagination={{ defaultCurrent: page.current, total: page.total }}
        />
      )}
    </div>
  );
}
