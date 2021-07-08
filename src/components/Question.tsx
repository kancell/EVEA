import { fillAnswer } from '@/services/exam';
import { useEffect, useState } from 'react';

export default function Question(props: { content: API.Question; setContent: Function }) {
  const uploadQuestionAnswer = async () => {
    try {
      const result: API.WarpProcess = await fillAnswer({
        data: props.content,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const AnswerListModify = (answerId: string) => {
    //需处理多选、单选、选择
    const question = props.content;
    const answerList = props.content.answerList;
    answerList.forEach((item) => {
      switch (props.content.quType) {
        case '1':
          item.checked = false;
          if (item.answerId === answerId) {
            item.checked = !item.checked;
          }
          break;
        case '2':
          break;
        case '3':
          break;
        default:
          break;
      }
    });
    props.setContent((question: API.Question) => {
      return { ...question, answerList };
    });
    uploadQuestionAnswer();
    //调用fillanswer,需处理setState同步
  };
  return (
    <div className="max-w-full px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mb-2 col-span-4 w-full">
      <div className="w-full flex text-sm font-medium text-gray-500  mb-2">
        <span className="bg-gray-200 px-3 py-2 rounded-lg">{props.content.quType_dictText}</span>
      </div>
      <div className="bg-blue-200 text-base font-semibold px-6 py-2 mb-4 rounded-lg">
        <span>
          {props.content.sort}. {props.content.content}
        </span>
      </div>
      {props.content &&
        props.content.answerList.map((answer: API.Answer) => {
          return (
            <div className="text-sm font-semibold px-6 py-2 rounded-lg flex justify-between my-1 cursor-pointer" key={answer.id} onClick={() => AnswerListModify(answer.answerId)}>
              <span>
                <span className="mr-4">{answer.abc}.</span>
                <span>{answer.content}</span>
              </span>
              <span>{answer.answer}</span>
            </div>
          );
        })}
    </div>
  );
}
