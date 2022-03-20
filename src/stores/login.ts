import * as jsEnv from 'browser-or-node'
import {action, makeObservable, observable} from "mobx"
import { MobXProviderContext } from 'mobx-react'
import React from 'react'

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
      setError: action.bound   
    })
  }

  setError(error: string) {
    this.complete = false
    this.error = error
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