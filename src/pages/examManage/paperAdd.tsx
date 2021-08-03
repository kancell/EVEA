import { Button, Card, Input, Select, Form, Drawer, Radio, Modal, message } from 'antd';
import { useState, useEffect } from 'react';
import PaperSelect from '@/components/exam/paper/PaperSelect';
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
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const [paper, setPaper] = useState<Upload>();
  const [nowSelectQuestionType, setNowSelectQuestionType] = useState('1');

  return (
    <>
      <Drawer title="添加试题组" placement="right" closable={false} width={'61.8%'} onClose={onClose} visible={visible}>
        <PaperSelect questionType={nowSelectQuestionType}></PaperSelect>
      </Drawer>
      <Card title="新增试卷">
        <Form>
          <div className="flex">
            <div className="flex w-3/4 mr-8">
              <div className="flex justify-between flex-wrap">
                <div className="w-full m-2">
                  <Form.Item rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input addonBefore="试卷名称" />
                  </Form.Item>
                </div>
                <div className="w-96 m-2">
                  <Form.Item
                    label="试卷分类"
                    name="试卷分类"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Select className="w-full">
                      <Option value="1">正式考试</Option>
                      <Option value="2">模拟考试</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="w-96 m-2">
                  <Form.Item
                    label="组卷方式"
                    name="组卷方式"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Select className="w-full">
                      <Option value="1">正式考试</Option>
                      <Option value="2">模拟考试</Option>
                    </Select>
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
              <div className="w-full my-3 flex justify-between">
                <div className="w-1/2">
                  <Select
                    onChange={(value) => {
                      setNowSelectQuestionType(value);
                    }}
                    className="w-full"
                    defaultValue={nowSelectQuestionType}
                  >
                    <Option value="1">单选题</Option>
                    <Option value="2">多选题</Option>
                    <Option value="3">判断题</Option>
                    <Option value="4">简答题</Option>
                    <Option value="5">填空题</Option>
                  </Select>
                </div>
                <Button type="primary" className="w-1/3" onClick={() => showDrawer()}>
                  添加试题组
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Card>
    </>
  );
}
