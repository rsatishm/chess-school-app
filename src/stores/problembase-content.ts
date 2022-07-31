import * as R from 'ramda'
import * as jsEnv from 'browser-or-node'
import { observable, action, makeObservable, runInAction } from 'mobx'

import { userStore } from './user'
import * as _ChessJS from 'chess.js';

export interface ProblembaseContent {
  loading: boolean
  problems: any[]
  error: string
  currentPage: number
}

export class ProblembaseContentStore {
  content: {
    [baseUuid: string]: ProblembaseContent
  } = {}

  constructor(initValues: any = {}) {
    this.content = initValues.content || {}
    makeObservable(this, {
      content: observable,
      load: action.bound
    })
  }

  async load(uuid: string) {
    if (!this.content[uuid] || this.content[uuid].error) {
      this.content[uuid] = {
        loading: true,
        problems: [],
        error: '',
        currentPage: !this.content[uuid] ? 0 : this.content[uuid].currentPage
      }
      try {
        const response = await userStore
          .getApiCoreAxiosClient()!
          .get('/database/problembase/' + uuid + '/problems')

        const records: any[] = response.data.records;
        const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
        const g = new ChessJS()

        const problems: any = records.map((record, index) => {
          const pgnArray: any[] = record.pgn.split("\n")
          const pgn = pgnArray.join('\n')
          const loaded = g.load_pgn(pgn)
          if (!loaded) {
            console.log("Error loading pgn")
            return []
          }
          const header: any = g.header()
          console.log(JSON.stringify(header))
          return {
            uuid: records[index].uuid,
            sno: index + 1,
            meta: {
              white: header['White'],
              black: header['Black'],
              result: header['Result'],
              date: header['Date'],
              site: header['Site'],
              startFen: g.fen()
            },
            pgn
          }
        })

        runInAction(() => {
          this.content[uuid] = {
            loading: false,
            problems,
            error: '',
            currentPage: 1
          }
        })
      } catch (e) {
        runInAction(() => {
          this.content[uuid] = {
            ...this.content[uuid],
            error: `Error loading problembase ${uuid}`
          }
        })
      }
    }
  }

  async loadMore(uuid: string, page: number) {
    if (this.content[uuid] && page >= this.content[uuid].currentPage) {
      try {
        const response = await userStore
          .getApiCoreAxiosClient()!
          .get(
            '/database/problembase/' +
            uuid +
            '/problems?page=' +
            this.content[uuid].currentPage
          )

        const records: any[] = response.data.records;
        const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
        const g = new ChessJS()

        const problems: any = records.map((record, index) => {
          const pgnArray: any[] = record.pgn.split("\n")
          const pgn = pgnArray.join('\n')
          const loaded = g.load_pgn(pgn)
          if (!loaded) {
            console.log("Error loading pgn")
            return []
          }
          const header: any = g.header()
          return {
            uuid: records[index].uuid,
            sno: index + 1,
            meta: {
              white: header['White'],
              black: header['Black'],
              result: header['Result'],
              startFen: g.fen()
            },
            pgn
          }
        })

        runInAction(() => {
          this.content[uuid] = {
            ...this.content[uuid],
            problems: R.uniqBy(p => p.uuid, [
              ...this.content[uuid].problems,
              ...problems
            ]),
            currentPage: this.content[uuid].currentPage + 1
          }
        })

        return response.data.total
      } catch (e) {
        runInAction(() => {
          this.content[uuid] = {
            ...this.content[uuid],
            error: `Error loading problembase ${uuid}`
          }
        })

      }
    }
    return 0
  }

  async loadAllUuids(uuid: string) {
    try {
      const response = await userStore
        .getApiCoreAxiosClient()!
        .get('/database/problembase/' + uuid + '/problems/all')
      // console.log(response.data.records[0].uuid)
      return response.data.records
    } catch (e) {
      return e
    }
  }
}

export const problembaseContentStore = new ProblembaseContentStore(
  jsEnv.isBrowser && (window as any).__PRELOADED_STATE__
    ? (window as any).__PRELOADED_STATE__.problembaseContentStore
    : {}
)
