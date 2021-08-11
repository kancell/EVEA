/* 显示考试的辅助信息 */
import { useModel } from 'umi';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';

export default function QuestionSubCard(props: {
  totalTime: number;
  createdTime: string;
  useCamera?: boolean;
  fill: Function;
}) {
  const { selectNextQuestion } = useModel('useQuestionIndexModel');

  const calcTime = () => {
    const createdTime = moment(props.createdTime);
    const nowTime = moment();
    if (props.totalTime * 60 * 1000 - nowTime.diff(createdTime) <= 0) {
      props.fill();
      return '考试结束';
    }
    return moment(props.totalTime * 60 * 1000 - nowTime.diff(createdTime)).format('mm:ss');
  };

  const [restTime, setRestTime] = useState(calcTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setRestTime(calcTime());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div
      className="static lg:top-0 w-full lg:w-auto
      h-full overflow-y-auto "
    >
      <div className="fixed bottom-2 w-full flex items-start mx-auto lg:hidden right-0">
        {/* 手机端操作卡片 */}
        <div
          onClick={() => {
            selectNextQuestion('pre');
          }}
          className="flex-grow px-4 py-2 my-4 mr-4 font-bold tracking-wide text-white text-center cursor-pointer capitalize transition-colors duration-200 transform bg-green-500 rounded-md"
        >
          上一题
        </div>
        <div className="max-w-xs mx-auto overflow-hidden border bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <a href="#" className="block text-xl font-bold text-gray-800 dark:text-white mt-2 mx-2">
              剩余时间
            </a>
            <span className="text-lg text-gray-700 dark:text-gray-200">{restTime}</span>
          </div>
        </div>
        <div
          onClick={() => {
            selectNextQuestion('next');
          }}
          className="flex-grow px-4 py-2 my-4 ml-4 font-bold tracking-wide text-white text-center cursor-pointer capitalize transition-colors duration-200 transform bg-blue-500 rounded-md"
        >
          下一题
        </div>
      </div>
      <div className="hidden lg:block">
        {/* 桌面端操作卡片 */}
        <div className="max-w-xs mx-auto overflow-hidden border bg-white rounded-lg shadow-lg">
          <div className="py-5 text-center">
            <a href="#" className="block text-xl font-bold text-gray-800 dark:text-white">
              剩余时间
            </a>
            <span className="text-lg text-gray-700 dark:text-gray-200">{restTime}</span>
          </div>
        </div>
        <div className="flex mt-1">
          <div
            onClick={() => {
              selectNextQuestion('pre');
            }}
            className="flex-grow px-4 py-2 my-1 mr-1 font-bold tracking-wide text-white text-center cursor-pointer capitalize transition-colors duration-200 transform bg-green-500 rounded-md"
          >
            上一题
          </div>
          <div
            onClick={() => {
              selectNextQuestion('next');
            }}
            className="flex-grow px-4 py-2 my-1 ml-1 font-bold tracking-wide text-white text-center cursor-pointer capitalize transition-colors duration-200 transform bg-blue-500 rounded-md"
          >
            下一题
          </div>
        </div>
      </div>

      <div
        onClick={() => {
          props.fill();
        }}
        className="absolute top-0 right-0 lg:static
        px-4 py-2 my-1 font-bold text-lg shadow-lg tracking-wide text-white text-center cursor-pointer capitalize transition-colors duration-200 transform bg-red-400 rounded-md"
      >
        交卷
      </div>
    </div>
  );
}
