import { observable, action, computed, makeObservable } from 'mobx'
import { userStore } from './user'
import {
  getFormattedName,
  getPgnWithMeta,
  downloadFile
} from '../utils/utils'
import _ from 'lodash'
import moment from 'moment'
import { Chess } from 'chess.js'
import { GameResult, GameStatus } from '../types/game'
import  fileDownload from 'js-file-download'

export enum DataStatus {
  LOADING,
  STALE,
  LOADED
}

export class TournamentViewStore {
  tournament: any = {
    players: [],
    pairings: [],
    rankings: []
  }

  detailStatus: DataStatus = DataStatus.STALE
  pairingStatus: DataStatus = DataStatus.STALE
  rankingStatus: DataStatus = DataStatus.STALE

  uuid: string = ''
  constructor() {
    makeObservable(this, {
      tournament: observable,
      detailStatus: observable,
      pairingStatus: observable,
      rankingStatus: observable,
      loadTournament: action.bound,
      loadDetails: action.bound,
      loadPairings: action.bound,
      loadRankings: action.bound,
      setDataAsStale: action.bound,
      downloadTournamentPgn: action.bound,
      refresh: action.bound,
      latestRound: computed,
      latestPairings: computed,
      updateStage: action.bound,
      updatePairingResult: action.bound,
      replayGame: action.bound,
      joinTournament: action.bound,
      exitTournament: action.bound,
      isTournamentOwner: computed,
      hasPlayerJoined: computed,
      isStudentInvited: computed
    })
  }


  // @observable stage = [
  //   'Publish Round 1 pairings',
  //   'Start Round 1',
  //   'Generate Round 1 Results',

  //   'Publish Round 2 pairings',
  //   'Start Round 2',
  //   'Generate Round 2 Results'
  // ]

  // @action.bound
  // async load(uuid: string) {
  //   try {
  //     const response = await userStore
  //       .getApiCoreAxiosClient()!
  //       .get(`/tournaments/${uuid}/view`)

  //     this.tournament = response.data
  //   } catch (e) {
  //     console.error(e)
  //     return false
  //   } finally {
  //     this.loading = false
  //   }
  // }

  loadTournament(uuid: string) {
    this.uuid = uuid
    this.setDataAsStale()
    this.loadDetails()
  }

  async loadDetails() {
    if (this.detailStatus != DataStatus.STALE) {
      return
    }

    this.detailStatus = DataStatus.LOADING

    try {
      const response = await userStore
        .getApiCoreAxiosClient()!
        .get(`/tournaments/${this.uuid}`)

      this.tournament = {
        ...this.tournament,
        ...response.data
      }
    } catch (e) {
      console.error(e)
      return false
    } finally {
      this.detailStatus = DataStatus.LOADED
    }
  }

  async loadPairings(showLoader: boolean = true, forceReload: boolean = false) {
    if (this.pairingStatus != DataStatus.STALE && !forceReload) {
      return
    }

    this.pairingStatus = showLoader ? DataStatus.LOADING : this.pairingStatus
    try {
      const response = await userStore
        .getApiCoreAxiosClient()!
        .get(`/tournaments/${this.uuid}/pairings`)

      this.tournament = {
        ...this.tournament,
        pairings: response.data.records
      }
    } catch (e) {
      console.error(e)
      return false
    } finally {
      this.pairingStatus = DataStatus.LOADED
    }
  }

  async loadRankings() {
    if (this.rankingStatus != DataStatus.STALE) {
      return
    }

    this.rankingStatus = DataStatus.LOADING
    try {
      const response = await userStore
        .getApiCoreAxiosClient()!
        .get(`/tournaments/${this.uuid}/rankings`)

      this.tournament = {
        ...this.tournament,
        rankings: response.data.records
      }
    } catch (e) {
      console.error(e)
      return false
    } finally {
      this.rankingStatus = DataStatus.LOADED
    }
  }

  setDataAsStale() {
    this.detailStatus = DataStatus.STALE
    this.pairingStatus = DataStatus.STALE
    this.rankingStatus = DataStatus.STALE
  }

  async downloadTournamentPgn() {
    if (this.uuid == '') {
      return
    }
    try {
      this.detailStatus = DataStatus.LOADING
      const response = await userStore
        .getApiCoreAxiosClient()!
        .post(`/pgn/download-tournament/${this.uuid}`)

      const fileName = this.tournament.name + '.pgn'

      fileDownload(response.data, fileName)
    } catch (e) {
      console.error(e)
      return false
    } finally {
      this.detailStatus = DataStatus.LOADED
    }
  }

  getMeta(game: any, tournament: any) {
    // get plycount
    const chessInstance = new Chess(game.initial_fen)
    chessInstance.load_pgn(game.pgn || '')
    const plyCount = chessInstance.history().length

    return {
      FEN: game.initial_fen,
      White: getFormattedName(game.white_player),
      Black: getFormattedName(game.black_player),
      Date: moment(game.created_at).format('YYYY.MM.DD'),
      Round: game.round,
      Result: `${game.white_score}-${game.black_score}`,
      PlyCount: plyCount,
      TimeControl: `${tournament.time_control * 60}+${
        tournament.time_increment
      }`,
      Event: tournament.name,
      EventRounds: tournament.rounds
    }
  }

  downloadAllGames() {
    let pgn: string = ''
    _.each(this.tournament.pairings, (games: any[], round: any[]) => {
      games.forEach((game: any) => {
        pgn +=
          getPgnWithMeta(game.pgn, this.getMeta(game, this.tournament)) + '\n'
      })
    })

    downloadFile(this.tournament.name, pgn)
  }

  async refresh() {
    this.setDataAsStale()
    try {
      await Promise.all([
        this.loadDetails(),
        this.loadPairings(),
        this.loadRankings()
      ])

      // liveGamePreview Store.refresh()
    } catch (err) {
      console.error(err)
    }
  }

  get latestRound() {
    try {
      return _.size(this.tournament.pairings)
    } catch {
      return 1
    }
  }

  get latestPairings() {
    if (!this.tournament.pairings || _.size(this.tournament.pairings) == 0) {
      return []
    }

    return this.tournament.pairings[this.latestRound]
  }

  async updateStage() {
    try {
      const response = await userStore
        .getApiCoreAxiosClient()!
        .post(`/coach-tournaments/${this.tournament.uuid}/update-stage`)
    } catch (e) {
      console.error(e)
      return false
    }
  }

  get players() {
    const players = this.tournament.players.map((p: any, index: number) => {
      return {
        ...p,
        key: p.uuid,
        sno: p.sno || '##',
        name: getFormattedName(p)
      }
    })

    return _.orderBy(
      players,
      ['playerStatus', 'groupNo', 'sno'],
      ['desc', 'asc', 'asc']
    )
  }

  async updatePairingResult(pairingUuid: string, resultText: string) {
    let resultValue: string

    if (resultText == '1-0') {
      resultValue = 'white'
    } else if (resultText == '0-1') {
      resultValue = 'black'
    } else {
      resultValue = 'draw'
    }

    let result: GameResult

    if (resultValue == 'draw') {
      result = {
        status: GameStatus.UPDATED_BY_COACH,
        white: 0.5,
        black: 0.5,
        text: 'Game Draw'
      }
    } else {
      result = {
        status: GameStatus.UPDATED_BY_COACH,
        white: resultValue == 'white' ? 1 : 0,
        black: resultValue == 'black' ? 1 : 0,
        text: resultValue == 'white' ? 'White wins' : 'Black wins'
      }
    }

    await userStore
      .getGameServerAxiosClient()!
      .post(`live-games/${pairingUuid}/update-result`, {
        result
      })

    await this.loadPairings(false, true)
  }

  async replayGame(gameId: string, blackTime: number, whiteTime: number) {
    await userStore.getApiCoreAxiosClient()!.post(`pairings/${gameId}/replay`, {
      black_time: blackTime,
      white_time: whiteTime
    })

    await this.loadPairings(false, true)
  }

  async joinTournament() {
    try {
      const payload: any = {
        tournamentUuid: this.tournament.uuid
      }

      await userStore
        .getApiCoreAxiosClient()!
        .post('/student-tournaments/join', payload)

      this.refresh()
    } catch (e) {
      console.error(e)
      return false
    }
  }

  async exitTournament() {
    try {
      const payload: any = {
        tournamentUuid: this.tournament.uuid
      }

      await userStore
        .getApiCoreAxiosClient()!
        .post('/student-tournaments/exit', payload)
      this.refresh()
    } catch (e) {
      console.error(e)
      return false
    }
  }

  get isTournamentOwner() {
    return userStore.uuid == this.tournament.owner_uuid
  }

  get hasPlayerJoined() {
    const currentPlayer: any = this.tournament.players.find(
      (p: any) => p.uuid == userStore.uuid
    )

    return currentPlayer.playerStatus === 'JOINED'
  }

  get isStudentInvited() {
    const currentPlayer: any = this.tournament.players.find(
      (p: any) => p.uuid == userStore.uuid
    )
    return typeof currentPlayer != 'undefined'
  }
}

export const tournamentViewStore = new TournamentViewStore()
