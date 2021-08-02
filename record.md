## 关于用户信息存储
- 初始化于app.tsx中的getInitialState，先检查localStorage中的evea_users_data，如果为null，则返回空对象
- login中登录成功会调用setInitialState修改InitialState的值，由于传入值变动，access.ts中函数重新执行，将登录返回信息写入evea_users_data，并重新设定权限
## 关于通过考试的判定

## 展开table更新列表后，列表顺序问题

## 添加新试卷，题库添加试题

## 上传试题和选项图片

## 路由颜色和面包屑

## 关于填空题正确答案的判断

## 本地访问图片的baseurl拦截

## select & option  radio inputd的返回值差异

## 时间控制设定
	检查时间强制交卷

## 动态返回路由参数
```javascript
//admin端
{
	"code":0,
	"data":[
		{
			"children":[
				{
					"children":[],
					"component":"dashboard",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":false,
					"id":"1367010529427607569",
					"menuType":1,
					"meta":{
						"title":"管理首页"
					},
					"metaIcon":"",
					"metaTitle":"管理首页",
					"name":"Dashboard",
					"parentId":"1367010529427607568",
					"path":"/admin/dashboard",
					"sort":1,
					"updateBy":"10001",
					"updateTime":"2021-06-02 18:18:23"
				}
			],
			"component":"Layout",
			"createBy":"",
			"createTime":"2021-03-07 11:08:18",
			"dataFlag":0,
			"hidden":false,
			"id":"1367010529427607568",
			"menuType":1,
			"meta":{
				"icon":"component",
				"title":"管理首页"
			},
			"metaIcon":"component",
			"metaTitle":"管理首页",
			"name":"Admin",
			"parentId":"0",
			"path":"/admin",
			"redirect":"/admin/dashboard",
			"sort":3,
			"updateBy":"10001",
			"updateTime":"2021-06-02 18:18:14"
		},
		{
			"children":[
				{
					"children":[],
					"component":"admin/exam/exam",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":false,
					"id":"1367010529427607585",
					"menuType":1,
					"meta":{
						"noCache":true,
						"title":"考试管理"
					},
					"metaIcon":"",
					"metaNoCache":true,
					"metaTitle":"考试管理",
					"name":"ListExam",
					"parentId":"1367010529427607578",
					"path":"/admin/exam/exam",
					"permissionTag":"exam:list",
					"sort":1,
					"updateBy":"10001",
					"updateTime":"2021-05-31 10:13:10"
				},
				{
					"children":[],
					"component":"admin/exam/exam/form",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":true,
					"id":"1367010529427607589",
					"menuType":2,
					"meta":{
						"activeMenu":"/admin/exam/exam",
						"noCache":true,
						"title":"添加考试"
					},
					"metaActiveMenu":"/admin/exam/exam",
					"metaNoCache":true,
					"metaTitle":"添加考试",
					"name":"AddExam",
					"parentId":"1367010529427607585",
					"path":"/admin/exam/exam/add/:tmplId",
					"permissionTag":"exam:add",
					"sort":12,
					"updateBy":"10001",
					"updateTime":"2021-05-31 10:06:01"
				},
				{
					"children":[],
					"component":"admin/exam/exam/form",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":true,
					"id":"1367010529427607590",
					"menuType":2,
					"meta":{
						"activeMenu":"/admin/exam/exam",
						"noCache":true,
						"title":"修改考试"
					},
					"metaActiveMenu":"/admin/exam/exam",
					"metaNoCache":true,
					"metaTitle":"修改考试",
					"name":"UpdateExam",
					"parentId":"1367010529427607585",
					"path":"/admin/exam/exam/update/:id",
					"permissionTag":"exam:update",
					"sort":13,
					"updateBy":"",
					"updateTime":"2021-03-07 11:08:18"
				},
				{
					"children":[],
					"component":"admin/user/exam",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":true,
					"id":"1367010529427607591",
					"menuType":2,
					"meta":{
						"activeMenu":"/admin/exam/exam",
						"noCache":true,
						"title":"考试记录"
					},
					"metaActiveMenu":"/admin/exam/exam",
					"metaNoCache":true,
					"metaTitle":"考试记录",
					"name":"ListExamUser",
					"parentId":"1367010529427607585",
					"path":"/admin/exam/exam/users/:examId",
					"permissionTag":"exam:list",
					"sort":14,
					"updateBy":"10001",
					"updateTime":"2021-05-31 10:06:31"
				},
				{
					"children":[],
					"component":"admin/exam/exam/stat",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":true,
					"id":"1367010529427607594",
					"menuType":2,
					"meta":{
						"activeMenu":"/admin/exam/exam",
						"noCache":true,
						"title":"考试统计"
					},
					"metaActiveMenu":"/admin/exam/exam",
					"metaIcon":"",
					"metaNoCache":true,
					"metaTitle":"考试统计",
					"name":"ExamStat",
					"parentId":"1367010529427607585",
					"path":"/admin/exam/exam/stat/:examId",
					"permissionTag":"exam:stat:stat",
					"sort":17,
					"updateBy":"10001",
					"updateTime":"2021-06-06 07:54:07"
				},
				{
					"children":[],
					"component":"admin/tmpl",
					"createBy":"",
					"createTime":"2021-04-23 11:38:23",
					"dataFlag":0,
					"id":"1385437872710021121",
					"menuType":1,
					"meta":{
						"title":"试卷管理"
					},
					"metaIcon":"",
					"metaTitle":"试卷管理",
					"name":"ExamTmpl",
					"parentId":"1367010529427607578",
					"path":"/admin/tmpl/list",
					"permissionTag":"tmpl:list",
					"sort":2,
					"updateBy":"10001",
					"updateTime":"2021-05-31 10:13:19"
				},
				{
					"children":[],
					"component":"admin/tmpl/form",
					"createBy":"",
					"createTime":"2021-04-23 11:42:40",
					"dataFlag":0,
					"hidden":true,
					"id":"1385438948909707265",
					"menuType":2,
					"meta":{
						"activeMenu":"/admin/tmpl/list",
						"title":"添加试卷"
					},
					"metaActiveMenu":"/admin/tmpl/list",
					"metaTitle":"添加试卷",
					"name":"ExamTmplAdd",
					"parentId":"1385437872710021121",
					"path":"/admin/tmpl/add/:title/:catId/:joinType/:timeType",
					"permissionTag":"tmpl:add",
					"sort":20,
					"updateBy":"",
					"updateTime":"2021-04-23 11:42:40"
				},
				{
					"children":[],
					"component":"admin/tmpl/form",
					"createBy":"",
					"createTime":"2021-04-23 11:44:37",
					"dataFlag":0,
					"hidden":true,
					"id":"1385439442117914625",
					"menuType":2,
					"meta":{
						"activeMenu":"/admin/tmpl/list",
						"title":"修改试卷"
					},
					"metaActiveMenu":"/admin/tmpl/list",
					"metaTitle":"修改试卷",
					"name":"ExamTmplUpdate",
					"parentId":"1385437872710021121",
					"path":"/admin/tmpl/upadte/:id",
					"permissionTag":"tmpl:update",
					"sort":21,
					"updateBy":"",
					"updateTime":"2021-04-23 11:44:37"
				},
				{
					"children":[],
					"component":"admin/tmpl/preview",
					"createBy":"",
					"createTime":"2021-04-29 10:27:11",
					"dataFlag":0,
					"hidden":true,
					"id":"1387594282415710209",
					"menuType":2,
					"meta":{
						"activeMenu":"/admin/tmpl/list",
						"title":"预览试卷"
					},
					"metaActiveMenu":"/admin/tmpl/list",
					"metaTitle":"预览试卷",
					"name":"ExamTmplPreview",
					"parentId":"1385437872710021121",
					"path":"/admin/tmpl/preview/:id",
					"permissionTag":"tmpl:preview",
					"sort":22,
					"updateBy":"",
					"updateTime":"2021-04-29 10:27:11"
				},
				{
					"children":[],
					"component":"admin/repo",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":false,
					"id":"1367010529427607579",
					"menuType":1,
					"meta":{
						"noCache":true,
						"title":"题库管理"
					},
					"metaIcon":"",
					"metaNoCache":true,
					"metaTitle":"题库管理",
					"name":"ListRepo",
					"parentId":"1367010529427607578",
					"path":"/admin/exam/repo",
					"permissionTag":"repo:list",
					"sort":3,
					"updateBy":"10001",
					"updateTime":"2021-05-31 10:13:26"
				},
				{
					"children":[],
					"component":"admin/repo/form",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":true,
					"id":"1367010529427607580",
					"menuType":2,
					"meta":{
						"activeMenu":"/admin/exam/repo",
						"noCache":true,
						"title":"添加题库"
					},
					"metaActiveMenu":"/admin/exam/repo",
					"metaNoCache":true,
					"metaTitle":"添加题库",
					"name":"AddRepo",
					"parentId":"1367010529427607579",
					"path":"/admin/exam/repo/add",
					"permissionTag":"repo:add",
					"sort":4,
					"updateBy":"",
					"updateTime":"2021-03-07 11:08:18"
				},
				{
					"children":[],
					"component":"admin/repo/form",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":true,
					"id":"1367010529427607581",
					"menuType":2,
					"meta":{
						"activeMenu":"/admin/exam/repo",
						"noCache":true,
						"title":"修改题库"
					},
					"metaActiveMenu":"/admin/exam/repo",
					"metaNoCache":true,
					"metaTitle":"修改题库",
					"name":"UpdateRepo",
					"parentId":"1367010529427607579",
					"path":"/admin/exam/repo/update/:id",
					"permissionTag":"repo:update",
					"sort":5,
					"updateBy":"",
					"updateTime":"2021-03-07 11:08:18"
				},
				{
					"children":[],
					"component":"admin/exam/review",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":false,
					"id":"1367010529427607586",
					"menuType":1,
					"meta":{
						"title":"阅卷管理"
					},
					"metaIcon":"",
					"metaTitle":"阅卷管理",
					"name":"ReviewList",
					"parentId":"1367010529427607578",
					"path":"/admin/exam/review",
					"permissionTag":"exam:review:list",
					"sort":9,
					"updateBy":"10001",
					"updateTime":"2021-06-06 15:09:23"
				},
				{
					"children":[],
					"component":"admin/paper/paper/review",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":true,
					"id":"1367010529427607587",
					"menuType":2,
					"meta":{
						"activeMenu":"/admin/exam/review",
						"noCache":true,
						"title":"试卷列表"
					},
					"metaActiveMenu":"/admin/exam/review",
					"metaNoCache":true,
					"metaTitle":"试卷列表",
					"name":"ReviewPaper",
					"parentId":"1367010529427607586",
					"path":"/admin/exam/review-list/:examId",
					"permissionTag":"exam:review:exam",
					"sort":10,
					"updateBy":"10001",
					"updateTime":"2021-06-06 16:06:09"
				},
				{
					"children":[],
					"component":"admin/paper/paper/detail",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":true,
					"id":"1367010529427607588",
					"menuType":2,
					"meta":{
						"activeMenu":"/admin/exam/review",
						"noCache":true,
						"title":"试卷详情"
					},
					"metaActiveMenu":"/admin/exam/review",
					"metaNoCache":true,
					"metaTitle":"试卷详情",
					"name":"ReviewPaperDetail",
					"parentId":"1367010529427607586",
					"path":"/admin/exam/review-detail/:paperId",
					"permissionTag":"exam:review:detail",
					"sort":11,
					"updateBy":"10001",
					"updateTime":"2021-06-06 16:06:19"
				},
				{
					"children":[],
					"component":"admin/qu",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":true,
					"id":"1367010529427607582",
					"menuType":2,
					"meta":{
						"activeMenu":"/admin/exam/repo",
						"noCache":true,
						"title":"试题管理"
					},
					"metaActiveMenu":"/admin/exam/repo",
					"metaNoCache":true,
					"metaTitle":"试题管理",
					"name":"ListQu",
					"parentId":"1367010529427607578",
					"path":"/admin/exam/qu/:repoId",
					"permissionTag":"qu:list",
					"sort":19,
					"updateBy":"10001",
					"updateTime":"2021-06-06 15:09:23"
				},
				{
					"children":[],
					"component":"admin/qu/form",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":true,
					"id":"1367010529427607583",
					"menuType":2,
					"meta":{
						"activeMenu":"/admin/exam/repo",
						"noCache":true,
						"title":"添加试题"
					},
					"metaActiveMenu":"/admin/exam/repo",
					"metaNoCache":true,
					"metaTitle":"添加试题",
					"name":"AddQu",
					"parentId":"1367010529427607582",
					"path":"/admin/exam/qu/add/:repoId",
					"permissionTag":"qu:add",
					"sort":7,
					"updateBy":"",
					"updateTime":"2021-03-07 11:08:18"
				},
				{
					"children":[],
					"component":"admin/qu/form",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":true,
					"id":"1367010529427607584",
					"menuType":2,
					"meta":{
						"activeMenu":"/admin/exam/repo",
						"noCache":true,
						"title":"修改试题"
					},
					"metaActiveMenu":"/admin/exam/repo",
					"metaNoCache":true,
					"metaTitle":"修改试题",
					"name":"UpdateQu",
					"parentId":"1367010529427607582",
					"path":"/admin/exam/qu/update/:id",
					"permissionTag":"qu:update",
					"sort":8,
					"updateBy":"",
					"updateTime":"2021-03-07 11:08:18"
				}
			],
			"component":"Layout",
			"createBy":"",
			"createTime":"2021-03-07 11:08:18",
			"dataFlag":0,
			"hidden":false,
			"id":"1367010529427607578",
			"menuType":1,
			"meta":{
				"icon":"example",
				"title":"考试管理"
			},
			"metaIcon":"example",
			"metaTitle":"考试管理",
			"name":"Exam",
			"parentId":"0",
			"path":"/admin/exam",
			"redirect":"/admin/exam/exam",
			"sort":5,
			"updateBy":"10001",
			"updateTime":"2021-05-31 12:54:57"
		},
		{
			"children":[
				{
					"children":[],
					"component":"admin/stat/total/user",
					"createBy":"10001",
					"createTime":"2021-06-04 16:03:22",
					"dataFlag":0,
					"id":"1400724845066543106",
					"menuType":1,
					"meta":{
						"title":"用户统计"
					},
					"metaTitle":"用户统计",
					"name":"TotalUser",
					"parentId":"1400724329074876418",
					"path":"/admin/stat/total/user",
					"permissionTag":"stat:total:user",
					"sort":1,
					"updateBy":"",
					"updateTime":"2021-06-04 16:03:21"
				},
				{
					"children":[],
					"component":"admin/stat/total/exam",
					"createBy":"10001",
					"createTime":"2021-06-04 16:03:59",
					"dataFlag":0,
					"id":"1400724998473211905",
					"menuType":1,
					"meta":{
						"title":"考试统计"
					},
					"metaTitle":"考试统计",
					"name":"TotalLearn",
					"parentId":"1400724329074876418",
					"path":"/admin/stat/total/exam",
					"permissionTag":"stat:total:exam",
					"sort":2,
					"updateBy":"",
					"updateTime":"2021-06-04 16:03:58"
				}
			],
			"component":"Layout",
			"createBy":"10001",
			"createTime":"2021-06-04 16:01:19",
			"dataFlag":0,
			"id":"1400724329074876418",
			"menuType":1,
			"meta":{
				"icon":"chart",
				"title":"数据统计"
			},
			"metaIcon":"chart",
			"metaTitle":"数据统计",
			"name":"Stat",
			"parentId":"0",
			"path":"/admin/stat",
			"sort":6,
			"updateBy":"10001",
			"updateTime":"2021-06-04 18:49:53"
		},
		{
			"children":[
				{
					"children":[],
					"component":"admin/sys/config",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":false,
					"id":"1367010529435996175",
					"menuType":1,
					"meta":{
						"title":"系统配置"
					},
					"metaIcon":"",
					"metaTitle":"系统配置",
					"name":"SysConfig",
					"parentId":"1367010529435996174",
					"path":"/admin/sys/config",
					"permissionTag":"sys:config",
					"sort":1,
					"updateBy":"10001",
					"updateTime":"2021-05-31 10:14:20"
				},
				{
					"children":[],
					"component":"admin/sys/menu",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":false,
					"id":"1367010529435996176",
					"menuType":1,
					"meta":{
						"title":"菜单管理"
					},
					"metaIcon":"",
					"metaTitle":"菜单管理",
					"name":"SysMenu",
					"parentId":"1367010529435996174",
					"path":"/admin/sys/menu",
					"permissionTag":"sys:menu",
					"sort":2,
					"updateBy":"10001",
					"updateTime":"2021-05-31 10:14:26"
				},
				{
					"children":[],
					"component":"admin/sys/role",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":false,
					"id":"1367010529435996178",
					"menuType":1,
					"meta":{
						"title":"角色管理"
					},
					"metaIcon":"",
					"metaTitle":"角色管理",
					"name":"SysRole",
					"parentId":"1367010529435996174",
					"path":"/admin/sys/role",
					"permissionTag":"sys:role",
					"sort":3,
					"updateBy":"10001",
					"updateTime":"2021-05-31 10:14:31"
				},
				{
					"children":[],
					"component":"admin/sys/depart",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":false,
					"id":"1367010529435996177",
					"menuType":1,
					"meta":{
						"title":"部门管理"
					},
					"metaIcon":"",
					"metaTitle":"部门管理",
					"name":"SysDepart",
					"parentId":"1367010529435996174",
					"path":"/admin/sys/depart",
					"permissionTag":"sys:depart",
					"redirect":"",
					"sort":4,
					"updateBy":"10001",
					"updateTime":"2021-05-31 10:14:36"
				},
				{
					"children":[],
					"component":"admin/sys/user",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":false,
					"id":"1367010529435996179",
					"menuType":1,
					"meta":{
						"title":"用户管理"
					},
					"metaIcon":"",
					"metaTitle":"用户管理",
					"name":"SysUser",
					"parentId":"1367010529435996174",
					"path":"/admin/sys/user",
					"permissionTag":"sys:user",
					"sort":5,
					"updateBy":"10001",
					"updateTime":"2021-05-31 10:14:41"
				},
				{
					"children":[],
					"component":"admin/user/points",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":true,
					"id":"1367010529435996180",
					"menuType":2,
					"meta":{
						"activeMenu":"/admin/sys/user",
						"noCache":true,
						"title":"积分明细"
					},
					"metaActiveMenu":"/admin/sys/user",
					"metaNoCache":true,
					"metaTitle":"积分明细",
					"name":"UserPoints",
					"parentId":"1367010529435996179",
					"path":"/admin/sys/user/points/:id",
					"permissionTag":"sys:user:points",
					"sort":6,
					"updateBy":"",
					"updateTime":"2021-03-07 11:08:18"
				},
				{
					"children":[],
					"component":"admin/sys/notice",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":false,
					"id":"1367010529435996182",
					"menuType":1,
					"meta":{
						"title":"公告管理"
					},
					"metaIcon":"",
					"metaTitle":"公告管理",
					"name":"SysNotice",
					"parentId":"1367010529435996174",
					"path":"/admin/sys/notice",
					"permissionTag":"sys:notice",
					"sort":8,
					"updateBy":"10001",
					"updateTime":"2021-05-31 10:14:48"
				},
				{
					"children":[],
					"component":"admin/sys/dict/catalog",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":false,
					"id":"1367010529435996183",
					"menuType":1,
					"meta":{
						"title":"分类字典"
					},
					"metaIcon":"",
					"metaTitle":"分类字典",
					"name":"DictCatalog",
					"parentId":"1367010529435996174",
					"path":"/admin/sys/dict-catalog",
					"permissionTag":"sys:dict:catalog",
					"sort":9,
					"updateBy":"10001",
					"updateTime":"2021-05-31 10:14:52"
				},
				{
					"children":[],
					"component":"admin/sys/dict/dic",
					"createBy":"",
					"createTime":"2021-03-07 11:08:18",
					"dataFlag":0,
					"hidden":false,
					"id":"1367010529435996184",
					"menuType":1,
					"meta":{
						"title":"数据字典"
					},
					"metaIcon":"",
					"metaTitle":"数据字典",
					"name":"DictData",
					"parentId":"1367010529435996174",
					"path":"/admin/sys/dict-data",
					"permissionTag":"sys:dict:value",
					"sort":10,
					"updateBy":"10001",
					"updateTime":"2021-05-31 10:14:57"
				}
			],
			"component":"Layout",
			"createBy":"",
			"createTime":"2021-03-07 11:08:18",
			"dataFlag":0,
			"hidden":false,
			"id":"1367010529435996174",
			"menuType":1,
			"meta":{
				"icon":"configure",
				"title":"系统设置"
			},
			"metaIcon":"configure",
			"metaTitle":"系统设置",
			"name":"Sys",
			"parentId":"0",
			"path":"/admin/sys",
			"redirect":"/admin/sys/config",
			"sort":9,
			"updateBy":"10001",
			"updateTime":"2021-06-04 18:49:31"
		}
	],
	"msg":"操作成功！",
	"success":true
}

```