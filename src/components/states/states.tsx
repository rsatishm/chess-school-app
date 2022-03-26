import { Button } from 'antd'

import './states.less'
import { observable } from 'mobx'
import { ExceptionOutlined, LoadingOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'

interface Props {
  type: 'loading' | 'blank' | 'error'
  icon?: string
  exceptionText?: string
  button?: string
  onClick?: (e?: any) => any
}

export const States = observer((props: any) => {
  const renderErrorState = () => {
    return (
      <>
        <ExceptionOutlined />
        <p className="exception-text">{props.exceptionText}</p>
        <span className="action-text">
          <Button danger onClick={props.onClick}>
            Retry
          </Button>
        </span>
      </>
    )
  }

  const renderLoadingState = () => {
    return (
      <>
        <LoadingOutlined spin={true} />
        <p className="exception-text">Loading</p>
      </>
    )
  }

  const renderBlankState = () => {
    return (
      <>
        <p className="exception-text">{props.exceptionText}</p>
        {props.button && (
          <span className="action-text">
            <Button type="primary" onClick={props.onClick}>
              {props.button}
            </Button>
          </span>
        )}
      </>
    )
  }

  return (
    <div className="states">
      {props.type === 'error'
        ? renderErrorState()
        : props.type === 'blank'
          ? renderBlankState()
          : renderLoadingState()}
    </div>
  )
})