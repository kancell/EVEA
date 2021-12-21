const exam = {
  path: 'exam',
  name: '在线考试',
  icon: 'smile',
  access: 'user',
  flatMenu: true,
  routes: [
    {
      path: '/exam/exam',
      name: '考试列表',
      component: 'exam/exam/exam',
      icon: 'smile',
    },
    {
      path: '/exam/exam/paper',
      name: '在线考试',
      component: 'exam/exam/paper',
      hideInMenu: true,
      icon: 'smile',
    },
    {
      path: '/exam/practice',
      name: '题库训练',
      component: 'exam/practice/practice',
      icon: 'smile',
    },
    {
      path: '/exam/record',
      name: '成绩记录',
      component: 'exam/record/record',
      icon: 'smile',
    },
    {
      path: '/exam/record/paper',
      name: '记录',
      component: 'exam/record/paper',
      hideInMenu: true,
      icon: 'smile',
    },

    {
      path: '/exam/record/result',
      name: '我的成绩',
      component: 'exam/record/result',
      hideInMenu: true,
      icon: 'smile',
    },
  ],
};
const examManage = {
  path: '/examManage',
  name: '考试管理',
  icon: 'smile',
  access: 'admin',
  hideInBreadcrumb: true,
  routes: [
    {
      path: '/examManage/exam',
      name: '考试管理',
      component: 'examManage/exam/exam',
      icon: 'smile',
    },
    {
      path: '/examManage/exam/update',
      name: '考试修改',
      component: 'examManage/exam/update',
      icon: 'smile',
      hideInMenu: true,
    },

    {
      path: '/examManage/paper',
      name: '试卷管理',
      component: 'examManage/paper/paper',
      icon: 'smile',
    },
    {
      path: '/examManage/paper/add',
      name: '试卷添加',
      component: 'examManage/paper/add',
      hideInMenu: true,
    },
    {
      path: '/examManage/paper/preview',
      name: '试卷预览',
      component: 'examManage/paper/preview',
      icon: 'smile',
      hideInMenu: true,
    },
    {
      path: '/examManage/paper/update',
      name: '试卷修改',
      component: 'examManage/paper/update',
      icon: 'smile',
      hideInMenu: true,
    },

    {
      path: '/examManage/repo',
      name: '题库管理',
      component: 'examManage/repo/repo',
      icon: 'smile',
    },
    /*     {
      path: '/examManage/repo/questionAdd',
      name: '新增试题',
      component: 'examManage/repo/questionAdd',
      icon: 'smile',
      hideInMenu: true,
    }, */
    {
      path: '/examManage/repo/questionList',
      name: '试题管理',
      component: 'examManage/repo/questionList',
      icon: 'smile',
      hideInMenu: true,
    },
    /*     {
      path: '/examManage/review',
      name: '阅卷管理',
      component: 'examManage/review/review',
      icon: 'smile',
    }, */
  ],
};
const setting = {
  path: '/setting',
  name: '系统设置',
  icon: 'smile',
  access: 'admin',
  hideInBreadcrumb: true,
  routes: [
    /*     {
      path: '/setting/system',
      name: '系统设置',
      component: 'setting/index',
      icon: 'smile',
    },
    {
      path: '/setting/menu',
      name: '菜单配置',
      component: 'setting/index',
      icon: 'smile',
    },
    {
      path: '/setting/role',
      name: '权限管理',
      component: 'setting/index',
      icon: 'smile',
    },
    {
      path: '/setting/department',
      name: '部门管理',
      component: 'setting/index',
      icon: 'smile',
    }, */
    {
      path: '/setting/user',
      name: '用户管理',
      component: 'setting/user',
      icon: 'smile',
    },
    /*     {
      path: '/setting/notice',
      name: '公告设定',
      component: 'setting/index',
      icon: 'smile',
    }, */
  ],
};
const statistics = {
  path: '/statistics',
  name: '数据统计',
  icon: 'smile',
  access: 'admin',
  hideInBreadcrumb: true,
  routes: [
    {
      path: '/statistics/user',
      name: '用户统计',
      component: 'statistics/user',
      icon: 'smile',
    },
    {
      path: '/statistics/exam',
      name: '考试统计',
      component: 'statistics/exam',
      icon: 'smile',
    },
  ],
};
const userCenter = {
  path: 'user/userCenter',
  name: '个人中心',
  component: 'user/userCenter',
  hideInMenu: true,
};
export default {
  defaultRouter: [
    {
      path: 'user/login',
      name: '登录',
      component: 'login/index',
      hideInMenu: true,
      headerRender: false,
      footerRender: false,
      menuRender: false,
      hideInBreadcrumb: true,
    },
    {
      path: '/',
      component: '@/layouts/index',
      flatMenu: true,
      routes: [
        {
          path: '/',
          name: '首页',
          component: 'Index',
          icon: 'smile',
        },
        exam,
        examManage,
        statistics,
        setting,
        userCenter,
        /*         {
          path: '/map',
          name: '我的练习',
          component: 'map/Index',
          icon: 'Tablet',
        }, */
      ],
    },
  ],
};
