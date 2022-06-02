import * as jsEnv from 'browser-or-node'
import * as R from 'ramda'
import { observable, action, makeObservable } from 'mobx'
import { userStore } from './user'
import { ProblemReader } from '../ProblemReader/ProblemReader'

export class ProblemSolveStore {
  assignment: any = null
  loading = true
  error = ''

  submitting = false
  submitError = ''

  constructor(initValues: any = {}) {
    this.assignment = initValues.assignments || null
    this.loading = initValues.loading || true
    this.error = initValues.error || ''

    makeObservable(this, {
      assignment: observable,
      loading: observable,
      error: observable,
      submitting: observable,
      submitError: observable,
      load: action.bound,
      submit: action.bound
    })
  }

  async load(uuid: string) {
    this.loading = true
    this.error = ''
    try {
      const response = await userStore
        .getApiCoreAxiosClient()!
        .get(`/assignment/${uuid}`)

      this.assignment = response.data
      this.assignment.problemDetails = R.filter(
        (a: any) => a.studentId === userStore.uuid,
        this.assignment.completionDetails
      )[0].problemDetails
      this.loading = false
    } catch (e) {
      this.loading = true
      this.error = 'Error loading assignment'
    }
  }

  async submit(uuid: string, attempt: any) {
    this.submitting = true
    this.submitError = ''
    try {
      await userStore
        .getApiCoreAxiosClient()!
        .post(`/assignment/${uuid}/solve`, {
          studentId: userStore.uuid,
          ...attempt
        })
      this.submitting = false
      const response = await userStore
        .getApiCoreAxiosClient()!
        .get(`/assignment/${uuid}`)
      this.assignment = response.data
      this.assignment.problemDetails = R.filter(
        (a: any) => a.studentId === userStore.uuid,
        this.assignment.completionDetails
      )[0].problemDetails
    } catch (e) {
      this.submitting = true
      this.submitError = 'Failed to submit assignment'
      return false
    }
    return true
  }

  getProblemReader(uuid: string) {
    return new ProblemReader({
      //baseUrl: process.env.API_CORE_URL as string,
      baseUrl: "https://api-core.chesslang.com/api/v2/",
      jwtProvider: () => userStore.getAccessToken() as string,
      uuid: uuid
    })
  }
}

export const problemSolveStore = new ProblemSolveStore(
  jsEnv.isBrowser && (window as any).__PRELOADED_STATE__
    ? (window as any).__PRELOADED_STATE__.problemSolveStore
    : {}
)
