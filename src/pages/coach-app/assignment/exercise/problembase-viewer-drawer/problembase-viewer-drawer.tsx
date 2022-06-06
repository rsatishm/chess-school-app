import * as React from 'react'
import { Button, Drawer} from 'antd'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import InfiniteScroller from 'react-infinite-scroller'

import './problembase-viewer-drawer.less'

import { ProblembaseContentStore } from '../../../../../stores/problembase-content'
import { ConfiguredChessboard } from '../../../../../components/chessboard/configured-chessboard'
import { ChessTypes } from '../../../../../types'
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons'

// TODO: Move this method to Chess Lib FEN
const getSideToMove = (fen: ChessTypes.FEN): ChessTypes.Side => {
  return fen.split(' ')[1] as ChessTypes.Side
}

interface Props {
  problembaseUuid: string
  selectedProblemUuids: string[]
  problembaseContentStore?: ProblembaseContentStore
  onClose: () => any
  onProblemSelect: (uuid: string) => any
  onProblemSelect10: () => any
  onProblemSelectAll: () => any
  onProblemDeselectAll: () => any
  onProblemUnselect: (uuid: string) => any
}

const ProblembaseViewerDrawer = observer((props: Props)=>{
  const {problembaseContentStore} = React.useContext(MobXProviderContext)
  const [state, setState] = React.useState({ hasMore: true })
  let ref : any = {}
  React.useEffect(()=>{
    if (props.problembaseUuid.length > 0) {
      problembaseContentStore!.load(props.problembaseUuid)
    }

    let lastProblem = props.selectedProblemUuids[
      props.selectedProblemUuids.length - 1
    ]

    if (lastProblem && ref[lastProblem]) {
      ref[lastProblem].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
  const handleProblemClick = (uuid: string) => () => {
    if (props.selectedProblemUuids.indexOf(uuid) >= 0) {
      props.onProblemUnselect(uuid)
    } else {
      props.onProblemSelect(uuid)
    }
  }

  const handleLoadMore = async (page: number) => {
    const count = await problembaseContentStore!.loadMore(
      props.problembaseUuid,
      page
    )

    if (!count) {
      setState({ hasMore: false })
    }
  }

  const content = (() => {
    if (
      !props.problembaseUuid ||
      !props.problembaseContentStore!.content[props.problembaseUuid]
    ) {
      return <div className="content" />
    }

    if (
      problembaseContentStore!.content[props.problembaseUuid]
        .loading
    ) {
      return (
        <div className="content">
          <div className="loading-state container">
            <LoadingOutlined spin={true} />
            <p className="exception-text">Loading</p>
          </div>
        </div>
      )
    }

    const problems = problembaseContentStore!.content[
      props.problembaseUuid
    ].problems
    
    return (
      <div className="content">
        <InfiniteScroller
          className="problems-list"
          pageStart={0}
          loadMore={handleLoadMore}
          hasMore={state.hasMore}
          useWindow={false}
        >
          {problems.map((p: any, index: number) => (
            <div
              ref={rf => {
                ref[p.uuid] = rf
              }}
              key={p.uuid}
              className={`problem ${
                props.selectedProblemUuids.indexOf(p.uuid) >= 0
                  ? 'selected'
                  : ''
              }`}
              onClick={handleProblemClick(p.uuid)}
            >
              <div style={{ textAlign: 'center' }}>{index + 1}</div>
              <div className="board">
                <ConfiguredChessboard
                  key={p.uuid}
                  fen={p.meta.startFen}
                  interactionMode="NONE"
                  width={250}
                  height={250}
                  coordinates={false}
                />
              </div>
              <div className="assessment">
                <span
                  className={`side-to-move ${
                    getSideToMove(p.meta.startFen) === 'w' ? 'white' : 'black'
                  }`}
                />
                <span className="result">{p.meta.result}</span>
              </div>
              <div className="overlay">
                <CheckCircleOutlined />
              </div>
            </div>
          ))}
        </InfiniteScroller>
      </div>
    )
  })()

  return (
    <Drawer
      className="problembase-viewer-drawer"
      width={345}
      placement="right"
      maskClosable={false}
      closable={false}
      visible={props.problembaseUuid.length > 0}
    >
      <div className="drawer-inner">
        <div className="title">
          <h3>Select Problems</h3>
        </div>
        <div className="status-bar">
          Selected {props.selectedProblemUuids.length}
          <br />
        </div>
        <div className="select-bar">
          <Button
            size="small"
            className="select-button"
            onClick={props.onProblemSelect10}
          >
            Select 10
          </Button>
          <Button
            size="small"
            className="select-button"
            onClick={props.onProblemSelectAll}
          >
            Select all
          </Button>
          <Button size="small" onClick={props.onProblemDeselectAll}>
            Deselect all
          </Button>
        </div>
        {content}
        <div className="button-bar">
          <Button type="primary" onClick={props.onClose}>
            Done
          </Button>
        </div>
      </div>
    </Drawer>
  )
})
export default ProblembaseViewerDrawer