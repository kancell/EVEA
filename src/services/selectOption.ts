import { request } from 'umi';
/* 组卷方式 http://localhost:8101/exam/api/sys/dic/value/tree dicCode: "tmpl_catalog" */
export async function selectOption(options?: { [key: string]: any }) {
  return request<API.WarpSelectOption>('/exam/api/sys/dic/value/tree', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 试卷分类 http://localhost:8101/exam/api/sys/dic/value/tree dicCode: tmpl_catalog */

/* 题库里题目数量 http://localhost:8101/exam/api/sys/dic/value/tree  dicCode: "qu_type" */
