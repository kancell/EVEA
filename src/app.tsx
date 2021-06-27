export async function getInitialState() {
  //const data = await fetchXXX();
  const data = {
    userId: 'any123',
    role: 'user',
    settings: {
      layout: 'side',
      name: 'admin',
    },
  };
  return data;
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
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};
