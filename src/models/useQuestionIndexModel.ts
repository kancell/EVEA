import { useState, useCallback } from 'react';
import { message } from 'antd';
export default function useQuestionIndexModel() {
  const [nowQuestionIndex, setNowQuestionIndex] = useState({
    groupIndex: 0,
    questionIndex: 0,
  });

  const [examLength, setExamLength] = useState<{ groupLength: number; questionLengthArr: number[] }>({
    groupLength: 0,
    questionLengthArr: [],
  });

  const selectNextQuestion = useCallback(
    (key: string = 'next') => {
      /*examLength中存储的是数组长度，作为数组index使用需减一  */
      switch (key) {
        case 'next':
          if (nowQuestionIndex.questionIndex < examLength.questionLengthArr[nowQuestionIndex.groupIndex] - 1) {
            setNowQuestionIndex({ ...nowQuestionIndex, questionIndex: nowQuestionIndex.questionIndex + 1 });
          } else if (
            nowQuestionIndex.questionIndex === examLength.questionLengthArr[nowQuestionIndex.groupIndex] - 1 &&
            nowQuestionIndex.groupIndex < examLength.groupLength - 1
          ) {
            setNowQuestionIndex({ questionIndex: 0, groupIndex: nowQuestionIndex.groupIndex + 1 });
          } else {
            message.info('已是最后一题');
            return;
          }
          break;
        case 'pre':
          if (nowQuestionIndex.questionIndex > 0) {
            setNowQuestionIndex({ ...nowQuestionIndex, questionIndex: nowQuestionIndex.questionIndex - 1 });
          } else if (nowQuestionIndex.questionIndex === 0 && nowQuestionIndex.groupIndex > 0) {
            setNowQuestionIndex({
              questionIndex: examLength.questionLengthArr[nowQuestionIndex.groupIndex - 1] - 1,
              groupIndex: nowQuestionIndex.groupIndex - 1,
            });
          } else {
            message.info('已是第一题');
            return;
          }
          break;
        default:
          break;
      }
    },
    [nowQuestionIndex, examLength],
  );

  return {
    nowQuestionIndex,
    setNowQuestionIndex,
    examLength,
    setExamLength,
    selectNextQuestion,
  };
}
