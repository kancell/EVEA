import { useLocation, useModel } from 'umi';
import { examResult as examFinalResult } from '@/services/exam';
import QuestionSelectCard from '@/components/QuestionSelectCard';
import QuestionResolution from '@/components/QuestionResolution';
import ThanksResult from '@/components/exam/result/ThanksResult';
import ScoreResult from '@/components/exam/result/ScoreResult';
import { useEffect, useState } from 'react';

export default function examResult() {
  const { setNowQuestionIndex } = useModel('useQuestionIndexModel');

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
    return () => {
      setNowQuestionIndex({ groupIndex: 0, questionIndex: 0 });
    };
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
          {examResult.resultType === 1 && <ThanksResult msg={examResult.thanks} />}
          {examResult.resultType === 2 && (
            <ScoreResult
              totalScore={examResult.totalScore}
              objScore={examResult.objScore}
              userScore={examResult.userScore}
            ></ScoreResult>
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
                      <QuestionResolution
                        key={question.id}
                        content={question}
                        anchor={`#${groupIndex}${questionIndex}`}
                      ></QuestionResolution>
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
