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
            <div className="grid grid-flow-row grid-cols-4 xl:grid-cols-6 grid-rows-1 xl:grid-rows-2 gap-4 ">
              <QuestionSelectCard
                type={'result'}
                data={[...examResult.groupList]}
                selectQuestion={setNextQuestion}
              ></QuestionSelectCard>
              <div className="col-span-4">
                {examResult.groupList.map((group, groupIndex) => (
                  <div key={group.id}>
                    {group.quList.map((question, questionIndex) => (
                      <span key={question.quId}>
                        <QuestionResolution content={question} anchor={`#${groupIndex}${questionIndex}`}></QuestionResolution>
                        <QuestionConclision key={question.id} content={question}></QuestionConclision>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <div className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg h-48 max-w-full w-full px-8 py-4 sticky top-0 col-span-4 xl:col-span-1">
                <div className="py-2 text-center">
                  <div className="bg-gray-100 inline-flex py-3 px-5 w-full rounded-lg items-center hover:bg-gray-200 focus:outline-none">
                    <span className="ml-4 flex items-start flex-col leading-none">
                      <span className="text-lg font-bold text-gray-600 mb-1">考试得分：{examResult.userScore}分</span>
                    </span>
                  </div>
                  <div className="bg-gray-100 inline-flex py-3 px-5 w-full rounded-lg items-center hover:bg-gray-200 focus:outline-none mt-4">
                    <span className="ml-4 flex items-start flex-col leading-none">
                      <span className="text-lg font-bold text-gray-600 mb-1">考试用时：{examResult.userTime}分钟</span>
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
