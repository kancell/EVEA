export default function ScoreResult(props: {
  msg: string;
  userName: string;
  totalScore: number;
  qualifyScore: number;
  userScore: number;
}) {
  return (
    <div className="max-w-screen-lg mx-auto my-5">
      <div className="relative rounded-lg flex flex-col md:flex-row items-center md:shadow-xl md:h-72 mx-2">
        <div className="z-0 order-1 md:order-2 relative w-full md:w-2/5 h-80 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg">
          <div
            className="absolute inset-0 w-full h-full object-fill object-center bg-blue-400 bg-opacity-30 bg-cover bg-bottom"
            style={{
              backgroundImage:
                'url( https://images.unsplash.com/photo-1525302220185-c387a117886e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80 ',
            }}
          ></div>
        </div>

        <div className="z-10 order-2 md:order-1 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0 bg-white ">
          <div className="p-8 md:pr-18 md:pl-14 md:py-12 mx-2 md:mx-0 h-full rounded-lg md:rounded-none md:rounded-l-lg md:shadow-none">
            <h4 className="hidden md:block text-xl text-gray-400">
              {props.userName}，你好，{props.msg}
            </h4>
            <h3 className="hidden md:block font-bold text-2xl text-gray-700">
              {props.userScore > props.qualifyScore ? '恭喜，考试通过' : '很遗憾，考试未通过'}
            </h3>
            <p className="text-gray-600 text-justify">
              考试满分：{props.totalScore}，及格分：{props.qualifyScore}
            </p>
            <p className="flex items-baseline mt-3 text-blue-600 hover:text-blue-900 focus:text-blue-900">
              <span>您的分数：{props.userScore}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
