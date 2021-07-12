import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PageHeader } from 'antd';
import { Breadcrumb } from 'antd';
import { useLocation } from 'umi';
import { useRouteMatch } from 'umi';
import { withRouter } from 'umi';
import { Link } from 'umi';
//ant-page-header
import defaultRouter from '../../config/routes';
const breadRoutes = {
  itemRender: (route, params, routes, paths) => {
    console.log(route, params, routes, paths);
    const secondRoute = routes.indexOf(route) === 1;
    return secondRoute ? (
      <Link to={route.path} style={{ color: 'rgba(0,0,0,0.65)' }}>
        {route.name}
      </Link>
    ) : (
      <span>{route.name}</span>
    );
  },
};

export default withRouter(({ history, location, match, children }) => {
  return (
    <>
      <div id="layout" className="p-4 animate-spin-slow h-full w-full absolute" key={location.pathname}>
        {children}
      </div>
    </>
  );
});
