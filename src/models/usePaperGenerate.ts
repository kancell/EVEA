import { useState, useCallback } from 'react';

export default function usePaperGenerate() {
  const [questionList, setQuestionList] = useState<API.RepoQuestion[]>();

  return {
    questionList,
    setQuestionList,
  };
}
