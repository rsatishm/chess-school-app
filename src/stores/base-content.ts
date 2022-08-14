import * as jsEnv from 'browser-or-node'
import { observable, action, makeObservable, runInAction } from 'mobx'
import { ChessTypes } from '../types'
import * as PGNParser from '../components/PGNParser/PGNParser'

import { userStore } from './user'

export interface Problem {
  loading: boolean
  content: null | ChessTypes.Game
  error: string
}

export class BaseContentStore {
  content: {
    [uuid: string]: Problem
  } = {}

  constructor(initValues: any = {}) {
    this.content = initValues.content || {}

    makeObservable(this, {
      content: observable,
      load: action.bound
    })
  }

  async load(uuid: string, baseType: 'game' | 'problem' = 'problem') {
    if (!this.content[uuid] || this.content[uuid].error) {
      this.content[uuid] = {
        loading: true,
        content: null,
        error: ''
      }

      try {
        const response = await userStore
          .getApiCoreAxiosClient()!
          .get(`/database/${baseType}/` + uuid)
       const game : ChessTypes.Game = PGNParser.parsePgn(response.data.pgn)
       console.log("GAME: " + JSON.stringify(game))
       runInAction(()=>{
        this.content[uuid] = {
          loading: false,
          content: game,
          error: ''
        }
       })   
      } catch (e) {
        runInAction(()=>{
          this.content[uuid] = {
            loading: false,
            content: null,
            error: `Error loading ${baseType} ${uuid}`
          }
        })

      }
    }
  }
}

export const baseContentStore = new BaseContentStore(
  jsEnv.isBrowser && (window as any).__PRELOADED_STATE__
    ? (window as any).__PRELOADED_STATE__.baseContentStore
    : {}
)
