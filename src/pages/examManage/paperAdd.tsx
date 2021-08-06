import { Button, Card, Input, Select, Form, Drawer, Checkbox, Radio, message } from 'antd';
import { useState, useEffect } from 'react';
import PaperSelect from '@/components/exam/paper/PaperSelect';
import { selectOption } from '@/services/selectOption';
import { useModel } from 'umi';
import QuestionEdit from '@/components/exam/question/QuestionEdit';
const { Option } = Select;

type Upload = {
  quCount: number;
  totalScore: number;
  title: string;
  joinType: number;
  catId: string;
  timeType: number;
  groupList: API.QuestionGroup[];
};

export default function PaperAdd() {
  const { paperEditData, setPaperEditData } = useModel('usePaperGenerate');
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const [paper, setPaper] = useState<Upload>();
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

  const questionGroupAdd = () => {};

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
        <Form>
          <div className="flex">
            <div className="flex w-3/4 mr-8">
              <div className="flex justify-between flex-wrap">
                <div className="w-full m-2">
                  <Form.Item rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input addonBefore="试卷名称" value={paperEditData?.title} />
                  </Form.Item>
                </div>
                <div className="w-96 m-2">
                  <Form.Item
                    label="试卷分类"
                    name="试卷分类"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Select className="w-full">
                      {tmplType?.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.title}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-96 m-2">
                  <Form.Item
                    label="组卷方式"
                    name="组卷方式"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    initialValue={'1'}
                  >
                    <Radio.Group
                      value={paperEditData?.joinType}
                      disabled={!(paperEditData?.groupList === undefined || paperEditData?.groupList.length === 0)}
                      onChange={(e) => setPaperEditData({ ...paperEditData, joinType: e.target.value })}
                    >
                      {joinType?.map((item) => (
                        <Radio.Button key={item.id} value={item.value}>
                          {item.title}
                        </Radio.Button>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div className="w-96 mx-2"></div>
              </div>
            </div>
            <div className="w-1/4 p-4 border rounded">
              <div className="w-full my-2">
                <Form.Item>
                  <Button className="w-full" type="primary" htmlType="submit">
                    保存试卷
                  </Button>
                </Form.Item>
              </div>
              <div className="w-full my-3 flex flex-wrap justify-between">
                <div className="w-1/2">
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
                <Button type="primary" className="w-24" onClick={() => showDrawer()}>
                  添加试题组
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Card>
      <div className="p-2">
        {paperEditData?.groupList?.map((group, index) => (
          <div key={index}>
            <div className="my-2 flex flex-wrap bg-white p-2 rounded border">
              <div className="w-64">
                <Input addonBefore="试题组标题" value={group.title}></Input>
              </div>

              <div className="flex items-center">
                <span className="w-36 mx-2">
                  <Input addonBefore="每题得分" type="number" />
                </span>
                <Checkbox className="">选项乱序</Checkbox>
                <Checkbox>试题乱序</Checkbox>
                <Checkbox>错误选项也得分</Checkbox>
              </div>
              <Button type="primary" className="mx-3">
                添加试题
              </Button>
            </div>

            {group?.quList?.map((question) => (
              <QuestionEdit key={question.id} content={question}></QuestionEdit>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
