import { observable, action, runInAction, makeObservable } from 'mobx'
import * as GameReader from '../../../../GameReader/GameReader'

import { userStore } from '../../../../stores/user'
import { ChessTypes } from '../../../../types'

export class GameViewerStore {
  private gameReader: GameReader.GameReader

  loading = true
  fen: ChessTypes.FEN | null = null
  currentPath: ChessTypes.PlyPath | null = null
  preAnnotations: ChessTypes.Annotation[] | undefined = undefined
  game: ChessTypes.Game | null = null

  constructor(uuid: string) {
    this.gameReader = new GameReader.GameReader({
      uuid,
      baseUrl: process.env.API_CORE_URL as string,
      jwtProvider: ()=> userStore.getAccessToken()!
    })

    this.gameReader.getStatusStream().subscribe((status: GameReader.Status) => {
      runInAction(() => {
        this.loading = status.loading
        this.fen =
          status.fen ||
          'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
        this.preAnnotations = status.preAnnotations
        this.currentPath = status.currentPath
        this.game = status.game
      })
    })
    makeObservable(this, {
      loading: observable,
      fen: observable,
      currentPath: observable,
      preAnnotations: observable,
      game: observable
    })
  }

  next = () => {
    try {
      this.gameReader.next()
    } catch {}
  }

  fastNext = () => {
    try {
      for (let i = 0; i < 5; i++) this.gameReader.next()
    } catch {}
  }

  prev = () => {
    try {
      this.gameReader.prev()
    } catch {}
  }

  fastPrev = () => {
    try {
      for (let i = 0; i < 5; i++) this.gameReader.prev()
    } catch {}
  }

  getFullMoveNumber = (fen: ChessTypes.FEN) =>
    this.gameReader.getFullMoveNumber(fen)
  getSideToMove = (fen: ChessTypes.FEN) => this.gameReader.getSideToMove(fen)
  goToPath = (path: ChessTypes.PlyPath) => this.gameReader.goToPath(path)
}
