import { Button, Card, Input, Select, TreeSelect, DatePicker, Radio, Modal, message } from 'antd';

export default function questionUpdate(prop: { data: API.RepoQuestion }) {
  return (
    <div>
      <Input value={prop.data?.content} onChange={(e) => {}} addonBefore="试题内容" placeholder="输入试题内容" />
    </div>
  );
}
