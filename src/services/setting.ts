/* 获取用户列表/exam/api/sys/user/paging */
import { request } from 'umi';
/* 用户统计 */
export async function userList(options?: { [key: string]: any }) {
  return request<API.WarpUserPaging>('/exam/api/sys/user/paging', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 获取公告 /exam/api/sys/notice/paging*/
export async function noticeList(options?: { [key: string]: any }) {
  return request<API.WarpUserPaging>('/exam/api/sys/user/paging', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 获取公告
/exam/api/sys/notice/save
add {title: "asd" content: "<p>adsadadasdasd</p>}"
update {content: "<p>adsadadasdasd</p>"
createTime: "2021-08-12 11:03:07"
id: "1425654047878119426"
state: 0
title: "asd1"
updateTime: "2021-08-12 11:03:07}"
*/
export async function noticeUpdate(options?: { [key: string]: any }) {
  return request<API.WarpUserPaging>('/exam/api/sys/user/paging', {
    method: 'POST',
    ...(options || {}),
  });
}
