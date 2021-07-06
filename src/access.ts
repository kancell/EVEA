import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import type { BasicLayoutProps } from '@ant-design/pro-layout';

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

export default function (initialState: {
  user: userData;
  layout: BasicLayoutProps;
}): {
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
