import { defineConfig } from 'umi';
import routes from './routes';
import tailwindcss from '@tailwindcss/postcss7-compat';
import { BasicLayoutProps } from '@ant-design/pro-layout';

export default defineConfig({
  routes: routes.defaultRouter,
  antd: {},
  theme: {
    '@primary-color': '#1DA57A',
  },
  /* esbuild无法使用，应该与postcss及插件tailwind有关
  esbuild: {
    target: 'es5',
  },
  */
  dynamicImport: {},
  layout: {},
  request: {
    dataField: 'data',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  extraPostCSSPlugins: [
    /* 配置tailwindcss，目前为postcss7.0兼容版本 */
    tailwindcss(),
  ],
});
