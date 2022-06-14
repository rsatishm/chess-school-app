import * as R from 'ramda'
import { observable, action, makeObservable, runInAction } from 'mobx'

import { userStore } from './user'

const TWO_MINUTES = 2 * 60 * 1000

export class StudentsGroupsStore {
  students: any = null
  groups: any = null

  loading: boolean = true
  error: string = ''
  private lastLoadTime = 0

  creating = false
  createError = ''

  editing = false
  editError = ''

  constructor(initValues: any = {}) {
    if (initValues.students && initValues.groups) {
      this.loading = false
      this.students = initValues.students
      this.groups = initValues.groups
    } else {
      this.loading = true
    }
    this.error = initValues.error
    makeObservable(this, {
      students: observable,
      groups: observable,
      loading: observable,
      error: observable,
      creating: observable,
      createError: observable,
      editing: observable,
      editError: observable,
      load: action.bound,
      refresh: action.bound,
      edit: action.bound,
      create: action.bound,
      delete: action.bound,
      updateStudentRatings: action.bound
    })
  }

  private isStale = () => {
    const current = +new Date()
    return current - this.lastLoadTime > TWO_MINUTES
  }

  async load(forceRefresh = false) {
    if (forceRefresh || !this.students || !this.groups || this.isStale()) {
      this.error = ''
      this.loading = !forceRefresh
      this.lastLoadTime = +new Date()
      try {
        console.log("Get students by coach")
        const response = await userStore
          .getApiCoreV3AxiosClient()!
          .get('students/all-by-coachId/')
        console.log("students/all-by-coachId/\n" + JSON.stringify(response))
        // Transform students into uuid->value key-value pairs

        console.log("Get groups  by coach")
        const groups = await userStore
          .getApiCoreV3AxiosClient()!
          .get('/groups/all-by-coachId/')
        console.log("groups/all-by-coachId/\n" + JSON.stringify(groups))
        // Transform groups into uuid->value key-value pairs

        console.log(JSON.stringify(groups))

        runInAction(() => {
          if (response.data.records) {
            this.students = R.compose(
              R.fromPairs,
              R.map((s: any) => [s.uuid, s] as [string, {}])
            )(response.data.records)
          }
          if (groups.data.records) {
            this.groups = R.compose(
              R.fromPairs,
              R.map((g: any) => [g.uuid, g] as [string, {}])
            )(groups.data.records)
            console.log("groups:  " + JSON.stringify(this.groups))
          }
          this.loading = false
        })
      } catch (e) {
        //console.log("Error getting students by coach " + e)
        runInAction(() => {
          this.loading = false
          this.error = 'Error loading students and groups'
          this.students = null
          this.groups = null
        })
      }
    }
  }

  async refresh() {
    this.lastLoadTime = 0
    if (this.groups) {
      this.load(true)
    }
  }

  async edit(uuid: string, group: any) {
    this.editing = true
    this.editError = ''
    try {
      await userStore.getApiCoreV3AxiosClient()!.put('/groups/', {
        uuid: uuid,
        ownerUuid: userStore.uuid,
        ...group,
        groupType: 'academy',
        purpose: 'student'
      })
      runInAction(() => {
        this.editing = false
      })
      this.refresh()
    } catch (e) {
      runInAction(() => {
        this.editing = false
        this.editError = 'Failed to edit group'
      })

      return false
    }

    return true
  }

  async create(group: any) {
    this.creating = true
    this.createError = ''
    try {
      console.log('--> creating: ', group)
      await userStore.getApiCoreV3AxiosClient()!.post('/groups/', {
        ownerUuid: userStore.uuid,
        ...group,
        groupType: 'academy',
        purpose: 'student'
      })

      runInAction(() => {
        this.creating = false
      })
      this.refresh()
    } catch (e) {
      runInAction(() => {
        this.creating = false
        this.createError = 'Failed to create group'
      })

      return false
    }

    return true
  }

  async delete(uuid: string) {
    try {
      await userStore.getApiCoreV3AxiosClient()!.delete(`/groups/${uuid}`)
      this.refresh()
    } catch (e) {
      return false
    }

    return true
  }

  updateStudentRatings(id: string, ratings: any) {
    this.students[id].ratings = ratings
  }
}

export const studentsGroupsStore = new StudentsGroupsStore()
