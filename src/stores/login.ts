import * as jsEnv from 'browser-or-node'
import {action, makeObservable, observable, runInAction} from "mobx"
import { MobXProviderContext } from 'mobx-react'
import React from 'react'
import { userStore } from './user'

export class LoginStore {
  username = ''
  password = ''

  complete = false
  error = ''

  constructor(initValues: any = {}) {
    this.username = initValues.username || ''
    this.password = ''

    this.complete = initValues.complete || false
    this.error = initValues.error || ''

    makeObservable(this, {
      complete: observable,
      error: observable,
      setError: action.bound,
      login: action.bound
    })
  }

  setError(error: string) {
    this.complete = false
    this.error = error
  }

  async login({username, password}: any) {
    try {
      console.log("Call login api for " + username)  
      this.complete = false
      this.error = ''
      const response = await userStore
        .getApiCoreAxiosClient()!
        .post('identity/oauth/token', {              
          username,
          password,
          grant_type: 'password',
          client_id: 'default',
          client_secret: 'xyzfgh'
        })
      console.log("Got response " + JSON.stringify(response.data))  
      const { access_token, refresh_token } = response.data
      console.log("access token: " + access_token)
      if (access_token && refresh_token) {
        runInAction(()=>{
          userStore.consumeTokens(access_token, refresh_token)
          this.complete = true
        })
      } else {
        runInAction(()=>{
          this.complete = true
          this.error = 'Server Error'
        })
      }
    } catch (e) {
        runInAction(()=>{
          this.complete = true
          this.error = 'Server Error'
        })        
    }        
  }
  
}

export const useLoginStore = ()=> {
   const {loginStore} = React.useContext(MobXProviderContext);
   return loginStore;
}

export const loginStore = new LoginStore(
  jsEnv.isBrowser && (window as any).__PRELOADED_STATE__
    ? (window as any).__PRELOADED_STATE__.loginStore
    : {}
)