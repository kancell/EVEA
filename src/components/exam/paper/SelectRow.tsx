import { RepoChapterGroup, RepoChapterGroupAdd } from '@/services/examManage';
import { Button, Card, Input } from 'antd';
import { useState, useEffect } from 'react';
import { useModel } from 'umi';

type ChapterGroupParams = {
  excludes?: string[];
  groups?: unknown[];
  quType?: string;
  repoId?: string;
};

export default function SelectRow(props: {
  questionType?: string;
  paperSelectType?: number;
  repoId?: string;
  repoTitle?: string;
  close?: Function;
}) {
  const { questionListUpdate, questionRuleUpdate } = useModel('usePaperGenerate');

  const [chapterGroup, setChapterGroup] = useState<API.ChapterGroup[]>();
  const queryQuestionSum = async (data: ChapterGroupParams) => {
    try {
      const result = await RepoChapterGroup({
        data: data,
      });
      setChapterGroup(result.data);
    } catch (error) {}
  };
  const selectQuestionUpdate = (chapter: number, index: number, value: number) => {
    if (!chapterGroup) return;

    const cacheSelectParams = [...chapterGroup];
    let cache = cacheSelectParams[chapter]?.levels?.[index];
    if (cache !== undefined) {
      cache.num = value;
      setChapterGroup(cacheSelectParams);
    }
  };

  const questionUpdate = async () => {
    /* 初始化选择试题数量 */
    /* 此部分逻辑需要修整 */
    chapterGroup?.forEach((chapter) => {
      chapter.levels.forEach((level) => {
        level.num === undefined ? (level.num = 0) : '';
      });
    });

    switch (props.paperSelectType) {
      case 1:
        if (chapterGroup === undefined || props.questionType === undefined) return;
        questionListUpdate(chapterGroup, props.questionType);
        props.close && props.close();
        break;
      case 3:
        if (chapterGroup === undefined || props.questionType === undefined) return;
        questionRuleUpdate(chapterGroup, props.questionType, props.repoTitle);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let isUnmount = false;
    let params: ChapterGroupParams = {
      excludes: [],
      groups: [],
      quType: props.questionType,
      repoId: props.repoId,
    };
    !isUnmount && queryQuestionSum(params);
    return () => {
      isUnmount = true;
    };
  }, [props.questionType]);

  return (
    <Card type="inner">
      {chapterGroup?.map((chapter, chapterIndex) => (
        <div key={chapter.chapterId} className="my-4">
          <div className="mb-2 text-xl tracking-tight font-extrabold text-gray-900">{chapter.title}</div>
          <div>
            {chapter?.levels.map((item, index) => (
              <div key={index} className="flex w-96 my-2">
                <p className="leading-7 w-16 text-base mx-2">{item.title}</p>
                <Input
                  type="number"
                  value={(chapterGroup && chapterGroup[chapterIndex]?.levels?.[index]?.num) || 0}
                  onChange={(e) => {
                    selectQuestionUpdate && selectQuestionUpdate(chapterIndex, index, Number(e.target.value));
                  }}
                ></Input>
                <p className="leading-8 w-24 text-base mx-2">共{item.quCount}题</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="my-4 w-full">
        <Button
          className="w-64 mx-auto"
          onClick={() => {
            questionUpdate();
          }}
          type="primary"
        >
          添加试题组
        </Button>
      </div>
    </Card>
  );
}
