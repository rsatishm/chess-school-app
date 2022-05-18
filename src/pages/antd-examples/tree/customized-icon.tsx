import { Tree } from 'antd';
import {
  DownOutlined,
  FrownOutlined,
  SmileOutlined,
  MehOutlined,
  FrownFilled,
} from '@ant-design/icons';

const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    icon: <SmileOutlined />,
    children: [
      {
        title: 'leaf',
        key: '0-0-0',
        icon: <MehOutlined />,
      },
      {
        title: 'leaf',
        key: '0-0-1',
        icon: (s: any) => {
          const {selected} = s
          return selected? <FrownFilled /> : <FrownOutlined />
        },
      },
    ],
  },
];

export const AntdTreeCustomizedIcon = ()=><Tree
showIcon
defaultExpandAll
defaultSelectedKeys={['0-0-0']}
switcherIcon={<DownOutlined />}
treeData={treeData}
/>