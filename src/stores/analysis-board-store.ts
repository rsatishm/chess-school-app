import * as jsEnv from 'browser-or-node'
import * as R from 'ramda'
import {
  observable,
  action,
  computed,
  runInAction,
  autorun,
  reaction,
  toJS,
  makeObservable
} from 'mobx'

//import { Util, GameEditor, ChessTypes } from '@chesslang/chess'

import * as _ChessJS from 'chess.js';
import { Chess } from 'chess.js';

import { userStore } from './user'
import { hydrateWithDerviedFields } from '../utils/utils'
//import { TextAnnotation } from '@chesslang/chess/build/ChessTypes/ChessTypes'
import * as GameEditor from '../components/game-editor'
import { ChessTypes } from '../types'
import * as Util from '../utils/Util'
import { TextAnnotation } from '../types/ChessTypes/ChessTypes'
import * as PGNParser from '../components/PGNParser/PGNParser'

export class AnalysisBoardStore {
  // @observable fen: string = Util.DEFAULT_START_FEN
  // @observable mainline
  // @observable currentPath

  editor: GameEditor.GameEditor = new GameEditor.GameEditor()
  state: any
  fen: any
  savedGameDetails: any = null
  undoStack: any = []

  // ref: any
  // unsub: any

  constructor() {
    this.reset()
    makeObservable(this, {
      editor: observable,
      state: observable,
      fen: observable,
      savedGameDetails: observable,
      reset: action.bound,
      move: action.bound,
      loadGame: action.bound,
      loadPublicGame: action.bound,
      saveGame: action.bound,
      updateGame: action.bound,
      setIsPublic: action.bound,
      newGame: action.bound,
      duplicateGame: action.bound,
      isPublic: computed,
      isGameSaved: computed,
      gameName: computed,
      prev: action.bound,
      next: action.bound,
      backward: action.bound,
      forward: action.bound,
      undo: action.bound,
      loadFen: action.bound,
      sideToPlay: computed
    })
  }

  async reset() {
    this.savedGameDetails = null
    this.editor = new GameEditor.GameEditor()
    this.updateState()
  }

  async updateState() {
    this.state = this.editor.getState()
    if (this.state.currentPath === null) {
      this.fen = this.state.startFen || Util.DEFAULT_START_FEN
    }

    const move = this.editor.getMoveAtPath(this.state.currentPath)
    console.log("Move: " + JSON.stringify(move))
    this.fen = move ? move.fen : this.fen
  }

  move(move: ChessTypes.ChessJSVerboseInputMove) {
    var state = this.editor.getState()
    console.log("Current state: " + JSON.stringify(state))
    console.log("Move to: " + JSON.stringify(move))
    this.undoStack.push(JSON.stringify(state))
    this.editor.addMove(move /*, this.allowIllegalMoves */)
    this.updateState()
    // this.updateFirestore()
  }

  calcMovable() {
    // console.log('Calculating possible moves')


    const dests = new Map()
    const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
    const chess = new ChessJS(this.fen)
    chess.SQUARES.forEach(s => {
      const ms = chess.moves({ square: s, verbose: true })
      if (ms.length) dests.set(s, ms.map(m => m.to))
    })
    return {
      free: false,
      dests,
      color: chess.turn() == 'b' ? 'black' : 'white'
    }
    /*
    const dests: any = {}
    
    //const chess = new ChessJs.Chess(this.fen);
    ///const chess = new Chess(this.fen)
    const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
    const chess = new ChessJS(this.fen)

    chess.SQUARES.forEach(s => {
      const ms = chess.moves({ square: s, verbose: true })
      if (ms.length) dests[s] = ms.map(m => m.to)
    })
    const ret = {
      free: false,
      dests,
      color: chess.turn() == 'b' ? 'black' : 'white'
    }

    return ret
    */
  }

  async loadGame(gameUuid: string) {
    try {
      const response = await userStore
        .getApiCoreAxiosClient()!
        .get(`games/${gameUuid}`)

      runInAction(()=>{
        this.savedGameDetails = response.data
      })  

      var gameInLegacyFormat = hydrateWithDerviedFields(
        response.data.meta,
        response.data.content
      )

      this.editor.setGame(gameInLegacyFormat)

      this.updateState()
    } catch (e) {
      return console.error('Error loading game')
    }
  }

  async loadPublicGame(gameUuid: string) {
    try {
      const response = await userStore
        .getApiCoreAxiosClient()!
        .get(`public-games/${gameUuid}`)

      if (response.status == 404) {
        // game not found
        return false
      }

      runInAction(()=>{
        this.savedGameDetails = response.data
      })    

      var gameInLegacyFormat = hydrateWithDerviedFields(
        response.data.meta,
        response.data.content
      )

      this.editor.setGame(gameInLegacyFormat)
      this.updateState()
    } catch (e) {
      console.error('Error loading game')
      return false
    }

    return true
  }

  async saveGame(meta: any, databaseUuid: string) {
    console.log('Saving game to sharebox', databaseUuid)
    var game = stripDerivableFields(toJS(this.state))

    try {
      const response = await userStore.getApiCoreAxiosClient()!.post(`games`, {
        meta: meta,
        content: game,
        databaseUuid: databaseUuid
      })

      runInAction(()=>{
        this.savedGameDetails = response.data
      })
      console.log('Game created ', this.savedGameDetails.uuid)
      return this.savedGameDetails.uuid
    } catch (e) {
      // this.error = true
      // return false
    } finally {
      // this.loading = false
    }
  }

  async updateGame() {
    var game = stripDerivableFields(toJS(this.state))

    try {
      const response = await userStore
        .getApiCoreAxiosClient()!
        .post(`games/${this.savedGameDetails.uuid}`, {
          meta: this.savedGameDetails.meta,
          content: game
        })

      runInAction(()=>{
        this.savedGameDetails = response.data
      })  
      
      console.log('Game updated ', this.savedGameDetails.uuid)
    } catch (e) {
      // this.error = true
      return false
    } finally {
      // this.loading = false
    }

    return true
  }

  async setIsPublic(checked: boolean) {
    try {
      const response = await userStore
        .getApiCoreAxiosClient()!
        .post(`games/${this.savedGameDetails.uuid}/is-public`, {
          isPublic: checked
        })
      
      runInAction(()=>{
        this.savedGameDetails = response.data
      })

      console.log('Game updated ', this.savedGameDetails.uuid)
    } catch (e) {
      return false
    }

    return true
  }

  resetGame() {
    this.loadGame(this.savedGameDetails.uuid)
  }

  async newGame() {
    this.reset()
  }

  async duplicateGame() {
    this.savedGameDetails = null
    return true
  }

  get isPublic() {
    if (this.savedGameDetails != null) {
      return this.savedGameDetails.is_public || false
    }

    return false
  }

  get isGameSaved() {
    return this.savedGameDetails != null
  }

  get gameName() {
    if (this.savedGameDetails != null) {
      console.log(this.savedGameDetails)
      var meta = this.savedGameDetails.meta
      return `${meta.white} - ${meta.black} ${meta.result} ( ${meta.event} )`
    } else {
      return 'New Game'
    }
  }

  async convertToPgn() {
    console.log('Converting to PGN')

    var game = stripDerivableFields(toJS(this.state))
    console.log('Game', game)
  }

  gotoPath(path: ChessTypes.PlyPath | null) {
    this.editor.gotoPath(path)
    this.updateState()
    // this.updateFirestore()
  }

  promoteVariation(path: ChessTypes.PlyPath) {
    this.editor.promoteVariationIntersecting(path)
    this.updateState()
  }

  deleteVariation(path: ChessTypes.PlyPath) {
    this.editor.deleteVariationIntersecting(path)
    this.updateState()
  }

  handleAddComment(path: ChessTypes.PlyPath, text: string) {
    this.editor.setAnnotationsAtPath(path, [
      {
        type: 'TEXT',
        body: text
      } as TextAnnotation
    ])
    this.updateState()
  }

  handleDeleteComment(path: ChessTypes.PlyPath) {
    this.editor.setAnnotationsAtPath(path, [])

    this.updateState()
  }

  prev() {
    console.log("prev: current state=>" + JSON.stringify(this.editor.getState()))
    this.editor.prev()
    this.updateState()
  }

  next() {
    console.log("next")
    this.editor.next()
    this.updateState()
  }

  backward() {
    console.log("backward")
    try {
      for (let i = 0; i < 5; i++) this.editor.prev()
    } catch {}
    this.updateState()
  }

  forward() {
    console.log("forward")
    try {
      for (let i = 0; i < 5; i++) this.editor.next()
    } catch {}
    this.updateState()
  }

  undo() {
    console.log("undo")
    if (this.undoStack.length == 0) {
      return
    }

    var state = JSON.parse(this.undoStack.pop())

    this.editor.setGame(state)
    this.editor.gotoPath(state.currentPath)

    this.updateState()
    // this.updateFirestore()
  }

  // @action.bound
  // toggleHideStudentMoves() {
  //   this.areMovesHiddenForStudents = !this.areMovesHiddenForStudents
  //   this.updateFirestore()
  // }

  // @action.bound
  // setAreMovesHiddenForStudents(val: boolean) {
  //   this.areMovesHiddenForStudents = val
  //   this.updateFirestore()
  // }
  loadFen(fen: ChessTypes.FEN) {
    //const valid = new Chess(fen)
    const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
    const valid = new ChessJS(fen)
    if (valid) {
      this.editor = new GameEditor.GameEditor(fen)
      this.updateState()
      return true
    }
    return false
  }

  loadPgnText(pgnText : string) {
    const game : ChessTypes.Game = PGNParser.parsePgn(pgnText)
    console.log("Game: " + JSON.stringify(game))
    this.editor.setGame(game)
    this.updateState()
  }

  pgn() {
    return this.editor.pgn()
  }

  // @computed
  // get annotationsAtCurrentPath() {
  //   if (this.currentPath) {
  //     const move = this.editor.getMoveAtPath(this.currentPath)
  //     if (move) {
  //       return move.annotations || []
  //     }
  //   }

  //   return []
  //   // return this.currentStatus!.preAnnotations || []
  // }

  get sideToPlay() {
    const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
    const g = new ChessJS(this.fen)
    return g.turn() == 'w' ? 'white' : 'black'
  }

  // TODO: purge later
  // @computed
  // get hasPawnStructureAnnotations() {
  //   const annotations = this.annotationsAtCurrentPath || []
  //   return annotations.filter(a => a.type === 'PAWN_STRUCTURE').length > 0
  // }

  // @computed
  // get squareHighlightAnnotations() {
  //   return (this.annotationsAtCurrentPath.filter(
  //     a => a.type === 'SQUARE_HIGHLIGHT'
  //   ) || []) as ChessTypes.SquareHighlightAnnotation[]
  // }

  // @computed
  // get arrowAnnotations() {
  //   return (this.annotationsAtCurrentPath.filter(a => a.type === 'ARROW') ||
  //     []) as ChessTypes.ArrowAnnotation[]
  // }
}

export function stripDerivableFields(game: ChessTypes.Game) {
  const stripFromVariation = (
    variation: ChessTypes.Variation
  ): ChessTypes.Variation =>
    R.map(m => {
      if (m.variations) {
        return {
          ...R.pick(['from', 'to', 'promotion', 'annotations'], m),
          variations: R.map(stripFromVariation, m.variations)
        } as ChessTypes.Move
      }

      return R.pick(
        ['from', 'to', 'promotion', 'annotations'],
        m
      ) as ChessTypes.Move
    }, variation)

  return {
    ...game,
    mainline: stripFromVariation(game.mainline)
  } as ChessTypes.Game
}

export const analysisBoardStore = new AnalysisBoardStore()
