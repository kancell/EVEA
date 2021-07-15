import React, { useState, useEffect } from 'react';
import { PaperRecord as queryExamRecord } from '@/services/exam';
import moment from 'moment';
import { history } from 'umi';
import Pagination from '@/components/pagination/Pagination';
import { useModel } from 'umi';
import Loading from '@/components/loading/Loading';

export default function examRecordList() {
  const [PaperRecord, setExamRecord] = useState<API.PaperRecord>();
  /* const { page, setPage } = useModel('useExamRecordListPagesModel'); */
  const [page, setPage] = useState({
    current: 1,
    pages: 1,
    size: 7,
    total: 1,
  });
  const requestExamRecord = async (current = page.current, size = page.size) => {
    try {
      const currentRecord = await queryExamRecord({
        data: {
          current: current,
          size: size,
          params: {},
          t: moment().unix(),
        },
      });
      setExamRecord(currentRecord.data);
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
  const goToRecordPaper = (examId: string) => {
    console.log(examId);
    history.push({
      pathname: '/exam/examRecordPaper',
      query: {
        id: examId,
      },
    });
  };
  useEffect(() => {
    requestExamRecord();
  }, []);

  return (
    <>
      {!PaperRecord && <Loading />}
      {PaperRecord && (
        <div className="w-full container mx-auto">
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
                        最后考试时间
                      </th>
                      <th scope="col" className="px-6 py-3 text-left base font-medium text-gray-500 uppercase tracking-wider">
                        最新状态
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
                    {PaperRecord.records.map((exam, index) => (
                      <tr key={exam.id} className=" border-gray-200 border-solid border">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="font-bold text-base text-blue-400 ">{exam.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">最高分：{exam.maxScore}</div>
                          <div className="text-sm text-gray-500">考试次数：{exam.tryCount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{exam.updateTime}</div>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <span
                            className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            onClick={() => {
                              goToRecordPaper(exam.examId);
                            }}
                          >
                            查看记录
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
    </>
  );
}
