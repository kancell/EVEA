import { Button, Card, Input, Select, Space, TreeSelect, DatePicker, Radio } from 'antd';
import React from 'react';
import { history, useLocation } from 'umi';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function examPublish() {
  const location = useLocation();
  const queryData = location as unknown as queryLocation;
  console.log(queryData);
  return (
    <div className="grid grid-flow-row grid-cols-3 grid-rows-1 gap-4">
      <Card title="考试设置" className="col-span-2">
        <div className="flex justify-between flex-wrap px-16">
          <div className="w-96 p-4">
            <Input addonBefore="考试名称" placeholder="输入考试名称" />
          </div>
          <div className="w-96 p-4">
            {/* 更改为服务器接收选项 */}
            <Select defaultValue="正式考试" className="w-full">
              <Option value="正式考试">正式考试</Option>
              <Option value="模拟考试">模拟考试</Option>
            </Select>
          </div>
          <div className="w-full p-4">
            <Radio.Group defaultValue="a">
              <Radio.Button value="a">完全公开</Radio.Button>
              <Radio.Button value="b">部门公开</Radio.Button>
              <Radio.Button value="c">需要密码</Radio.Button>
            </Radio.Group>
          </div>
          <div className="w-96 p-4">
            <TreeSelect
              className="w-full"
              disabled
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="部门选择"
              treeDefaultExpandAll
            />
          </div>
          <div className="w-96 p-4">
            <Input addonBefore="考试密码" disabled placeholder="输入密码" />
          </div>
          <div className="w-96 p-4">
            <Input addonBefore="及格分" placeholder="输入考试及格分" type="number" />
          </div>
          <div className="w-96 p-4">
            <Input addonBefore="考试时长" placeholder="输入考试时长" addonAfter="分钟" type="number" />
          </div>
          <div className="w-96 p-4">
            <Input addonBefore="限考次数" placeholder="输入限考次数" addonAfter="次" type="number" />
          </div>
          <div className="w-96 p-4">
            <Input addonBefore="考试积分" placeholder="输入考试积分" addonAfter="分" type="number" />
          </div>
          <div className="w-96 p-4">
            <Input addonBefore="允许迟到时长" placeholder="" addonAfter="分钟" type="number" />
          </div>
          <div className="w-96 p-4">
            <Input addonBefore="最低交卷时长" placeholder="" addonAfter="分钟" type="number" />
          </div>
          <div className="w-96 p-4">
            <span>考试时间设定：</span>
            <Radio.Group defaultValue="a">
              <Radio.Button value="a">不限考试时间</Radio.Button>
              <Radio.Button value="b">限制考试时间</Radio.Button>
            </Radio.Group>
          </div>
          <div className="w-96 p-4">
            <RangePicker className="w-full" />
          </div>
          <div className="w-full p-4">
            <span>考试结果显示：</span>
            <Radio.Group defaultValue="a">
              <Radio.Button value="a">仅显示感谢文字</Radio.Button>
              <Radio.Button value="b">显示感谢文字与分数</Radio.Button>
              <Radio.Button value="c">显示试卷明细</Radio.Button>
            </Radio.Group>
          </div>
          <div className="w-full p-4">
            <TextArea placeholder="考试注意事项，考前显示" autoSize={{ minRows: 3, maxRows: 5 }} />
          </div>
          <div className="w-full p-4">
            <TextArea placeholder="考试结束显示信息" autoSize={{ minRows: 3, maxRows: 5 }} />
          </div>
        </div>
      </Card>
      <div>
        <Card title="试卷信息">
          <div className="py-1">试卷标题：</div>
          <div className="py-1">试卷总分：</div>
          <div className="py-1">试题数量：</div>
          <div className="py-1">组卷人</div>
        </Card>
        <br></br>
        <Card title="防作弊设置">
          <div className="flex justify-between flex-wrap">
            <div className="w-full p-4">
              <span>考试摄像头：</span>
              <Radio.Group defaultValue="a">
                <Radio.Button value="a">启用</Radio.Button>
                <Radio.Button value="b">不启用</Radio.Button>
              </Radio.Group>
              <div>
                <Input className="py-2" addonBefore="每隔" addonAfter="分钟抓拍一张照片" type="number" />
              </div>
            </div>
            <div className="w-full p-4">
              <span>禁止切屏：</span>
              <Radio.Group defaultValue="a">
                <Radio.Button value="a">启用</Radio.Button>
                <Radio.Button value="b">不启用</Radio.Button>
              </Radio.Group>
              <div className="py-2">
                <Input className="py-2" addonBefore="离开屏幕" addonAfter="秒判定为切屏" type="number" />
                <Input className="py-2" addonBefore="切屏超过" addonAfter="次强制交卷" type="number" />
              </div>
            </div>
            <div className="w-full p-4">
              <span>无操作自动交卷：</span>
              <Radio.Group defaultValue="a">
                <Radio.Button value="a">启用</Radio.Button>
                <Radio.Button value="b">不启用</Radio.Button>
              </Radio.Group>
              <div className="py-2">
                <Input className="py-2" addonAfter="秒无操作强制交卷" type="number" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
