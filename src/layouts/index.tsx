import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PageHeader } from 'antd';
import { Breadcrumb } from 'antd';
import { useLocation } from 'umi';
import { useRouteMatch } from 'umi';
import { withRouter } from 'umi';
import { Link } from 'umi';
import PhoneNav from '@/layouts/phoneNav';

//ant-page-header
import defaultRouter from '../../config/routes';
const breadRoutes = {
  itemRender: (route: any, params: any, routes: any, paths: any) => {
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
      <div className="animate-spin-slow p-4" key={location.pathname}>
        {children}
      </div>
      <PhoneNav></PhoneNav>
    </>
  );
});
