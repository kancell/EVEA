import { useLocation, useModel } from 'umi';
import { PaperPreview } from '@/services/examManage';
import QuestionSelectCard from '@/components/exam/question/QuestionSelectCard';
import QuestionResolution from '@/components/exam/question/QuestionResolution';
import QuestionConclision from '@/components/exam/question/QuestionConclusion';
import { useEffect, useState } from 'react';
import Loading from '@/components/loading/Loading';

export default function paperPreview() {
  const { setNowQuestionIndex } = useModel('useQuestionIndexModel');

  const location = useLocation();
  const queryLocationData = location as unknown as queryLocation;
  const [paperDetail, setPaperDetail] = useState<API.PaperDetail>();
  const queryExamContent = async () => {
    if (queryLocationData.query === undefined) {
      console.log('异常，跳转至首页');
      return;
    }
    try {
      const currentExamResult: API.WarpPaperDetail = await PaperPreview({
        data: {
          id: queryLocationData.query.id,
        },
      });
      setPaperDetail(currentExamResult.data);
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
      {!paperDetail && <Loading />}
      {paperDetail && (
        <div className="w-full h-full max-h-full overflow-auto">
          <div className="grid grid-flow-row grid-cols-4 xl:grid-cols-6 grid-rows-1 gap-4 ">
            <div className="col-span-5">
              {paperDetail.groupList.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {group.quList.map((question, questionIndex) => {
                    return (
                      <>
                        <QuestionResolution
                          key={question.id}
                          content={question}
                          anchor={`#${groupIndex}${questionIndex}`}
                        ></QuestionResolution>
                      </>
                    );
                  })}
                </div>
              ))}
            </div>
            <QuestionSelectCard
              type={'result'}
              data={[...paperDetail.groupList]}
              selectQuestion={setNextQuestion}
            ></QuestionSelectCard>
          </div>
        </div>
      )}
    </>
  );
}
