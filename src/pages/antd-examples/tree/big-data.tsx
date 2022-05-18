import { Tree } from 'antd';

const treeData: any[] = [];

for (let i = 0; i < 100; i += 1) {
  const children = [];

  for (let j = 0; j < 100; j += 1) {
    children.push({
      title: `child ${i}-${j}`,
      key: `l-${i}-${j}`,
    });
  }

  treeData.push({
    title: `parent ${i}`,
    key: `l-${i}`,
    children,
  });
}

export const AntdTreeBigData = () => <Tree defaultExpandAll height={400} treeData={treeData} />;