const exam = {
  path: '/',
  name: '首页',
  component: 'Index',
  icon: 'smile',
  routes: [{}],
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
