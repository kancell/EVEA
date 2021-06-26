import * as React from 'react'
import { Button } from 'antd';
import "@tailwindcss/postcss7-compat/tailwind.css"

export default function IndexPage() {
  return (
    <div>
      <div className="text-red-500 h-24">asdasdas</div>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <br />
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </div>
  );
}
