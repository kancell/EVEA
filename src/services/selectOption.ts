import { request } from 'umi';
/* 组卷方式 http://localhost:8101/exam/api/sys/dic/value/tree */
export async function ExamType(options?: { [key: string]: any }) {
  return request<API.WarpExamDetail>('/exam/api/exam/exam/detail', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 考试类型 正式模拟http://localhost:8101/exam/api/sys/dic/value/tree */

/* 考试分类 http://localhost:8101/exam/api/sys/dic/value/tree */
