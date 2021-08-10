import { request } from 'umi';
/* 用户统计 */
export async function userStatis(options?: { [key: string]: any }) {
  return request<API.WarpUserStatisPaging>('/exam/api/stat/total/user/paging', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 试卷统计 */
export async function examStatis(options?: { [key: string]: any }) {
  return request<API.WarpExamStatisPaging>('/exam/api/stat/total/exam/paging', {
    method: 'POST',
    ...(options || {}),
  });
}
