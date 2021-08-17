import { request } from 'umi';

/** 管理端获取当前所有考试 POST exam/api/exam/exam/paging */
export async function ExamManage(options?: { [key: string]: any }) {
  return request<API.wrapExamPaging>('/exam/api/exam/exam/paging', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 管理端获取考试详情 /exam/api/exam/exam/detail*/
export async function ExamDetail(options?: { [key: string]: any }) {
  return request<API.wrapExamDetail>('/exam/api/exam/exam/detail', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 管理端更新考试设置 /exam/api/exam/exam/save */
export async function UpdateExam(options?: { [key: string]: any }) {
  return request<API.wrapExamDetail>('/exam/api/exam/exam/save', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 删除考试条目/exam/api/exam/exam/delete */
export async function DeleteExam(options?: { [key: string]: any }) {
  return request<API.httpRespone>('/exam/api/exam/exam/delete', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 管理端获取试卷大致信息 /exam/api/tmpl/tmpl/simple-info*/
export async function ExamSimpleInfo(options?: { [key: string]: any }) {
  return request<API.wrapPaperManageSingle>('/exam/api/tmpl/tmpl/simple-info', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 管理端获取当前所有试卷/exam/api/tmpl/tmpl/paging */
export async function PaperManage(options?: { [key: string]: any }) {
  return request<API.wrapPaperManagePaging>('/exam/api/tmpl/tmpl/paging', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 试卷预览/exam/api/tmpl/tmpl/preview */
export async function PaperPreview(options?: { [key: string]: any }) {
  return request<API.wrapPaperDetail>('/exam/api/tmpl/tmpl/preview', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 管理端删除试卷 /exam/api/tmpl/tmpl/delete ids: ["1419244434487214081"] */
export async function PaperDelete(options?: { [key: string]: any }) {
  return request<API.httpRespone>('/exam/api/tmpl/tmpl/delete', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 修改试卷 /exam/api/tmpl/tmpl/detail */
export async function PaperUpdate(options?: { [key: string]: any }) {
  return request<API.wrapPaperEditParams>('/exam/api/tmpl/tmpl/detail', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 保存试卷 /exam/api/tmpl/tmpl/save */
export async function PaperSave(options?: { [key: string]: any }) {
  return request<API.wrapRepoQuestionList>('/exam/api/tmpl/tmpl/save', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 批量上传题库 /exam/api/qu/qu/import
repoId: 1422450104851169282
file: (binary)*/
export async function RepoUpload(options?: { [key: string]: any }) {
  return request<API.httpRespone>('/exam/api/qu/qu/import', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 导出试题 /exam/api/qu/qu/export
content: ""
quType: ""
repoId: "1422450104851169282"
*/
export async function RepoExport(options?: { [key: string]: any }) {
  return request('/exam/api/qu/qu/export', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 下载试题模板 exam/api/qu/qu/import/template*/
export async function RepoUploadTemplate(options?: { [key: string]: any }) {
  return request('/exam/api/qu/qu/import/template', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 管理端获取所有题库 /exam/api/repo/paging*/
export async function RepoManage(options?: { [key: string]: any }) {
  return request<API.wrapRepoManagePaging>('/exam/api/repo/paging', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 管理端获取所有题库 /exam/api/repo/save*/
export async function RepoUpdate(options?: { [key: string]: any }) {
  return request<API.wrapRepoManagePaging>('/exam/api/repo/save', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 删除题库 /exam/api/repo/delete */
export async function RepoDelete(options?: { [key: string]: any }) {
  return request<API.wrapRepoManagePaging>('/exam/api/repo/delete', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 获取题库详情 /exam/api/repo/detail */
export async function RepoDetail(options?: { [key: string]: any }) {
  return request<API.wrapRepoManage>('/exam/api/repo/detail', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 题库内各类型试题数量 /exam/api/repo/chapter-group */
export async function RepoChapterGroup(options?: { [key: string]: any }) {
  return request<API.wrapChapterGroup>('/exam/api/repo/chapter-group', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 新建试卷，添加大题，/exam/api/qu/qu/list-with-chapter-group */
export async function RepoChapterGroupAdd(options?: { [key: string]: any }) {
  return request<API.wrapRepoQuestionList>('/exam/api/qu/qu/list-with-chapter-group', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 获取试题列表 /exam/api/qu/qu/paging */
export async function RepoQuestion(options?: { [key: string]: any }) {
  return request<API.wrapRepoQuestionPaging>('/exam/api/qu/qu/paging', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 更新或新增试题 /exam/api/qu/qu/save */
export async function RepoQuestionAdd(options?: { [key: string]: any }) {
  return request<API.httpRespone>('/exam/api/qu/qu/save', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 试题详情 /exam/api/qu/qu/detail */
export async function RepoQuestionDetail(options?: { [key: string]: any }) {
  return request<API.wrapRepoQuestion>('/exam/api/qu/qu/detail', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 管理端获取需阅卷试卷 /exam/api/exam/exam/review-paging */
export async function paperReview(options?: { [key: string]: any }) {
  return request<API.wrapReviewPaging>('/exam/api/exam/exam/review-paging', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 管理端获取用户统计 /exam/api/stat/total/user/paging */
export async function userStatis(options?: { [key: string]: any }) {
  return request<API.wrapUserStatisPaging>('/exam/api/exam/exam/review-paging', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 管理端获取考试统计 /exam/api/exam/exam/paging */
export async function examStatis(options?: { [key: string]: any }) {
  return request<API.wrapExamPaging>('/exam/api/exam/exam/review-paging', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 管理端角色管理 /exam/api/sys/role/paging */
export async function roleManage(options?: { [key: string]: any }) {
  return request<API.wrapExamPaging>('/exam/api/sys/role/paging', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 管理端部门管理 /exam/api/sys/depart/paging */
export async function departManage(options?: { [key: string]: any }) {
  return request<API.wrapExamPaging>('/exam/api/sys/role/paging', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 管理端用户管理 /exam/api/sys/user/paging */
export async function userManage(options?: { [key: string]: any }) {
  return request<API.wrapExamPaging>('/exam/api/sys/user/paging', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 管理端公告管理/exam/api/sys/notice/paging */
export async function noticeManage(options?: { [key: string]: any }) {
  return request<API.wrapExamPaging>('/exam/api/sys/notice/paging', {
    method: 'POST',
    ...(options || {}),
  });
}
