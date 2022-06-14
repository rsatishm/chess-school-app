import * as jsEnv from 'browser-or-node'
import { observable, action, computed, reaction, makeObservable, runInAction } from 'mobx'
import { decode } from 'jwt-simple'
import axios, { AxiosInstance } from 'axios'
//import { analysisBoardStore } from './analysis-board-store'
import { preferencesStore } from './preferences'
import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'
import { init } from 'ramda'

export interface ChangePasswordArgs {
  currentPassword: string
  newPassword: string
  retypePassword: string
}

export interface ChangeNameArgs {
  firstname: string
  lastname: string
}
const PROD : boolean = false
export class UserStore {
  isLoggedIn = false
  uuid = ''
  username = ''
  firstname = ''
  lastname = ''
  email = ''
  role: 'student' | 'coach' | 'admin' | '' = ''
  isTournamentOn: boolean = false

  accessToken: string | null = ''
  refreshToken: string | null = ''
  tokenExpiry = -1

  profileLoading = true
  profileError = ''
  profile: any = null

  changingPassword = false
  changePasswordError = ''

  changingName = false
  changeNameError = ''

  private axiosClient: AxiosInstance | null = null
  private shortcastleAxiosClient: AxiosInstance | null = null
  private analyticsAxiosClient: AxiosInstance | null = null


  private apiCoreAxiosLocalClient: AxiosInstance | null = axios.create({
    baseURL: "http://localhost:3000/api/v2/",
    timeout: 30 * 1000
  })

  private getApiURL() {
    return PROD ? "https://api-core.chesslang.com/" : "http://localhost:3000/"
  }

  private getBaseApiURL() {
    return this.getApiURL() + "api/v2/"
  }

  private apiCoreAxiosClient: AxiosInstance | null = axios.create({
    baseURL: this.getBaseApiURL(),
    timeout: 30 * 1000
  })

  private apiGameServerAxiosClient: AxiosInstance | null = axios.create({
    baseURL: process.env.GAME_SERVER_URL,
    timeout: 30 * 1000
  })

  private apiCoreV3AxiosClient: AxiosInstance | null = axios.create({
    baseURL: "http://api-core.chesslang.com/api/v2/",
    timeout: 30 * 1000
  })

  constructor(initValues: any = {}) {
    this.initStore(initValues)

    makeObservable(this, {
      isLoggedIn: observable,
      uuid: observable,
      username: observable,
      firstname: observable,
      lastname: observable,
      email: observable,
      role: observable,
      accessToken: observable,
      refreshToken: observable,
      tokenExpiry: observable,
      profileLoading: observable,
      profileError: observable,
      profile: observable,
      changingPassword: observable,
      changePasswordError: observable,
      changingName: observable,
      changeNameError: observable,
      loadProfile: action.bound,
      changePassword: action.bound,
      resetChangePasswordErrors: action.bound,
      logout: action.bound,
      fullName: computed
    })
  }

  initStore(initValues: any = {}) {
    this.uuid = initValues.uuid || ''
    this.username = initValues.username || ''
    this.firstname = initValues.firstname || ''
    this.lastname = initValues.lastname || ''
    this.role = initValues.role || ''

    this.accessToken = initValues.accessToken || ''
    this.refreshToken = initValues.refreshToken || ''

    this.accessToken = localStorage.getItem('chesslang-access-token')
    this.refreshToken = localStorage.getItem('chesslang-refresh-token')

    if (this.accessToken && this.refreshToken) {
      this.consumeTokens(this.accessToken, this.refreshToken)
    }
  }

  public consumeTokens(accessToken: string, refreshToken: string) {
    console.log("accesstoken: " + accessToken)  
    this.accessToken = accessToken
    this.refreshToken = refreshToken

    try {
      console.log("decode")
      const payload : any = decode(this.accessToken, '', true)
      console.log("after decode: " + JSON.stringify(payload))
      /*
      if (payload.exp < +new Date()) {
        this.accessToken = ''
        this.refreshToken = ''
        this.logout()
        return
      }*/

      this.isLoggedIn = true
      this.uuid = payload.user.uuid
      this.username = payload.user.username
      this.firstname = payload.user.firstname
      this.lastname = payload.user.lastname
      console.log("username: " + this.username)
      if (payload.user.role <= 100) {
        this.role = 'student'
      }
      if (payload.user.role <= 50) {
        this.role = 'coach'
      }
      if (payload.user.role <= 0) {
        this.role = 'admin'
      }
      console.log("role: " + payload.user.role);
      this.tokenExpiry = payload.exp
      this.isTournamentOn = payload.user.is_tournament_on
    } catch (e) {
      console.log("exception " + e)
      // this.complete = false
      // this.error = 'Error decoding the user data'
      this.logout()
    }

    if (this.accessToken && this.refreshToken) {
      localStorage.setItem('chesslang-access-token', this.accessToken)
      localStorage.setItem('chesslang-refresh-token', this.refreshToken)

      this.axiosClient = axios.create({
        baseURL: this.getApiURL(),
        timeout: 30 * 1000,
        headers: { 'X-Authorization': `Bearer ${this.accessToken}` }
      })

      // this.analyticsAxiosClient = axios.create({
      //   baseURL: process.env.ANALYTICS_API_URL,
      //   timeout: 30 * 1000,
      //   headers: { Authorization: `Bearer ${this.accessToken}` }
      // })
      //process.env.API_CORE_URL

      this.shortcastleAxiosClient = axios.create({
        baseURL: 'https://api.shortcastle.com/',
        timeout: 30 * 1000,
        headers: { Authorization: `Bearer ${this.accessToken}` }
      })

      console.log("apiCoreAxiosClient recreated with token in header")

      this.apiCoreAxiosClient = axios.create({
        baseURL: this.getBaseApiURL(),
        timeout: 30 * 1000,
        headers: { Authorization: `Bearer ${this.accessToken}` }
      })

      this.apiCoreV3AxiosClient = axios.create({
        baseURL: "https://api-core.chesslang.com/api/v2/",
        timeout: 30 * 1000,
        headers: { Authorization: `Bearer ${this.accessToken}` }
      })

      this.apiGameServerAxiosClient = axios.create({
        baseURL: process.env.GAME_SERVER_URL,
        timeout: 30 * 1000,
        headers: { Authorization: `Bearer ${this.accessToken}` }
      })

      // axiosRetry(this.axiosClient, { retries: 3 })

      // this.axiosClient.interceptors.response.use((response) => {
      //   return response
      // }, (error) => {
      //   // TODO: If 401, attempt to get a new token
      //   // For now, redirect to login page
      //   return Promise.reject(error)
      // })
    } else {
      this.logout()
    }
  }

  logout() {
    //analysisBoardStore.reset()
    localStorage.removeItem('chesslang-access-token')
    localStorage.removeItem('chesslang-refresh-token')
    this.initStore();
    //this.constructor()
  }

  async loadProfile(reload = false) {
    if (!this.profile || reload) {
      this.profileLoading = true
      try {
        const profile = await this.getApiCoreAxiosClient()!.get(
          'identity/profile/me'
        )
        runInAction(()=>{
          this.profile = profile.data
          console.log("Profile loaded " + this.profile.firstname)
          this.profileLoading = false
        })
        preferencesStore!.load()
      } catch (e) {
        runInAction(()=>{
          this.profileLoading = false
          this.profileError = 'Error loading profile'
        })
        return false
      }
    }

    return true
  }
  
  async changePassword(args: ChangePasswordArgs) {
    this.changingPassword = true
    this.changePasswordError = ''

    try {
      await this.getApiCoreAxiosClient()!.put(
        '/identity/account/change-password',
        args
      )
      runInAction(()=>{
        this.changingPassword = false
      })
    } catch (e) {
      console.dir(e)
      //if (e.response && e.response.status === 400) {
        this.changePasswordError = 'Current password is incorrect'
      //} else {
      //  this.changePasswordError = 'Error changing password'
      //}
      runInAction(()=>{
        this.changingPassword = false
      })
      return false
    }

    return true
  }

  resetChangePasswordErrors() {
    this.changePasswordError = ''
  }

  async changeName(args: ChangeNameArgs) {
    this.changingName = true
    this.changeNameError = ''

    try {
      await this.getApiCoreAxiosClient()!.put('identity/profile/me', args)
      runInAction(()=>{
        this.changingName = false
      })
    } catch (e) {
      runInAction(()=>{
        this.changeNameError = 'Error saving changes'
        this.changingName = false
      })
      return false
    }

    this.loadProfile(true)
    return true
  }

  resetChangeNameErrors() {
    this.changeNameError = ''
  }

  getAccessToken() {
    return this.accessToken
  }

  getAxiosClient() {
    return this.axiosClient
  }

  getAnalyticsAxiosClient() {
    return this.analyticsAxiosClient
  }

  getShortcastleAxiosClient() {
    return this.shortcastleAxiosClient
  }
  
  getApiCoreAxiosLocalClient() {
    console.log("get local client")
    return this.apiCoreAxiosLocalClient
  }

  getApiCoreAxiosClient() {
    console.log("get client")
    return this.apiCoreAxiosClient
  }

  getGameServerAxiosClient() {
    return this.apiGameServerAxiosClient
  }

  getApiCoreV3AxiosClient() {
    return this.apiCoreV3AxiosClient
  }

  get fullName() {
    return this.firstname + ' ' + this.lastname
  }
}

export const useUserStore = ()=> {
  const {userStore} = useContext(MobXProviderContext);
  return userStore;
}

export const userStore = new UserStore(
  jsEnv.isBrowser && (window as any).__PRELOADED_STATE__
    ? (window as any).__PRELOADED_STATE__.userStore
    : {}
)
