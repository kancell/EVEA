import type { BasicLayoutProps } from '@ant-design/pro-layout';

export default function (initialState: { user: API.userData; layout: BasicLayoutProps }): {
  admin: boolean;
  subAdmin: boolean;
  user: boolean;
} {
  const { user, layout } = initialState;
  const { roles } = user;

  if (roles !== undefined) {
    return {
      admin: roles.includes('sa'),
      subAdmin: roles.includes('suba'),
      user: roles.includes('student'),
    };
  }
  return {
    admin: false,
    subAdmin: false,
    user: false,
  };
}
