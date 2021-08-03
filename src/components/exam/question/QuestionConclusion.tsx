/* 以列表形式显示的问题解析与得分部分 */
export default function QuestionConclision(props: { content: API.Question }) {
  return (
    <div className="bg-white mb-6 -mt-1">
      <div className={`p-4 mt-2 ${props.content.quType === '4' ? 'hidden' : ''}`}>
        <div className="text-base font-bold my-1">{props.content.isRight ? '回答正确' : '回答错误'}</div>
        <div className="font-bold my-1">
          题目满分：{props.content.score}，学员得分：{props.content.actualScore}
        </div>
        <div className="my-2">{props.content.analysis === undefined ? '该题目暂无解析' : props.content.analysis}</div>
      </div>
      <div className={`text-base font-bold rounded-lg p-4 mt-2 ${props.content.quType === '4' ? '' : 'hidden'}`}>
        <div>{props.content.mark ? '已批阅' : '未批阅'}</div>
        {props.content.mark && (
          <>
            <div>
              题目满分：{props.content.score}，学员得分{props.content.actualScore}
            </div>
            <div>{props.content.analysis === '' ? '该题目暂无解析' : props.content.analysis}</div>
          </>
        )}
      </div>
    </div>
  );
}
