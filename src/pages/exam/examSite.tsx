import { history, useLocation } from 'umi';
import { examContent, questionContent } from '@/services/exam';
import { useEffect, useState } from 'react';
import QuestionSelectBar from '@/components/QuestionSelectBar';
import Question from '@/components/Question';

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
      queryQuestionContent(currentExam.data.id, currentExam.data.groupList[0].quList[0].quId);
    } catch (error) {
      console.log(error);
    }
  };

  const [question, setQuestion] = useState<API.Question>();
  const queryQuestionContent = async (currentExamID: string, currentQuestionID: string) => {
    try {
      const currentQuestion: API.WarpQuestion = await questionContent({
        data: {
          paperId: currentExamID,
          quId: currentQuestionID,
        },
      });
      setQuestion(currentQuestion.data);
    } catch (error) {
      console.log(error);
    }
  };
  const setNextQuestion = (groupIndex: number, questionIndex: number) => {
    console.log(groupIndex, questionIndex);
    const examId = exam && exam.id;
    const questionID = exam && exam.groupList[groupIndex].quList[questionIndex].quId;
    if (examId && questionID) {
      queryQuestionContent(examId, questionID);
    }
  };

  useEffect(() => {
    queryExamContent();
  }, []);
  return (
    <div className="grid grid-flow-row grid-cols-6 grid-rows-1 gap-4">
      {exam && <QuestionSelectBar data={[...exam.groupList]} selectQuestion={setNextQuestion}></QuestionSelectBar>}
      {question && <Question content={question} setContent={setQuestion}></Question>}
    </div>
  );
}
