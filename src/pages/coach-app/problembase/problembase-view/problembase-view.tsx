import * as React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Divider, Breadcrumb } from 'antd'
import { observer, inject, MobXProviderContext } from 'mobx-react'
import InfiniteScroller from 'react-infinite-scroller'

import './problembase-view.less'

import { ConfiguredChessboard } from '../../../../components/chessboard/configured-chessboard'
import { States } from '../../../../components/states/states'
import { ChessTypes } from '../../../../types'
import { BarsOutlined, DatabaseOutlined } from '@ant-design/icons'

// TODO: Move this method to Chess Lib FEN
const getSideToMove = (fen: ChessTypes.FEN): ChessTypes.Side => {
  return fen.split(' ')[1] as ChessTypes.Side
}

interface State {
  hasMore: boolean
}

export const ProblembaseView = observer(()=>{
  const {problembaseContentStore} = React.useContext(MobXProviderContext)
  const [state, setState] = React.useState<State>({
    hasMore: true
  })
  const {uuid} : any = useParams()
  const location = useLocation()
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  React.useEffect(()=>{
    problembaseContentStore!.load(uuid)
  })
  const handleLoadMore = async (page: number) => {
    const count = await problembaseContentStore!.loadMore(
      uuid,
      page
    )
    if (!count) {
      updateState({ hasMore: false })
    }
  }

  const handleRetry = () => {
    problembaseContentStore!.load(uuid)
  }

  const renderProblems = () => {
    return (
      <InfiniteScroller
        className="problems-list"
        pageStart={0}
        hasMore={state.hasMore}
        loadMore={handleLoadMore}
        useWindow={false}
      >
        {problembaseContentStore!.content[uuid as any].problems.map(
          (g: any) => {
            return (
              <div key={g.uuid} className="problem">
                <div className="board">
                  <ConfiguredChessboard
                    fen={g.meta.startFen}
                    interactionMode="NONE"
                    width={250}
                    height={250}
                    coordinates={false}
                  />
                </div>
                <div className="assessment">
                  <span
                    className={`side-to-move ${
                      getSideToMove(g.meta.startFen) === 'w' ? 'white' : 'black'
                    }`}
                  />
                  <span className="result">{g.meta.result}</span>
                </div>
              </div>
            )
          }
        )}
        {/* Dummy problem elements to fill the flex grid */}
        <div className="problem" />
        <div className="problem" />
        <div className="problem" />
        <div className="problem" />
        <div className="problem" />
        <div className="problem" />
      </InfiniteScroller>
    )
  }

  const actionBar = (
    <div className="action-bar">
      <div className="left">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link
              to={location.pathname.replace(
                '/' + uuid,
                ''
              )}
            >
              <DatabaseOutlined/>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <BarsOutlined />
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="right" />
    </div>
  )

  if (
    !problembaseContentStore!.content[uuid] ||
    problembaseContentStore!.content[uuid].loading
  ) {
    return (
      <div className="problembase-view inner">
        {actionBar}
        <Divider className="below-action-bar" />
        <div className="container">
          <States type="loading" />
        </div>
      </div>
    )
  }

  if (problembaseContentStore!.content[uuid].error) {
    return (
      <div className="problembase-view inner">
        {actionBar}
        <Divider className="below-action-bar" />
        <div className="container">
          <States
            type="error"
            exceptionText={
              problembaseContentStore!.content[uuid].error
            }
            onClick={handleRetry}
          />
        </div>
      </div>
    )
  }

  if (
    problembaseContentStore!.content[uuid].problems.length === 0
  ) {
    return (
      <div className="problembase-view inner">
        {actionBar}
        <Divider className="below-action-bar" />
        <div className="container">
          <States
            type="blank"
            icon="database"
            exceptionText="This problembase does not contain any problems"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="problembase-view inner">
      {actionBar}
      <Divider className="below-action-bar" />
      <div className="container">{renderProblems()}</div>
    </div>
  )
})