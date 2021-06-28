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
          exact: true,
          path: '/',
          name: '首页',
          component: 'Index',
          icon: 'smile',
        },
        {
          exact: true,
          path: '/chart',
          name: '图表',
          component: 'chart/Index',
          icon: 'Crown',
          access: 'canReadPageA',
        },
        {
          exact: true,
          path: '/map',
          name: '地图',
          component: 'map/Index',
          icon: 'Tablet',
        },
      ],
    },
  ],
};
