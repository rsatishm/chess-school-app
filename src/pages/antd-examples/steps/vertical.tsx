import { Steps } from 'antd';

const { Step } = Steps;

export const AntdStepsVertical = ()=><Steps direction="vertical" current={1}>
<Step title="Finished" description="This is a description." />
<Step title="In Progress" description="This is a description." />
<Step title="Waiting" description="This is a description." />
</Steps>