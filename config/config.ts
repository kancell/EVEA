import { defineConfig } from 'umi';
import routes from './routes';
import tailwindcss from '@tailwindcss/postcss7-compat';
import autoprefixer from 'autoprefixer';
import { useModel } from 'umi';

export default defineConfig({
  routes: routes.defaultRouter,
  antd: {},
  /* esbuild无法使用，应该与postcss及插件tailwind有关
  esbuild: {
    target: 'es5',
  },
  */
  dynamicImport: {},
  layout: {
    name: 'To Eva',
    locale: false,
    layout: 'side',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  extraPostCSSPlugins: [
    /* 配置tailwindcss，目前为postcss7.0兼容版本 */
    tailwindcss(),
    autoprefixer(),
  ],
});
