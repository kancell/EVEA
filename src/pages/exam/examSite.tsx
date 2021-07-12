import { history, useLocation } from 'umi';
import { examContent, questionContent, fillExam } from '@/services/exam';
import { useEffect, useState } from 'react';
import QuestionSelectCard from '@/components/QuestionSelectCard';
import QuestionSubCard from '@/components/QuestionSubCard';
import Question from '@/components/Question';

export default function ExamSite() {
  const location = useLocation();
  const queryLocationData = location as unknown as queryLocation;

  const [exam, setExam] = useState<API.PaperDetail>();
  const queryExamContent = async () => {
    if (queryLocationData.query === undefined) {
      console.log('异常，跳转至首页');
      return;
    }
    try {
      const currentExam: API.WarpPaperDetail = await examContent({
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
  useEffect(() => {
    queryExamContent();
  }, []);

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
      setExam(pendingExam as API.PaperDetail);
    }
  }, [question]);

  const fillExamRequest = async () => {
    try {
      await fillExam({
        data: {
          handFlag: 0,
          id: exam?.id,
        },
      }).then((res: API.WarpProcess) => {
        const createResult = exam as { id: any };
        history.push({
          pathname: '/exam/examResult',
          query: {
            id: createResult.id,
          },
        });
      });
    } catch (error) {}
  };
  return (
    <div className="grid grid-flow-row grid-cols-4 xl:grid-cols-6 grid-rows-1 gap-4 min-h-full h-full overflow-auto">
      {exam && (
        <QuestionSelectCard type={'exam'} data={[...exam.groupList]} selectQuestion={setNextQuestion}></QuestionSelectCard>
      )}
      {question && <Question content={question} setContent={setQuestion}></Question>}
      {exam && (
        <QuestionSubCard
          totalTime={exam.totalTime}
          createdTime={exam.createTime}
          useCamera={exam.camOn}
          fill={fillExamRequest}
        ></QuestionSubCard>
      )}
    </div>
  );
}
