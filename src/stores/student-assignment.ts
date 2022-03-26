import { AxiosError } from 'axios'
import * as jsEnv from 'browser-or-node'
import { observable, action, computed, makeObservable } from 'mobx'
import { userStore } from './user'

export class StudentAssignmentStore {
  assignments: any[] = []
  loading = true
  error = ''

  completionDetails : any = {}

  constructor(initValues: any = {}) {
    this.assignments = initValues.assignments || []
    this.loading = initValues.loading || true
    this.error = initValues.error || ''
    makeObservable(this, {
      assignments: observable,
      loading: observable,
      error: observable,
      completionDetails: observable,
      load: action.bound,
      loadCompletionDetails: action.bound,
      setSolved: action.bound,
      unsolvedCount: computed
    })
  }

  async load() {
    this.loading = true
    this.error = ''

    try {
      const response = await userStore
        .getApiCoreAxiosClient()!
        .get(`/assignment/student/${userStore.uuid}`)
      this.assignments = response.data.records
      this.loading = false
    } catch (error) {
      const e = error as AxiosError
      this.loading = false
      if (e.response && e.response.status === 404) {
        this.error = ''
        this.assignments = []
      } else {
        this.error = 'Error loading assignments'
      }
    }
  }

  async loadCompletionDetails(assignmentUuid: string) {
    this.completionDetails[assignmentUuid] = {
      ...this.completionDetails[assignmentUuid],
      loading: true,
      error: ''
    }

    try {
      const completionDetails = await userStore
        .getApiCoreAxiosClient()!
        .get(
          `/exercise/assignment/student/completion-details/${assignmentUuid}`
        )
      this.completionDetails[assignmentUuid] = {
        ...this.completionDetails[assignmentUuid],
        details: completionDetails.data
      }
    } catch (e) {
      this.completionDetails[assignmentUuid] = {
        ...this.completionDetails[assignmentUuid],
        error: 'Error loading solved status'
      }
    } finally {
      this.completionDetails[assignmentUuid] = {
        ...this.completionDetails[assignmentUuid],
        loading: false
      }
    }
  }

  setSolved(assignmentUuid: string, problemId: string) {
    this.completionDetails[assignmentUuid] = {
      ...this.completionDetails[assignmentUuid],
      details: [
        ...this.completionDetails[assignmentUuid].details,
        { problemId, solved: true }
      ]
    }
  }

  get unsolvedCount() {
    var unsolved = 0
    this.assignments.forEach(e => {
      var details = this.completionDetails[e.uuid]

      if (details === undefined) {
        this.loadCompletionDetails(e.uuid)
        details = this.completionDetails[e.uuid]
      }

      if (details && !details.loading && details.details) {
        //todo
        /*
        unsolved +=
          e.problemIds.length !== details.details.length ||
          !details.details.reduce((acc, status) => acc && status.solved, true)
          */
      }
    })

    return unsolved
  }
}

export const studentAssignmentStore = new StudentAssignmentStore(
  jsEnv.isBrowser && (window as any).__PRELOADED_STATE__
    ? (window as any).__PRELOADED_STATE__.studentAssignmentStore
    : {}
)
