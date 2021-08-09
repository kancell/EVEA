import React, { useState, useEffect } from 'react';
import { currentExam, processExam } from '@/services/exam';
import ExamStartCheck from '@/components/exam/verify/EaxmStartCheck';
import Pagination from '@/components/pagination/Pagination';
import moment from 'moment';
import { history } from 'umi';
import Loading from '@/components/loading/Loading';

export default function ExamList() {
  const [examList, setExamList] = useState<API.ExamPaging>();
  const [examSelect, setExamSelect] = useState<API.Exam>();
  const [nowProcessExam, setNowProcessExam] = useState<API.ProcessExam>();
  const [checkShow, setCheckShow] = useState(false);

  const [page, setPage] = useState({
    current: 1,
    pages: 1,
    size: 7,
    total: 1,
  });

  const queryCurrentExam = async (current = page.current, size = page.size) => {
    try {
      const currentExamResult = await currentExam({
        data: {
          current: current,
          size: size,
          params: {},
          t: moment().unix(),
        },
      });
      setExamList(currentExamResult.data);
      setPage({
        current: currentExamResult.data.current,
        pages: currentExamResult.data.pages,
        size: currentExamResult.data.size,
        total: currentExamResult.data.total,
      });

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
    <>
      {examSelect && <ExamStartCheck exam={examSelect} show={checkShow} setShow={setCheckShow}></ExamStartCheck>}
      {nowProcessExam && (
        <div className="w-full container mx-auto sm:px-6 lg:px-8">
          <div className="flex w-full max-w-lg overflow-hidden bg-white rounded-lg shadow-md ">
            <div className="flex items-center justify-center w-12 bg-yellow-400">
              <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
              </svg>
            </div>
            <div
              className="px-4 py-2 -mx-3 cursor-pointer"
              onClick={() => {
                history.push({
                  pathname: '/exam/examPaper',
                  query: {
                    id: nowProcessExam.id,
                  },
                });
              }}
            >
              <div className="mx-3">
                <span className="text-base font-semibold text-yellow-400 dark:text-yellow-300">
                  您的考试“{nowProcessExam.title}”还没有交卷，点击返回考试
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {!examList && <Loading />}
      {examList && (
        <div className="w-full container mx-auto hidden lg:block">
          <div className="my-2 overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left base font-medium text-gray-500 uppercase tracking-wider">
                        考试名称
                      </th>
                      <th scope="col" className="px-6 py-3 text-left base font-medium text-gray-500 uppercase tracking-wider">
                        分数信息
                      </th>
                      <th scope="col" className="px-6 py-3 text-left base font-medium text-gray-500 uppercase tracking-wider">
                        起止时间
                      </th>
                      <th scope="col" className="px-6 py-3 text-left base font-medium text-gray-500 uppercase tracking-wider">
                        当前状态
                      </th>
                      <th scope="col" className="px-6 py-3 text-left base font-medium text-gray-500 uppercase tracking-wider">
                        考试时长
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 w-1/4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                      >
                        考试说明
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                      >
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {examList.records.map((exam, index) => (
                      <tr key={exam.id} className=" border-gray-200 border-solid border">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="font-bold text-base text-blue-400 ">{exam.title}</div>
                              <div className="text-sm text-gray-500">
                                {exam.examType_dictText}（{exam.hasSaq ? '人工阅卷' : '自动阅卷'}）
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">满分：{exam.totalScore}</div>
                          <div className="text-sm text-gray-500">及格分：{exam.qualifyScore}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {exam.timeLimit ? (
                            <>
                              <div className="text-sm text-gray-900">开始时间：{exam.startTime}</div>
                              <div className="text-sm text-gray-500">结束时间：{exam.endTime}</div>
                            </>
                          ) : (
                            <div className="text-sm text-gray-900">无时间限制</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {exam.state === 0 ? (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              可开始
                            </span>
                          ) : (
                            ''
                          )}
                          {exam.state === 1 ? (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              已禁用
                            </span>
                          ) : (
                            ''
                          )}
                          {exam.state === 2 ? (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              未开始
                            </span>
                          ) : (
                            ''
                          )}
                          {exam.state === 3 ? (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              已结束
                            </span>
                          ) : (
                            ''
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.totalTime}分钟</td>
                        <td className="px-6 py-4 whitespace-nowrap w-1/4 text-sm text-gray-500 xl:whitespace-normal">
                          {exam.content}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <p
                            className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            onClick={() => {
                              setExamSelect(exam);
                              setCheckShow(true);
                            }}
                          >
                            前往考试
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination page={page} setPage={queryCurrentExam}></Pagination>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container px-5 py-8 md:py-24 mx-auto block lg:hidden">
        <div className="flex flex-wrap -m-4">
          {examList && (
            <>
              {examList.records.map((exam, index) => (
                <div className="p-4 w-full md:w-1/3" key={exam.id}>
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
                      <h2 className="text-gray-900 text-lg title-font font-medium">{exam.title}</h2>
                    </div>
                    <div className="py-2 whitespace-nowrap">
                      {exam.state === 0 ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          可开始
                        </span>
                      ) : (
                        ''
                      )}
                      {exam.state === 1 ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          已禁用
                        </span>
                      ) : (
                        ''
                      )}
                      {exam.state === 2 ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          未开始
                        </span>
                      ) : (
                        ''
                      )}
                      {exam.state === 3 ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          已结束
                        </span>
                      ) : (
                        ''
                      )}
                      <span className="text-sm text-gray-900 mx-2">满分：{exam.totalScore}</span>
                    </div>
                    <div className="flex-grow cursor-pointer">
                      <p className="leading-relaxed text-base">{exam.content}</p>
                      <a className="mt-2 text-indigo-500 inline-flex items-center">
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
                        <span
                          onClick={() => {
                            setExamSelect(exam);
                            setCheckShow(true);
                          }}
                          className="mx-2"
                        >
                          点击前往考试
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
