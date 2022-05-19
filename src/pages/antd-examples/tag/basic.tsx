import { Tag } from 'antd';

function log(e: any) {
  console.log(e);
}

function preventDefault(e: any) {
  e.preventDefault();
  console.log('Clicked! But prevent default.');
}

export const AntdTagBasic = ()=><>
<Tag>Tag 1</Tag>
<Tag>
  <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
</Tag>
<Tag closable onClose={log}>
  Tag 2
</Tag>
<Tag closable onClose={preventDefault}>
  Prevent Default
</Tag>
</>