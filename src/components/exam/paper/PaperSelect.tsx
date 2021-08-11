/* 选题抽屉 */
import { RepoManage, RepoChapterGroupAdd } from '@/services/examManage';
import { useState, useEffect } from 'react';
import moment from 'moment';
import SelectRow from '@/components/exam/paper/SelectRow';
import { Button, Card, Input, Select, Form, DatePicker, Radio, Modal, Table } from 'antd';
import { useModel } from 'umi';

const { Option } = Select;

export default function PaperSelect(props: { questionType?: string; paperSelectType?: number; close?: Function }) {
  const [page, setPage] = useState({
    current: 1,
    pages: 1,
    size: 5,
    total: 1,
  });
  const { paperEditData, setPaperEditData } = useModel('usePaperGenerate');
  const [repoList, setRepoList] = useState<API.RepoManagePaging>();

  const queryRepoList = async (current = page.current, size = page.size) => {
    try {
      const currentRepoList = await RepoManage({
        data: {
          current: current,
          size: size,
          params: {
            title: '',
          },
          t: moment().unix(),
        },
      });
      setPage({
        current: currentRepoList.data.current,
        pages: currentRepoList.data.pages,
        size: currentRepoList.data.size,
        total: currentRepoList.data.total,
      });
      setRepoList(currentRepoList.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectParams, setSelectParams] = useState<API.ChapterGroup[]>();

  const chapterParamUpdate = (chapter: number, index: number, value: number) => {
    if (!selectParams) return;

    const cacheSelectParams = [...selectParams];
    let cache = cacheSelectParams[chapter]?.levels?.[index];
    if (cache !== undefined) {
      cache.num = value;
      setSelectParams(cacheSelectParams);
    }
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

  const questionGroupAdd = async () => {
    /* 需要初始化选择试题数量 */
    /* 此部分逻辑需要修整 */
    selectParams?.forEach((chapter) => {
      chapter.levels.forEach((level) => {
        level.num === undefined ? (level.num = 0) : '';
      });
    });

    try {
      const result = await RepoChapterGroupAdd({
        data: {
          items: selectParams,
        },
      });
      let cache = questionResultProcess(result.data);

      let replace: API.RepoQuestionGroupList = {
        anchor: new Date().getTime(),
        title: result.data[0].quType_dictText,
        quType: props.questionType,
        quCount: result.data.length,
        totalScore: 0,
        perScore: 0,
        quRand: false,
        itemRand: false,
        strictSort: 0,
        pathScore: false,
        quList: [...cache],
      };
      let groupList = paperEditData?.groupList;
      groupList === undefined ? (groupList = [replace]) : groupList.push(replace);

      setPaperEditData({ ...paperEditData, groupList: groupList });
      props.close && props.close();
    } catch (error) {}
  };

  useEffect(() => {
    queryRepoList();
  }, [props.paperSelectType, props.questionType]);

  const columns = [
    {
      title: '题库名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '试题数量',
      dataIndex: 'quCount',
      key: 'quCount',
    },
    {
      title: '操作',
      key: 'update',
      render: (text: unknown, record: API.RepoManage) => {
        return (
          <>
            <Button type="primary" className="mx-1">
              选定
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="w-full my-4  flex">
        <div className="w-64">
          <Select disabled className="w-64 w-64" value={props.questionType}>
            <Option value="1">单选题</Option>
            <Option value="2">多选题</Option>
            <Option value="3">判断题</Option>
            <Option value="4">简答题</Option>
            <Option value="5">填空题</Option>
          </Select>
        </div>
        <div className="ml-2 w-64">
          <Select disabled className="w-64" value={props.paperSelectType}>
            <Option value={1}>抽题组卷</Option>
            <Option value={2}>选题组卷</Option>
            <Option value={3}>随机组卷</Option>
          </Select>
        </div>
      </div>
      <Card>
        <div className="flex">
          <div className="flex-grow">
            {repoList && (
              <Table
                size="small"
                bordered
                columns={columns}
                dataSource={repoList.records}
                rowKey={'id'}
                expandable={{
                  expandRowByClick: true,
                  expandedRowRender: (record) => (
                    <SelectRow
                      key={record.id}
                      questionType={props.questionType}
                      repoId={record.id}
                      close={props.close}
                      update={chapterParamUpdate}
                      add={questionGroupAdd}
                      init={setSelectParams}
                      initValue={selectParams}
                    ></SelectRow>
                  ),
                  rowExpandable: (record) => true,
                }}
                pagination={{ defaultCurrent: page.current, defaultPageSize: page.size, total: page.total }}
                onChange={(pagination) => {
                  queryRepoList(pagination.current, pagination.pageSize);
                }}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
