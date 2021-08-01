import { Button, Card, Input, Select, TreeSelect, Checkbox, Radio, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';
const { Option } = Select;

export default function QuestionAdd() {
  const [data, setDate] = useState<API.RepoQuestion>();

  type answer = {
    analysis: string;
    content: string;
    isRight: boolean;
  }[];
  const [answerList, setAnswerList] = useState<answer>([
    {
      analysis: '',
      content: '',
      isRight: false,
    },
    {
      analysis: '',
      content: '',
      isRight: false,
    },
  ]);
  const addAnswer = () => {
    setAnswerList([
      ...answerList,
      {
        analysis: '',
        content: '',
        isRight: false,
      },
    ]);
  };
  const updateAnswer = (index: number, key: string, value: string | boolean) => {
    let cache = [...answerList];
    key === 'content' && typeof value === 'string' ? (cache[index][key] = value) : '';
    key === 'analysis' && typeof value === 'string' ? (cache[index][key] = value) : '';
    key === 'isRight' && typeof value === 'boolean' ? (cache[index][key] = value) : '';
    setAnswerList(cache);
  };
  const deleteAnswer = (index: number) => {
    let cache = [...answerList];
    cache.splice(index, 1);
    setAnswerList(cache);
  };
  const sumbitAnswer = () => {
    console.log(answerList);
  };
  return (
    <div className="flex">
      <div className="p-2 w-2/5">
        <Card size="small">
          <div className="flex justify-between flex-wrap">
            <div className="w-full p-4">
              <Input value={data?.content} onChange={(e) => {}} addonBefore="试题内容" placeholder="输入试题内容" />
            </div>
            <div className="w-full p-4">
              <Input value={data?.analysis} onChange={(e) => {}} addonBefore="试题解析" placeholder="输入试题解析" />
            </div>
            <div className="w-96 p-4">
              {/* 更改为服务器接收选项 */}
              <span className="mx-2">试题类型</span>
              <Select
                onChange={(value) => {
                  setDate({ ...data, quType: value });
                }}
                value={data?.quType}
                className="w-3/4"
              >
                <Option value="1">单选</Option>
                <Option value="2">多选</Option>
                <Option value="3">判断</Option>
                <Option value="4">简答</Option>
                <Option value="5">填空</Option>
              </Select>
            </div>
            <div className="w-96 p-4">
              {/* 更改为服务器接收选项 */}
              <span className="mx-2">试题难度</span>
              <Select onChange={(value) => {}} value={data?.level} className="w-3/4">
                <Option value="1">简单</Option>
                <Option value="2">一般</Option>
                <Option value="3">较难</Option>
                <Option value="4">困难</Option>
              </Select>
            </div>
            <div className="w-96 p-4">
              {/* 更改为服务器接收选项 */}
              <span className="mx-2">所属章节</span>
              <Select disabled onChange={(value) => {}} value={data?.chapterId} className="w-3/4">
                <Option value={`${data?.chapterId}`}>{data?.chapterId_dictText}</Option>
              </Select>
            </div>
            <div className="w-96 p-4">
              <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture" defaultFileList={[]}>
                <Button icon={<UploadOutlined />}>上传图片</Button>
              </Upload>
            </div>
          </div>
        </Card>
      </div>
      {
        /* 5为填空题，无法设置分析，不合理 */
        data?.quType && ['1', '2'].includes(data.quType) && (
          <div className="p-2 w-2/5">
            <Card>
              <Button onClick={() => addAnswer()} type="primary" className="my-2">
                增加选项
              </Button>
              {answerList.map((item, index) => (
                <div className="flex my-3" key={index}>
                  <Button className="flex w-1/5">
                    <span className="mr-1">是否为答案</span>
                    <Checkbox onChange={(e) => updateAnswer(index, 'isRight', e.target.checked)} checked={item.isRight} />
                  </Button>
                  <div className="w-2/5 mx-2">
                    <Input
                      addonBefore="选项内容"
                      value={item.content}
                      onChange={(e) => updateAnswer(index, 'content', e.target.value)}
                    />
                  </div>
                  <div className="w-2/5 mx-2">
                    <Input
                      onChange={(e) => updateAnswer(index, 'analysis', e.target.value)}
                      addonBefore="选项解析"
                      value={item.analysis}
                    />
                  </div>
                  <Button danger onClick={() => deleteAnswer(index)}>
                    删除选项
                  </Button>
                </div>
              ))}
            </Card>
          </div>
        )
      }
      {data?.quType && data.quType === '3' && (
        <div className="p-2 w-2/5">
          <Card>
            {answerList.map((item, index) => (
              <div className="flex my-3" key={index}>
                <Button className="flex w-1/5">
                  <span className="mr-1">是否为答案</span>
                  <Checkbox onChange={(e) => updateAnswer(index, 'isRight', e.target.checked)} checked={item.isRight} />
                </Button>
                <div className="w-2/5 mx-2">
                  <Input
                    addonBefore="选项内容"
                    value={item.content}
                    onChange={(e) => updateAnswer(index, 'content', e.target.value)}
                  />
                </div>
                <div className="w-2/5 mx-2">
                  <Input
                    onChange={(e) => updateAnswer(index, 'analysis', e.target.value)}
                    addonBefore="选项解析"
                    value={item.analysis}
                  />
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}
      {data?.quType && data.quType === '5' && (
        <div className="p-2 w-2/5">
          <Card>
            {answerList.map((item, index) => (
              <div className="flex my-3" key={index}>
                <Button className="flex w-1/5">
                  <span className="mr-1">是否为答案</span>
                  <Checkbox onChange={(e) => updateAnswer(index, 'isRight', e.target.checked)} checked={item.isRight} />
                </Button>
                <div className="w-2/5 mx-2">
                  <Input
                    addonBefore="选项内容"
                    value={item.content}
                    onChange={(e) => updateAnswer(index, 'content', e.target.value)}
                  />
                </div>
                <Button danger onClick={() => deleteAnswer(index)}>
                  删除选项
                </Button>
              </div>
            ))}
          </Card>
        </div>
      )}
      <div className="p-2 w-1/5">
        <Card>
          <Button className="w-full m-2" onClick={() => sumbitAnswer()}>
            下载试题导入模板
          </Button>
          <Button className="w-full m-2" onClick={() => sumbitAnswer()}>
            试题导入
          </Button>
          <Button className="w-full m-2" onClick={() => sumbitAnswer()}>
            试题导出
          </Button>
          <Button className="w-full m-2" type="primary" onClick={() => sumbitAnswer()}>
            提交
          </Button>
        </Card>
      </div>
    </div>
  );
}
