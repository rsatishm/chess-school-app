import * as jsEnv from 'browser-or-node'
import * as R from 'ramda'
import { observable, action, makeObservable, runInAction } from 'mobx'
import { userStore } from './user'

const TWO_MINUTES = 2 * 60 * 1000

export interface Exercise {
  name: string
  description: string
  difficultyLevel: 'easy' | 'medium' | 'hard'
  tags: string[]
  problemIds: string[]
}

export class ExerciseStore {
  exercises: null | any[] = null

  loading = true
  hasMore = true
  error = ''
  private lastLoadTime = 0
  private search = ''
  private sort = ''

  submitting = false
  submitError = ''

  constructor(initValues: any = {}) {
    this.exercises = initValues.exercises || []
    this.loading = initValues.loading || true
    this.error = initValues.error || ''

    makeObservable(this, {
      exercises: observable,
      loading: observable,
      hasMore: observable,
      error: observable,
      submitting: observable,
      submitError: observable,
      load: action.bound,
      loadMore: action.bound,
      refresh: action.bound,
      submit: action.bound,
      delete: action.bound
    })
  }

  private isStale = () => {
    const current = +new Date()
    return current - this.lastLoadTime > TWO_MINUTES
  }

  async load(search: string, sort: string) {
    if (
      !this.exercises ||
      this.isStale() ||
      this.search != search ||
      this.sort != sort
    ) {
      this.loading = true
      this.error = ''
      this.search = search
      this.sort = sort
      this.hasMore = true

      try {
        const response = await userStore
          .getApiCoreAxiosClient()!
          .get('/exercise', { params: { search, sort } })
        runInAction(()=>{
          this.loading = false
          this.exercises = response.data.records
          this.lastLoadTime = +new Date()
        })  
      } catch (e) {
        // FIXME
        console.log(
          'FATAL: error loading exercises ( This is a ninja quick fix. Please find a proper fix )'
        )
        runInAction(()=>{
          this.loading = false
        })
        // this.error = "Error loading exercises";
        // this.lastLoadTime = 0;
      }
    }
  }

  async loadMore(page: number) {
    try {
      const response = await userStore
        .getApiCoreAxiosClient()!
        .get('/exercise', {
          params: { page, search: this.search, sort: this.sort }
        })
      runInAction(()=>{
        this.exercises = [...(this.exercises || []), ...response.data.records]
        this.hasMore = response.data.records.length !== 0
      })  
    } catch (e) {
      // FIXME
      console.log(
        'FATAL: error loading exercises ( This is a ninja quick fix. Please find a proper fix )'
      )
      // this.error = "Error loading exercises";
      // this.lastLoadTime = 0;
    }
  }

  async refresh() {
    this.lastLoadTime = 0
    if (this.exercises) {
      this.load(this.search, this.sort)
    }
  }

  async submit(exercise: Exercise) {
    this.submitting = true
    this.submitError = ''

    try {
      await userStore.getApiCoreAxiosClient()!.post('/exercise', {
        coachId: userStore.uuid,
        ...exercise
      })
      runInAction(()=>{
        this.submitting = false
      })
      this.refresh()
    } catch (e) {
      runInAction(()=>{
        this.submitting = false
        this.submitError = 'Failed to submit exercise'
      })

      return false
    }

    return true
  }

  async delete(uuid: string) {
    // Remove from existing data list
    if (this.exercises) {
      this.exercises = R.filter(e => e.uuid != uuid, this.exercises)
    }

    try {
      await userStore
        .getApiCoreAxiosClient()!
        .delete(`/exercise/exercise/${uuid}`)
    } catch (e) {
      return false
    }

    return true
  }
}

export const exerciseStore = new ExerciseStore(
  jsEnv.isBrowser && (window as any).__PRELOADED_STATE__
    ? (window as any).__PRELOADED_STATE__.exerciseStore
    : {}
)
