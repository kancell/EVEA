/* 试题列表，修改和新增 */
import { Button, Card, Input, Select, TreeSelect, Checkbox, Radio, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { RepoQuestionAdd, RepoQuestionDetail } from '@/services/examManage';
const { Option } = Select;

export default function QuestionAdd(props: { type?: string; id?: string; repoId?: string; refresh: Function }) {
  const [answerList, setAnswerList] = useState<API.RepoAnswer[]>([]);
  const [question, setQuestion] = useState<API.RepoQuestion>();
  const InitQuestionData = async () => {
    /* 初始化试题内容，如果类型为update，则取props.id更新question与answerList  */
    if (props.repoId === undefined) return;
    setQuestion({ ...question, tagList: [], repoId: props.repoId });

    if (props.type !== 'update' || props.id === undefined) return;
    try {
      const result = await RepoQuestionDetail({
        data: {
          id: props.id,
        },
      });
      setQuestion({ ...question, ...result.data });
      setAnswerList(result.data.answerList !== undefined ? result.data.answerList : []);
    } catch (error) {}
  };
  useEffect(() => {
    InitQuestionData();
  }, []);

  const addAnswer = () => {
    /* 添加新选项 */
    setAnswerList([
      ...answerList,
      {
        analysis: '',
        content: '',
        isRight: false,
      },
    ]);
  };

  const deleteAnswer = (index: number) => {
    /* 删除选项 */
    let cache = [...answerList];
    cache.splice(index, 1);
    setAnswerList(cache);
  };

  const updateAnswer = (index: number, key: string, value: string | boolean) => {
    /* 更新选项 */
    let cache = [...answerList];
    key === 'content' && typeof value === 'string' ? (cache[index][key] = value) : '';
    key === 'analysis' && typeof value === 'string' ? (cache[index][key] = value) : '';
    key === 'isRight' && typeof value === 'boolean' ? (cache[index][key] = value) : '';
    setAnswerList(cache);
  };

  useEffect(() => {
    /* add模式下，切换题目类型时重置选项列表 */
    if (props.type !== 'add') return;
    switch (question?.quType) {
      case '3':
        setAnswerList([
          ...answerList,
          {
            analysis: '',
            content: '',
            isRight: true,
          },
          {
            analysis: '',
            content: '',
            isRight: false,
          },
        ]);
        break;
      default:
        setAnswerList([]);
    }
  }, [question?.quType]);

  const sumbitAnswer = async () => {
    let cache = { ...question, answerList: answerList };
    try {
      const result = await RepoQuestionAdd({
        data: cache,
      });

      if (result.success) {
        props.refresh();
        message.success(result.msg);
      }
      props.type === 'add' ? setQuestion(undefined) : '';
    } catch (error) {}
  };
  return (
    <div className="flex flex-wrap">
      <div className={`p-2 justify-between ${props.type === 'update' ? 'w-full' : 'w-2/3'}`}>
        <Card size="small">
          <div className="flex justify-between flex-wrap">
            <div className="w-full p-4">
              <Input
                value={question?.content}
                onChange={(e) => {
                  setQuestion({ ...question, content: e.target.value });
                }}
                addonBefore="试题内容"
                placeholder="输入试题内容"
              />
            </div>
            <div className="w-full p-4">
              <Input
                value={question?.analysis}
                onChange={(e) => {
                  setQuestion({ ...question, analysis: e.target.value });
                }}
                addonBefore="试题解析"
                placeholder="输入试题解析"
              />
            </div>
            <div className="w-96 p-4">
              {/* 更改为服务器接收选项 */}
              <span className="mx-2">试题类型</span>
              <Select
                disabled={props.type === 'update'}
                onChange={(value) => {
                  setQuestion({ ...question, quType: value });
                }}
                value={question?.quType}
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
              <Select
                onChange={(value) => {
                  setQuestion({ ...question, level: value });
                }}
                value={question?.level}
                className="w-3/4"
              >
                <Option value="1">简单</Option>
                <Option value="2">一般</Option>
                <Option value="3">较难</Option>
                <Option value="4">困难</Option>
              </Select>
            </div>
            <div className="w-96 p-4">
              {/* 更改为服务器接收选项 */}
              <span className="mx-2">所属章节</span>
              <Select
                disabled
                onChange={(value) => {
                  setQuestion({ ...question, chapterId: value });
                }}
                value={question?.chapterId}
                className="w-3/4"
              >
                <Option value={`${question?.chapterId}`}>{question?.chapterId_dictText}</Option>
              </Select>
            </div>
            <div className="w-96 p-4">
              <Upload
                action={`${process.env.BASEURL}/common/api/file/upload`}
                withCredentials={true}
                listType="picture"
                defaultFileList={[]}
              >
                <Button className="w-48" icon={<UploadOutlined />}>
                  上传图片
                </Button>
              </Upload>
            </div>
          </div>
        </Card>
      </div>
      <div className="p-2 w-96">
        <Card className={`${props.type === 'update' ? 'hidden' : ''}`}>
          <Button className="w-full m-2">下载试题导入模板</Button>
          <Button className="w-full m-2">试题导入</Button>
          <Button className="w-full m-2">试题导出</Button>
        </Card>
      </div>
      {
        /* 5为填空题，无法设置分析，不合理 */
        question?.quType && ['1', '2'].includes(question.quType) && (
          <div className="p-2 w-full">
            <Card>
              <Button onClick={() => addAnswer()} type="primary" className="my-2">
                增加选项
              </Button>
              {answerList.map((item, index) => (
                <div className="flex my-4" key={index}>
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
      {question?.quType && question.quType === '3' && (
        /* 判断 */
        <div className="p-2 w-full">
          <Card>
            {answerList.map((item, index) => (
              <div className="flex my-4" key={index}>
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
      {question?.quType && question.quType === '5' && (
        /* 填空 */
        <div className="p-2 w-full">
          <Card>
            <Button onClick={() => addAnswer()} type="primary" className="my-2">
              增加选项
            </Button>
            {answerList.map((item, index) => (
              <div className="flex my-4" key={index}>
                <Button className="flex w-1/5">
                  <span className="mr-1">是否为答案</span>
                  <Checkbox onChange={(e) => updateAnswer(index, 'isRight', e.target.checked)} checked={item.isRight} />
                </Button>
                <div className="w-4/5 mx-2">
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
      <div className="w-full">
        <Button className="w-96 m-2" size="large" type="primary" onClick={() => sumbitAnswer()}>
          提交
        </Button>
      </div>
    </div>
  );
}
