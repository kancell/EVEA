import { useModel } from 'umi';

export default function(initialState: { userId: any; role: any; }) {
  const { userId, role } = initialState;

  return {
    canReadPageA : role === 'admin',
    canReadFoo: true,
    canUpdateFoo: role === 'admin',
    canDeleteFoo: (foo: { ownerId: any; }) => {
      return foo.ownerId === userId;
    },
  };
}
