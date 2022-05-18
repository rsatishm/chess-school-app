import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export const AntdUploadPngOnly = () => {
  const props = {
    beforeUpload: (file: any) => {
      const isPNG = file.type === 'image/png';
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info: any) => {
      console.log(info.fileList);
    },
  };
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Upload png only</Button>
    </Upload>
  );
};