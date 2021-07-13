import React, { useState, useEffect } from 'react';
import { examPaper } from '@/services/exam';
import moment from 'moment';
import { useLocation } from 'umi';

export default function examRecordPaper() {
  const location = useLocation();
  const queryLocationData = location as unknown as queryLocation;

  const [examList, setExamList] = useState<API.ExamPaging>();
  const requestExamRecord = async () => {
    console.log(location);
    if (queryLocationData.query === undefined || queryLocationData.query.id === undefined) {
      console.log('异常，跳转至首页');
      return;
    }
    try {
      const currentRecord = await examPaper({
        data: {
          current: 1,
          size: 10,
          params: {
            examId: queryLocationData.query.id,
          },
          t: moment().unix(),
        },
      });
      setExamList(currentRecord.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    requestExamRecord();
  }, []);

  return (
    <>
      {examList && (
        <div className="w-full xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto">
          <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left base font-medium text-gray-500 uppercase tracking-wider">
                        考试信息
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
                              进行中
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
                          <p className="text-indigo-600 hover:text-indigo-900 cursor-pointer" onClick={() => {}}>
                            前往考试
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
