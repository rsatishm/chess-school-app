import * as R from 'ramda'
import { action, makeObservable, observable, runInAction } from 'mobx'

import { userStore } from './user'
import { ChessTypes } from '../types'
import { Chess, ShortMove } from 'chess.js'
import * as Util from '../utils/Util'

export class EngineStore {
  MIN_DEPTH = 10
  MAX_DEPTH = 24

  evals: {
    [fen: string]: any
  } = {}

  constructor() {
    makeObservable(this, {
      evals: observable,
      load: action.bound
    })
  }

  private evalExists({ fen, depth }: { fen: ChessTypes.FEN; depth: number }) {
    return (
      this.evals[fen] &&
      this.evals[fen].depth >= depth &&
      !this.evals[fen].error
    )
  }

  private parsePv(pv: string): ShortMove  {
    const from = `${pv[0]}${pv[1]}`
    const to = `${pv[2]}${pv[3]}`
    const promotion = pv.length > 4 ? pv[4] : undefined
    return (promotion ? { from, to, promotion } : { from, to }) as ShortMove
  }

  private parseEval(fen: ChessTypes.FEN, engineLine: string) {
    const parts = engineLine.split(' ')
    const score = (() => {
      const idx = parts.indexOf('score')
      if (parts[idx + 1] === 'mate')
        return `#${parts[idx + 2]}`.replace('-', '')
      if (parts[idx + 1] === 'cp') {
        const s = parseInt(parts[idx + 2] || '0', 10) / 100
        const x = Util.getSideToMoveFromFen(fen) === 'b' ? -1 * s : s
        return x < 0 ? `${x.toFixed(2)}` : `+${x.toFixed(2)}`
      }
      return 0
    })()
    const mainline = (() => {
      const idx = parts.indexOf('pv')
      const g = new Chess(fen)
      return R.drop(idx + 1, parts).map(pv => g.move(this.parsePv(pv)))
    })()

    return { score, mainline }
  }

  async load({ fen, depth }: { fen: ChessTypes.FEN; depth: number }) {
    if (!this.evalExists({ fen, depth })) {
      this.evals[fen] = {
        depth,
        loading: true,
        error: ''
      }

      try {
        const response = await userStore
          .getAxiosClient()!
          .post('/stockfish/api/v1/go', { fen, depth })
          runInAction(()=>{
            this.evals[fen] = {
              depth,
              loading: false,
              error: '',
              result: this.parseEval(fen, response.data.line)
            }
          })
      } catch (e) {
        runInAction(()=>{
          this.evals[fen] = {
            depth,
            loading: false,
            error: 'Failed to load engine evaluation'
          }
        })
      }
    }
  }

  async go({ fen, depth }: { fen: ChessTypes.FEN; depth: number }) {
    try {
      const response = await userStore
        .getAxiosClient()!
        .post('/stockfish/api/v1/go', { fen, depth })
      return {
        error: '',
        result: this.parseEval(fen, response.data.line)
      }
    } catch (e) {
      return {
        depth,
        error: 'Failed to load engine evaluation'
      }
    }
  }
}

export const engineStore = new EngineStore()
