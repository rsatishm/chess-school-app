import { observable, action, makeObservable, runInAction } from 'mobx'
import RatingSystem from '../types/RatingSystem'
import { userStore } from './user'
import { academyStore } from './academy'

export class RatingSystemStore {
  availableRatingSystems: RatingSystem[] = []
  ratingSystems: RatingSystem[] = []
  loading = false

  constructor() {
    makeObservable(this, {
      availableRatingSystems: observable,
      ratingSystems: observable,
      loading: observable,
      load: action.bound
    })
  }

  async load() {
    this.loading = true
    const allRatingSystemsResponse = await userStore
      .getApiCoreAxiosClient()!
      .get(`/rating-systems`)
    runInAction(()=>{
      this.availableRatingSystems = allRatingSystemsResponse.data.records || []
    })  

    await this.loadAcademyRatingSystems()
    runInAction(()=>{
      this.loading = false
    })
  }

  async loadAcademyRatingSystems() {
    this.loading = true
    const ratingSystemsResponse = await userStore
      .getApiCoreAxiosClient()!
      .get(`/academy/${academyStore.id}/rating-systems`)
      runInAction(()=>{
        this.ratingSystems = ratingSystemsResponse.data.records || []
        this.loading = false
      })
  }

  async add(ratingSystemId: string) {
    this.loading = true
    await userStore
      .getApiCoreAxiosClient()!
      .post(`/academy/${academyStore.id}/rating-systems/${ratingSystemId}`)
    await this.loadAcademyRatingSystems()
    runInAction(()=>{
      this.loading = false
    })
  }

  async remove(ratingSystemId: string) {
    this.loading = true
    await userStore
      .getApiCoreAxiosClient()!
      .delete(`/academy/${academyStore.id}/rating-systems/${ratingSystemId}`)
    await this.loadAcademyRatingSystems()
    runInAction(()=>{
      this.loading = false
    })
  }
}

export const ratingSystemStore = new RatingSystemStore()
