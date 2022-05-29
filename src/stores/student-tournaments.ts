import { observable, computed, action, makeObservable } from 'mobx'
import { userStore } from './user'

export class StudentTournamentStore {
  tournaments: Array<any> = []

  constructor() {
    makeObservable(this, {
      tournaments: observable,
      load: action.bound,
      activeTournaments: computed,
      joinTournament: computed,
      exitTournament: action.bound,
      currentTournaments: computed,
      pastTournaments: computed,
      upcomingTournments: computed
    })
  }

  async load() {
    try {
      const response = await userStore
        .getApiCoreAxiosClient()!
        .get('/student-tournaments')

      this.tournaments = response.data.records.map((r: any) => {
        return { ...r, key: r.uuid }
      })
    } catch (e) {
      console.error(e)
      return false
    }
  }

  get activeTournaments() {
    return this.tournaments.filter(
      t => t.status == 'CURRENT' || t.status == 'UPCOMING'
    )
  }

  async joinTournament(uuid: string) {
    try {
      const payload: any = {
        tournamentUuid: uuid
      }

      console.log(uuid)

      await userStore
        .getApiCoreAxiosClient()!
        .post('/student-tournaments/join', payload)

      this.load()
    } catch (e) {
      console.error(e)
      return false
    }
  }

  async exitTournament(uuid: string) {
    try {
      const payload: any = {
        tournamentUuid: uuid
      }

      await userStore
        .getApiCoreAxiosClient()!
        .post('/student-tournaments/exit', payload)
    } catch (e) {
      console.error(e)
      return false
    }
  }

  get currentTournaments() {
    return this.tournaments.filter(t => t.status == 'CURRENT')
  }

  get pastTournaments() {
    return this.tournaments.filter(t => t.status == 'PAST')
  }

  get upcomingTournments() {
    return this.tournaments.filter(t => t.status == 'UPCOMING').reverse()
  }
}

export const studentTournamentStore = new StudentTournamentStore()
