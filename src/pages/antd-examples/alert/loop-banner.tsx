import { Alert } from 'antd';
//@ts-ignore
import { TextLoop } from 'react-text-loop-next';
//@ts-ignore
import Marquee from 'react-fast-marquee';

export const AntdAlertLoopBanner = ()=>{
  return (<>
    <Alert
      banner
      message={
        <TextLoop mask>
          <div>Notice message one</div>
          <div>Notice message two</div>
          <div>Notice message three</div>
          <div>Notice message four</div>
        </TextLoop>
      }
    />
    <Alert
      banner
      message={
        <Marquee pauseOnHover gradient={false}>
          I can be a React component, multiple React components, or just some text.
        </Marquee>
      }
    />
  </>)
}