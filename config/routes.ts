const exam = {
  path: 'examUser',
  name: '在线考试',
  icon: 'smile',
  access: 'user',
  routes: [
    {
      path: '/examUser/exam',
      name: '在线考试',
      component: 'examUser/index',
      icon: 'smile',
    },
    {
      path: '/examUser/score',
      name: '我的成绩',
      component: 'examUser/index',
      icon: 'smile',
    },
    {
      path: '/examUser/exam',
      name: '在线考试',
      component: 'examUser/index',
      icon: 'smile',
    },
  ],
};
const examManage = {
  path: '/examManage',
  name: '考试管理',
  icon: 'smile',
  access: 'admin',
  routes: [
    {
      path: '/examManage/exam',
      name: '考试管理',
      component: 'examManage/index',
      icon: 'smile',
    },
    {
      path: '/examManage/paper',
      name: '试卷管理',
      component: 'examManage/index',
      icon: 'smile',
    },
    {
      path: '/examManage/marking',
      name: '阅卷管理',
      component: 'examManage/index',
      icon: 'smile',
    },
  ],
};
const setting = {
  path: '/setting',
  name: '系统设置',
  icon: 'smile',
  access: 'admin',
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
export default {
  defaultRouter: [
    {
      path: '/login',
      name: '登录',
      component: 'login/Index',
      hideInMenu: true,
      headerRender: false,
      footerRender: false,
      menuRender: false,
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
        {
          path: '/chart',
          name: '图表',
          component: 'chart/Index',
          icon: 'Crown',
          access: 'admin',
        },
        {
          path: '/map',
          name: '地图',
          component: 'map/Index',
          icon: 'Tablet',
        },
      ],
    },
  ],
};
