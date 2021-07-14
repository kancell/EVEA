import { useState, useCallback } from 'react';

export default function useExamRecordListPagesModel() {
  const [page, setPage] = useState({
    current: 1,
    pages: 1,
    size: 7,
    total: 1,
  });
  return {
    page,
    setPage,
  };
}
