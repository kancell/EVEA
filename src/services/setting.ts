/* 获取用户列表/exam/api/sys/user/paging */
import { request } from 'umi';
/* 用户统计 */
export async function userList(options?: { [key: string]: any }) {
  return request<API.wrapUserPaging>('/exam/api/sys/user/paging', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 用户详情/exam/api/sys/user/detail */
export async function userDetail(options?: { [key: string]: any }) {
  return request<API.WrapUser>('/exam/api/sys/user/detail', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 更新用户/exam/api/sys/user/save */
export async function userSave(options?: { [key: string]: any }) {
  return request<API.httpRespone>('/exam/api/sys/user/save', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 删除用户 /exam/api/sys/user/delete*/
export async function userDelete(options?: { [key: string]: any }) {
  return request<API.httpRespone>('/exam/api/sys/user/delete', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 获取权限列表 /exam/api/sys/role/list*/
export async function roleList(options?: { [key: string]: any }) {
  return request<API.wrapRole>('/exam/api/sys/role/list', {
    method: 'POST',
    ...(options || {}),
  });
}
/* 部门tree表/exam/api/sys/depart/tree */
export async function departTree(options?: { [key: string]: any }) {
  return request<API.WrapDepart>('/exam/api/sys/depart/tree', {
    method: 'POST',
    ...(options || {}),
  });
}

/* 获取公告 /exam/api/sys/notice/paging*/
export async function noticeList(options?: { [key: string]: any }) {
  return request<API.wrapUserPaging>('/exam/api/sys/user/paging', {
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
  return request<API.wrapUserPaging>('/exam/api/sys/user/paging', {
    method: 'POST',
    ...(options || {}),
  });
}
