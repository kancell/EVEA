import { useState, useCallback } from 'react';

export default function usePaperGenerate() {
  const [questionList, setQuestionList] = useState<API.PaperEditParams>();

  return {
    questionList,
    setQuestionList,
  };
}
