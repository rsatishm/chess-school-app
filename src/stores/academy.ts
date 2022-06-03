import * as jsEnv from 'browser-or-node'
import { observable, action, computed, makeObservable, runInAction } from 'mobx'
import { userStore } from './user'
import { Rating } from '../types/Rating'
import { studentsGroupsStore } from './students-groups'
import { AxiosError } from 'axios'

const TWO_MINUTES = 2 * 60 * 1000

export class AcademyStore {
  academy: any = null

  loading = true
  error = ''
  private lastLoadTime = 0

  creating = false
  createError = ''

  editing = false
  editError = ''

  constructor(initValues: any = {}) {
    this.academy = initValues.academy || null
    this.loading = initValues.loading || true
    this.error = initValues.error || ''

    makeObservable(this, {
      academy: observable,
      loading: observable,
      error: observable,
      creating: observable,
      createError: observable,
      editing: observable,
      editError: observable,
      load: action.bound,
      resetPassword: action.bound,
      updateRatings: action.bound,
      resetDetails: action.bound,
      refresh: action.bound,
      create: action.bound,
      edit: action.bound,
      id: computed
    })
  }

  private isStale = () => {
    const current = +new Date()
    return current - this.lastLoadTime > TWO_MINUTES
  }

  async load() {
    console.log("in academy load")
    if (!this.academy || this.isStale() || this.error) {
      this.loading = true
      this.error = ''

      try {
        console.log("Get academies")
        const response = await userStore
          .getApiCoreV3AxiosClient()!
          .get('academies')
        console.log("Loading done")

        runInAction(()=>{
          this.academy = response.data.records && response.data.records[0]
          this.loading = false
          this.lastLoadTime = +new Date()
        })
      } catch (error) {
        console.log("Loading error "  + error)
        runInAction(()=>{
          this.loading = false
          const e = error as AxiosError
          if (e.response && e.response.status === 404) {
            this.academy = null
            this.error = ''
          } else {
            this.error = 'Error loading academy'
          }
          this.lastLoadTime = 0
        })
      }
    }
  }

  async resetPassword(uuid: string, password: string) {
    console.log('Edit Store function called', uuid, password)
    try {
      await userStore
        .getApiCoreV3AxiosClient()!
        .put(`students/reset-password/${uuid}`, { password })
      this.refresh()
    } catch (e) {
      return false
    }
    return true
  }

  async updateRatings(
    uuid: string,
    ratings: Pick<Rating, 'ratingSystemId' | 'value'>[]
  ) {
    try {
      const response = await userStore
        .getApiCoreAxiosClient()!
        .post(`ratings/${uuid}`, ratings)
      return response.data.records
    } catch (e) {
      return false
    }
  }

  async resetDetails(
    uuid: string,
    username: string,
    firstname: string,
    lastname: string
  ) {
    console.log(
      'Edit Store function called',
      uuid,
      username,
      firstname,
      lastname
    )
    try {
      const response = await userStore
        .getApiCoreV3AxiosClient()!
        .put(`students/reset-details/${uuid}`, {
          username,
          firstname,
          lastname
        })

      studentsGroupsStore.load(true)
      return response.data
    } catch (error) {
      const e = error as AxiosError
      console.log(e.response)
      return e.response!.data
    }
    return true
  }

  async refresh() {
    this.lastLoadTime = 0
    this.academy = null
    this.load()
  }

  async create(academy: any) {
    this.creating = true
    this.createError = ''
    try {
      await userStore.getApiCoreV3AxiosClient()!.post('/academies', academy)
      runInAction(()=>{
        this.creating = false
      })
      this.refresh()
    } catch (error) {
      runInAction(()=>{
        this.creating = false
        const e = error as AxiosError
        if (e.response && e.response.data && e.response.data.error) {
          this.createError = e.response.data.error
        } else {
          this.createError = 'Failed to create academy'
        }
      })
      return false
    }

    return true
  }

  async edit(uuid: string, academy: any) {
    this.editing = true
    this.editError = ''
    try {
      await userStore.getApiCoreAxiosClient()!.put(`/academy/${uuid}`, academy)
      runInAction(()=>{
        this.editing = false
      })
      this.refresh()
    } catch (e) {
      runInAction(()=>{
        this.editing = false
        this.editError = 'Failed to update academy'
      })

      return false
    }

    return true
  }

  get id() {
    return this.academy && this.academy.id
  }
}

export const academyStore = new AcademyStore(
  jsEnv.isBrowser && (window as any).__PRELOADED_STATE__
    ? (window as any).__PRELOADED_STATE__.academyStore
    : {}
)
