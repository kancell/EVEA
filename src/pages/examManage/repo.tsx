import { Button, Table, Collapse, Input, TreeSelect, Checkbox } from 'antd';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { RepoManage, RepoUpdate } from '@/services/examManage';
import { history } from 'umi';
const { Panel } = Collapse;

export default function Repo() {
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

  const [repo, setRepo] = useState<API.Repo>({
    catId: '',
    chapters: [],
  });
  const [repoUpdateShow, setRepoUpdateShow] = useState(0);
  const [repoAddShow, setRepoADDShow] = useState(0);
  const update = async (type: string = 'add') => {
    let data;
    switch (type) {
      case 'add':
        setRepoADDShow(0);
        data = repo;
        break;
      case 'update':
        setRepoUpdateShow(0);
        if (!repoManage) return;
        data = repoManage;
        break;
      default:
        break;
    }
    try {
      const updateResult = await RepoUpdate({
        data: data,
      });
      if (updateResult.success) queryRepoList();
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
                setRepoUpdateShow(1);
                setRepoManage(record);
              }}
            >
              修改
            </Button>
            <Button
              className="mx-1"
              onClick={() => {
                history.push({
                  pathname: '/examManage/questionList',
                  query: {
                    id: record.id || 'error',
                  },
                });
              }}
            >
              编辑试题
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
      <div className="mb-2 flex">
        <div className="m-2">
          <Collapse className="w-96" activeKey={repoAddShow} onChange={() => setRepoADDShow(repoAddShow === 0 ? 1 : 0)}>
            <Panel header="添加新的题库" key={1}>
              <div className="flex flex-wrap">
                <div className={`w-96 p-2`}>
                  <Input
                    onChange={(e) => {
                      setRepo({ ...repo, title: e.target.value });
                    }}
                    addonBefore="新题库名称"
                    placeholder="输入名称"
                  />
                </div>
                <div className={`w-96 p-2`}>
                  <TreeSelect
                    disabled
                    value={repoManage?.catId_dictText}
                    className="w-full"
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="题库分类"
                    treeDefaultExpandAll
                    onChange={(e) => {
                      setRepo({ ...repo, chapters: [] });
                    }}
                  />
                </div>
                <div className={`w-96 p-2`}>
                  <Input
                    onChange={(e) => {
                      setRepo({ ...repo, remark: e.target.value });
                    }}
                    addonBefore="备注"
                    placeholder="输入备注"
                  />
                </div>
                <div className="p-2">
                  <Checkbox
                    onChange={(e) => {
                      setRepo({ ...repo, isExam: e.target.checked });
                    }}
                  >
                    用于考试
                  </Checkbox>
                </div>
                <div className="p-2">
                  <Checkbox
                    onChange={(e) => {
                      setRepo({ ...repo, isTrain: e.target.checked });
                    }}
                  >
                    用于训练
                  </Checkbox>
                </div>
              </div>
              <div className="p-2">
                <Button onClick={() => update('add')} className="w-full" type="primary">
                  新增题库
                </Button>
              </div>
            </Panel>
          </Collapse>
        </div>
        <div className="m-2">
          <Collapse
            className="w-96"
            activeKey={repoUpdateShow}
            onChange={() => setRepoUpdateShow(repoUpdateShow === 0 ? 1 : 0)}
          >
            <Panel header="修改题库" key={1}>
              <div className="flex flex-wrap">
                <div className={`w-96 p-2`}>
                  <Input
                    value={repoManage?.title}
                    onChange={(e) => {
                      setRepoManage({ ...repoManage, title: e.target.value });
                    }}
                    addonBefore="新题库名称"
                    placeholder="输入名称"
                  />
                </div>
                <div className={`w-96 p-2`}>
                  <TreeSelect
                    disabled
                    className="w-full"
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="题库分类"
                    treeDefaultExpandAll
                    onChange={(e) => {
                      setRepoManage({ ...repoManage, chapters: [] });
                    }}
                  />
                </div>
                <div className={`w-96 p-2`}>
                  <Input
                    value={repoManage?.remark}
                    onChange={(e) => {
                      setRepoManage({ ...repoManage, remark: e.target.value });
                    }}
                    addonBefore="备注"
                    placeholder="输入备注"
                  />
                </div>
                <div className="p-2">
                  <Checkbox
                    checked={repoManage?.isExam}
                    onChange={(e) => {
                      setRepoManage({ ...repoManage, isExam: e.target.checked });
                    }}
                  >
                    用于考试
                  </Checkbox>
                </div>
                <div className="p-2">
                  <Checkbox
                    checked={repoManage?.isTrain}
                    onChange={(e) => {
                      setRepoManage({ ...repoManage, isTrain: e.target.checked });
                    }}
                  >
                    用于训练
                  </Checkbox>
                </div>
              </div>
              <div className="p-2">
                <Button onClick={() => update('update')} className="w-full" type="primary">
                  确认修改
                </Button>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
      {repoList && (
        <Table
          columns={columns}
          dataSource={repoList.records}
          rowKey={'id'}
          pagination={{ defaultCurrent: page.current, total: page.total }}
        />
      )}
    </div>
  );
}
