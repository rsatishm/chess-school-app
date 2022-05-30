import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Divider, Breadcrumb } from 'antd'
import { observer, inject, MobXProviderContext } from 'mobx-react'
import InfiniteScroller from 'react-infinite-scroller'

import './problembase-view.less'

import { ConfiguredChessboard } from '../../../../components/chessboard/configured-chessboard'
import { States } from '../../../../components/states/states'
import { ChessTypes } from '../../../../types'

// TODO: Move this method to Chess Lib FEN
const getSideToMove = (fen: ChessTypes.FEN): ChessTypes.Side => {
  return fen.split(' ')[1] as ChessTypes.Side
}

interface State {
  hasMore: boolean
}

export const ProblembaseView = ()=>{
  const {problembaseContentStore} = React.useContext(MobXProviderContext)
  const [state, setState] = React.useState<State>({
    hasMore: true
  })
  const {uuid} = useParams()
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
}