import { observable, action, makeObservable } from 'mobx'
import { userStore } from './user'
import _ from 'lodash'
import accurateInterval from 'accurate-interval'

export class LiveGamePreviewStore {
  games: any[] = []
  tournamentId: string = ''
  round: number = 0
  handle: accurateInterval.AccurateInterval | null = null
  poll: boolean = false

  constructor() {
    makeObservable(this, {
      games: observable,
      poll: observable,
      fetchGames: action.bound,
      setPoll: action.bound
    })
  }

  sub(tournamentId: string, round: number) {
    this.tournamentId = tournamentId
    this.round = round
    this.fetchGames()

    this.handle = accurateInterval(this.fetchGames, 5000, {
      aligned: true,
      immediate: true
    })
  }

  fetchGames = async () => {
    if (!this.poll) {
      return
    }

    const response = await userStore
      .getGameServerAxiosClient()!
      .post(`live-games-preview`, {
        tournament_uuid: this.tournamentId,
        round: this.round
      })

    this.games = _.orderBy(response.data, ['board_no'], 'asc')
  }

  unsub = () => {
    if (this.handle != null) {
      this.handle.clear()
      this.handle = null
    }
  }

  setPoll(newPoll: boolean) {
    this.poll = newPoll
  }
}

export const liveGamePreviewStore = new LiveGamePreviewStore()
