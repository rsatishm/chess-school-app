import * as React from 'react'
import { UserStore } from '../../../../stores/user'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import { GameHistoryStore } from '../../../../stores/game-history-store'
import { Checkbox, Button } from 'antd'
import { ClCard } from '../../../../components/ui-components/ClCard/ClCard'
import { PreferencesStore } from '../../../../stores/preferences'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

interface Props {
  userStore?: UserStore
  gameHistoryStore?: GameHistoryStore
  preferencesStore?: PreferencesStore
}

interface State {
  displayBoardForHistoryGame: boolean
}

export const HistoryPage = ()=>{
  const [state, setState] = useState<State>({
    displayBoardForHistoryGame: true
  })
  const {userStore, gameHistoryStore, preferencesStore} = useContext(MobXProviderContext)
  const handleLoadMore = () => {
    gameHistoryStore!.gameLoadMore()
  }
  useEffect(()=>{
    if (gameHistoryStore!.games.length == 0) {
      gameHistoryStore!.getGames(0)
    }
  })

  return (
    <>
      <div className="flex flex-wrap overflow-hidden bg-scDarkGrey rounded w-full py-4 px-4 my-2">
        {/* <div className="w-1/2 overflow-hidden sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link">
              {this.state.historyGameSelection
                ? this.state.historyGameSelection
                : 'Select a game'}
            </a>
          </Dropdown>
        </div> */}

        {/* <div className="w-1/2 overflow-hidden sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2"> */}
        <div className="w-full overflow-hidden">
          <Checkbox
            className="float-right"
            onChange={() =>
              setState(prevState => ({
                displayBoardForHistoryGame: !prevState.displayBoardForHistoryGame
              }))
            }
          >
            Hide Chessboard
          </Checkbox>
        </div>
      </div>
      <div className="flex flex-wrap overflow-hidden">
        {gameHistoryStore!.games?.map((game: any) => (
          <div
            key={game.uuid}
            className="my-1 px-1 mt-2 w-full overflow-hidden xs:w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <Link to={`board?gameUuid=${game.gameUuid}`}>
              <ClCard
                type="scorecard"
                displayBoard={state.displayBoardForHistoryGame}
                fen={game.fen}
                style={{
                  primary: preferencesStore!.primaryColor,
                  primaryLight: preferencesStore!.primaryLightColor
                }}
                players={game}
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="w-full my-3">
        <Button
          style={{
            backgroundColor: preferencesStore!.primaryColor,
            color: '#fff'
          }}
          block
          onClick={handleLoadMore}
          loading={gameHistoryStore!.loadingGames}
        >
          {gameHistoryStore!.loadingGames
            ? 'Loading'
            : gameHistoryStore!.hasMore
            ? 'Load More'
            : 'No more data'}
        </Button>
      </div>
    </>
  )
}