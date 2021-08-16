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
      const answerList: API.RepoAnswer[] = [];

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

  const questionRuleUpdate = (data: API.ChapterGroup[], questionType: string, repoTitle: string = '') => {
    const processData = questionRuleProcess(data, repoTitle);
    const replace: API.RepoQuestionGroupList = {
      anchor: new Date().getTime(),
      title: data[0].title,
      quType: questionType,
      quCount: processData.quCount,
      totalScore: 0,
      perScore: 0,
      quRand: false,
      itemRand: false,
      strictSort: 0,
      pathScore: false,
      quList: [],
      ruleList: processData.ruleList,
    };
    let groupList = paperEditData?.groupList;
    groupList === undefined ? (groupList = [replace]) : groupList.push(replace);
    setPaperEditData({ ...paperEditData, groupList: groupList });
  };

  const questionRuleProcess = (data: API.ChapterGroup[], repoTitle: string) => {
    let quCount = 0;
    const ruleList: API.RepoRule[] = [];
    data?.forEach((chapter) => {
      chapter.levels.forEach((level) => {
        let item: API.RepoRule = {
          quCount: level.quCount,
          title: level.title,
          num: level.num,
          quType: chapter.quType,
          repoId: chapter.repoId,
          repoTitle: repoTitle,
          level: level.level,
          levelTitle: level.title,
          chapterTitle: chapter.title,
          chapterId: chapter.chapterId,
        };
        if (level.num && level.num > 0) {
          quCount += level.num;
          ruleList.push(item);
        }
      });
    });
    return {
      ruleList: ruleList,
      quCount: quCount,
    };
  };

  return {
    paperEditData,
    setPaperEditData,
    questionListUpdate,
    questionRuleUpdate,
  };
}
