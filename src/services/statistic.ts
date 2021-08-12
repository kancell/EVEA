import { request } from 'umi';
/* 用户统计 */
export async function userStatis(options?: { [key: string]: any }) {
  return request<API.wrapUserStatisPaging>('/exam/api/stat/total/user/paging', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 试卷统计 */
export async function examStatis(options?: { [key: string]: any }) {
  return request<API.wrapExamStatisPaging>('/exam/api/stat/total/exam/paging', {
    method: 'POST',
    ...(options || {}),
  });
}
