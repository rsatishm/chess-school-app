import * as jsEnv from 'browser-or-node'
import { observable, action, makeObservable, runInAction } from 'mobx'

import { userStore } from './user'

export interface AssignmentCompletionDetail {
  loading: boolean
  data: any
  error: string
}

export class CoachAssignmentCompletionDetailsStore {
  content: {
    [uuid: string]: AssignmentCompletionDetail
  } = {}

  constructor(initValues: any = {}) {
    this.content = initValues.content || {}

    makeObservable(this, {
      content: observable,
      load: action.bound
    })
  }

  async load(uuid: string) {
    if (!this.content[uuid] || this.content[uuid].error) {
      this.content[uuid] = {
        loading: true,
        data: null,
        error: ''
      }

      try {
        const result = await userStore
          .getApiCoreAxiosClient()!
          .get(`/exercise/assignment/coach/completion-details/${uuid}`)
         
        runInAction(()=>{
          this.content[uuid] = {
            loading: false,
            data: result.data,
            error: ''
          }
        })  
      } catch (e) {
        runInAction(()=>{
          this.content[uuid] = {
            loading: false,
            data: null,
            error: `Error loading completion details`
          }
        })
      }
    }
  }
}

export const coachAssignmentCompletionDetailsStore = new CoachAssignmentCompletionDetailsStore(
  jsEnv.isBrowser && (window as any).__PRELOADED_STATE__
    ? (window as any).__PRELOADED_STATE__.coachAssignmentCompletionDetailsStore
    : {}
)
