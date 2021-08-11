/* 以列表形式显示的问题内容与选项部分 */
import Loading from '@/components/loading/Loading';
import { useEffect, useState } from 'react';
import { Tag } from 'antd';

export default function QuestionEdit(props: { content: API.RepoQuestion }) {
  const questionType = {
    '1': '单选题',
    '2': '多选题',
    '3': '判断题',
    '4': '简答题',
    '5': '填空题',
  }[props.content.quType !== undefined ? props.content.quType : '1'];

  return (
    <>
      {!props.content && <Loading />}
      {
        <div className="max-w-full w-full px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mb-2 ">
          <div className="w-full flex text-sm font-medium text-gray-500 mb-2">
            {/* 锚点，点击selectcard通过父组件触发scrollIntoView跳转 */}
            <Tag color="blue" className="bg-gray-200 px-2 py-1 rounded mr-2">
              {questionType}
            </Tag>
          </div>
          <div className="bg-blue-200 text-base font-semibold px-6 py-2 mb-4 rounded">
            <span>{props.content.content}</span>
          </div>
          <div className={`w-96 ${props.content.image === '' || props.content.image === undefined ? 'hidden' : ''}`}>
            <img src={`http://10.44.36.217:8101${props.content.image}`} />
          </div>
          <div className="shadow rounded-lg p-4">
            {
              /* quType为4是简答题，有answer字段，无checked字段 */
              props.content.quType &&
                props.content.answerList &&
                ['1', '2', '3'].includes(props.content.quType.toString()) &&
                props.content.answerList.map((answer: API.RepoAnswer) => {
                  return (
                    <div
                      className={`text-sm font-semibold px-6 py-2 rounded-lg flex justify-between my-1 cursor-pointer border-2 border-solid border-opacity-0
                    ${answer.isRight ? 'border-blue-600 border-opacity-80' : ''}`}
                      key={answer.answerId}
                    >
                      <span>
                        <span>{answer.content}</span>
                      </span>
                      {answer.isRight && <Tag color="green">正确答案</Tag>}
                    </div>
                  );
                })
            }
            {
              /* quType为5是填空题 */
              props.content.quType && props.content.answerList && props.content.quType === '5' && (
                <div className="min-w-48 text-sm font-semibold px-6 py-2 rounded-lg flex flex-col justify-between my-1 cursor-pointer border-opacity-0">
                  <div className="py-2">
                    正确答案：
                    {props.content.answerList.map((answer: API.RepoAnswer) => {
                      return (
                        <span className="px-1 mx-1 border-b" key={answer.answerId}>
                          {answer.content}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )
            }
          </div>
        </div>
      }
    </>
  );
}
