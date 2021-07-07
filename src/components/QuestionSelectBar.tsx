export default function QuestionSelectBar(props: {
  data: API.QuestionGroup[];
}) {
  console.log(props.data);
  return (
    <div className="">
      {props.data &&
        props.data.map((group: API.QuestionGroup, index) => {
          return (
            <div
              key={group.id}
              className="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mb-2 w-60"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-600 dark:text-gray-400">
                  Mar 10, 2019
                </span>
                <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">
                  {group.title}
                </a>
              </div>
              <div className="grid grid-flow-row grid-cols-3 my-2">
                {group.quList.map((question: API.Question, index) => {
                  return (
                    <div
                      key={question.id}
                      className="flex items-center justify-center m-2 py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75"
                    >
                      {index + 1}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}
