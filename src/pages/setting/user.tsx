import { Button, Table, Modal, Card, Input, Select } from 'antd';
import { useState, useEffect } from 'react';
import { userList as getUserList } from '@/services/setting';
import moment from 'moment';

export default function User() {
  const [verifyVisible, setVerifyVisible] = useState(false);
  const verifyShow = () => {
    setVerifyVisible(true);
  };
  const handleOk = () => {
    setVerifyVisible(false);
  };
  const handleCancel = () => {
    setVerifyVisible(false);
  };

  const [page, setPage] = useState({
    current: 1,
    pages: 1,
    size: 10,
    total: 1,
  });
  const [userList, setUserList] = useState<API.UserPaging>();
  const queryUserList = async (current = page.current, size = page.size) => {
    try {
      const currentExamList = await getUserList({
        data: {
          current: current,
          size: size,
          params: {},
          t: moment().unix(),
        },
      });
      setPage({
        current: currentExamList.data.current,
        pages: currentExamList.data.pages,
        size: currentExamList.data.size,
        total: currentExamList.data.total,
      });
      setUserList(currentExamList.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    queryUserList();
  }, []);

  const columns = [
    {
      title: '登录账号',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '真名',
      dataIndex: 'realName',
      key: 'realName',
    },
    {
      title: '考试积分',
      dataIndex: 'points',
      key: 'points',
    },
    {
      title: '部门编号',
      dataIndex: 'deptCode',
      key: 'deptCode',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: unknown, record: API.User) => {
        return (
          <>
            <Button
              className="m-1"
              onClick={() => {
                verifyShow();
              }}
            >
              修改
            </Button>
            <Button danger className="m-1" onClick={() => {}}>
              删除
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Modal title="用户管理" visible={verifyVisible} onOk={handleOk} onCancel={handleCancel}>
        <Card title="">
          <Input addonBefore="登录账号"></Input>
          <Input addonBefore="真实姓名"></Input>
          <Input addonBefore="登录密码"></Input>
          <div>
            部门选择：<Select className="w-full"></Select>
          </div>
          <div>
            角色选择：<Select className="w-full"></Select>
          </div>

          <Input addonBefore="电子邮箱"></Input>
          <Input addonBefore="身份证号"></Input>
          <Input addonBefore="手机号码"></Input>
        </Card>
      </Modal>
      <div className="bg-white p-2 mb-2">
        <Button type="primary" shape="round" onClick={() => verifyShow()}>
          添加新的用户
        </Button>
      </div>
      <div className="px-2 bg-white">
        {userList && (
          <Table
            columns={columns}
            dataSource={userList.records}
            rowKey={'id'}
            pagination={{ defaultCurrent: page.current, total: page.total }}
            onChange={(pagination) => {
              queryUserList(pagination.current, pagination.pageSize);
            }}
          />
        )}
      </div>
    </div>
  );
}
