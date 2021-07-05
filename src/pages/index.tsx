import React, { ReactChild } from 'react';
import { Button } from 'antd';

export default function IndexPage(): ReactChild {
  return (
    <div className="min-h-full min-w-full bg-white">
      <div className="text-red-500 h-96 w-24 bg-red-700">asdasdas</div>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <br />
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </div>
  );
}
