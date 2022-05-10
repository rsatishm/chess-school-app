import { Anchor } from 'antd';
import './basic.css'

const { Link } = Anchor;

export const AntdAnchorBasic = ()=>{
  return (<Anchor>
    <Link href="#components-anchor-demo-basic" title="Basic demo" />
    <Link href="#components-anchor-demo-static" title="Static demo" />
    <Link href="#API" title="API">
      <Link href="#Anchor-Props" title="Anchor Props" />
      <Link href="#Link-Props" title="Link Props" />
    </Link>
  </Anchor>)
}