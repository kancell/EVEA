import { Input } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';

export default function InputNumber(props: { value: number; onChange?: Function }) {
  const [value, setValue] = useState(props.value | 0);
  useEffect(() => {
    if (props.onChange) {
      props.onChange(value);
    }
  }, [value]);
  return (
    <Input
      type="number"
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
        setValue(e.target.value as unknown as number);
      }}
    />
  );
}
