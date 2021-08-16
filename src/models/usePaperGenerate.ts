import { useState, useCallback } from 'react';
import { RepoChapterGroup, RepoChapterGroupAdd } from '@/services/examManage';

export default function usePaperGenerate() {
  const [paperEditData, setPaperEditData] = useState<API.PaperEditParams>();

  const questionListUpdate = async (data: API.ChapterGroup[], questionType: string) => {
    try {
      const result = await RepoChapterGroupAdd({
        data: {
          items: data,
        },
      });
      const replace: API.RepoQuestionGroupList = {
        anchor: new Date().getTime(),
        title: result.data[0].quType_dictText,
        quType: questionType,
        quCount: result.data.length,
        totalScore: 0,
        perScore: 0,
        quRand: false,
        itemRand: false,
        strictSort: 0,
        pathScore: false,
        quList: [...questionResultProcess(result.data)],
        ruleList: [],
      };
      let groupList = paperEditData?.groupList;
      groupList === undefined ? (groupList = [replace]) : groupList.push(replace);

      setPaperEditData({ ...paperEditData, groupList: groupList });
    } catch (error) {}
  };

  const questionResultProcess = (data: API.RepoQuestion[]) => {
    /* 修改上传的参数paperEditData，但有些组件需要显示的数据不包含在paperEditData中，导致显示异常，
      是否需要把上传参数和显示参数分开？
    */
    const processResult = [];
    for (let item of data) {
      const answerList: {
        analysis: string | undefined;
        answerId: string | undefined;
        content: string | undefined;
        image: string | undefined;
        isRight: boolean | undefined;
        pathScore: number;
        tag: string | undefined;
      }[] = [];

      item.answerList?.forEach((item) => {
        const answer = {
          analysis: item.analysis,
          answerId: item.id,
          content: item.content,
          image: item.image,
          isRight: item.isRight,
          pathScore: 0 /* 选错也给分的具体分值 */,
          tag: item.tag,
        };
        answerList.push(answer);
      });
      const cache = {
        analysis: item.analysis,
        answerList: answerList,
        content: item.content,
        quId: item.id,
        quType: item.quType,
      };
      processResult.push(cache);
    }
    return processResult;
  };

  return {
    paperEditData,
    questionListUpdate,
    setPaperEditData,
  };
}
