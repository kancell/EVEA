import { request } from 'umi';

/** 管理端获取当前所有考试 POST exam/api/exam/exam/paging */
export async function examManage(options?: { [key: string]: any }) {
  return request<API.WarpExamPaging>('/exam/api/exam/exam/paging', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 管理端获取当前所有试卷http://localhost:8101/exam/api/tmpl/tmpl/paging */
export async function examPaperManage(options?: { [key: string]: any }) {
  return request<API.WarpPaperManagePaging>('/exam/api/tmpl/tmpl/paging', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 管理端获取所有题库 http://localhost:8101/exam/api/repo/paging*/
export async function paperRepoManage(options?: { [key: string]: any }) {
  return request<API.WarpPaperManagePaging>('/exam/api/repo/paging', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 管理端获取需阅卷试卷 http://localhost:8101/exam/api/exam/exam/review-paging */
export async function paperReview(options?: { [key: string]: any }) {
  return request<API.WarpPaperManagePaging>('/exam/api/exam/exam/review-paging', {
    method: 'POST',
    ...(options || {}),
  });
}
