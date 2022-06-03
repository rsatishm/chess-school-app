import Drill from '../types/Drill'
import { action, makeObservable, observable, runInAction } from 'mobx'
import { userStore } from './user'

const ONE_HOUR = 60 * 60 * 1000

export const SIDE_TO_PLAY_WIN = 'WIN'
export const SIDE_TO_PLAY_DRAW = 'DRAW'

export class PracticeStore {
  items: Drill[] = []

  loading = true
  error = ''
  private lastLoadTime = 0

  constructor(initValues: any = {}) {
    this.items = initValues.items || null
    this.loading = initValues.loading || true
    this.error = initValues.error ||
    
    makeObservable(this, {
      items: observable,
      loading: observable,
      error: observable,
      load: action.bound,
      createDrill: action.bound,
      deleteDrill: action.bound
    });
  }

  private isStale = () => {
    const current = +new Date()
    return current - this.lastLoadTime > ONE_HOUR
  }

  async load() {
    if (!this.items || this.isStale() || this.error) {
      this.loading = true
      this.error = ''

      try {
        const drills = await userStore.getApiCoreAxiosClient()?.get('/drills')
        runInAction(()=>{
          this.items = drills?.data.records
          this.loading = false
          this.lastLoadTime = +new Date()
        })
      } catch (e: any) {
        runInAction(()=>{
          this.loading = false
          if (e.response && e.response.status === 404) {
            this.items = []
            this.error = ''
          } else {
            this.error = 'Error loading practice items'
          }
          this.lastLoadTime = 0
        })
        return false
      }

      return true
    }
  }

  async createDrill(drill: Omit<Drill, 'uuid' | 'created_at' | 'updated_at'>) {
    try {
      const response = await userStore
        .getApiCoreAxiosClient()
        ?.post('/drills', drill)
      const newDrill = response?.data
      this.items.push(newDrill)
    } catch (e) {}
  }

  async deleteDrill(uuid: any) {
    try {
      this.items = this.items.filter(e => e.uuid != uuid, this.items)
      const response = await userStore
        .getApiCoreAxiosClient()
        ?.delete(`/drills/${uuid}`)
    } catch (e) {}
  }
}

export const practiceStore = new PracticeStore()
