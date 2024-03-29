import { Chess } from 'chess.js'
import * as R from 'ramda'
import { ChessTypes } from '../../types'
import * as _ChessJS from 'chess.js';
//import { ChessTypes, Chess, Util } from '../'
import * as Util from '../../utils/Util'
import { TextAnnotation } from '../../types/ChessTypes/ChessTypes';

interface EditorState extends ChessTypes.Game {
  currentPath: ChessTypes.PlyPath | null
}

// Each method modifies the state of the game, akin to chess.js
export class GameEditor {
  private state : EditorState;
  constructor(startFen: ChessTypes.FEN = Util.DEFAULT_START_FEN) {
    this.setGame({
      startFen,
      mainline: [],
      meta: {},
      result: '*'
    })
  }

  private _getMoveAtPath(
    path: ChessTypes.PlyPath | null
  ): ChessTypes.Move | null {
    if (path === null || path.length < 1) {
      return null
    }
    console.log("State: " + JSON.stringify(this.state))
    console.log("Path[0]: " + path[0])
    console.log("Path[0][1]: " + path[0][1])
    console.log("State.mainline: " + JSON.stringify(this.state.mainline))
    let currMove = this.state.mainline[path[0][1]]
    console.log("CurrMove at path 0,1 " + JSON.stringify(currMove))
    if (currMove) {
      for (const [i, j] of R.drop(1, path)) {
        if (currMove.variations) {
          currMove = currMove.variations[i][j] as ChessTypes.Move
          if (currMove === null) {
            return null
          }
        }
      }
    }
    console.log("Final curr move " + JSON.stringify(currMove))
    return currMove
  }

  private _getVariationAtPath(
    path: ChessTypes.PlyPath | null
  ): ChessTypes.Variation {
    if (path == null || path.length < 2) {
      return this.state.mainline
    }

    // Remove the last component from the path to get move
    const parentMove = this._getMoveAtPath(R.dropLast(1, path))
    return parentMove!.variations![R.last(path)![0]] as ChessTypes.Variation
  }

  public getVariationAtPath(
    path: ChessTypes.PlyPath | null
  ): ChessTypes.Variation {
    return R.clone(this._getVariationAtPath(path))
  }

  private buildPaths(
    variation: ChessTypes.Variation,
    startAt: ChessTypes.PlyPath
  ): ChessTypes.Variation {
    const pathSuffix = R.last(startAt)!
    const pathPrefix = R.dropLast(1, startAt)
    return variation.map((m, i) => {
      return Util.truncateMoveFields({
        ...m,
        path: [
          ...pathPrefix,
          [pathSuffix[0], pathSuffix[1] + i]
        ] as ChessTypes.PlyPath,
        variations: m.variations
          ? m.variations.map((v, j) => {
              return this.buildPaths(v, [
                ...pathPrefix,
                [pathSuffix[0], pathSuffix[1] + i],
                [j, 0]
              ] as ChessTypes.PlyPath)
            })
          : []
      })
    })
  }

  gotoPath(path: ChessTypes.PlyPath | null) {
    console.log("GoToPath: " + path)
    if (path === null) {
      this.state.currentPath = null
    } else {
      const moveAtPath = this._getMoveAtPath(path)
      console.log("MoveAtPath: " + JSON.stringify(moveAtPath))
      if (moveAtPath != null) {
        this.state.currentPath = path
      }
    }
    console.log("New current path: " + this.state.currentPath)
  }

  getState() {
    return { ...this.state }
  }

  setGame(game: ChessTypes.Game) {
    this.state = {
      startFen: game.startFen || Util.DEFAULT_START_FEN,
      mainline: this.buildPaths(R.clone(game.mainline), [[0, 0]]),
      meta: R.clone(game.meta),
      result: game.result,
      currentPath: null
    }

    if (game.prefixAnnotations) {
      this.state.prefixAnnotations = R.clone(game.prefixAnnotations)
    }
  }

  getMoveAtPath(path: ChessTypes.PlyPath | null): ChessTypes.Move | null {
    return R.clone(this._getMoveAtPath(path))
  }

  addMove(move: ChessTypes.ChessJSVerboseInputMove, illegal = false) {
    const currentMove = this._getMoveAtPath(this.state.currentPath)

    const moveToInsert = (() => {
      const currMoveFen = (currentMove
        ? currentMove.fen
        : this.state.startFen) as ChessTypes.FEN
      try {
        //const g = new Chess(currMoveFen)
        const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
        const g = new ChessJS(currMoveFen)
        const m = g.move(move)

        // insert move as a variation
        if (m != null) {
          return {
            path: [[0, 0]] as ChessTypes.PlyPath,
            side: m.color,
            from: m.from,
            to: m.to,
            san: m.san,
            promotion: m.promotion
              ? (m.promotion.toUpperCase() as ChessTypes.PromotionPiece)
              : undefined,
            variations: [],
            annotations: [],
            fen: g.fen()
          } as ChessTypes.LegalMove
        }
      } catch (e) {}

      // attempt to add illegal move
      if (illegal && R.has('from', move) && R.has('to', move)) {
        const newFen = Util.getUpdatedFenWithIllegalMove(currMoveFen, {
          from: move.from,
          to: move.to,
          promotion: move.promotion
        })
        return {
          type: 'ILLEGAL',
          path: [[0, 0]] as ChessTypes.PlyPath,
          side: Util.getSideToMoveFromFen(currMoveFen),
          from: move.from,
          to: move.to,
          san: `${move.from}-${move.to}`,
          promotion: move.promotion
            ? (move.promotion.toUpperCase() as ChessTypes.PromotionPiece)
            : undefined,
          variations: [],
          annotations: [],
          fen: newFen
        } as ChessTypes.IllegalMove
      }

      return null
    })()

    console.log("Move to insert: " + JSON.stringify(moveToInsert))

    if (moveToInsert != null) {
      console.log("Current path: " + this.state.currentPath)
      if (this.state.currentPath != null) {
        console.log("add 1 to path: " + JSON.stringify(Util.addOneToPath(this.state.currentPath)))
      } else {
        console.log("Path is [[0, 0]]")
      }
      const nextMove = this._getMoveAtPath(
        this.state.currentPath === null
          ? [[0, 0]]
          : Util.addOneToPath(this.state.currentPath)
      )

      if (!nextMove) {
        const variation = this._getVariationAtPath(this.state.currentPath)
        console.log("variation: " + JSON.stringify(variation))
        const newPath =
          variation.length > 0
            ? Util.addOneToPath(variation[variation.length - 1].path)
            : [[0, 0]]
            if (variation.length > 0) {
              console.log("New path, add one to variation: " + JSON.stringify(newPath))
            }
        variation.push( 
          Util.truncateMoveFields({
            ...moveToInsert,
            path: newPath as ChessTypes.PlyPath
          })
        )
        console.log("Variations: " + JSON.stringify(variation))
        this.gotoPath(R.last(variation)!.path)
      } else {
        console.log("Get next move: " + JSON.stringify(nextMove))
        nextMove.variations = nextMove.variations || [] // Create variations array if not exists
        const newPath = [
          ...nextMove.path,
          [nextMove.variations.length, 0]
        ] as ChessTypes.PlyPath
        nextMove.variations.push([
          Util.truncateMoveFields({ ...moveToInsert, path: newPath })
        ])
        console.log("New path: " + JSON.stringify(newPath))
        this.gotoPath(newPath)
      }

      return moveToInsert
    }

    return null
  }

  deleteVariationIntersecting(path: ChessTypes.PlyPath) {
    const variation = this._getVariationAtPath(path)
    if (variation) {
      const firstMove = R.head(variation)

      if (firstMove && firstMove.path.length === 1) {
        this.state.mainline = []
        this.state.currentPath = null
      } else if (firstMove) {
        this.gotoPath(R.dropLast(1, firstMove.path))
        const moveAtPath = this._getMoveAtPath(this.state.currentPath)
        if (moveAtPath && moveAtPath.variations) {
          moveAtPath.variations = R.reject(
            (v: ChessTypes.Variation) =>
              Util.pathEquals(v[0].path, firstMove.path),
            moveAtPath.variations
          )
        }
      }
    }

    this.state.mainline = this.buildPaths(this.state.mainline, [[0, 0]])
  }

  promoteVariationIntersecting(path: ChessTypes.PlyPath) {
    const variation = this._getVariationAtPath(path)
    if (variation) {
      const firstMove = R.head(variation)!

      if (firstMove.path.length <= 1) {
        // Already a mainline
        return
      }

      const branchingPoint = this._getMoveAtPath(R.dropLast(1, firstMove.path))
      if (branchingPoint) {
        const branchingPointPath = R.clone(branchingPoint.path)
        const parentVariation = this._getVariationAtPath(branchingPoint.path)
        const idx = R.findIndex(
          m => Util.pathEquals(m.path, branchingPoint.path),
          parentVariation
        )
        const deletedMoves = parentVariation.splice(
          idx,
          parentVariation.length - idx,
          ...variation
        )
        firstMove.variations = [
          deletedMoves,
          ...(variation[0].variations || []),
          ...R.reject(
            (v: ChessTypes.Variation) => Util.pathEquals(v[0].path, firstMove.path),
            branchingPoint.variations || []
          )
        ]
        branchingPoint.variations = []

        this.state.mainline = this.buildPaths(this.state.mainline, [[0, 0]])
        this.gotoPath(branchingPoint.path)
      }
    }
  }

  setAnnotationsAtPath(
    path: ChessTypes.PlyPath | null,
    annotations: ChessTypes.Annotation[]
  ) {
    if (path) {
      const move = this._getMoveAtPath(path)
      if (move) {
        move.annotations = R.clone(annotations)
      }
    } else {
      this.state.prefixAnnotations = R.clone(annotations)
    }
  }

  next() {
    if (this.state.currentPath === null) {
      this.gotoPath([[0, 0]])
    } else {
      const nextPath = Util.addOneToPath(this.state.currentPath)
      if (this._getMoveAtPath(nextPath)) {
        this.gotoPath(nextPath)
      }
    }
  }

  prev() {
    console.log("Current path is " + this.state.currentPath)
    if (
      Util.pathEquals(this.state.currentPath, [[0, 0]]) ||
      this.state.currentPath === null
    ) {
      this.gotoPath(null)
    } else {
      const lastComponent = R.last(this.state.currentPath)!
      console.log("last component: " + JSON.stringify(lastComponent))
      console.log("Size of last component: " + lastComponent.length)
      if (lastComponent[1] === 0) {
        console.log("dropLast from current path: " + JSON.stringify(R.dropLast(1, this.state.currentPath)))
      } else {
        console.log("Subtract one from path: " + JSON.stringify(Util.subtractOneFromPath(this.state.currentPath)))
      }
      this.gotoPath(
        lastComponent[1] === 0
          ? R.dropLast(1, this.state.currentPath)
          : Util.subtractOneFromPath(this.state.currentPath)
      )
    }
  }

  pgn() {
    console.log(JSON.stringify(this.state))
    //return [this.header(), "\n", this.moves()].join('\n')
    return Util.gameToPGN(this.state)
  }

}
