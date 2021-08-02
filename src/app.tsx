/*
初始化数据配置
检查token，如果没有token，跳转至欢迎、登录界面
登录成功后，执行setInitialState，填入localstroge与初始化数据，根据权限生成路由，调整layout
*/
import { history } from 'umi';
import type { RequestConfig } from 'umi';
import type { BasicLayoutProps } from '@ant-design/pro-layout';

import './style/style.css';

let runTimeToken: string = '';
const loginPath = '/user/login';
export async function getInitialState(): Promise<unknown> {
  const validCheck = (data: API.userData): boolean => {
    if (data === null || data === undefined || typeof data !== 'object') return false;
    for (const item of Object.entries(data)) {
      if (item[0][1] === undefined) {
        return false;
      }
    }
    return true;
  };

  let initUserData: API.userData = {
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
  let LayoutSettingData: BasicLayoutProps = {
    title: '考试平台',
    layout: 'side',
    logo: 'https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ',
  };

  let localUserData;
  try {
    localStorage.getItem('evea_users_data') === null
      ? (localUserData = {})
      : (localUserData = JSON.parse(localStorage.getItem('evea_users_data') as string));
  } catch (error) {
    localStorage.removeItem('evea_users_data');
    console.log(error);
  }

  let result: {
    user: API.userData;
    layout: BasicLayoutProps;
  } = {
    user: {
      ...initUserData,
    },
    layout: {
      ...LayoutSettingData,
    },
  };
  if (validCheck(localUserData)) {
    if (localUserData.hasOwnProperty('roles') && localUserData.roles.includes('student')) {
      result.layout.layout = 'top';
    }
    result.user = {
      ...initUserData,
      ...localUserData,
    };
    runTimeToken = result.user.token;
  } else {
    history.push(loginPath);
    localStorage.removeItem('evea_users_data');
  }
  return result;
}

/*
初始化layout布局配置
*/
export const layout = ({
  initialState,
}: {
  initialState: { user: API.userData; layout: BasicLayoutProps };
}): BasicLayoutProps => {
  return {
    navTheme: 'light',
    siderWidth: 208,
    onPageChange: () => {
      const token = runTimeToken;
      const roles = initialState?.user?.roles;
      const { location } = history;
      // 如果没有登录，重定向到 login,后续可以在这里加token校验
      if ((!token || token === '') && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    rightContentRender: () => {
      const layoutType = initialState?.layout?.layout;
      return (
        <div className={`cursor-pointer group flex ${layoutType === 'top' ? 'text-gray-900' : 'text-gray-900'}`}>
          <div className="px-2">{initialState.user.realName}</div>
          <div className="absolute rounded bg-white border mx-auto right-2 top-12 hidden flex-col group-hover:flex text-center">
            <span
              onClick={() => {
                history.push('/user/userCenter');
              }}
              className="border-b px-2"
            >
              个人中心
            </span>
            <span
              onClick={() => {
                localStorage.removeItem('evea_users_data');
                history.push(loginPath);
              }}
              className="border-b px-2"
            >
              退出
            </span>
          </div>
        </div>
      );
    },
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
const baseUrl = 'http://localhost:8101';
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
      await next();
    },
  ],
  requestInterceptors: [
    (url, options) => {
      return {
        url: `${baseUrl}${url}`,
        options: {
          ...options,
          interceptors: true,
          headers: {
            token: runTimeToken,
            'Content-Type': 'application/json;charset=UTF-8',
          },
        },
      };
    },
  ],
  responseInterceptors: [
    async (response, options) => {
      const data = await response.clone().json();
      if (data.code === 10010002 && data.success === false && location.pathname !== loginPath) {
        history.push(loginPath);
      }
      return response;
    },
  ],
};
