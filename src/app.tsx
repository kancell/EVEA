import { history } from 'umi';
import './style.css';

function redirectToLogin() {
  //history.push('/login');
}

export async function getInitialState(): Promise<unknown> {
  /*
  检查token，如果没有token，跳转至欢迎、登录界面
  登录成功后，执行setInitialState，填入localstroge与初始化数据，根据权限生成路由，调整layout
  */
  let userData = {};

  localStorage.getItem('evea_users_data') === null
    ? redirectToLogin()
    : (userData = JSON.parse(
        localStorage.getItem('evea_users_data') as string,
      ));

  return userData;
}

/* 运行时layout配置 */
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    ...initialState?.settings,
  };
};
