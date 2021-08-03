import { Input } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function InputNumber(props: { value: number; onChange?: Function }) {
  const [value, setValue] = useState(props.value | 0);
  return (
    <Input
      addonBefore={
        <MinusOutlined
          onClick={() => {
            setValue(value - 1);
          }}
        />
      }
      addonAfter={
        <PlusOutlined
          onClick={() => {
            setValue(value + 1);
          }}
        />
      }
      value={value}
      onChange={(e) => {
        console.log(value);
        if (!props.onChange) return;
        props.onChange(e.target.value);
      }}
    />
  );
}
