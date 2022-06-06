//
import * as jsEnv from 'browser-or-node'
import { observable, action, makeObservable, runInAction } from 'mobx'
import { userStore } from './user'
import * as R from 'ramda'

const TWO_MINUTES = 2 * 60 * 1000

export interface Assignment {
  startDate: string
  assignedAt: string
  deadline: string
  // Coach ID is auto-filled from userStore
  exerciseId: string
  // status is always 'active'
  problemIds: string[]
  studentIds: string[]
  // groupIds: string[] // TODO: Backend fix for accepting groupIds
}

export class CoachAssignmentStore {
  assignments: null | any[] = null

  loading = true
  error = ''
  private lastLoadTime = 0

  submitting = false
  submitError = ''

  constructor(initValues: any = {}) {
    this.assignments = initValues.assignments || null
    this.loading = initValues.loading || false
    this.error = initValues.error || ''

    makeObservable(this, {
      assignments: observable,
      loading: observable,
      error: observable,
      submitting: observable,
      submitError: observable,
      load: observable,
      refresh: observable,
      submit: observable,
      delete: observable
    })
  }

  private isStale = () => {
    const current = +new Date()
    return current - this.lastLoadTime > TWO_MINUTES
  }

  async load() {
    if (!this.assignments || this.isStale()) {
      this.loading = true
      this.error = ''

      try {
        const response = await userStore
          .getApiCoreAxiosClient()!
          .get(`/assignment/coach/${userStore.uuid}`)
        
        runInAction(()=>{
          this.loading = false
          this.assignments = response.data.records
          this.lastLoadTime = +new Date()
        })
      } catch (e) {
        runInAction(()=>{
          this.loading = true
          this.error = 'Error loading assignments'
          this.lastLoadTime = 0
        })
      }
    }
  }

  async refresh() {
    this.lastLoadTime = 0
    if (this.assignments) {
      this.load()
    }
  }

  async submit(assignment: Assignment) {
    this.submitting = true
    this.submitError = ''

    try {
      await userStore.getApiCoreAxiosClient()!.post('/assignment', {
        status: 'active',
        ...assignment
      })
      runInAction(()=>{
        this.submitting = false
      })
      this.refresh()
    } catch (e) {
      runInAction(()=>{
        this.submitting = false
        this.submitError = 'Failed to submit assignment'
      })

      return false
    }

    return true
  }

  async delete(uuid: string) {
    // Remove from existing data list
    if (this.assignments) {
      this.assignments = R.filter(e => e.uuid != uuid, this.assignments)
    }

    try {
      await userStore
        .getApiCoreAxiosClient()!
        .delete(`/assignment/${uuid}`)
    } catch (e) {
      return false
    }

    return true
  }
}

export const coachAssignmentStore = new CoachAssignmentStore(
  jsEnv.isBrowser && (window as any).__PRELOADED_STATE__
    ? (window as any).__PRELOADED_STATE__.coachAssignment
    : {}
)
