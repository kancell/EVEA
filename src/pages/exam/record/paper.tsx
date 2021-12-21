import React, { useState, useEffect } from 'react';
import { ExamRecordPaging } from '@/services/exam';
import moment from 'moment';
import { useLocation } from 'umi';
import { history } from 'umi';
import Pagination from '@/components/pagination/pagination';
import Loading from '@/components/loading/Loading';

export default function examRecordPaper() {
  const location = useLocation();
  const queryLocationData = location as unknown as queryLocation;

  const [page, setPage] = useState({
    current: 1,
    pages: 1,
    size: 7,
    total: 1,
  });

  const [recordList, setRecordList] = useState<API.ExamRecordPaging>();
  const requestExamRecord = async (current = page.current, size = page.size) => {
    if (queryLocationData.query === undefined || queryLocationData.query.id === undefined) {
      console.log('异常，跳转至首页');
      return;
    }

    try {
      const currentRecord = await ExamRecordPaging({
        data: {
          current: current,
          size: size,
          params: {
            examId: queryLocationData.query.id,
          },
          t: moment().unix(),
        },
      });
      setRecordList(currentRecord.data);
      setPage({
        current: currentRecord.data.current,
        pages: currentRecord.data.pages,
        size: currentRecord.data.size,
        total: currentRecord.data.total,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    requestExamRecord();
  }, []);

  const gotoExmaResult = (id: string) => {
    history.push({
      pathname: '/exam/record/result',
      query: { id: id },
    });
  };

  return (
    <>
      {!recordList && <Loading />}
      {recordList && (
        <div className="w-full container mx-auto hidden lg:block">
          <div className="my-2 overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left base font-medium text-gray-500 uppercase tracking-wider">
                        考试信息
                      </th>
                      <th scope="col" className="px-6 py-3 text-left base font-medium text-gray-500 uppercase tracking-wider">
                        得分
                      </th>
                      <th scope="col" className="px-6 py-3 text-left base font-medium text-gray-500 uppercase tracking-wider">
                        考试时间
                      </th>
                      <th scope="col" className="px-6 py-3 text-left base font-medium text-gray-500 uppercase tracking-wider">
                        通过情况
                      </th>
                      <th scope="col" className="px-6 py-3 text-left base font-medium text-gray-500 uppercase tracking-wider">
                        试卷状态
                      </th>
                      <th scope="col" className="px-6 py-3 text-left base font-medium text-gray-500 uppercase tracking-wider">
                        考试时长
                      </th>
                      <th scope="col" className="px-6 py-3 text-left base font-medium text-gray-500 uppercase tracking-wider">
                        考试监控
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
                    {recordList.records.map((exam, index) => (
                      <tr key={exam.id} className=" border-gray-200 border-solid border">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="font-bold text-base text-blue-400 ">{exam.createTime}</div>
                              <div className="text-sm text-gray-500">{exam.hasSaq ? '人工阅卷' : '自动阅卷'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">我的分数：{exam.userScore}</div>
                          <div className="text-sm text-gray-500">
                            满分：{exam.totalScore}（{exam.qualifyScore}分及格）
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">开始时间：{exam.createTime}</div>
                          <div className="text-sm text-gray-500">交卷时间：{exam.updateTime}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {exam.passed ? (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              通过
                            </span>
                          ) : (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-gray-800">
                              未通过
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {exam.state === 0 ? (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              考试中
                            </span>
                          ) : (
                            ''
                          )}
                          {exam.state === 1 ? (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              简答题待阅卷
                            </span>
                          ) : (
                            ''
                          )}
                          {exam.state === 2 ? (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              考试完成
                            </span>
                          ) : (
                            ''
                          )}
                          {exam.state === 3 ? (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              已弃考
                            </span>
                          ) : (
                            ''
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.totalTime}分钟</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="text-sm text-gray-500">离开考试界面次数：{exam.leaveActual}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                          <span
                            className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            onClick={() => gotoExmaResult(exam.id)}
                          >
                            查看详情
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination page={page} setPage={requestExamRecord}></Pagination>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container px-5 py-4 md:py-24 mx-auto block lg:hidden">
        <div className="text-gray-500 text-lg font-bold mb-2 ml-1">交卷记录</div>
        <div className="flex flex-wrap -m-4">
          {recordList && (
            <>
              {recordList.records.map((exam, index) => (
                <div className="p-4 w-full md:w-1/3" key={exam.id}>
                  <div className="flex rounded-lg h-full bg-gray-50 px-8 py-4 flex-col">
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
                      <h2 className="text-gray-900 text-lg title-font font-medium">{exam.createTime}</h2>
                    </div>
                    <div className="py-2 whitespace-nowrap">
                      {exam.state === 0 ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          考试中
                        </span>
                      ) : (
                        ''
                      )}
                      {exam.state === 1 ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          简答题待阅卷
                        </span>
                      ) : (
                        ''
                      )}
                      {exam.state === 2 ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          考试完成
                        </span>
                      ) : (
                        ''
                      )}
                      {exam.state === 3 ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          已弃考
                        </span>
                      ) : (
                        ''
                      )}
                      {exam.passed ? (
                        <span className="px-3 mx-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          通过
                        </span>
                      ) : (
                        <span className="px-3 mx-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-gray-800">
                          未通过
                        </span>
                      )}
                    </div>
                    <div className="flex-grow cursor-pointer">
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
                        <span onClick={() => gotoExmaResult(exam.id)} className="mx-2">
                          查看记录
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
              <Pagination page={page} setPage={requestExamRecord}></Pagination>
            </>
          )}
        </div>
      </div>
    </>
  );
}
