import { history, useLocation } from 'umi';
import { examContent } from '@/services/exam';
import { useEffect } from 'react';
import { useState } from 'react';
import QuestionSelectBar from '@/components/QuestionSelectBar';

declare type queryLocation = {
  hash: string;
  key: string;
  pathname: string;
  query?: {
    id: string;
  };
  search: string;
};

export default function ExamSite() {
  const location = useLocation();
  const queryLocationData = location as unknown as queryLocation;

  const [exam, setExam] = useState<API.QuestionPaging>();
  const queryExamContent = async () => {
    if (queryLocationData.query === undefined) {
      console.log('异常，跳转至首页');
      return;
    }
    try {
      const currentExam: API.WarpQuestionPaging = await examContent({
        data: {
          id: queryLocationData.query.id,
        },
      });
      setExam(currentExam.data);
      console.log(currentExam);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    queryExamContent();
  }, []);
  return (
    <div className="max-w-screen-lg mx-auto flex flex-col bg-white">
      {exam && (
        <QuestionSelectBar data={[...exam.groupList]}></QuestionSelectBar>
      )}

      <div>
        {exam &&
          exam.groupList.map((item: API.QuestionGroup) => {
            return (
              <div key={item.id}>
                {item.title}
                {item.quList.map((question: API.Question) => {
                  return (
                    <div key={question.quId}>
                      <div>本题分值：{question.score}</div>
                      <div>{question.content}</div>
                      <div>
                        {question.answerList.length !== 0 &&
                          question.answerList.map((answer: API.Answer) => {
                            return <div key={answer.id}>{answer.content}</div>;
                          })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </div>
  );
}
