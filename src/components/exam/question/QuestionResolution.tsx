import Loading from '@/components/loading/Loading';
import { useEffect, useState } from 'react';
import { Tag } from 'antd';

export default function QuestionResolution(props: { content: API.Question; anchor: string; type?: string }) {
  const [checked, setChecked] = useState<string[]>([]);
  useEffect(() => {
    const checkArr: string[] = [];
    if (['1', '2', '3'].includes(props.content.quType)) {
      props.content.answerList.forEach((item) => {
        if (item.checked && item.abc !== '') checkArr.push(' ' + item.abc);
      });
    }
    setChecked(checkArr);
  }, [props.content]);

  return (
    <>
      {!props.content && <Loading />}
      {
        <div className="max-w-full w-full px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mb-1 ">
          <div className="w-full flex text-sm font-medium text-gray-500 mb-2">
            <a id={props.anchor}></a>
            {/* 锚点，点击selectcard通过父组件触发scrollIntoView跳转 */}
            <Tag color="blue" className="bg-gray-200 px-2 py-1 rounded mr-2">
              {props.content.quType_dictText}
            </Tag>
          </div>
          <div className="bg-blue-200 text-base font-semibold px-6 py-2 mb-4 rounded">
            <span>
              {props.content.sort}. {props.content.content}
            </span>
          </div>
          <div className={`w-96 ${props.content.image === '' ? 'hidden' : ''}`}>
            <img src={`http://localhost:8101${props.content.image}`} />
          </div>
          <div className="shadow rounded-lg p-4">
            {
              /* quType为4是简答题，有answer字段，无checked字段 */
              ['1', '2', '3'].includes(props.content.quType) &&
                props.content.answerList.map((answer: API.Answer) => {
                  return (
                    <div
                      className={`text-sm font-semibold px-6 py-2 rounded-lg flex justify-between my-1 cursor-pointer border-2 border-solid border-opacity-0
                      ${answer.isRight ? 'border-blue-600 border-opacity-80' : ''}`}
                      key={answer.id}
                    >
                      <span>
                        <span className="mr-4">{answer.abc}.</span>
                        <span>{answer.content}</span>
                      </span>
                      <span>{answer.answer}</span>
                      {answer.isRight && <Tag color="green">正确答案</Tag>}
                    </div>
                  );
                })
            }
            {
              /* quType为5是填空题 */
              props.content.quType === '5' && (
                <div className="min-w-48 text-sm font-semibold px-6 py-2 rounded-lg flex flex-col justify-between my-1 cursor-pointer border-opacity-0">
                  <div className="py-2">
                    正确答案：
                    {props.content.answerList.map((answer: API.Answer) => {
                      return <span className="px-1 mx-1 border-b">{answer.content}</span>;
                    })}
                  </div>
                </div>
              )
            }
          </div>
          <>
            {['1', '2', '3'].includes(props.content.quType) && (
              <div className={`text-sm font-semibold px-6 py-2 my-1 rounded`}>
                我的答案：
                {checked.length === 0 ? (
                  <Tag color="red">未作答</Tag>
                ) : (
                  <>
                    {checked.map((item) => (
                      <Tag key={item} color="blue">
                        {item}
                      </Tag>
                    ))}
                  </>
                )}
              </div>
            )}
            {
              /* quType为4是简答题 */
              props.content.quType === '4' && (
                <div className="text-sm font-semibold px-6 py-2">
                  我的回答：{props.content.answer === '' ? <Tag color="red">未作答</Tag> : props.content.answer}
                </div>
              )
            }
            {
              /* quType为5是填空题 */
              props.content.quType === '5' && (
                <div className="min-w-48 text-sm font-semibold px-6 py-2 rounded-lg flex flex-col justify-between my-1 cursor-pointer border-opacity-0">
                  <div className="py-2">
                    我的答案：
                    {props.content.answerList.map((answer: API.Answer) => {
                      return (
                        <span className="px-1 mx-1 border-b" key={answer.answerId}>
                          {answer.answer === '' ? <Tag color="red">未作答</Tag> : answer.answer}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )
            }
          </>
        </div>
      }
    </>
  );
}
