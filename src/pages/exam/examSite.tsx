import { history, useLocation } from 'umi';
import { examContent } from '@/services/exam';
import { useEffect } from 'react';

declare type queryLocation = {
  hash: string;
  key: string;
  pathname: string;
  query?: {
    id: string;
  };
  search: string;
};

export default function ExamSite() {
  const location = useLocation();
  const queryLocationData = location as unknown as queryLocation;

  const queryExamContent = async () => {
    if (queryLocationData.query === undefined) {
      console.log('异常，跳转至首页');
      return;
    }
    try {
      const currentUser = await examContent({
        data: {
          id: queryLocationData.query.id,
        },
      });
      console.log(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    queryExamContent();
  }, []);
  return <div></div>;
}
