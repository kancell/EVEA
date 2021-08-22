import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PageHeader } from 'antd';
import { Breadcrumb } from 'antd';
import { useLocation } from 'umi';
import { useRouteMatch } from 'umi';
import { withRouter, Switch } from 'umi';
import { Link } from 'umi';
import PhoneNav from '@/layouts/phoneNav';
import { useSpring, animated, useTransition } from 'react-spring';

//ant-page-header
/* import defaultRouter from '../../config/routes';
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
}; */

export default withRouter(({ locations, children, history }: any) => {
  const location = useLocation();
  const transitions = useTransition(location, {
    trail: 250,
    enter: (item) => [{ life: '100%', translateX: '0px', opacity: '1', display: 'block' }],
    leave: (item) => async (next, cancel) => {
      await next({ display: 'none', life: '100%' });
    },
    from: { life: '0%', translateX: '-100vw', opacity: '0.4', display: 'none' },
  });

  return transitions((props, item) => (
    <>
      <animated.div style={props}>
        <div className="p-4">{children}</div>
      </animated.div>
      <PhoneNav></PhoneNav>
    </>
  ));
});
