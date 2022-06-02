import * as R from 'ramda'
import * as React from 'react'
import {
  Button,
  Popconfirm,
  Radio,
  message,
  Input,
  Row,
  Col,
  Modal
} from 'antd'
import { MobXProviderContext } from 'mobx-react'
import StripeCheckout from 'react-stripe-checkout'

import './payment.less'
import { CheckCircleOutlined, ExceptionOutlined, LoadingOutlined } from '@ant-design/icons'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

interface State {
  planUuid: string
  interval: string
  seats?: number
  showPassword: boolean
  coupon: string
  couponApplying: boolean
  couponApplied: any
  showInfoPopup: boolean
}

export const Payment = ()=>{
  const {paymentPlanStore,
  paymentSubscriptionStore,
  studentsGroupsStore,
  userStore,
  academyStore} = React.useContext(MobXProviderContext)
  
  const [state, setState] = React.useState<State>({
    planUuid: '',
    interval: 'year',
    showPassword: false,
    coupon: '',
    couponApplying: false,
    couponApplied: null,
    showInfoPopup: false
  })
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  React.useEffect(()=>{
    paymentPlanStore!.load()
    paymentSubscriptionStore!.load()
    studentsGroupsStore!.load(true)
  })

  React.useEffect(() => {
    try {
      const response = userStore!.getAxiosClient()!
        .get(`/payment/api/v1/coupon/${state.coupon}`)
      if (response.data && response.data.valid) {
        message.success('Coupon Applied!')
        updateState({ couponApplied: response.data })
      } else {
        message.error('Coupon Expired!')
      }
    } catch (e: any) {
      if (e.response && e.response.status === 404) {
        message.error('Invalid coupon')
      } else {
        message.error('Error fetching coupon')
      }
    } finally {
      updateState({ couponApplying: false })
    }
  })

  const handleCouponChange = (e: any) => {
    updateState({ coupon: e.target.value })
  }

  const toggleShowInfoPopup = () => {
    updateState({ showInfoPopup: !state.showInfoPopup })
  }

  const handleSubscriptionIntervalChange = (e: any) => {
    updateState({ interval: e.target.value })
  }

  const handleStripeToken = (plan: any) => async (token: any) => {
    const created = await paymentSubscriptionStore!.createStripe({
      academyShortName: academyStore!.academy.shortName,
      planId: plan.id,
      stripeEmail: token.email,
      stripeToken: token.id,
      coupon: (state.coupon || '').trim()
    })

    if (created) {
      studentsGroupsStore!.refresh()
    }
  }

  const handleSubscriptionCancel = (subscriptionUuid: any) => async () => {
    try {
      const result = await paymentSubscriptionStore!.cancel(
        subscriptionUuid
      )
      if (result) {
        message.success('Cancelled subscription, sorry to see you go!')
      } else {
        message.error('Error cancelling subscription!')
      }
    } catch (e) {
      message.error('Error cancelling subscription!')
    }
  }

  const handleShowPassword = () => {
    updateState({ showPassword: true })
  }

  const handleCouponApply = () => {
    if (state.coupon.trim()) {
      updateState({ couponApplying: true })
    }
  }

  const handleCouponCancel = () => {
    updateState({ couponApplied: null, coupon: '' })
  }

  const getCouponReducedAmount = (amount: number, coupon: any) => {
    if (coupon) {
      if (coupon.amount_off) {
        return ((amount - coupon.amount_off) / 100)
          .toFixed(2)
          .replace('.00', '')
      }
      if (coupon.percent_off) {
        return ((amount - (amount * coupon.percent_off) / 100) / 100)
          .toFixed(2)
          .replace('.00', '')
      }
    }

    return amount
  }

  const renderErrorState = () => {
    return (
      <div className="error-state container">
        <ExceptionOutlined/>
        <p className="exception-text">
          {paymentPlanStore!.error ||
            studentsGroupsStore!.error ||
            paymentSubscriptionStore!.error}
        </p>
      </div>
    )
  }

  const renderLoadingState = () => {
    return (
      <div className="loading-state container">
        <LoadingOutlined spin={true} />
        <p className="exception-text">Loading</p>
      </div>
    )
  }

  const renderPlans = () => {
    const existingSubscription =
      paymentSubscriptionStore!.subscriptions.length > 0
        ? paymentSubscriptionStore!.subscriptions[0]
        : null

    const plans = R.compose(
      R.sortBy(R.prop('students')),
      R.filter(R.propEq('interval', state.interval))
    )(paymentPlanStore!.plans)

    if (paymentSubscriptionStore!.creating) {
      return (
        <div className="plans-list-container">
          <div className="creating">
            <LoadingOutlined spin={true} />
            <h3>Creating subscription...</h3>
          </div>
        </div>
      )
    }

    if (paymentSubscriptionStore!.created) {
      return (
        <div className="plans-list-container">
          <div className="created">
            <CheckCircleOutlined style={{ fontSize: 48, color: '#0a0' }} type="check-circle" />
            <h3>Subscription created</h3>
            <p>The new student accounts are listed below.</p>
          </div>
        </div>
      )
    }

    if (paymentSubscriptionStore!.createError) {
      return (
        <div className="plans-list-container">
          <div className="create-error">
            <ExceptionOutlined style={{ fontSize: 48, color: '#a00' }}/>
            <h3>Error creating subscription!</h3>
            <p>
              Try refreshing the page and attempting again. Automatic refunds
              will be made if failure persists.
            </p>
            <p>
              Please contact us at{' '}
              <a href="mailto:support@shortcastle.com?subject=Payment Failure">
                support@shortcastle.com
              </a>{' '}
              in case you retried several times.
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="plans-list-container">
        <div className="interval-toggle">
          <RadioGroup
            onChange={handleSubscriptionIntervalChange}
            value={state.interval}
            size="small"
          >
            <RadioButton value="year">Yearly</RadioButton>
            <RadioButton value="month">Monthly</RadioButton>
          </RadioGroup>
        </div>
        <div className="plans-list">
          {plans.map((p: any) => (
            <div key={p.id} className={`plan ${p.popular ? 'popular' : ''}`}>
              {(!existingSubscription ||
                (existingSubscription &&
                  existingSubscription.gatewayDetails.plan.id !== p.id)) && (
                <React.Fragment>
                  {!state.couponApplied && (
                    <div className="price">
                      {(p.amount / 100).toFixed(2).replace('.00', '')}
                      <span className="currency">
                        {p.currency === 'usd' ? '$' : ''}
                      </span>
                    </div>
                  )}
                  {state.couponApplied && (
                    <div className="price">
                      <div className="original">
                        {(p.amount / 100).toFixed(2).replace('.00', '')}
                        <span className="currency">
                          {p.currency === 'usd' ? '$' : ''}
                        </span>
                      </div>
                      <div className="reduced">
                        {getCouponReducedAmount(
                          p.amount,
                          state.couponApplied
                        )}
                        <span className="currency">
                          {p.currency === 'usd' ? '$' : ''}
                        </span>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              )}
              {existingSubscription &&
                existingSubscription.gatewayDetails.plan.id === p.id && (
                  <React.Fragment>
                    {!existingSubscription.gatewayDetails.discount && (
                      <div className="price">
                        {(p.amount / 100).toFixed(2).replace('.00', '')}
                        <span className="currency">
                          {p.currency === 'usd' ? '$' : ''}
                        </span>
                      </div>
                    )}
                    {existingSubscription.gatewayDetails.discount && (
                      <div className="price">
                        <div className="original">
                          {(p.amount / 100).toFixed(2).replace('.00', '')}
                          <span className="currency">
                            {p.currency === 'usd' ? '$' : ''}
                          </span>
                        </div>
                        <div className="reduced">
                          {getCouponReducedAmount(
                            p.amount,
                            existingSubscription.gatewayDetails.discount.coupon
                          )}
                          <span className="currency">
                            {p.currency === 'usd' ? '$' : ''}
                          </span>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                )}
              <div className="nickname">{p.nickname}</div>
              {existingSubscription &&
                existingSubscription.gatewayDetails.plan.id === p.id && (
                  <Popconfirm
                    title="Are you sure? This action cannot be reverted!"
                    onConfirm={handleSubscriptionCancel(
                      existingSubscription.uuid
                    )}
                  >
                    <Button
                      danger
                      size="small"
                      loading={paymentSubscriptionStore!.cancelling}
                    >
                      Cancel
                    </Button>
                  </Popconfirm>
                )}
              {existingSubscription &&
                existingSubscription.gatewayDetails.plan.id !== p.id && (
                  <Button
                    type="primary"
                    size="small"
                    onClick={toggleShowInfoPopup}
                  >
                    Switch
                  </Button>
                )}
              {!existingSubscription && (
                <StripeCheckout
                  token={handleStripeToken(p)}
                  name={`Chesslang Subscription`}
                  description={p.nickname}
                  currency={p.currency.toUpperCase()}
                  stripeKey="pk_live_e93cjT9D7H3yy5hAKNeYciuW"
                >
                  <Button type="primary" size="small">
                    Subscribe
                  </Button>
                </StripeCheckout>
              )}
              {p.popular && <div className="popular-band">POPULAR</div>}
            </div>
          ))}
        </div>
        <div className="coupon-container">
          {!state.couponApplied && (
            <Row gutter={5} style={{ position: 'relative', top: 5 }}>
              <Col span={20}>
                <Input
                  disabled={state.couponApplying}
                  size="small"
                  placeholder="Add Coupon if any"
                  onChange={handleCouponChange}
                  value={state.coupon}
                />
              </Col>
              <Col span={4}>
                <Button
                  loading={state.couponApplying}
                  size="small"
                  type="primary"
                  onClick={handleCouponApply}
                >
                  Apply
                </Button>
              </Col>
            </Row>
          )}
          {state.couponApplied && (
            <Row gutter={5} style={{ position: 'relative', top: 5 }}>
              <Col span={20}>
                <strong>
                  {'Coupon Applied: ' +
                    (state.couponApplied! as any).name ||
                    `Coupon Applied: ${state.coupon}`}
                </strong>
              </Col>
              <Col span={4}>
                <Button
                  danger
                  size="small"
                  onClick={handleCouponCancel}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          )}
        </div>
        <p className="muted-text">
          $ - USD. Cancel anytime. If you need help in choosing a plan or face
          any issues, send us an email at{' '}
          <a href="mailto:support@shortcastle.com?subject=Chesslang Subscription">
            support@shortcastle.com
          </a>
        </p>
      </div>
    )
  }

  const renderStudents = (students: any) => {
    return (
      <div className="networked-students">
        <p className="muted-text">
          Initial password for all accounts:{' '}
          {state.showPassword ? (
            <span className="password">
              {academyStore!.academy.shortName}
            </span>
          ) : (
            <Button type="dashed" size={'small'}>
            <span
              className="click-to-reveal"
              onClick={handleShowPassword}
            >
              Click to Reveal
            </span>
            </Button>
          )}
        </p>
        <div className="scroller">
          {students.map((s: any) => (
            <div key={s.uuid} className="row">
              <strong>{s.username}</strong> ({s.firstname}, {s.lastname})
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (
    paymentPlanStore!.loading ||
    studentsGroupsStore!.loading ||
    paymentSubscriptionStore!.loading
  ) {
    return <div className="payment inner">{renderLoadingState()}</div>
  }

  if (
    paymentPlanStore!.error ||
    studentsGroupsStore!.error ||
    paymentSubscriptionStore!.error
  ) {
    return <div className="payment inner">{renderErrorState()}</div>
  }

  const students = R.compose(
    R.map(R.nth(1)),
    R.toPairs as any
  )(studentsGroupsStore.students)

  return (
    <div className="payment inner">
      <div className="container">
        {renderPlans()}
        {/*<Divider className="divider">
          Student Accounts ({students.length})
        </Divider>
  {this.renderStudents(students)}*/}
        <Modal
          visible={state.showInfoPopup}
          title="Switch Subscription"
          cancelButtonProps={{ style: { display: 'none' } }}
          onOk={toggleShowInfoPopup}
          onCancel={toggleShowInfoPopup}
        >
          <h4>To switch your subscription plan, please contact us at:</h4>
          <h4>
            <a href="mailto:support@shortcastle.com">
              support@shortcastle.com
            </a>
          </h4>
        </Modal>
      </div>
    </div>
  )
}
