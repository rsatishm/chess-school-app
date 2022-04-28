import * as React from 'react'
import CountUp from 'react-countup'

import { UserStore } from '../../../../stores/user'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import { InvitationStore } from '../../../../stores/invitation-store'
import InviteModal from './invite-modal'
import IdleTimer, { withIdleTimer } from 'react-idle-timer'

import { ClCard } from '../../../../components/ui-components/ClCard/ClCard'
import { Dropdown, Menu, Checkbox } from 'antd'

import { PreferencesStore } from '../../../../stores/preferences'
import { useContext, useEffect, useRef, useState } from 'react'
import { GameAreaStatus } from '../../../../types/game'
import { HistoryPage } from '../historySection/history'

interface Props {
  userStore?: UserStore
  invitationStore?: InvitationStore
  preferencesStore?: PreferencesStore
}
interface State {
  isTimedOut: boolean
  inviteModalVisible: boolean
  acceptInviteModalVisible: boolean
  historyGameSelection: string
  data: any
  currentInvitation: any
  tabKey: number
  displayBoardForHistoryGame: boolean
}

const InvitationPageWrapper = ()=>{  
  const timeout: number = 30000
  const [state, setState] = useState<State>({
    isTimedOut: false,
    inviteModalVisible: false,
    acceptInviteModalVisible: false,
    currentInvitation: {},
    tabKey: 0,
    historyGameSelection: '',
    displayBoardForHistoryGame: true,
    data: [
      // {
      //   key: 1,
      //   uuid: 'abc',
      //   name: 'John Brown'
      // },
    ]
  })
  const {useStore, invitationStore, preferencesStore} = useContext(MobXProviderContext)

  const onAction = (e: any) => {
    if (e.type == 'visibilitychange') {
      if (document.hidden) {
        invitationStore!.sendStatus(GameAreaStatus.AWAY)
      } else {
        invitationStore!.sendStatus(GameAreaStatus.ONLINE)
      }
    }
  }

  const onActive = (e: any) => {
    invitationStore!.sendStatus(GameAreaStatus.ONLINE)
  }

  const onIdle = () => {
    invitationStore!.sendStatus(GameAreaStatus.AWAY)
  }

  useEffect(()=>{
    invitationStore!.getStatisticsInfo()
  })

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
        return { ...prevState, ...newState }
    })
  }

  const inviteOpponent = (uid: any) => () => {
    console.log('invite sent  ', uid)
    updateState({
      inviteModalVisible: true,
      currentInvitation: {
        uid: uid
      }
    })
    return {}
  }

  const handleInviteOk = (color: string, time: number, increment: number) => {
    invitationStore!.sendInvite(
      state.currentInvitation.uid,
      color == 'black' ? 'white' : 'black', //send the opposite color
      time,
      increment
    )
    updateState({
      inviteModalVisible: false
    })
  }

  const handleInviteCancel = () => {
    updateState({
      inviteModalVisible: false
    })
  }

  const handleSelectGame = (record: any) => {
    // this.setState({ historyGameSelection: record.name })
    // this.props.invitationStore!.getGames(record.uuid)
  }

  const renderContent = () => {
    if (state.tabKey == 0) {
      return invitationStore!.onlineUsers.map(
        (user: {
          key: string
          name: string
          uid: string
          status: string
          gameStatus?: { color: string; time: string } | undefined
          stats?: { title: string; value: number }[] | undefined
        }) => (
          <div
            key={user.uid}
            className="my-1 px-1 mt-2 w-full overflow-hidden xs:w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            <ClCard
              type="invite"
              student={user}
              style={{
                primary: preferencesStore!.primaryColor,
                primaryLight: preferencesStore!.primaryLightColor
              }}
              onClick={inviteOpponent(user.uid)}
            />
          </div>
        )
      )
    } else if (state.tabKey == 1) {
      // const menu = (
      //   <Menu>
      //     {this.props.invitationStore!.gamesCollection.records.map(
      //       (record: any) => (
      //         <Menu.Item
      //           key={record.uuid}
      //           onClick={() => this.handleSelectGame(record)}
      //         >
      //           <a>{record.name}</a>
      //         </Menu.Item>
      //       )
      //     )}
      //     {/* <Menu.Divider />
      //     <Menu.Item key="3">3rd menu item</Menu.Item> */}
      //   </Menu>
      // )
      //
      return <HistoryPage />
    } else {
      return <p>Something went wrong!</p>
    }
  }

  return (
    <>
      <div className="flex items-center flex-wrap mx-4 mt-6 bg-scWhite rounded">
        <div className="w-full px-4 pt-3">
          <p className="text-sm">Game Area</p>
        </div>
      </div>
      <div className="flex items-center flex-wrap mx-4 mt-2 bg-scWhite rounded">
        {/* <div className="my-1 py-2 px-4 w-1/2 overflow-hidden sm:w-full md:w-1/2 lg:w-1/4 xl:w-1/4">
          <p className="text-lg">Last Result</p>
          <p className="text-sm">Jane Doe</p>
          <p className="text-3xl">Won, 1-0</p>
        </div> */}

        <div className="my-1 py-2 px-4 w-1/2 overflow-hidden sm:w-full md:w-1/2 lg:w-1/4 xl:w-1/4">
          <p className="text-lg text-center sm:text-left md:text-center lg:text-center xl:text-center">
            Games played today
          </p>
          <div className="text-3xl text-center sm:text-left md:text-center lg:text-center xl:text-center">
            {invitationStore!.statistics?.totalGamesPlayedToday ? (
              <CountUp
                start={0}
                end={
                  invitationStore!.statistics
                    ?.totalGamesPlayedToday
                }
                duration={3}
              />
            ) : (
              <span>0</span>
            )}
          </div>
        </div>

        <div className="my-1 py-2 px-4 w-1/2 overflow-hidden sm:w-full md:w-1/2 lg:w-1/4 xl:w-1/4">
          <p className="text-lg text-center sm:text-left md:text-center lg:text-center xl:text-center">
            Total Games with white pieces
          </p>
          <div className="text-3xl text-center sm:text-left md:text-center lg:text-center xl:text-center">
            {invitationStore!.statistics?.totalAsWhite ? (
              <CountUp
                start={0}
                end={invitationStore!.statistics?.totalAsWhite}
                duration={3}
              />
            ) : (
              <span>0</span>
            )}
          </div>
        </div>

        <div className="my-1 py-2 px-4 w-1/2 overflow-hidden sm:w-full md:w-1/2 lg:w-1/4 xl:w-1/4">
          <p className="text-lg text-center sm:text-left md:text-center lg:text-center xl:text-center">
            Total Games with black pieces
          </p>
          <div className="text-3xl text-center sm:text-left md:text-center lg:text-center xl:text-center">
            {invitationStore!.statistics?.totalAsBlack ? (
              <CountUp
                start={0}
                end={invitationStore!.statistics?.totalAsBlack}
                duration={3}
              />
            ) : (
              <span>0</span>
            )}
          </div>
        </div>

        <div className="my-1 py-2 px-4 w-1/2 overflow-hidden sm:w-full md:w-1/2 lg:w-1/4 xl:w-1/4">
          <p className="text-lg text-center sm:text-left md:text-center lg:text-center xl:text-center">
            All games
          </p>
          <div className="text-3xl text-center sm:text-left md:text-center lg:text-center xl:text-center">
            {invitationStore!.statistics?.totalGame ? (
              <CountUp
                start={0}
                end={invitationStore!.statistics?.totalGame}
                duration={3}
              />
            ) : (
              <span>0</span>
            )}
          </div>
        </div>
      </div>
      <div className="bg-scWhite rounded mx-4 my-2 h-auto">
        <div className="flex flex-wrap mx-4 my-4">
          <ul className="flex overflow-y-auto w-full">
            <li className="mr-6" onClick={() => updateState({ tabKey: 0 })}>
              <a className="text-blue-500 hover:text-blue-800" href="#">
                Students
              </a>
            </li>
            <li className="mr-6" onClick={() => updateState({ tabKey: 1 })}>
              <a className="text-blue-500 hover:text-blue-800" href="#">
                History
              </a>
            </li>
          </ul>
          <div className="w-full overflow-hidden mb-1">
            <div className="border-solid border border-scPurple opacity-25" />
          </div>
          {renderContent()}
        </div>
      </div>
      <InviteModal
        visible={state.inviteModalVisible}
        handleOk={handleInviteOk}
        handleCancel={handleInviteCancel}
      />
    </>
  )

}
export const InvitationPage = withIdleTimer(InvitationPageWrapper)