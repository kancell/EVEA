import { Button, Card, Input, Select, TreeSelect, DatePicker, Radio, Modal, message } from 'antd';
import { useState } from 'react';
import { history, useLocation } from 'umi';
import { ExamSimpleInfo, ExamDetail, UpdateExam } from '@/services/examManage';
import { useEffect } from 'react';
import moment from 'moment';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function examPublish() {
  const location = useLocation();
  const queryData = location as unknown as queryLocation;
  const queryId = queryData.query?.id || 'error';
  const queryType = queryData.query?.type || 'error';

  const [verifyVisible, setVerifyVisible] = useState(false);
  const verifyShow = () => {
    setVerifyVisible(true);
  };
  const handleOk = () => {
    submitExamSettingUpdate();
    setVerifyVisible(false);
  };
  const handleCancel = () => {
    setVerifyVisible(false);
  };

  let preflightData = {
    actionInterval: 60,
    actionOn: false,
    answerDevice: 0,
    camInterval: 5,
    camOn: false,
    chance: 1,
    content: '考试信息',
    createBy: '',
    createTime: '',
    dataFlag: 0,
    deptCode: 'A14',
    deptCodes: [],
    endTime: '',
    examType: '1',
    examType_dictText: '',
    handMin: 0,
    hasSaq: false,
    id: '',
    lateMax: 0,
    leaveCheck: 15,
    leaveCount: 3,
    leaveOn: false,
    objScore: 0,
    openType: 1,
    password: '',
    points: 0,
    qualifyScore: 0,
    resultType: 1,
    startTime: '',
    state: 0,
    subjScore: 0,
    thanks: '考试完毕',
    timeLimit: false,
    title: '',
    tmplId: '',
    totalScore: 0,
    totalTime: 30,
    updateBy: '',
    updateTime: '',
  };
  const [examSettingData, setExamSettingData] = useState<API.ExamDetail>(preflightData);
  let addData = {
    tmplId: '',
    departIds: [],
    capture: 0,
    isCapture: true,
  };
  const [addSettingData, setAddSettingData] = useState(addData);

  const [examInfo, setExamInfo] = useState<API.PaperManage>();
  const getExamInfo = async (tmplId: string) => {
    try {
      const result = await ExamSimpleInfo({
        data: {
          id: tmplId,
        },
      });
      setExamInfo(result.data);
      setAddSettingData({ ...addData, tmplId: tmplId });
    } catch (error) {}
  };
  const getExamSettingDetail = async (id: string) => {
    try {
      const result = await ExamDetail({
        data: {
          id: id,
        },
      });
      setExamSettingData(result.data);
      getExamInfo(result.data.tmplId);
    } catch (error) {}
  };
  const submitExamSettingUpdate = async () => {
    /* 提交信息，如果为add，则将addDAta联合updateData提交，如果为update，则单独提交update */
    let submitData = {};
    switch (queryType) {
      case 'update':
        submitData = { ...examSettingData };
        break;
      case 'add':
        submitData = { ...examSettingData, ...addSettingData };
        break;
      default:
        break;
    }

    try {
      const result = await UpdateExam({
        data: submitData,
      });
      if (result.success) {
        message.success(result.msg);
        history.push({
          pathname: '/examManage/exam',
        });
      } else {
        message.warning(result.msg);
      }
    } catch (error) {}
  };
  useEffect(() => {
    console.log(queryType);
    /* 如果为add，则使用preflight作为预设选择，单独请求getExamInfo */
    /* 如果为update，则使用preflight作为预设选择，然后getExamSettingDetail进行更新。更新后请求getExamInfo */
    queryType === 'update' ? getExamSettingDetail(queryId) : getExamInfo(queryId);
  }, []);

  return (
    <>
      <Modal title="确认修改" visible={verifyVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>确认更新考试信息？</p>
      </Modal>
      <div className="grid grid-flow-row grid-cols-3 grid-rows-1 gap-4">
        <Card title="考试设置" className="col-span-2">
          <div className="flex justify-between flex-wrap px-16">
            <div className="w-96 p-4">
              <Input
                value={examSettingData?.title}
                onChange={(e) => {
                  examSettingData && setExamSettingData({ ...examSettingData, title: e.target.value });
                }}
                addonBefore="考试名称"
                placeholder="输入考试名称"
              />
            </div>
            <div className="w-96 p-4">
              {/* 更改为服务器接收选项 */}
              <Select
                onChange={(value) => {
                  examSettingData && setExamSettingData({ ...examSettingData, examType: value.toString() });
                }}
                value={examSettingData.examType}
                defaultValue={'1'}
                className="w-full"
              >
                <Option value="1">正式考试</Option>
                <Option value="2">模拟考试</Option>
              </Select>
            </div>
            <div className="w-full p-4">
              <Radio.Group
                onChange={(e) => {
                  examSettingData && setExamSettingData({ ...examSettingData, openType: e.target.value });
                }}
                value={examSettingData.openType}
                defaultValue={1}
              >
                <Radio.Button value={1}>完全公开</Radio.Button>
                <Radio.Button disabled value={2}>
                  部门公开
                </Radio.Button>
                <Radio.Button value={3}>需要密码</Radio.Button>
              </Radio.Group>
            </div>
            <div className={`w-96 p-4 ${examSettingData.openType === 2 ? '' : 'hidden'}`}>
              <TreeSelect
                className="w-full"
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="部门选择"
                treeDefaultExpandAll
              />
            </div>
            <div className={`w-96 p-4 ${examSettingData.openType === 3 ? '' : 'hidden'}`}>
              <Input
                onChange={(e) => {
                  examSettingData && setExamSettingData({ ...examSettingData, password: e.target.value });
                }}
                value={examSettingData.password}
                addonBefore="考试密码"
                placeholder="输入密码"
              />
            </div>
            <div className="w-96 p-4">
              <Input
                onChange={(e) => {
                  examSettingData && setExamSettingData({ ...examSettingData, qualifyScore: Number(e.target.value) });
                }}
                value={examSettingData.qualifyScore}
                addonBefore="及格分"
                addonAfter="分"
                placeholder="输入考试及格分"
                type="number"
              />
            </div>
            <div className="w-96 p-4">
              <Input
                onChange={(e) => {
                  examSettingData && setExamSettingData({ ...examSettingData, totalTime: Number(e.target.value) });
                }}
                value={examSettingData.totalTime}
                addonBefore="考试时长"
                placeholder="输入考试时长"
                addonAfter="分钟"
                type="number"
              />
            </div>
            <div className="w-96 p-4">
              <Input
                onChange={(e) => {
                  examSettingData && setExamSettingData({ ...examSettingData, chance: Number(e.target.value) });
                }}
                value={examSettingData.chance}
                addonBefore="限考次数"
                placeholder="输入限考次数"
                addonAfter="次（0为不限次数）"
                type="number"
              />
            </div>
            <div className="w-96 p-4">
              <Input
                onChange={(e) => {
                  examSettingData && setExamSettingData({ ...examSettingData, points: Number(e.target.value) });
                }}
                value={examSettingData.points}
                addonBefore="考试积分"
                placeholder="输入考试积分"
                addonAfter="分"
                type="number"
              />
            </div>
            <div className="w-96 p-4">
              <Input
                onChange={(e) => {
                  examSettingData && setExamSettingData({ ...examSettingData, lateMax: Number(e.target.value) });
                }}
                value={examSettingData.lateMax}
                addonBefore="允许迟到时长"
                placeholder=""
                addonAfter="分钟"
                type="number"
              />
            </div>
            <div className="w-96 p-4">
              <Input
                onChange={(e) => {
                  examSettingData && setExamSettingData({ ...examSettingData, handMin: Number(e.target.value) });
                }}
                value={examSettingData.handMin}
                addonBefore="最低交卷时长"
                placeholder=""
                addonAfter="分钟"
                type="number"
              />
            </div>
            <div className="w-96 p-4">
              <span>考试时间设定：</span>
              <Radio.Group
                onChange={(e) => {
                  examSettingData && setExamSettingData({ ...examSettingData, timeLimit: e.target.value });
                }}
                value={examSettingData.timeLimit}
                defaultValue={false}
              >
                <Radio.Button value={false}>不限考试时间</Radio.Button>
                <Radio.Button value={true}>限制考试时间</Radio.Button>
              </Radio.Group>
            </div>
            <div className={`w-96 p-4 ${examSettingData.timeLimit ? '' : 'hidden'}`}>
              <RangePicker
                showTime
                value={[moment(examSettingData.startTime), moment(examSettingData.endTime)]}
                format="YYYY-MM-DD HH:mm"
                onOk={(e) => {
                  if (e === null || e[0] === null || e[1] === null) return;
                  e[0] && setExamSettingData({ ...examSettingData, startTime: e[0].format('YYYY-MM-DD HH:mm') });
                  e[1] && setExamSettingData({ ...examSettingData, startTime: e[1].format('YYYY-MM-DD HH:mm') });
                }}
                className="w-full"
              />
            </div>
            <div className="w-full p-4">
              <span>考试结果显示：</span>
              <Radio.Group
                onChange={(e) => {
                  examSettingData && setExamSettingData({ ...examSettingData, resultType: e.target.value });
                }}
                value={examSettingData.resultType}
                defaultValue={1}
              >
                <Radio.Button value={1}>仅显示感谢文字</Radio.Button>
                <Radio.Button value={2}>显示感谢文字与分数</Radio.Button>
                <Radio.Button value={3}>显示试卷明细</Radio.Button>
              </Radio.Group>
            </div>
            <div className="w-full p-4">
              <TextArea
                onChange={(e) => {
                  examSettingData && setExamSettingData({ ...examSettingData, content: e.target.value });
                }}
                value={examSettingData.content}
                placeholder="考试注意事项，考前显示"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </div>
            <div className="w-full p-4">
              <TextArea
                onChange={(e) => {
                  examSettingData && setExamSettingData({ ...examSettingData, thanks: e.target.value });
                }}
                value={examSettingData.thanks}
                placeholder="考试结束显示信息"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </div>
          </div>
        </Card>
        <div>
          <Button
            onClick={() => {
              verifyShow();
            }}
            type="primary"
            className="w-full mb-2 text-lg"
          >
            提交修改
          </Button>
          <Card title="试卷信息">
            <div className="py-1">试卷标题：{examInfo?.title}</div>
            <div className="py-1">试卷总分：{examInfo?.totalScore}</div>
            <div className="py-1">试题数量：{examInfo?.quCount}</div>
            <div className="py-1">组卷方式：{examInfo?.joinType_dictText}</div>
            <div className="py-1">组卷人：{examInfo?.createBy_dictText}</div>
          </Card>
          <br></br>
          <Card title="防作弊设置">
            <div className="flex justify-between flex-wrap">
              <div className="w-full p-4">
                <span>考试摄像头：</span>
                <Radio.Group
                  onChange={(e) => {
                    examSettingData && setExamSettingData({ ...examSettingData, camOn: e.target.value });
                  }}
                  value={examSettingData.camOn}
                  defaultValue={false}
                >
                  <Radio.Button value={true}>启用</Radio.Button>
                  <Radio.Button value={false}>不启用</Radio.Button>
                </Radio.Group>
                <div className={`${examSettingData.camOn ? '' : 'hidden'}`}>
                  <Input
                    onChange={(e) => {
                      examSettingData && setExamSettingData({ ...examSettingData, camInterval: Number(e.target.value) });
                    }}
                    value={examSettingData.camInterval}
                    className="py-2"
                    addonBefore="每隔"
                    addonAfter="分钟抓拍一张照片"
                    type="number"
                  />
                </div>
              </div>
              <div className="w-full p-4">
                <span>禁止切屏：</span>
                <Radio.Group
                  onChange={(e) => {
                    examSettingData && setExamSettingData({ ...examSettingData, leaveOn: e.target.value });
                  }}
                  value={examSettingData.leaveOn}
                  defaultValue={false}
                >
                  <Radio.Button value={true}>启用</Radio.Button>
                  <Radio.Button value={false}>不启用</Radio.Button>
                </Radio.Group>
                <div className={`py-2 ${examSettingData.leaveOn ? '' : 'hidden'}`}>
                  <Input
                    onChange={(e) => {
                      examSettingData && setExamSettingData({ ...examSettingData, leaveCheck: Number(e.target.value) });
                    }}
                    value={examSettingData.leaveCheck}
                    className="py-2"
                    addonBefore="离开屏幕"
                    addonAfter="秒判定为切屏"
                    type="number"
                  />
                  <Input
                    onChange={(e) => {
                      examSettingData && setExamSettingData({ ...examSettingData, leaveCount: Number(e.target.value) });
                    }}
                    value={examSettingData.leaveCount}
                    className="py-2"
                    addonBefore="切屏超过"
                    addonAfter="次强制交卷"
                    type="number"
                  />
                </div>
              </div>
              <div className="w-full p-4">
                <span>无操作自动交卷：</span>
                <Radio.Group
                  onChange={(e) => {
                    examSettingData && setExamSettingData({ ...examSettingData, actionOn: e.target.value });
                  }}
                  value={examSettingData.actionOn}
                  defaultValue={false}
                >
                  <Radio.Button value={true}>启用</Radio.Button>
                  <Radio.Button value={false}>不启用</Radio.Button>
                </Radio.Group>
                <div className={`py-2 ${examSettingData.actionOn ? '' : 'hidden'}`}>
                  <Input
                    onChange={(e) => {
                      examSettingData && setExamSettingData({ ...examSettingData, actionInterval: Number(e.target.value) });
                    }}
                    value={examSettingData.actionInterval}
                    className="py-2"
                    addonAfter="秒无操作强制交卷"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
