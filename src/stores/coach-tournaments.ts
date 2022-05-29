import { observable, computed, action, makeObservable } from 'mobx'
import { userStore } from './user'
import * as R from 'ramda'

export class CoachTournamentStore {
  tournaments: Array<any> = []

  constructor() {
    makeObservable(this, {
      tournaments: observable,
      load: action.bound,
      delete: action.bound,
      currentTournaments: computed,
      pastTournaments: computed,
      upcomingTournments: computed
    })
  }

  async load() {
    try {
      const response = await userStore
        .getApiCoreAxiosClient()!
        .get('/coach-tournaments')

      this.tournaments = response.data.records.map((r: any) => {
        return { ...r, key: r.uuid }
      })
    } catch (e) {
      console.error(e)
      return false
    }
  }

  async delete(tournamentUuid: string) {
    if (this.tournaments) {
      this.tournaments = R.filter(
        e => e.uuid != tournamentUuid,
        this.tournaments
      )
      try {
        await userStore
          .getApiCoreAxiosClient()!
          .delete(`/coach-tournaments/${tournamentUuid}`)
      } catch (e) {
        return false
      }

      return true
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

export const coachTournamentStore = new CoachTournamentStore()
