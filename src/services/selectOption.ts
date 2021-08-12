import { request } from 'umi';
/* 组卷方式 /exam/api/sys/dic/value/tree dicCode: "tmpl_catalog" */
export async function selectOption(options?: { [key: string]: any }) {
  return request<API.wrapSelectOption>('/exam/api/sys/dic/value/tree', {
    method: 'POST',
    ...(options || {}),
  });
}
