import { Settings as LayoutSettings } from '@ant-design/pro-layout';

export default function (initialState: {
  users: {
    userName: string;
    token: string;
    state: number;
    roles: string[];
    roleType: number;
    realName: string;
    points: number;
    id: string;
    dataScope: number;
  };
  layout: LayoutSettings;
}): {
  admin: boolean;
  subAdmin: boolean;
  user: boolean;
} {
  const { users, layout } = initialState;
  const { roles } = users;
  return {
    admin: roles.includes('sa'),
    subAdmin: roles.includes('suba'),
    user: roles.includes('student'),
  };
}
