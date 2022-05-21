import { Carousel } from 'antd';
import { CSSProperties } from 'react';


function onChange(a: number): void {
  console.log(a);
}

const contentStyle: CSSProperties | undefined = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export const AntdCarouselBasic = ()=><Carousel afterChange={onChange}>
<div>
  <h3 style={contentStyle}>1</h3>
</div>
<div>
  <h3 style={contentStyle}>2</h3>
</div>
<div>
  <h3 style={contentStyle}>3</h3>
</div>
<div>
  <h3 style={contentStyle}>4</h3>
</div>
</Carousel>