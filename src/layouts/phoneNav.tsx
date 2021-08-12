import { withRouter } from 'umi';
import { Link } from 'umi';
export default withRouter(({ history, location, match, children }) => {
  const path = location.pathname;
  return (
    <>
      <ul
        className={`fixed flex mb-0 justify-between list-none flex-row w-full bottom-0 md:hidden text-red-400 z-10 ${
          path.includes('/exam/examPaper') ? 'hidden' : ''
        }`}
      >
        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <Link
            to="/"
            className={`border text-xs font-bold px-5 py-3 shadow-lg rounded block leading-normal hover:text-white ${
              path === '/' ? 'bg-red-400 text-white' : 'bg-white'
            }`}
          >
            首页
          </Link>
        </li>
        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <Link
            to="/exam/examList"
            className={`border text-xs font-bold px-5 py-3 shadow-lg rounded block leading-normal hover:text-white ${
              path === '/exam/examList' ? 'bg-red-400 text-white' : 'bg-white'
            }`}
          >
            考试
          </Link>
        </li>
        <li className="-mb-px flex-auto text-center">
          <Link
            to="/exam/examRecordList"
            className={`border text-xs font-bold px-5 py-3 shadow-lg rounded block leading-normal hover:text-white ${
              path === '/exam/examRecordList' ? 'bg-red-400 text-white' : 'bg-white'
            }`}
          >
            成绩
          </Link>
        </li>
      </ul>
    </>
  );
});
