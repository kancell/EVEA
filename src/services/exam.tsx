import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
/* 获取当前的考试列表 */
export async function currentExam(options?: { [key: string]: any }) {
  return request<API.WarpEaxmPaging>('/exam/api/exam/exam/online-paging', {
    method: 'POST',
    ...(options || {}),
  });
}
/* http://localhost:8101/exam/api/paper/paper/create-paper  传入点击列表中{examId: "1392018972039213058"} */
export async function createExam(options?: { [key: string]: any }) {
  return request<API.WarpEaxmCreate>('/exam/api/paper/paper/create-paper', {
    method: 'POST',
    ...(options || {}),
  });
}
/* http://localhost:8101/exam/api/paper/paper/paper-detail 试卷详情，传入createExam中返回值 {id: "1411980052448317442"} */
export async function examContent(options?: { [key: string]: any }) {
  return request<API.WarpEaxmCreate>('/exam/api/paper/paper/paper-detail', {
    method: 'POST',
    ...(options || {}),
  });
}
