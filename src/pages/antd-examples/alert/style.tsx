import { Alert } from 'antd';
import './style.css'

export const AntdAlertStyle = ()=>{
  return (<>
    <Alert message="Success Text" type="success" />
    <Alert message="Info Text" type="info" />
    <Alert message="Warning Text" type="warning" />
    <Alert message="Error Text" type="error" />
  </>)
}