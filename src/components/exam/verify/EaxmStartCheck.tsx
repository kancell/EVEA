import { createExam } from '@/services/exam';
import { useEffect } from 'react';
import { useState } from 'react';
import { history } from 'umi';

export default function ExamStartCheck(props: { exam: API.Exam; show: Boolean; setShow: Function }) {
  const [createData, setCreateData] = useState({
    examId: '',
    password: '',
  });
  useEffect(() => {
    setCreateData({ ...createData, examId: props.exam.id });
  }, []);

  const createNewExam = async (id: string, password?: string) => {
    console.log(id, password);
    try {
      await createExam({
        data: {
          examId: id,
          password: password,
        },
      }).then((res) => {
        const createResult = res.data as { id: any };
        history.push({
          pathname: '/exam/examPaper',
          query: {
            id: createResult.id,
          },
        });
      });
    } catch (error) {}
  };
  const _openTypeReplace = new Map([
    [1, '完全公开'],
    [2, '部门公开'],
    [3, '需要密码'],
  ]);
  return (
    <div className={`${props.show ? 'fixed' : 'hidden'} w-full h-full bg-gray-300 bg-opacity-30 z-10`}>
      {/* fixed受到父元素padding影响 */}
      <div className="flex w-full h-full justify-center items-center relative -top-32 -left-4">
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-4/5 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  进入{props.exam.title}（{props.exam.examType_dictText}）
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">每次考试都会创建新的试卷，本次考试不会影响您正在进行中的同名考试</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{props.exam.content}</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">本场考试公开类型为：{_openTypeReplace.get(props.exam.openType)}</p>
                </div>
                <form className={`relative mt-4 ${props.exam.openType === 3 ? '' : 'hidden'}`}>
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    />
                  </svg>
                  <input
                    onChange={(e) => {
                      setCreateData({ ...createData, password: e.target.value });
                    }}
                    className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
                    type="text"
                    placeholder="输入考试密码"
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={() => {
                createNewExam(createData.examId, createData.password);
              }}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              开始
            </button>
            <button
              type="button"
              onClick={() => {
                props.setShow(false);
              }}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
