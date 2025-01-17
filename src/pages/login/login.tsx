import React, { useMemo, useEffect, useState, ReactChild } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { request, useModel, history } from 'umi';
import logo from '@/assets/logo.png';

const LoginForm = (): ReactChild => {
  const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState');
  const [verifyRandomKey, setVerifyRandomKey] = useState(uuidv4() as string);
  const [verifyCodePic, setVerifyCodePic] = useState('');
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    captchaKey: '',
    captchaValue: '',
  });

  const verifyRandomKeyGenerate = () => {
    setVerifyRandomKey(uuidv4());
  };

  useEffect(() => {
    const verifyRandomKeyUrl = () => {
      const objectURL = `${process.env.BASEURL}/common/api/captcha/gen?key=${verifyRandomKey}`;
      setVerifyCodePic(objectURL);
      setLoginData({ ...loginData, captchaKey: verifyRandomKey });
    };
    verifyRandomKeyUrl();
  }, [verifyRandomKey]);

  const Login = async () => {
    await request(`/exam/api/sys/user/login`, {
      method: 'post',
      headers: {
        'content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(loginData),
    })
      .then((res: { [key: string]: string | string[] | number }) => {
        localStorage.setItem('evea_users_data', JSON.stringify(res.data));
        refresh();
        setTimeout(() => {
          history.push('/');
        }, 0);
      })
      .catch((res: { [key: string]: string | string[] | number }) => {
        verifyRandomKeyGenerate();
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-8">
        <div>
          {/* <img className="mx-auto h-12 w-auto block" src={logo} alt="Workflow" /> */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{process.env.TITLE}</h2>
        </div>
        <Form
          name="login"
          className="max-w-sm w-full"
          initialValues={{
            remember: true,
          }}
          onFinish={Login}
        >
          <Form.Item
            name="userName"
            rules={[
              {
                required: true,
                message: '请输入登录账号',
              },
            ]}
          >
            <Input
              className="h-8"
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              prefix={<UserOutlined />}
              placeholder="登录账号"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入登录密码',
              },
            ]}
          >
            <Input
              className="h-8"
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              prefix={<LockOutlined />}
              type="password"
              placeholder="登录密码"
            />
          </Form.Item>
          <div className="flex flex-row">
            <Form.Item
              className="w-2/3"
              name="verifyCode"
              rules={[
                {
                  required: true,
                  message: '请输入验证码',
                },
              ]}
            >
              <Input
                className="h-8"
                onChange={(e) => setLoginData({ ...loginData, captchaValue: e.target.value })}
                prefix={<LockOutlined />}
                placeholder="验证码"
              />
            </Form.Item>
            <img className="w-1/3 h-8 block cursor-pointer" src={verifyCodePic} onClick={() => verifyRandomKeyGenerate()}></img>
          </div>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <span className="text-sm ">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              忘记密码？
            </a>
          </span>
          <div className="flex">
            <Button type="primary" htmlType="submit" className="group relative w-full flex justify-center py-2 px-4 mt-4 mr-4">
              登录
            </Button>
            <Button
              type="primary"
              disabled
              htmlType="submit"
              className="group relative w-full flex justify-center py-2 px-4 mt-4 ml-4"
            >
              注册
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
