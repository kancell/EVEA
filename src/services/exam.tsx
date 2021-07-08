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
  return request<API.WarpExamPaging>('/exam/api/exam/exam/online-paging', {
    method: 'POST',
    ...(options || {}),
  });
}
/* http://localhost:8101/exam/api/paper/paper/create-paper  传入点击列表中{examId: "1392018972039213058"} */
export async function createExam(options?: { [key: string]: any }) {
  return request<API.WarpExamCreate>('/exam/api/paper/paper/create-paper', {
    method: 'POST',
    ...(options || {}),
  });
}
/* http://localhost:8101/exam/api/paper/paper/paper-detail 试卷详情，传入createExam中返回值 {id: "1411980052448317442"} */
export async function examContent(options?: { [key: string]: any }) {
  return request<API.WarpQuestionPaging>('/exam/api/paper/paper/paper-detail', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function questionContent(options?: { [key: string]: any }) {
  return request<API.WarpQuestion>('/exam/api/paper/paper/qu-detail', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function fillAnswer(options?: { [key: string]: any }) {
  return request<any>('/exam/api/paper/paper/fill-answer', {
    method: 'POST',
    ...(options || {}),
  });
}
//http://localhost:8101/exam/api/paper/paper/fill-answer
//http://localhost:8101/exam/api/paper/paper/qu-detail
//http://localhost:8101/exam/api/paper/paper/check-process 检查状态
