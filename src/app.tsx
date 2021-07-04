/*
初始化数据配置
检查token，如果没有token，跳转至欢迎、登录界面
登录成功后，执行setInitialState，填入localstroge与初始化数据，根据权限生成路由，调整layout
*/
import { history } from 'umi';
import './style.css';
import type {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { Button, Descriptions, Result, Avatar, Space, Statistic } from 'antd';
import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
export const initialStateConfig = {
  loading: <PageLoading />,
};
declare type userData = {
  userName?: string;
  token: string;
  state?: number;
  roles?: string[];
  roleType?: number;
  realName?: string;
  points?: number;
  id?: string;
  dataScope?: number;
};

export async function getInitialState(): Promise<unknown> {
  const reload = () => {
    history.push('/login');
  };
  const validCheck = (data: userData): boolean => {
    if (data === null || data === undefined || typeof data !== 'object')
      return false;
    for (const item of Object.entries(data)) {
      if (item[0][1] === undefined) {
        return false;
      }
    }
    return true;
  };

  let initUserData: userData = {
    userName: '',
    token: '',
    state: 0,
    roles: [],
    roleType: 0,
    realName: '',
    points: 0,
    id: '',
    dataScope: 0,
  };
  let LayoutSettingData: LayoutSettings = {
    title: '考试平台',
    layout: 'side',
  };

  let localUserData;
  try {
    localStorage.getItem('evea_users_data') === null
      ? (localUserData = {})
      : (localUserData = JSON.parse(
          localStorage.getItem('evea_users_data') as string,
        ));
  } catch (error) {
    localStorage.removeItem('evea_users_data');
    console.log(error);
  }

  let result = {
    users: {
      ...initUserData,
    },
    layout: {
      ...LayoutSettingData,
    },
  };
  if (validCheck(localUserData)) {
    if (
      localUserData.hasOwnProperty('roles') &&
      localUserData.roles.includes('student')
    ) {
      result.layout.layout = 'top';
    }
    result.users = {
      ...initUserData,
      ...localUserData,
    };
  } else {
    reload();
  }

  return result;
}

/*
初始化layout布局配置
*/
export const layout: RunTimeLayoutConfig = ({
  initialState,
}): BasicLayoutProps => {
  const layoutType = initialState.layout.layout;
  return {
    navTheme: 'light',
    siderWidth: 208,
    onPageChange: () => {
      const token = initialState?.users?.token;
      const roles = initialState?.users?.roles;
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!token && location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    },
    rightRender: (initialState: any) => {
      return (
        <div
          className={`${
            layoutType === 'top' ? 'text-purple-50' : 'text-gray-900'
          }`}
        >
          <div className="px-2">{initialState.users.realName}</div>
        </div>
      );
    },
    logout: () => {
      localStorage.removeItem('evea_users_data');
      history.push('/user/login');
    },
    onError: (error: Error, info: any) => {
      console.log(error, info);
    },
    title: 'Remax',
    logo: 'https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ',
    menuHeaderRender: (logo, title) => (
      <div
        id="customize_menu_header"
        onClick={() => {
          window.open('https://remaxjs.org/');
        }}
      >
        {logo}
        {title}
      </div>
    ),
    ...initialState.layout,
  };
};

/*
初始化fetch网络请求配置
*/
export const request: RequestConfig = {
  timeout: 5000,
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        showType: 1,
        success: resData.success,
        errorMessage: resData.msg,
      };
    },
  },
  middlewares: [
    async function middlewareA(ctx, next) {
      console.log('A before');
      await next();
      console.log('A after');
    },
  ],
  requestInterceptors: [
    function InterA(url, options) {
      console.log('inter before');
      return {
        url: `${url}`,
        options: { ...options, interceptors: true },
      };
    },
  ],
  responseInterceptors: [],
};
