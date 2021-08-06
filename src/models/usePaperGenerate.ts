import { useState, useCallback } from 'react';

export default function usePaperGenerate() {
  const [paperEditData, setPaperEditData] = useState<API.PaperEditParams>();

  return {
    paperEditData,
    setPaperEditData,
  };
}
