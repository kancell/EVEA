import { useMemo, useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = () => {
  const [verifyRandomKey, setVerifyRandomKey] = useState(Math.random() * 100);
  const [verifyCodePic, setVerifyCodePic] = useState();
  const [loginData, setLoginData] = useState();

  const verifyRandomKeyGenerate = () => {
    setVerifyRandomKey(Math.random() * 100);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:9527/common/api/captcha/gen?key=${verifyRandomKey}`,
      );
      const raw = await response;
      console.log(raw);
    };
    fetchData();
  }, [verifyRandomKey]);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
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
          prefix={<UserOutlined className="site-form-item-icon" />}
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
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="登录密码"
        />
      </Form.Item>
      <Form.Item
        name="verifyCode"
        rules={[
          {
            required: true,
            message: '请输入验证码',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <button onClick={() => verifyRandomKeyGenerate()}>123213</button>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住密码</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          忘记密码
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
        Or <a href="">注册</a>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
