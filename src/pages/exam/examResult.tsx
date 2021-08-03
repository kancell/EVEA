import { useLocation, useModel } from 'umi';
import { examResult as examFinalResult } from '@/services/exam';
import QuestionSelectCard from '@/components/exam/question/QuestionSelectCard';
import QuestionResolution from '@/components/exam/question/QuestionResolution';
import QuestionConclision from '@/components/exam/question/QuestionConclusion';
import ThanksResult from '@/components/exam/result/ThanksResult';
import ScoreResult from '@/components/exam/result/ScoreResult';
import { useEffect, useState } from 'react';
import Loading from '@/components/loading/Loading';

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
      {!examResult && <Loading />}
      {examResult && (
        <div className="w-full h-full max-h-full overflow-auto">
          {examResult.resultType === 1 && <ThanksResult msg={examResult.thanks} />}
          {examResult.resultType === 2 && (
            <ScoreResult
              msg={examResult.thanks}
              userName={examResult.userId_dictText}
              totalScore={examResult.totalScore}
              qualifyScore={examResult.qualifyScore}
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
                      <>
                        <QuestionResolution
                          key={question.id}
                          content={question}
                          anchor={`#${groupIndex}${questionIndex}`}
                        ></QuestionResolution>
                        <QuestionConclision key={question.id} content={question}></QuestionConclision>
                      </>
                    );
                  });
                })}
              </div>
              <div className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg h-48 max-w-full w-full px-8 py-4 sticky top-0">
                <div className="py-2 text-center">
                  <div className="bg-gray-100 inline-flex py-3 px-5 w-full rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 512 512">
                      <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
                    </svg>
                    <span className="ml-4 flex items-start flex-col leading-none">
                      <span className="text-lg font-bold text-gray-600 mb-1">考试得分：{examResult.userScore}</span>
                    </span>
                  </div>
                  <div className="bg-gray-100 inline-flex py-3 px-5 w-full rounded-lg items-center hover:bg-gray-200 focus:outline-none mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 512 512">
                      <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
                    </svg>
                    <span className="ml-4 flex items-start flex-col leading-none">
                      <span className="text-lg font-bold text-gray-600 mb-1">考试用时：{examResult.userTime}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
