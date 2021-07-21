const exam = {
  path: 'exam',
  name: '在线考试',
  icon: 'smile',
  access: 'user',
  flatMenu: true,
  routes: [
    {
      path: '/exam/examList',
      name: '考试列表',
      component: 'exam/examList',
      icon: 'smile',
    },
    {
      path: '/exam/examPaper',
      name: '在线考试',
      component: 'exam/examPaper',
      hideInMenu: true,
      icon: 'smile',
    },
    {
      path: '/exam/examRecordList',
      name: '成绩记录',
      component: 'exam/examRecordList',
      icon: 'smile',
    },
    {
      path: '/exam/examRecordPaper',
      name: '在线考试',
      component: 'exam/examRecordPaper',
      hideInMenu: true,
      icon: 'smile',
    },
    {
      path: '/exam/examResult',
      name: '我的成绩',
      component: 'exam/examResult',
      hideInMenu: true,
      icon: 'smile',
    },
    /*     {
      path: '/exam/practice',
      name: '题库训练',
      component: 'exam/practice',
      icon: 'smile',
    }, */
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
      component: 'examManage/exam',
      icon: 'smile',
    },
    {
      path: '/examManage/paper',
      name: '试卷管理',
      component: 'examManage/paper',
      icon: 'smile',
    },
    {
      path: '/examManage/repo',
      name: '题库管理',
      component: 'examManage/repo',
      icon: 'smile',
    },
    {
      path: '/examManage/review',
      name: '阅卷管理',
      component: 'examManage/review',
      icon: 'smile',
    },
  ],
};
const setting = {
  path: '/setting',
  name: '系统设置',
  icon: 'smile',
  access: 'admin',
  hideInBreadcrumb: true,
  routes: [
    {
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
    },
    {
      path: '/setting/user',
      name: '用户管理',
      component: 'setting/index',
      icon: 'smile',
    },
    {
      path: '/setting/notice',
      name: '公告设定',
      component: 'setting/index',
      icon: 'smile',
    },
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
      component: 'statistics/index',
      icon: 'smile',
    },
    {
      path: '/statistics/exam',
      name: '考试统计',
      component: 'statistics/index',
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
      component: 'login/Index',
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
