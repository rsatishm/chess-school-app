import * as jsEnv from 'browser-or-node'
import { observable, action, makeObservable } from 'mobx'
import { userStore } from './user'

export interface DatabaseGameState {
  games: any[]
  loading: boolean
  error: boolean
}

export class GameboxDatabaseGameStore {
  games = [] as any[]
  loading = true
  error = false

  constructor(initState: any = {}) {
    this.games = initState.games || []
    this.loading = initState.loading || true
    this.error = initState.error || false

    makeObservable(this, {
      games: observable,
      loading: observable,
      error: observable,
      load: action.bound
    })
  }

  async load(
    { databaseUuid }: { databaseUuid: string },
    withGames: boolean = false
  ) {
    this.loading = true
    this.error = false

    try {
      const response = await userStore.getApiCoreAxiosClient()!.get(`games`, {
        params: {
          databaseUuid,
          withGames
        }
      })

      response.data.records.map((game: any, index: number) => {
        game.index = index + 1
      })

      this.games = response.data.records
    } catch (e) {
      this.error = true
      return false
    } finally {
      this.loading = false
    }

    return true
  }
}

export const gameboxDatabaseGameStore = new GameboxDatabaseGameStore()
