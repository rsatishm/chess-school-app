import * as jsEnv from 'browser-or-node'
import { observable, action, makeObservable, runInAction } from 'mobx'
import { userStore } from './user'

export class PublicProblembaseStore {
  problembases: null | any[] = null

  loading = true
  error = ''

  constructor(initValues: any = {}) {
    this.problembases = initValues.problembases || null
    this.loading = initValues.loading || true
    this.error = initValues.error || ''

    makeObservable(this, {
      problembases: observable,
      loading: observable,
      error: observable,
      load: action.bound,
    })
  }

  async load() {
    if (!this.problembases) {
      runInAction(()=>{
        this.loading = true
        this.error = ''
      })

      try {
        const problembases = await userStore
          .getApiCoreAxiosClient()!
          .get('/database/problembase?isPrivate=false')
          runInAction(()=>{
            this.loading = false
            this.problembases = problembases.data.records
          })
      } catch (e) {
        runInAction(()=>{
          this.loading = true
          this.error = 'Error loading problembases'
        })
      }
    }
  }
}

export const publicProblembaseStore = new PublicProblembaseStore(
  jsEnv.isBrowser && (window as any).__PRELOADED_STATE__
    ? (window as any).__PRELOADED_STATE__.publicProblembaseStore
    : {}
)
