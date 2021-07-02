/*
初始化数据配置
检查token，如果没有token，跳转至欢迎、登录界面
登录成功后，执行setInitialState，填入localstroge与初始化数据，根据权限生成路由，调整layout
*/
import { history } from 'umi';
import './style.css';

let userData: {
  userName?: string;
  token?: string;
  state?: number;
  roles?: string[];
  roleType?: number;
  realName?: string;
  points?: number;
  id?: string;
  dataScope?: number;
} = {
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
export async function getInitialState(): Promise<unknown> {
  const reload = () => {
    history.push('/login');
  };
  const validCheck = (
    data:
      | null
      | undefined
      | { [key: string]: string | string[] | number | undefined },
  ): boolean => {
    console.log(3123123);
    if (data === null || data === undefined || typeof data !== 'object')
      return false;
    for (const item of Object.entries(data)) {
      if (item[0][1] === undefined) {
        return false;
      }
    }
    return true;
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

  if (validCheck(localUserData)) {
    userData = {
      ...userData,
      ...localUserData,
    };
  } else {
    reload();
  }
  return userData;
}

/*
初始化layout布局配置
*/
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
    onPageChange: () => {
      const { token } = initialState;
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!token && location.pathname !== '/login') {
        history.push('/user/login');
      }
    },
    logout: () => {
      localStorage.removeItem('evea_users_data');
      history.push('/login');
    },
    onError: (error: Error, info: any) => {
      console.log(error, info);
    },
    ...initialState?.settings,
  };
};

/*
初始化fetch网络请求配置
*/
import { RequestConfig } from 'umi';

export const request: RequestConfig = {
  timeout: 5000,
  errorConfig: {
    adaptor: (resData: {
      [key: string]:
        | string
        | string[]
        | number
        | { [key: string]: string | string[] | number };
    }) => {
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
