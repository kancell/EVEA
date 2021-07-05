declare module 'umi';
declare module 'uuid';

declare module '@tailwindcss/postcss7-compat';
declare module 'autoprefixer';
declare module '@antv/l7';
declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
