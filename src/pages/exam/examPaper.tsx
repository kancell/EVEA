import { history, useLocation } from 'umi';
import { examContent, questionContent, fillExam } from '@/services/exam';
import { useEffect, useState } from 'react';
import QuestionSelectCard from '@/components/exam/question/QuestionSelectCard';
import QuestionSubCard from '@/components/exam/question/QuestionSubCard';
import Question from '@/components/exam/question/Question';
import Loading from '@/components/loading/Loading';
import { useModel } from 'umi';
import FullSrceen from '@/services/util';

export default function ExamPaper() {
  const { nowQuestionIndex, setNowQuestionIndex, setExamLength } = useModel('useQuestionIndexModel');

  const [isScreenFull, setIsScreenFull] = useState(false); //是否全屏
  useEffect(() => {
    FullSrceen.init(screenChange);
    FullSrceen.enterFullScreen();
  }, []);
  const screenChange = (isFull: boolean) => {
    console.log('是否全屏', isFull);
    setIsScreenFull(isFull);
  };

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
    return () => {
      setNowQuestionIndex({ groupIndex: 0, questionIndex: 0 });
    };
  }, []);

  const calcExamLength = () => {
    if (exam === undefined) return;
    const result: number[] = [];
    for (let i = 0; i < exam.groupList.length; i++) {
      result.push(exam.groupList[i].quList.length);
    }
    setExamLength({
      groupLength: exam.groupList.length,
      questionLengthArr: result,
    });
  };
  useEffect(() => {
    calcExamLength();
  }, [exam]);

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
    /* 判断问题是否为已答，如是，更改exam中的answered字段 */
    const pendingExam = { ...exam };
    if (pendingExam && pendingExam.groupList && question) {
      let nowQuestion = pendingExam.groupList[nowQuestionIndex.groupIndex].quList[nowQuestionIndex.questionIndex];
      if (['1', '2', '3'].includes(nowQuestion.quType) && nowQuestion.quId === question.quId) {
        questionChecked(question) ? (nowQuestion.answered = true) : (nowQuestion.answered = false);
      }
      if (nowQuestion.quType === '4' && nowQuestion.quId === question.quId) {
        question.answer !== '' ? (nowQuestion.answered = true) : (nowQuestion.answered = false);
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
        FullSrceen.exitFullScreen();
        const createResult = exam as { id: any };
        history.push({
          pathname: '/exam/examResult',
          query: { id: createResult.id },
        });
      });
    } catch (error) {}
  };
  return (
    <>
      {(!exam || !question) && <Loading />}
      {exam && question && (
        <div className="grid grid-flow-row grid-cols-4 xl:grid-cols-6 grid-rows-1 gap-4 min-h-full h-full overflow-auto">
          <QuestionSelectCard type={'exam'} data={[...exam.groupList]} selectQuestion={setNextQuestion}></QuestionSelectCard>
          <Question content={question} setContent={setQuestion}></Question>
          <QuestionSubCard
            totalTime={exam.totalTime}
            createdTime={exam.createTime}
            useCamera={exam.camOn}
            fill={fillExamRequest}
          ></QuestionSubCard>
        </div>
      )}
    </>
  );
}
