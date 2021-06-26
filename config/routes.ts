import {
  SmileOutlined,
  CrownOutlined,
  TabletOutlined,
  AntDesignOutlined,
} from '@ant-design/icons';

export default [
  { exact: true, path: '/', name: '首页', component: 'index', icon: 'smile' },
  {
    exact: true,
    path: '/chart',
    name: '图表',
    component: 'chart',
    icon: 'Crown',
    access: 'canReadPageA',
  },
  { exact: true, path: '/map', name: '地图', component: 'map', icon: 'Tablet' },
];
