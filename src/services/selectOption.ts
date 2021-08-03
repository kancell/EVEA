import { request } from 'umi';
/* 组卷方式 http://localhost:8101/exam/api/sys/dic/value/tree dicCode: "tmpl_catalog" */
export async function ExamType(options?: { [key: string]: any }) {
  return request<API.WarpExamDetail>('/exam/api/exam/exam/detail', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 试卷分类 http://localhost:8101/exam/api/sys/dic/value/tree dicCode: tmpl_catalog */

/* 题库里题目数量 http://localhost:8101/exam/api/sys/dic/value/tree  dicCode: "qu_type" */
