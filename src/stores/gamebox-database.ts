import * as R from 'ramda'
import * as jsEnv from 'browser-or-node'
import { observable, action, computed, runInAction, makeObservable } from 'mobx'

import { userStore } from './user'
import { gameboxDatabaseGameStore } from './gamebox-database-game'
import {
  convertDbFormatToPgn,
  getPgnWithMeta,
  downloadFile
} from '../utils/utils'

interface UploadArgs {
  file: File
  create?: string
  merge?: string
}

export interface GameboxDatabaseState {
  databases: any[]
  loading: boolean
  error: boolean
}

export interface UpdateArgs {
  uuid: string
  name: string
  sharedWith: any[]
}

export class GameboxDatabaseStore {
  databases = [] as any[]
  recentEvents = [] as string[]

  loading = true
  error = false

  uploading = false
  uploadProgressPercent = 0
  uploadError = false

  creating = false
  createError = false

  updating = false
  updateError = false

  deleting = false
  deleteError = false

  get myDatabases() {
    return R.filter(d => d.ownerUuid === userStore.uuid, this.databases)
  }

  get sharedWithMeDatabases() {
    return R.filter(
      d =>
        (
          d.sharedWith.filter((sw: any) => sw.user_uuid === userStore.uuid) ||
          []
        ).length > 0,
      this.databases
    )
  }

  constructor(initState: any = {}) {
    this.databases = initState.databases || []
    this.loading = initState.loading || true
    this.error = initState.error || false

    makeObservable(this, {
      databases: observable,
      recentEvents: observable,
      loading: observable,
      error: observable,
      uploading: observable,
      uploadProgressPercent: observable,
      uploadError: observable,
      creating: observable,
      createError: observable,
      updating: observable,
      updateError: observable,
      deleting: observable,
      deleteError: observable,
      myDatabases: computed,
      sharedWithMeDatabases: computed,
      load: action.bound,
      getDatabases: action.bound,
      getRecentEvents: action.bound,
      createDatabase: action.bound,
      upload: action.bound,
      download: action.bound,
      deleteDb: action.bound
    })
  }

  findByUuid(uuid: string) {
    return R.find(R.propEq('uuid', uuid), this.databases)
  }

  async load() {
    this.loading = true
    this.error = false

    try {
      const databases = await this.getDatabases()
      const recentEvents = await this.getRecentEvents()
      runInAction(()=>{
        this.databases = databases
        this.recentEvents = recentEvents
      })
    } catch (e) {
      runInAction(()=>{
        this.error = true
      })
      return false
    } finally {
      runInAction(()=>{
        this.loading = false
      })
    }

    return true
  }

  async getDatabases() {
    const response = await userStore
      .getApiCoreAxiosClient()!
      .get(`game-collections`)
      console.log("Database: " + JSON.stringify(response.data.records))
    return response.data.records
  }

  async getRecentEvents() {
    const response = await userStore
      .getApiCoreAxiosClient()!
      .get(`games/recent-events`)

    return response.data.records
  }

  async createDatabase(name: string) {
    const response = await userStore
      .getApiCoreAxiosClient()!
      .post(`game-collections`, {
        name: name
      })

    return response.data
  }

  async upload({ file, create, merge }: UploadArgs) {
    if (typeof window !== 'undefined') {
      this.uploading = true
      this.uploadError = false

      const formData = new FormData()
      formData.append('pgn', file)
      if (create) {
        formData.append('create', create)
      }
      if (merge) {
        formData.append('merge', merge)
      }

      try {
        await new Promise<void>((resolve, reject) => {
          userStore.getApiCoreAxiosClient()!({
            method: 'post',
            url: '/pgn/upload',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData,
            onUploadProgress: ({ loaded, total }) => {
              runInAction(()=>{
                this.uploadProgressPercent = (loaded / total) * 100
              })            
              if (this.uploadProgressPercent >= 95.0) {
                resolve()
              }
            }
          })
            .then(response => {
              runInAction(()=>{
                this.uploadProgressPercent = 0
                this.uploading = false
                if (response.data) {
                  this.databases = [response.data, ...this.databases]
                  this.load()
                }
              })
            })
            .catch(e => {
              reject(e)
            })
        })
      } catch (e) {
        runInAction(()=>{
          this.uploadError = true
        })
        return false
      }

      return true
    }

    return false
  }

  async download(uuid: string) {
    const selectedDatabase = this.findByUuid(uuid)

    if (selectedDatabase) {
      // load db games
      await gameboxDatabaseGameStore.load(
        {
          databaseUuid: uuid
        },
        true
      )

      let allPgn: string = ''
      gameboxDatabaseGameStore!.games.forEach((game: any) => {
        const gamePgn = convertDbFormatToPgn(game)
        allPgn += getPgnWithMeta(gamePgn, game.meta) + '\n'
      })

      downloadFile(selectedDatabase.name, allPgn)
    }
  }

  async deleteDb({ uuid }: { uuid: string }) {
    if (typeof window !== 'undefined') {
      this.deleting = true
      this.deleteError = false

      try {
        const response = await userStore
          .getApiCoreAxiosClient()!
          .delete(`game-collections/${uuid}`)

          runInAction(()=>{
            this.databases = R.reject(R.propEq('uuid', uuid), this.databases)
          })
        return true
      } catch (e) {
        runInAction(()=>{
          this.deleteError = true
        })
        return false
      } finally {
        runInAction(()=>{
          this.deleting = false
        })
      }
    }

    return false
  }
}

export const gameboxDatabaseStore = new GameboxDatabaseStore(
  jsEnv.isBrowser && (window as any).__PRELOADED_STATE__
    ? (window as any).__PRELOADED_STATE__.gameboxDatabaseStore
    : {}
)
