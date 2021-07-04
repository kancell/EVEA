import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PageHeader } from 'antd';
import { Breadcrumb } from 'antd';
import { useLocation } from 'umi';
import { useRouteMatch } from 'umi';

export default (props) => {
  const location = useLocation();
  console.log(location.pathname.split('/').length);
  return (
    <div>
      <PageHeaderWrapper title={false}></PageHeaderWrapper>
      <div className="p-2">{props.children}</div>
    </div>
  );
};
