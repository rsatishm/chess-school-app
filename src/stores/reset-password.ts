import * as jsEnv from 'browser-or-node'
import { makeObservable, observable } from 'mobx'

export class ResetPasswordStore {
  email = ''

  complete = false
  error = ''

  constructor(initValues: any = {}) {
    this.email = initValues.email || ''

    this.complete = initValues.complete || false
    this.error = initValues.error || ''

    makeObservable(this, {
      email: observable,
      complete: observable
    })
  }
}

export const resetPasswordStore = new ResetPasswordStore(
  jsEnv.isBrowser && (window as any).__PRELOADED_STATE__
    ? (window as any).__PRELOADED_STATE__.resetPasswordStore
    : {}
)
