import { Button } from 'antd';
import React from 'react';
import { useEffect } from 'react';

export default function ChartPage() {
  useEffect(() => console.log(1), []);
  return (
    <div>
      <div className="w-96 mx-auto">
        <Button type="primary" className="w-96">
          开发中
        </Button>
      </div>
    </div>
  );
}
