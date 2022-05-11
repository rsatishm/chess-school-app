import { BackTop } from 'antd';

const s = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};


export const AntdBackTopCustom = ()=>
<div style={{ height: '600vh', padding: 8 }}>
<div>Scroll to bottom</div>
<div>Scroll to bottom</div>
<div>Scroll to bottom</div>
<div>Scroll to bottom</div>
<div>Scroll to bottom</div>
<div>Scroll to bottom</div>
<div>Scroll to bottom</div>
<BackTop>
  <div style={{
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
}}>UP</div>
</BackTop>
</div>