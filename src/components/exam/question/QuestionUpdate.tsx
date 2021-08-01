import { Button, Card, Input, Select, TreeSelect, DatePicker, Radio, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;

export default function QuestionUpdate(prop: { data: API.RepoQuestion }) {
  return (
    <Card title="试题修改" className="col-span-2" size="small">
      <div className="flex justify-between flex-wrap">
        <div className="w-full p-4">
          <Input value={prop.data?.content} onChange={(e) => {}} addonBefore="试题内容" placeholder="输入试题内容" />
        </div>
        <div className="w-full p-4">
          <Input value={prop.data?.analysis} onChange={(e) => {}} addonBefore="试题解析" placeholder="输入试题解析" />
        </div>
        <div className="w-96 p-4">
          <Input value={prop.data?.quType_dictText} disabled addonBefore="试题类型" />
        </div>
        <div className="w-96 p-4">
          {/* 更改为服务器接收选项 */}
          <span className="mx-2">试题难度</span>
          <Select onChange={(value) => {}} value={prop.data?.level} className="w-3/4">
            <Option value="1">简单</Option>
            <Option value="2">一般</Option>
            <Option value="3">较难</Option>
            <Option value="4">困难</Option>
          </Select>
        </div>
        <div className="w-96 p-4">
          {/* 更改为服务器接收选项 */}
          <span className="mx-2">所属章节</span>
          <Select disabled onChange={(value) => {}} value={prop.data?.chapterId} className="w-3/4">
            <Option value={`${prop.data.chapterId}`}>{prop.data.chapterId_dictText}</Option>
          </Select>
        </div>
        <div className="w-96 p-4">
          <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture" defaultFileList={[]}>
            <Button icon={<UploadOutlined />}>上传图片</Button>
          </Upload>
        </div>
      </div>
    </Card>
  );
}
