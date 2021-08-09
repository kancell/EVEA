import InputNumber from '@/components/common/InputNumber';
import { RepoChapterGroup, RepoChapterGroupAdd } from '@/services/examManage';
import { Button, Card, Input } from 'antd';
import { useState, useEffect } from 'react';

type ChapterGroupParams = {
  excludes?: string[];
  groups?: unknown[];
  quType?: string;
  repoId?: string;
};

export default function SelectRow(props: {
  questionType?: string;
  repoId?: string;
  close?: Function;
  update?: Function;
  add?: Function;
  init?: Function;
  initValue?: API.ChapterGroup[];
}) {
  const [chapterGroup, setChapterGroup] = useState<API.ChapterGroup[]>();

  const queryQuestionSum = async (data: ChapterGroupParams) => {
    try {
      const result = await RepoChapterGroup({
        data: data,
      });
      setChapterGroup(result.data);
      props.init && props.init(result.data);
    } catch (error) {}
  };
  useEffect(() => {
    let params: ChapterGroupParams = {
      excludes: [],
      groups: [],
      quType: props.questionType,
      repoId: props.repoId,
    };
    queryQuestionSum(params);
  }, [props.questionType]);
  /* 每次进入时刷新该组件 */

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
                  value={(props.initValue && props.initValue[chapterIndex]?.levels?.[index].num) || 0}
                  onChange={(value) => {
                    props.update && props.update(chapterIndex, index, value.target.value);
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
            props.add && props.add();
          }}
          type="primary"
        >
          添加试题组
        </Button>
      </div>
    </Card>
  );
}
