/* 获取用户列表http://localhost:8101/exam/api/sys/user/paging */
import { request } from 'umi';
/* 用户统计 */
export async function userList(options?: { [key: string]: any }) {
  return request<API.WarpUserPaging>('/exam/api/sys/user/paging', {
    method: 'POST',
    ...(options || {}),
  });
}
