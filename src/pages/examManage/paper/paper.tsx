import { Button, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { PaperManage, PaperDelete } from '@/services/examManage';
import { history, useLocation } from 'umi';

export default function Paper() {
  const [page, setPage] = useState({
    current: 1,
    pages: 1,
    size: 10,
    total: 1,
  });
  const [paperList, setPaperList] = useState<API.PaperManagePaging>();
  const queryPaperList = async (current = page.current, size = page.size) => {
    try {
      const currentPaperList = await PaperManage({
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
        current: currentPaperList.data.current,
        pages: currentPaperList.data.pages,
        size: currentPaperList.data.size,
        total: currentPaperList.data.total,
      });
      setPaperList(currentPaperList.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePaper = async (id: string) => {
    const cache = [];
    cache.push(id);
    try {
      const result = await PaperDelete({
        data: {
          ids: cache,
        },
      });
      if (result.success) {
        message.success(result.msg);
        queryPaperList();
      }
    } catch (error) {}
  };

  useEffect(() => {
    queryPaperList();
  }, []);

  const columns = [
    /* catId: string;
    catId_dictText: string;
    createBy: string;
    createBy_dictText: string;
    createTime: string;
    deptCode: string;
    id: string;
    joinType: number;
    joinType_dictText: string;
    objScore: number;
    quCount: number;
    subjScore: number;
    timeType: number;
    title: string;
    totalScore: number; */
    {
      title: '试卷名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '试卷分类',
      dataIndex: 'catId_dictText',
      key: 'catId_dictText',
    },
    {
      title: '组卷方式',
      dataIndex: 'joinType_dictText',
      key: 'joinType_dictText',
    },
    {
      title: '总分',
      dataIndex: 'totalScore',
      key: 'totalScore',
    },
    {
      title: '创建人',
      dataIndex: 'createBy_dictText',
      key: 'createBy_dictText',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'update',
      render: (text: unknown, record: API.PaperManage) => {
        return (
          <>
            <Button
              className="m-1"
              onClick={() => {
                console.log(record.id);
              }}
            >
              修改
            </Button>
            <Button
              className="m-1"
              onClick={() => {
                history.push({
                  pathname: '/examManage/paper/preview',
                  query: {
                    id: record.id,
                  },
                });
              }}
            >
              预览
            </Button>
            <Button
              type="primary"
              className="m-1"
              onClick={() => {
                history.push({
                  pathname: '/examManage/exam/update',
                  query: {
                    type: 'add',
                    id: record.id,
                  },
                });
              }}
            >
              创建考试
            </Button>
            <Button
              danger
              className="mx-1"
              onClick={() => {
                deletePaper(record.id);
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
        <Button
          onClick={() => {
            history.push('/examManage/paper/add');
          }}
          icon={<PlusOutlined />}
          type="primary"
          shape="round"
        >
          添加新的试卷
        </Button>
      </div>
      {paperList && (
        <Table
          columns={columns}
          dataSource={paperList.records}
          rowKey={'id'}
          pagination={{ defaultCurrent: page.current, total: page.total }}
        />
      )}
    </div>
  );
}
