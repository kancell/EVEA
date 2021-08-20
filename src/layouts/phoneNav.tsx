import { Switch, withRouter } from 'umi';
import { Link } from 'umi';
import { BookOutlined, EditOutlined, TrophyOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';
import type { BasicLayoutProps } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';

export default withRouter(({ history, location, match, children }) => {
  const { initialState } = useModel('@@initialState');
  const userData = initialState as unknown as {
    user: API.userData;
    layout: BasicLayoutProps;
  };
  const roles = userData?.user?.roles as string[];

  const path = location.pathname;
  const navBarShow = !path.includes('/exam/exam/paper') && roles.includes('student'); //考学院试试卷界面隐藏导航栏

  let pathToIndex = path === '/';
  let pathToExam = path.includes('/exam/exam');
  let pathTorecord = path.includes('/exam/record');

  return (
    <div>
      <ul
        className={`fixed bottom-0  mb-0 justify-around bg-gray-50 list-none flex-row w-full bottom-0 md:hidden text-gray-500 z-10 border
      ${navBarShow ? 'flex' : 'hidden'}`}
      >
        <li className="-mb-px mr-2 last:mr-0 text-center">
          <a
            onClick={() => history.push('/')}
            className={`text-xs font-bold px-5 rounded block leading-normal hover:text-white ${
              pathToIndex ? 'bg-red-400 text-white' : 'bg-gray-50'
            }`}
          >
            <div className="text-base">
              <BookOutlined />
            </div>
            首页
          </a>
        </li>
        <li className="-mb-px mr-2 last:mr-0  text-center">
          <a
            onClick={() => history.push('/exam/exam')}
            className={`text-xs font-bold px-5 rounded block leading-normal hover:text-white ${
              pathToExam ? 'bg-red-400 text-white' : 'bg-gray-50'
            }`}
          >
            <div className="text-base">
              <EditOutlined />
            </div>
            考试
          </a>
        </li>
        <li className="-mb-px text-center">
          <a
            onClick={() => history.push('/exam/record')}
            className={`text-xs font-bold px-5 rounded block leading-normal hover:text-white ${
              pathTorecord ? 'bg-red-400 text-white' : 'bg-gray-50'
            }`}
          >
            <div className="text-base">
              <TrophyOutlined />
            </div>
            成绩
          </a>
        </li>
      </ul>
    </div>
  );
});
