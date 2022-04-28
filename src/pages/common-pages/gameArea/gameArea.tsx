import * as React from 'react'
import { Layout, Table, Row, Col } from 'antd'

import './gameArea.less'
import { InvitationPage } from './invitation-page/invitation-page'
import GameBoard from './game-board/game-board'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import { InvitationStore } from '../../../stores/invitation-store'
import { LiveGameStore } from '../../../stores/live-game'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'

const { Content } = Layout

export const GameArea = ()=>{
  const navigate = useNavigate()
  const location = useLocation()
  const {liveGameStore, invitationStore} = useContext(MobXProviderContext)
  console.log(liveGameStore!.currentGameId)

  const handleMenuClick = (link: string) => () => {
    navigate(location.pathname + link)
    //this.props.history.push(this.props.match.url + link)
  }

  const getSelectedItem = () => {
    // if (this.props.location.pathname.indexOf('/my') >= 0) {
    //   return 'my'
    // }

    // if (this.props.location.pathname.indexOf('/shared-with-me') >= 0) {
    //   return 'shared-with-me'
    // }

    return ''
  }

  const inviteOpponent = (uuid: any) => {
    console.log('Invite opponent: ', uuid)
  }

  useEffect(()=>{
    document
      .querySelector('meta[name="viewport"]')!
      .setAttribute('content', 'width=device-width, initial-scale=1.0')
      invitationStore!.getStatisticsInfo()
      return ()=>{
        document.querySelector('meta[name="viewport"]')!.setAttribute('content', '')
      }
  })

  var innerContent = null
  const timeout: number = 30000

  if (liveGameStore!.currentGameId) {
    innerContent = (
      <GameBoard gameId={liveGameStore!.currentGameId} />
    )
  } else {
    innerContent = <InvitationPage timeout={timeout} debounce={0}/>
  }

  return <Content className={`game-area content`}>{innerContent}</Content>
}
