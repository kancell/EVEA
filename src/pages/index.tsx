import { processExam } from '@/services/exam';
import React, { ReactChild, useEffect, useState } from 'react';
import { history, useModel } from 'umi';

export default function IndexPage(): ReactChild {
  const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState');
  const userData = initialState as { user: API.userData };
  const [nowProcessExam, setNowProcessExam] = useState<API.ProcessExam>();
  const queryCurrentExam = async () => {
    try {
      const processExamResult = await processExam();
      processExamResult.data !== undefined ? setNowProcessExam(processExamResult.data) : setNowProcessExam(undefined);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    queryCurrentExam();
  }, []);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-24 mx-auto">
        <div className="flex flex-col text-left w-full mb-8 md:mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">欢迎来到EVEA考试系统</h1>
          <h2 className="text-sm text-indigo-500 tracking-widest font-medium title-font mb-1">
            你好，{userData.user.realName}
          </h2>
        </div>
        <div className="flex flex-wrap -m-4">
          <div className="p-4 w-full md:w-1/3">
            <div className="flex rounded-lg h-full bg-gray-50 p-8 flex-col">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className="text-gray-900 text-lg title-font font-medium">进行中的考试</h2>
              </div>
              <div
                onClick={() => {
                  nowProcessExam &&
                    history.push({
                      pathname: '/exam/examPaper',
                      query: {
                        id: nowProcessExam.id,
                      },
                    });
                }}
                className="flex-grow cursor-pointer"
              >
                <p className="leading-relaxed text-base">
                  {nowProcessExam ? `您的考试 “${nowProcessExam.title}” 还没有交卷，点击返回考试` : '暂无'}
                </p>
                <a className="mt-3 text-indigo-500 inline-flex items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="p-4 w-full md:w-1/3">
            <div className="flex rounded-lg h-full bg-gray-50 p-8 flex-col">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className="text-gray-900 text-lg title-font font-medium">查看全部考试</h2>
              </div>
              <div
                onClick={() => {
                  history.push({
                    pathname: '/exam/examList',
                  });
                }}
                className="flex-grow cursor-pointer"
              >
                <p className="leading-relaxed text-base"></p>
                <a className="mt-3 text-indigo-500 inline-flex items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="p-4 w-full md:w-1/3">
            <div className="flex rounded-lg h-full bg-gray-50 p-8 flex-col">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className="text-gray-900 text-lg title-font font-medium">查看我的成绩</h2>
              </div>
              <div
                onClick={() => {
                  history.push({
                    pathname: '/exam/examRecordList',
                  });
                }}
                className="flex-grow cursor-pointer"
              >
                <p className="leading-relaxed text-base"></p>
                <a className="mt-3 text-indigo-500 inline-flex items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
