import * as jsEnv from 'browser-or-node'
import { action, makeObservable, observable, runInAction } from 'mobx'
import { MobXProviderContext } from 'mobx-react'
import React from 'react'
import { userStore } from './user'

export class SignupStore {
  firstname = ''
  lastname = ''
  username = ''
  phone = ''
  gender: 'M' | 'F' | '' = 'M'
  email = ''
  dateOfBirth = 0
  password = ''
  retypePassword = ''

  complete = false
  error = ''

  constructor(initValues: any = {}) {
    this.username = initValues.username || ''
    this.phone = initValues.phone || ''
    this.email = initValues.email || ''
    this.password = ''
    this.retypePassword = ''

    this.complete = initValues.complete || false
    this.error = initValues.error || ''

    makeObservable(this, {
      firstname: observable,
      lastname: observable,
      username: observable,
      phone: observable,
      gender: observable,
      email: observable,
      dateOfBirth: observable,
      password: observable,
      retypePassword: observable,
      complete: observable,
      error: observable,
      signup: action.bound
    })
  }

  async signup(userdetails: any) {
    console.log("Userdetails: " + JSON.stringify(userdetails))
    this.complete = false
    this.error = ''
    try {
      await userStore.getApiCoreAxiosLocalClient()!.post("signup", userdetails)
      runInAction(() => {
        this.complete = true
      })
      return true
    } catch (e) {
      console.log("erroro while signing up! " + e)
      runInAction(() => {
        this.complete = false
        this.error = 'Failed to signup'
      })
    }
    return false
  }
}

export const useSignupStore = () => {
  const { signupStore } = React.useContext(MobXProviderContext);
  return signupStore;
}

export const signupStore = new SignupStore(
  jsEnv.isBrowser && (window as any).__PRELOADED_STATE__
    ? (window as any).__PRELOADED_STATE__.signupStore
    : {}
)
