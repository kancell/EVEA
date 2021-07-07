export default function QuestionSelectBar(props: {
  data: API.QuestionGroup[];
}) {
  console.log(props.data);
  return (
    <div className="relative z-10 flex flex-col w-48 ">
      {props.data &&
        props.data.map((group: API.QuestionGroup, index) => {
          return (
            <div
              key={group.id}
              className="shadow-md my-2 rounded-tr-xl sm:rounded-t-xl lg:rounded-xl"
            >
              <div className="row-start-1 col-start-1 col-span-3 bg-gray-200 rounded-t-lg pl-4">
                {group.title}
              </div>
              <div className="grid grid-flow-row grid-cols-3 my-2">
                {group.quList.map((question: API.Question, index) => {
                  return (
                    <div
                      key={question.id}
                      className="border-indigo-500 text-indigo-600 shadow hover:bg-indigo-200 border m-2 bg-indigo cursor-pointer text-center h-8"
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
