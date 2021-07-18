/* 试题显示主界面 */
import Loading from '@/components/loading/Loading';
import { fillAnswer } from '@/services/exam';
import { useEffect, useState } from 'react';

export default function Question(props: { content: API.Question; setContent: Function }) {
  const [nowChecked, setNowChecked] = useState<string[]>([]);
  useEffect(() => {
    /* "1", "2", "3"分别是单选、多选、判断。筛选出有选项的题目在标签中显示 */
    const checkArr: string[] = [];
    if (['1', '2', '3'].includes(props.content.quType)) {
      props.content.answerList.forEach((item) => {
        if (item.checked && item.abc !== '') checkArr.push(' ' + item.abc);
      });
    }
    setNowChecked(checkArr);

    uploadQuestionAnswer(props.content);
  }, [props.content]);

  const uploadQuestionAnswer = async (question: API.Question) => {
    try {
      const result: API.WarpUnknownResult = await fillAnswer({
        data: question,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const AnswerModify = (answerValue: string) => {
    /* 需要防抖优化 */
    props.setContent({ ...props.content, answer: answerValue });
  };
  const AnswerListModify = (answerId: string) => {
    /* 需处理多选、单选、选择.1、3为单选、判断。2为多选 */
    const answerList = props.content.answerList;
    answerList.forEach((item) => {
      switch (props.content.quType.toString()) {
        case '1':
        case '3':
          item.checked = false;
          if (item.answerId === answerId) {
            item.checked = !item.checked;
          }
          break;
        case '2':
          if (item.answerId === answerId) {
            item.checked = !item.checked;
          }
          break;
        default:
          break;
      }
    });
    props.setContent({ ...props.content, answerList });
  };

  return (
    <>
      {!props.content && <Loading />}
      {
        <div className="max-w-full px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mb-2 col-span-4 w-full">
          <div className="w-full flex text-sm font-medium text-gray-500 mb-2">
            <span className="bg-gray-200 px-2 py-1 rounded mr-2">{props.content.quType_dictText}</span>
            <span className={`bg-gray-200 px-2 py-1 rounded ${nowChecked.length === 0 ? 'hidden' : ''}`}>
              我的答案：
              {nowChecked.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </span>
          </div>
          <div className="bg-blue-200 text-base font-semibold px-6 py-2 mb-4 rounded">
            <span>
              {props.content.sort}. {props.content.content}
            </span>
          </div>
          <div className="shadow rounded-lg p-4">
            {props.content.quType === '4' && (
              <textarea
                onChange={(e) => AnswerModify(e.target.value)}
                value={props.content.answer}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            )}
            {
              /* quType为4是简答题，有answer字段，无checked字段 */
              props.content.quType !== '4' &&
                props.content.answerList.map((answer: API.Answer) => {
                  return (
                    <div
                      className={`text-sm font-semibold px-6 py-2 rounded-lg flex justify-between my-1 cursor-pointer border-2 border-solid border-opacity-0
                  ${answer.checked ? 'border-yellow-600 border-opacity-80' : ''}`}
                      key={answer.id}
                      onClick={() => AnswerListModify(answer.answerId)}
                    >
                      <span>
                        <span className="mr-4">{answer.abc}.</span>
                        <span>{answer.content}</span>
                      </span>
                      <span>{answer.answer}</span>
                    </div>
                  );
                })
            }
          </div>
        </div>
      }
    </>
  );
}
