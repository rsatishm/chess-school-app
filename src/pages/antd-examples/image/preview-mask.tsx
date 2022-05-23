import React from 'react';
import { Image, Space } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';

export function AntdImagePreviewMask() {
  return (
    <Image
      width={96}
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      preview={{
        maskClassName: 'customize-mask',
        mask: (
          <Space direction="vertical" align="center">
            <ZoomInOutlined />
            示例
          </Space>
        ),
      }}
    />
  );
}