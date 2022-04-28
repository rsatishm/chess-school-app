import { observable, action, makeObservable } from 'mobx'
import { userStore } from './user'

export class GameHistoryStore {
  games: any = []
  selectedGame: any
  hasMore = false
  pageNumber = 0
  loadingGames = false

  constructor() {
    makeObservable(this, {
      games: observable,
      selectedGame: observable,
      hasMore: observable,
      pageNumber: observable,
      loadingGames: observable,
      getGames: action.bound,
      gameLoadMore: action.bound
    })
  }

  async getGames(page: number) {
    this.loadingGames = true
    const res = await userStore
      .getApiCoreAxiosClient()!
      .get(`/platform-games?page=${page}`)
    if (res?.data) {
      this.games = [].concat(this.games, res.data.records)
    }
    this.loadingGames = false
    this.hasMore = res?.data.total !== 0
  }

  async gameLoadMore() {
    if (this.hasMore) {
      this.pageNumber = this.pageNumber + 1
      this.getGames(this.pageNumber)
    }
  }
}

export const gameHistoryStore = new GameHistoryStore()
