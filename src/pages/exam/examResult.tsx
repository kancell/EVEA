import { Button } from 'antd';
import { useLocation } from 'umi';
import { examResult as examFinalResult } from '@/services/exam';
import QuestionSelectCard from '@/components/QuestionSelectCard';
import QuestionResolution from '@/components/QuestionResolution';
import { useEffect, useState } from 'react';
import { exam } from '@/services';

export default function examResult() {
  const location = useLocation();
  const queryLocationData = location as unknown as queryLocation;
  const [examResult, setExamResult] = useState<API.PaperResult>();
  const queryExamContent = async () => {
    if (queryLocationData.query === undefined) {
      console.log('异常，跳转至首页');
      return;
    }
    try {
      const currentExamResult: API.WarpPaperResult = await examFinalResult({
        data: {
          id: queryLocationData.query.id,
        },
      });
      setExamResult(currentExamResult.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    queryExamContent();
  }, []);

  const setNextQuestion = (groupIndex: number, questionIndex: number) => {
    const anchorElement = document.getElementById(`#${groupIndex}${questionIndex}`);
    if (anchorElement) {
      anchorElement.scrollIntoView();
    }
  };
  return (
    <>
      {examResult && (
        <div className="w-full h-full max-h-full overflow-auto">
          {examResult.resultType === 1 && <div>{examResult.thanks}</div>}
          {examResult.resultType === 2 && (
            <div className="h-full w-full">
              总分：{examResult.totalScore}
              及格分：{examResult.objScore}
              考试得分：{examResult.userScore}
            </div>
          )}
          {examResult.resultType === 3 && (
            <div className="grid grid-flow-row grid-cols-4 xl:grid-cols-6 grid-rows-1 gap-4 ">
              <QuestionSelectCard
                type={'result'}
                data={[...examResult.groupList]}
                selectQuestion={setNextQuestion}
              ></QuestionSelectCard>
              <div className="col-span-4">
                {examResult.groupList.map((group, groupIndex) => {
                  return group.quList.map((question, questionIndex) => {
                    return (
                      <QuestionResolution content={question} anchor={`#${groupIndex}${questionIndex}`}></QuestionResolution>
                    );
                  });
                })}
              </div>
              <div className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg h-48 max-w-full w-full px-8 py-4 sticky top-0">
                <div className="py-5 text-center">
                  <span className="text-lg text-gray-700 dark:text-gray-200">考试得分：{examResult.userScore}</span>
                  <span className="text-lg text-gray-700 dark:text-gray-200">考试用时：{examResult.userTime}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
