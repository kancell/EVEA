export default function Pagination(props: {
  page: {
    current: number;
    pages: number;
    size: number;
    total: number;
  };
  setPage: Function;
}) {
  const pages = Array(props.page.pages)
    .fill(0)
    .map((_, i) => i + 1);

  const pageChange = (current: number, size: number = props.page.size) => {
    props.setPage(current, size);
  };
  const preORnxt = (tag: number) => {
    if ((props.page.current === 1 && tag === -1) || (props.page.current === props.page.pages && tag === 1)) return;
    props.setPage(props.page.current + tag, props.page.size);
  };
  return (
    <div
      className={`${
        props.page.pages > 1 ? '' : 'hidden'
      } mx-auto rounded bg-white p-4 py-3 flex items-center justify-between border-t border-gray-200 mb-8 sm:mb-0 sm:px-6 w-11/12 sm:w-full`}
    >
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          onClick={() => preORnxt(-1)}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          上一页
        </a>
        <a
          onClick={() => preORnxt(1)}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          下一页
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">第{props.page.current}页，</span>
            <span className="font-medium">共{props.page.pages}页。</span>
            <span className="font-medium">共{props.page.total}条数据</span>
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              onClick={() => preORnxt(-1)}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span>上一页</span>
              {/* <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" /> */}
            </a>
            {pages.map((item, index) => {
              return (
                <a
                  onClick={() => pageChange(item)}
                  key={item}
                  aria-current="page"
                  className={`${
                    item === props.page.current
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-600 border'
                      : 'border border-gray-300'
                  } z-10  relative inline-flex items-center px-4 py-2  text-sm font-medium`}
                >
                  {item}
                </a>
              );
            })}
            <a
              onClick={() => preORnxt(1)}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span>下一页</span>
              {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
