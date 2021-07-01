export default function (initialState: {
  userName: string;
  token: string;
  state: number;
  roles: string[];
  roleType: number;
  realName: string;
  points: number;
  id: string;
  dataScope: number;
}): {
  admin: boolean;
  subAdmin: boolean;
  user: boolean;
} {
  const { roles } = initialState;

  return {
    admin: roles.includes('sa'),
    subAdmin: roles.includes('suba'),
    user: roles.includes('user'),
  };
}
