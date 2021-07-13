import React, { useState, useEffect } from 'react';
import { ExamRecordPaging } from '@/services/exam';
import moment from 'moment';
import { useLocation } from 'umi';

export default function examRecordPaper() {
  const location = useLocation();
  const queryLocationData = location as unknown as queryLocation;

  const [examList, setExamList] = useState<API.ExamRecordPaging>();
  const requestExamRecord = async () => {
    console.log(location);
    if (queryLocationData.query === undefined || queryLocationData.query.id === undefined) {
      console.log('异常，跳转至首页');
      return;
    }
    try {
      const currentRecord = await ExamRecordPaging({
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
                    {examList.records.map((exam, index) => (
                      <tr key={exam.id} className=" border-gray-200 border-solid border">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="font-bold text-base text-blue-400 ">{exam.title}</div>
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
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              已弃考
                            </span>
                          ) : (
                            ''
                          )}
                          {exam.state === 1 ? (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              未知
                            </span>
                          ) : (
                            ''
                          )}
                          {exam.state === 2 && exam.hasSaq === true ? (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              待阅卷
                            </span>
                          ) : (
                            ''
                          )}
                          {exam.state === 2 && exam.hasSaq === false ? (
                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              已结束
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
                          <span className="text-indigo-600 hover:text-indigo-900 cursor-pointer" onClick={() => {}}>
                            查看详情
                          </span>
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
