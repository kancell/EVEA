import { useEffect } from 'react';
import { useState } from 'react';

export default function QuestionSelectBar(props: {
  data: API.QuestionGroup[];
  selectQuestion: (groupIndex: number, questionIndex: number) => void;
}) {
  const [nowQuestionIndex, setNowQuestionIndex] = useState({
    groupIndex: 0,
    questionIndex: 0,
  });
  const [examLength, setExamLength] = useState<{ groupLength: number; questionLengthArr: number[] }>({
    groupLength: 0,
    questionLengthArr: [],
  });

  useEffect(() => {
    const calcExamLength = () => {
      const result: number[] = [];
      for (let i = 0; i < props.data.length; i++) {
        result.push(props.data[i].quList.length);
      }
      return result;
    };
    setExamLength({
      groupLength: props.data.length,
      questionLengthArr: calcExamLength(),
    });
  }, []);

  useEffect(() => {
    props.selectQuestion(nowQuestionIndex.groupIndex, nowQuestionIndex.questionIndex);
  }, [nowQuestionIndex]);
  const selectNextQuestion = () => {
    if (nowQuestionIndex.questionIndex < examLength.questionLengthArr[nowQuestionIndex.groupIndex] - 1) {
      setNowQuestionIndex({ ...nowQuestionIndex, questionIndex: nowQuestionIndex.questionIndex + 1 });
    } else if (
      nowQuestionIndex.questionIndex === examLength.questionLengthArr[nowQuestionIndex.groupIndex] - 1 &&
      nowQuestionIndex.groupIndex < examLength.groupLength - 1
    ) {
      console.log(1);
      setNowQuestionIndex({ questionIndex: 0, groupIndex: nowQuestionIndex.groupIndex + 1 });
    } else {
      return;
    }
  };
  return (
    <div className="">
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
                      className={`${
                        question.answered ? 'bg-green-500' : 'bg-gray-300'
                      } flex cursor-pointer items-center justify-center m-2 py-2 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-400`}
                      onClick={() => {
                        props.selectQuestion(groupIndex, questionIndex);
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
      <div className="px-4 py-2 my-2 font-bold tracking-wide text-white text-center cursor-pointer capitalize transition-colors duration-200 transform bg-green-500 rounded-md">
        上一题
      </div>
      <div
        onClick={() => {
          selectNextQuestion();
        }}
        className="px-4 py-2 my-2 font-bold tracking-wide text-white text-center cursor-pointer capitalize transition-colors duration-200 transform bg-blue-500 rounded-md"
      >
        下一题
      </div>
    </div>
  );
}
