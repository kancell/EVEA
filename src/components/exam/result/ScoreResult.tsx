export default function ScoreResult(props: { totalScore: number; objScore: number; userScore: number }) {
  return (
    <div className="h-full w-full">
      总分：{props.totalScore}
      及格分：{props.objScore}
      考试得分：{props.userScore}
    </div>
  );
}
