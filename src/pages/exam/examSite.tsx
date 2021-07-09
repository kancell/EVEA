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
    const examId = exam && exam.id;
    const questionID = exam && exam.groupList[groupIndex].quList[questionIndex].quId;
    if (examId && questionID) {
      queryQuestionContent(examId, questionID);
    }
  };

  const questionChecked = (question: API.Question): boolean => {
    for (const answer of question.answerList) {
      if (answer.checked) {
        return true;
      }
    }
    return false;
  };
  useEffect(() => {
    const pendingExam = { ...exam }; //如何进行复杂对象的setState
    if (pendingExam && pendingExam.groupList && question) {
      for (const group of pendingExam.groupList) {
        if (group.quType === question.quType) {
          for (let replaceQuestion of group.quList) {
            if (['1', '2', '3'].includes(replaceQuestion.quType) && replaceQuestion.quId === question.quId) {
              questionChecked(question) ? (replaceQuestion.answered = true) : (replaceQuestion.answered = false);
            }
            if (replaceQuestion.quType === '4' && replaceQuestion.quId === question.quId) {
              question.answer !== '' ? (replaceQuestion.answered = true) : (replaceQuestion.answered = false);
            }
          }
        }
      }
      setExam(pendingExam as API.QuestionPaging);
    }
  }, [question]);

  useEffect(() => {
    queryExamContent();
  }, []);
  return (
    <div className="grid grid-flow-row grid-cols-4 xl:grid-cols-6 grid-rows-1 gap-4">
      {exam && <QuestionSelectBar data={[...exam.groupList]} selectQuestion={setNextQuestion}></QuestionSelectBar>}
      {question && <Question content={question} setContent={setQuestion}></Question>}
    </div>
  );
}
