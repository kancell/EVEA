import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PageHeader } from 'antd';
import { Breadcrumb } from 'antd';
import { useLocation } from 'umi';
import { useRouteMatch } from 'umi';
import { withRouter } from 'umi';
import { Link } from 'umi';
import PhoneNav from '@/layouts/phoneNav';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
//ant-page-header
import defaultRouter from '../../config/routes';
import React from 'react';
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

const ANIMATION_MAP: any = {
  PUSH: 'forward',
  POP: 'back',
};

export default withRouter(({ location, children, history }: any) => {
  return (
    <TransitionGroup
      childFactory={(child: React.FunctionComponentElement<{ classNames: any }>) =>
        React.cloneElement(child, { classNames: ANIMATION_MAP[history.action] })
      }
    >
      <CSSTransition key={location.pathname} timeout={300}>
        <>{children}</>
      </CSSTransition>
      <PhoneNav></PhoneNav>
    </TransitionGroup>
  );
});
