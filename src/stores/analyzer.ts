import { observable, action, computed, makeObservable } from 'mobx'
import Axios from 'axios'
import { userStore } from './user'
import { Chess } from 'chess.js'


export class AnalyzerStore {
  isLoading = false
  analysisLoaded = false
  noData = false
  errorPresent = false
  analysisData = Array<any>([])
  expandedRowKeys = Array<any>([])
  boardFen = ""
  prevFen = ""
  nextFen = ""

  ANALYZER_URL =
    'https://jxovaf0q31.execute-api.us-east-1.amazonaws.com/dev/analyzegame'
  columns = [
    {
      dataIndex: 'moveNum',
      key: 'moveNum'
    },
    {
      dataIndex: 'move1',
      key: 'move1'
    },
    {
      dataIndex: 'move2',
      key: 'move2'
    },
    {
      dataIndex: 'eval',
      key: 'eval'
    }
  ]
  moves = Array<any>([])
  fen = ''

  constructor() {
    if (this.analysisData.length != 0) {
      this.isLoading = false
      this.analysisLoaded = true
      this.noData = false
      this.errorPresent = false
    } else {
      this.isLoading = false
      this.analysisLoaded = false
      this.noData = true
      this.errorPresent = false
    }

    makeObservable(this, {
      isLoading: observable, 
      analysisLoaded: observable,
      noData: observable,
      errorPresent: observable,
      analysisData: observable,
      expandedRowKeys: observable,
      boardFen: observable,
      pgn: observable,
      setBoardFen: observable,
      setPrevFen: observable,
      setNextFen: observable,
      setExpandedRowKeys: observable,
      resetValues: observable,
      setParams: action.bound,
      fetchData: action.bound
    })
  }

  get pgn() {
    var chess = new Chess(this.fen)
    this.moves.forEach(move => {
      chess.move(move.san)
    })
    return chess.pgn()
  }

  setBoardFen(fen: string) {
    this.boardFen = fen
  }

  setPrevFen(fen: string) {
    this.prevFen = fen
  }

  setNextFen(fen: string) {
    this.nextFen = fen
  }

  setExpandedRowKeys(keys: Array<any>) {
    this.expandedRowKeys = keys
  }

  compareArrays(array1: Array<any>, array2: Array<any>) {
    if (JSON.stringify(array1) != JSON.stringify(array2)) {
      return true
    }
    else {
      return false
    }
  }

  resetValues() {
    this.analysisData = []
    this.analysisLoaded = false
    this.isLoading = false
    this.noData = false
    this.errorPresent = false
  }

  setParams(fen: string, moves: []) {
    this.moves = moves
    this.fen = fen
  }

  async fetchData() {
    console.log(this.fen)
    console.log(this.pgn)
    this.isLoading = true
    this.noData = false
    this.errorPresent = false
    this.analysisLoaded = false
    this.analysisData = []
    let data = {
      fen: this.fen,
      pgn: this.pgn,
      depth: 17,
      userData:
        userStore.username +
        ' ' +
        userStore.firstname +
        ' ' +
        userStore.lastname
    }
    try {
      let result = await Axios.post(this.ANALYZER_URL, data)
      let res = await result.data
      console.log(res)
      let keyVal = 0
      await res.forEach((element: any) => {
        let data = {
          key: keyVal,
          moveNum: element.moveNumber.toString() + '.',
          moveNumber: element.moveNumber,
          move1: '',
          move2: '',
          eval: '',
          bestVar: '',
          bestVarMoves: '',
          bestMove: ''
        }
        let bestMoveText = 'The best move is '

        if (element.type != 'ok') {
          if (element.color === 'w') {
            data.move1 = element.move
            data.move2 = ''
            bestMoveText =
              bestMoveText +
              element.moveNumber.toString() +
              '.  ' +
              element.bestMove
          } else {
            data.move1 = '...'
            data.move2 = element.move
            bestMoveText =
              bestMoveText +
              element.moveNumber.toString() +
              '.  ...  ' +
              element.bestMove
          }
          data.bestMove = bestMoveText
          data.eval = element.type
          data.bestVarMoves = element.bestVarMoves
          this.analysisData.push(data)
        }
        keyVal += 1
      })
      if (this.analysisData.length != 0) {
        this.isLoading = false
        this.analysisLoaded = true
        this.noData = false
        this.errorPresent = false
      } else {
        this.isLoading = false
        this.analysisLoaded = false
        this.noData = true
        this.errorPresent = false
      }
    }
    catch (err) {
      console.error(err)
      this.errorPresent = true
      this.analysisLoaded = false
      this.isLoading = false
      this.noData = false

    }
  }
}

export const analyzerStore = new AnalyzerStore()
