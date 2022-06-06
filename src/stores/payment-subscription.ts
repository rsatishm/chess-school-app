import * as jsEnv from 'browser-or-node'
import { observable, action, makeObservable, runInAction } from 'mobx'
import { userStore } from './user'

const TWO_MINUTES = 2 * 60 * 1000

export class PaymentSubscriptionStore {
  subscriptions: any = null

  loading = true
  error = ''
  private lastLoadTime = 0

  creating = false
  created = false
  createError = ''

  cancelling = false
  cancelled = false
  cancelError = ''

  constructor(initValues: any = {}) {
    this.subscriptions = initValues.subscriptions || null
    this.loading = initValues.loading || true
    this.error = initValues.error || ''

    makeObservable(this, {
      subscriptions: observable,
      loading: observable,
      error: observable,
      creating: observable,
      created: observable,
      createError: observable,
      cancelling: observable,
      cancelled: observable,
      cancelError: observable,
      load: action.bound,
      refresh: action.bound,
      cancel: action.bound,
      createStripe: action.bound
    })
  }

  private isStale = () => {
    const current = +new Date()
    return current - this.lastLoadTime > TWO_MINUTES
  }

  async load() {
    if (!this.subscriptions || this.isStale()) {
      this.loading = true
      this.error = ''
      try {
        const subscriptions = await userStore
          .getAxiosClient()!
          .get('/payment/api/v1/subscription')
          runInAction(()=>{
            this.subscriptions = (subscriptions.data || []).map((s: any) => ({
              ...s,
              gatewayDetails: JSON.parse(s.gatewayDetails)
            }))
            this.loading = false
            this.lastLoadTime = +new Date()
          })
      } catch (e: any) {
        runInAction(()=>{
          this.loading = false
          if (e.response && e.response.status === 404) {
            this.subscriptions = null
            this.error = ''
          } else {
            this.error = 'Error loading subscriptions'
          }
          this.lastLoadTime = 0
        })
        return false
      }
    }

    return true
  }

  refresh() {
    this.lastLoadTime = 0
    this.load()
  }

  async cancel(subscriptionUuid: string) {
    this.cancelling = true
    try {
      await userStore
        .getAxiosClient()!
        .delete(`/payment/api/v1/subscription/${subscriptionUuid}`)
      runInAction(()=>{
        this.cancelling = false
        this.cancelled = true
      })  
      this.refresh()
      return true
    } catch (e) {
      runInAction(()=>{
        this.cancelling = false
        this.cancelError = 'Error cancellign subscription'
      })
      return false
    }
  }

  async createStripe({
    academyShortName,
    planId,
    stripeToken,
    stripeEmail,
    coupon
  }: any) {
    this.creating = true
    try {
      await userStore.getAxiosClient()!.post(`/payment/api/v1/subscription`, {
        academyShortName,
        gateway: 'stripe',
        planId,
        stripeToken,
        stripeEmail,
        coupon
      })
      runInAction(()=>{
        this.creating = false
        this.created = true
      })
      this.refresh()
      return true
    } catch (e) {
      runInAction(()=>{
        this.createError = 'Error creating subscription'
        this.creating = false
      })
      return false
    }
  }
}

export const paymentSubscriptionStore = new PaymentSubscriptionStore(
  jsEnv.isBrowser && (window as any).__PRELOADED_STATE__
    ? (window as any).__PRELOADED_STATE__.paymentSubscriptionStore
    : {}
)
