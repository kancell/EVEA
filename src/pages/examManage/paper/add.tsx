import { Button, Card, Input, Select, Form, Drawer, Checkbox, Radio, message } from 'antd';
import { useState, useEffect } from 'react';
import PaperSelect from '@/components/exam/paper/PaperSelect';
import { selectOption } from '@/services/selectOption';
import { useModel, history, useLocation } from 'umi';
import QuestionEdit from '@/components/exam/question/QuestionEdit';
import { PaperSave, PaperUpdate } from '@/services/examManage';

const { Option } = Select;

export default function PaperAdd() {
  const { paperEditData, setPaperEditData } = useModel('usePaperGenerate');
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const location = useLocation();
  const queryLocationData = location as unknown as queryLocation;
  const paperEditDataInit = async () => {
    if (queryLocationData.query === undefined) {
      return;
    }
    try {
      const result = await PaperUpdate({
        data: {
          id: queryLocationData.query.id,
        },
      });
      setPaperEditData(result.data);
    } catch (error) {}
  };
  useEffect(() => {
    paperEditDataInit();
  }, []);

  const [nowSelectQuestionType, setNowSelectQuestionType] = useState('1');

  const [joinType, setJoinType] = useState<API.SelectOption[]>();
  const [tmplType, setTmplType] = useState<API.SelectOption[]>();
  const getSelectOption = async () => {
    try {
      const JoinResult = await selectOption({
        data: {
          dicCode: 'join_type',
        },
      });
      setJoinType(JoinResult.data);
      const catLogResult = await selectOption({
        data: {
          dicCode: 'tmpl_catalog',
        },
      });
      setTmplType(catLogResult.data);
    } catch (error) {}
  };
  useEffect(() => {
    getSelectOption();
  }, []);

  useEffect(() => {
    paperSaveParams();
    return () => {
      setPaperEditData(undefined);
    };
  }, [paperEditData?.groupList?.length]);

  const paperSaveParams = () => {
    let quCount: number = 0;
    let totalScore: number = 0;
    paperEditData?.groupList?.forEach((item: API.RepoQuestionGroupList) => {
      item.quCount === undefined ? '' : (quCount += item.quCount);
      item.totalScore === undefined ? '' : (totalScore += item.totalScore);
    });
    setPaperEditData({ ...paperEditData, quCount: quCount, totalScore: totalScore, timeType: 1 });
  };

  const paperSave = async () => {
    try {
      const result = await PaperSave({
        data: paperEditData,
      });
      message.info(result.msg);
      history.push('/examManage/paper');
    } catch (error) {}
  };

  const paperQuestionGroupDelete = (index: number) => {
    const cacheGroupList = paperEditData?.groupList;
    cacheGroupList?.splice(index, 1);
    setPaperEditData({ ...paperEditData, groupList: cacheGroupList });
  };

  return (
    <>
      <Drawer title="添加试题组" placement="right" closable={false} width={'61.8%'} onClose={onClose} visible={visible}>
        <PaperSelect
          close={onClose}
          questionType={nowSelectQuestionType}
          paperSelectType={paperEditData?.joinType}
        ></PaperSelect>
      </Drawer>
      <Card title="新增试卷">
        <div className="flex flex-wrap justify-around">
          <div className="flex flex-wrap max-w-2xl">
            <div className="flex justify-between flex-wrap">
              <div className="flex-grow m-2 w-full">
                <Input
                  onChange={(e) => setPaperEditData({ ...paperEditData, title: e.target.value })}
                  addonBefore="试卷名称"
                  value={paperEditData?.title}
                />
              </div>
              <div className="flex-grow m-2">
                <Radio.Group
                  value={Number(paperEditData?.joinType)}
                  disabled={!(paperEditData?.groupList === undefined || paperEditData?.groupList.length === 0)}
                  onChange={(e) => setPaperEditData({ ...paperEditData, joinType: Number(e.target.value) })}
                >
                  {joinType?.map((item) => (
                    <Radio.Button key={item.id} value={Number(item.value)}>
                      {item.title}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </div>
              <div className="w-48 m-2">
                <Input disabled addonBefore="试卷总分" value={paperEditData?.totalScore} />
              </div>
              <div className="w-48 m-2">
                <Input disabled addonBefore="试题数量" value={paperEditData?.quCount} />
              </div>
              <div className="flex-grow m-2">
                <Select
                  onChange={(value) => {
                    if (!value) return;
                    setPaperEditData({ ...paperEditData, catId: value.toString() });
                  }}
                  placeholder="试卷分类"
                  className="w-full"
                  value={paperEditData?.catId}
                >
                  {tmplType?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.title}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="p-4 border rounded">
            <div className="w-full my-2">
              <Button onClick={() => paperSave()} className="w-full" type="primary" htmlType="submit">
                保存试卷
              </Button>
            </div>
            <div className="w-full my-3 flex flex-wrap justify-between">
              <div className="w-1/2 m-1">
                <Select
                  onChange={(value) => {
                    setNowSelectQuestionType(value);
                  }}
                  className="w-full"
                  value={nowSelectQuestionType}
                >
                  <Option value="1">单选题</Option>
                  <Option value="2">多选题</Option>
                  <Option value="3">判断题</Option>
                  <Option value="4">简答题</Option>
                  <Option value="5">填空题</Option>
                </Select>
              </div>
              <Button
                disabled={paperEditData?.joinType === undefined}
                type="primary"
                className="w-24 m-1"
                onClick={() => showDrawer()}
              >
                添加试题组
              </Button>
            </div>
          </div>
        </div>
      </Card>
      <div className="p-2">
        {paperEditData?.groupList?.map((group: API.RepoQuestionGroupList, index: number) => (
          <div key={index}>
            <div className="my-2 flex flex-wrap bg-white p-2 rounded border">
              <div className="w-64 m-1">
                <Input
                  addonBefore="试题组标题"
                  value={group.title}
                  onChange={(e) => {
                    const groupList = paperEditData?.groupList;
                    if (groupList !== undefined) {
                      groupList[index].title = e.target.value;
                    }
                    setPaperEditData({ ...paperEditData, groupList: groupList });
                  }}
                ></Input>
              </div>
              <div className="flex items-center flex-wrap">
                <span className="m-1">
                  <Input
                    onChange={(e) => {
                      const groupList = paperEditData?.groupList;
                      if (groupList !== undefined && group.quList) {
                        groupList[index].perScore = Number(e.target.value);
                        groupList[index].totalScore = Number(e.target.value) * group.quList.length;
                      }
                      groupList?.forEach((group: API.RepoQuestionGroupList) => {
                        group.quList?.forEach((question) => {
                          question.score = Number(e.target.value);
                        });
                      });
                      setPaperEditData({ ...paperEditData, groupList: groupList });
                      paperSaveParams();
                    }}
                    value={group.perScore}
                    addonBefore="每题得分"
                    addonAfter={`共（${group.quCount}）题，总分（${
                      group.quList && group.perScore && group.quList.length * group.perScore
                    }）分`}
                    type="number"
                  />
                </span>
                <span className="my-1 mx-4">
                  <Checkbox
                    onChange={(e) => {
                      const groupList = paperEditData?.groupList;
                      if (groupList !== undefined) {
                        groupList[index].itemRand = e.target.checked;
                      }
                      setPaperEditData({ ...paperEditData, groupList: groupList });
                    }}
                  >
                    选项乱序
                  </Checkbox>
                </span>
                <span className="my-1">
                  <Checkbox
                    onChange={(e) => {
                      const groupList = paperEditData?.groupList;
                      if (groupList !== undefined) {
                        groupList[index].quRand = e.target.checked;
                      }
                      setPaperEditData({ ...paperEditData, groupList: groupList });
                    }}
                    className="m-1"
                  >
                    试题乱序
                  </Checkbox>
                </span>
                <span className="my-1">
                  <Checkbox
                    onChange={(e) => {
                      const groupList = paperEditData?.groupList;
                      if (groupList !== undefined) {
                        groupList[index].pathScore = e.target.checked;
                      }
                      setPaperEditData({ ...paperEditData, groupList: groupList });
                    }}
                    className="m-1"
                  >
                    错误选项也得分
                  </Checkbox>
                </span>
              </div>
              <Button type="primary" className="m-1 ">
                添加试题
              </Button>
              <Button type="primary" danger className="m-1" onClick={() => paperQuestionGroupDelete(index)}>
                删除本试题组
              </Button>
            </div>

            {group?.quList?.map((question, index) => (
              <QuestionEdit key={question.quId} content={question}></QuestionEdit>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
