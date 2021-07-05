import React, { useEffect } from 'react';
import { currentExam as querycurrentExam } from '@/services/exam';
import { useState } from 'react';

export default function ChartPage() {
  const [examList, setExamList] = useState<API.EaxmPaging>({
    current: 0,
    hitCount: false,
    optimizeCountSql: false,
    orders: [],
    pages: 0,
    records: [
      {
        actionInterval: 0,
        actionOn: false,
        answerDevice: 0,
        camInterval: 0,
        camOn: false,
        chance: 0,
        content: '',
        createBy: '',
        createTime: '',
        dataFlag: 0,
        endTime: '',
        examType: '',
        examType_dictText: '',
        handMin: 0,
        hasSaq: false,
        id: '',
        lateMax: 0,
        leaveCheck: 0,
        leaveCount: 0,
        leaveOn: false,
        objScore: 100,
        openType: 0,
        password: '',
        points: 0,
        qualifyScore: 0,
        resultType: 0,
        startTime: '',
        state: 0,
        subjScore: 0,
        thanks: '',
        timeLimit: false,
        title: '',
        tmplId: '',
        totalScore: 0,
        totalTime: 0,
        updateBy: '',
        updateTime: '',
      },
    ],
    searchCount: false,
    size: 0,
    total: 0,
  });
  const fetchUserInfo = async () => {
    try {
      const currentUser = await querycurrentExam({
        data: {
          current: 1,
          size: 10,
          params: {},
          t: 1625454336621,
        },
      });
      setExamList(currentUser.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="w-full max-w-screen-2xl mx-auto">
      <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    考试信息
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    分数信息
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    起止时间
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    当前状态
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    考试时长
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
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
                  <tr
                    key={exam.id}
                    className=" border-gray-200 border-solid border"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {exam.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {exam.examType_dictText}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        满分：{exam.totalScore}
                      </div>
                      <div className="text-sm text-gray-500">
                        及格分：{exam.qualifyScore}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {exam.timeLimit ? (
                        <>
                          <div className="text-sm text-gray-900">
                            开始时间：{exam.startTime}
                          </div>
                          <div className="text-sm text-gray-500">
                            结束时间：{exam.endTime}
                          </div>
                        </>
                      ) : (
                        <div className="text-sm text-gray-900">无时间限制</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {exam.state === 0 ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          进行中
                        </span>
                      ) : (
                        ''
                      )}
                      {exam.state === 1 ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          已结束
                        </span>
                      ) : (
                        ''
                      )}
                      {exam.state === 2 ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          未开始
                        </span>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exam.totalTime}分钟
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exam.content}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => {
                          console.log(exam);
                        }}
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}