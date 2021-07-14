import { useEffect } from 'react';
import { useState } from 'react';
import { useModel } from 'umi';

export default function QuestionSelectBar(props: {
  type: string;
  data: API.QuestionGroup[];
  selectQuestion: (groupIndex: number, questionIndex: number) => void;
}) {
  const { nowQuestionIndex, setNowQuestionIndex } = useModel('useQuestionIndexModel');

  useEffect(() => {
    props.selectQuestion(nowQuestionIndex.groupIndex, nowQuestionIndex.questionIndex);
  }, [nowQuestionIndex]);

  const focusNowSelect = (groupIndex: number, questionIndex: number): boolean => {
    if (groupIndex === nowQuestionIndex.groupIndex && questionIndex === nowQuestionIndex.questionIndex) {
      return true;
    }
    return false;
  };
  return (
    <div className="max-h-screen min-h-48 overflow-y-auto max-w-full w-full sticky top-0">
      {props.data &&
        props.data.map((group: API.QuestionGroup, groupIndex) => {
          return (
            <div key={group.id} className="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mb-2">
              <div className="flex items-center justify-between flex-col xl:flex-row p-2">
                <a className="px-8 xl:px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
                  {group.title}
                </a>
                <span className="text-sm font-light text-gray-600 dark:text-gray-400 py-1">
                  共{group.quCount}题，总分：{group.totalScore}
                </span>
              </div>
              <div className="grid grid-flow-row grid-cols-3 my-2">
                {group.quList.map((question: API.Question, questionIndex) => {
                  return (
                    <div
                      key={question.id}
                      className={`
                      ${focusNowSelect(groupIndex, questionIndex) ? 'animate-bounce' : ''}
                      ${props.type === 'result' ? (question.isRight ? 'bg-green-500' : 'bg-red-300') : ''}
                      ${
                        props.type === 'exam' ? (question.answered ? 'bg-green-500' : 'bg-gray-300') : ''
                      } flex cursor-pointer items-center justify-center m-2 py-1 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-400`}
                      onClick={() => {
                        setNowQuestionIndex({
                          groupIndex: groupIndex,
                          questionIndex: questionIndex,
                        });
                      }}
                    >
                      {question.sort}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}
