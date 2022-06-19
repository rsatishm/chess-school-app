import * as R from 'ramda'
import { Modal, Input, Button, message, Form, Row, Col, List } from 'antd'
import { MobXProviderContext } from 'mobx-react'
import { StudentsGroupsStore } from '../../../../stores/students-groups'
import { AcademyStore } from '../../../../stores/academy'

import './students.less'
import _ from 'lodash'
import RatingSystem from '../../../../types/RatingSystem'
import { RatingSystemStore } from '../../../../stores/rating-system'
import { Rating } from '../../../../types/Rating'
import { getFormattedName } from '../../../../utils/utils'
import { observable } from 'mobx'
import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CreateStudentDrawer } from './create-student-drawer/create-student-drawer'

interface State {
  createDrawerVisible: boolean
  showPassword: boolean
  resetPasswordModalVisible: boolean
  ratingModalVisible: boolean
  studentUuid: string
  studentPassword: string
  studentUsername: string
  studentFirstname: string
  studentLastname: string
  studentRatings: { [name: string]: number }
  loading: boolean
  resetNameModalVisible: boolean
}

export const Students = observer(()=>{
  const {studentsGroupsStore, ratingSystemStore, academyStore} = useContext(MobXProviderContext)
  console.log("Students from store")
  console.log(JSON.stringify(studentsGroupsStore!.students))
  const students =  R.compose(R.map(R.nth(1)), R.toPairs as any)(studentsGroupsStore!.students)
  console.log("After compose")
  console.log(JSON.stringify(students))

  const [state, setState] = useState({
    createDrawerVisible: false,
    showPassword: false,
    resetPasswordModalVisible: false,
    ratingModalVisible: false,
    studentUuid: '',
    studentPassword: '',
    studentUsername: '',
    studentFirstname: '',
    studentLastname: '',
    studentRatings: {},
    loading: false,
    resetNameModalVisible: false
  })

  
 useEffect(()=>{
    ratingSystemStore.load()
  }, [state])

  const handleShowPassword = () => {
    setState((prevState: State)=>{
       return {...prevState, showPassword: true }
    })
  }

  const handlePasswordEdit = (uuid: string) => () => {
    setState((prevState: State)=>{
      return {...prevState,
      studentUuid: uuid,
      resetPasswordModalVisible: true}
    })
  }

  const handleRatingEdit = (uuid: string, ratings: Rating[]) => () => {
    const ratingObj = {}
    if (ratings) {
      ratings.forEach(r => {
        _.set(ratingObj, r.ratingSystemId, r.value)
      })
    }
    setState((prevState: State)=>{
      return {
      ...prevState,
      studentUuid: uuid,
      studentRatings: ratingObj,
      ratingModalVisible: true
    }})
  }

  const handleResetOk = async () => {
    const success = await academyStore!.resetPassword(
      state.studentUuid,
      state.studentPassword
    )
    if (success) {
      message.success('Password has been reset successfully.')
      resetPasswordState()
    } else {
      message.error('Failed to reset password')
    }
  }

 const handleResetCancel = () => {
    resetPasswordState()
  }

  const resetPasswordState = () => {
    setState((prevState: State)=>{
      return {
      ...prevState,  
      resetPasswordModalVisible: false,
      studentUuid: '',
      studentPassword: ''
    }})
  }

  const onPasswordChange = (e: any) => {
    setState((prevState: State)=>{
      return {
      ...prevState,  
      studentPassword: e.target.value
    }})
  }

  const handleNameEdit = (
    username: string,
    firstname: string,
    lastname: string,
    uuid: string
  ) => () => {
    setState((prevState: State)=>{
      return {
      ...prevState,  
      studentUsername: username,
      studentFirstname: firstname,
      studentLastname: lastname,
      studentUuid: uuid,
      resetNameModalVisible: true
    }})
  }

  const handleResetNameOk = async () => {
    const resp: any = await academyStore!.resetDetails(
      state.studentUuid,
      state.studentUsername,
      state.studentFirstname,
      state.studentLastname
    )
    console.log("Update response of student: " + JSON.stringify(resp))
    if (resp.success) {
      message.success(resp.message)
      resetFirstnameState()
      resetLastnameState()
    } else {
      message.error("Error: " + resp.message)
    }
  }

  const handleResetNameCancel = () => {
    resetFirstnameState()
    resetLastnameState()
  }

  const resetFirstnameState = () => {
    setState((prevState)=>{
      return {
      ...prevState,  
      resetNameModalVisible: false,
      studentUuid: '',
      studentFirstname: ''
    }})
  }

  const resetLastnameState = () => {
    setState((prevState)=>{
      return {
      ...prevState,  
      resetNameModalVisible: false,
      studentUuid: '',
      studentLastname: ''
      }
    })
  }

  const onChange = (key: 'studentUsername') => (e: any) => {
    setState((prevState)=>{
      return {
        ...prevState,
      [key]: e.target.value
    }})
  }

  const onFirstnameChange = (e: any) => {
    setState((prevState)=>{
      return {
        ...prevState,
      studentFirstname: e.target.value
      }
    })
  }

  const onLastnameChange = (d: any) => {
    setState((prevState)=>{
      return {
        ...prevState,
      studentLastname: d.target.value
      }
    })
  }

  const renderRating = (ratings: Rating[]) => {
    if (_.isEmpty(ratings)) {
      return ''
    }

    const ratingSystems = ratingSystemStore!.ratingSystems

    return ratingSystems
      .map((rs : any)=> {
        const rating = ratings.find(r => r.ratingSystemId == rs.id)
        if (!rating) {
          return `${rs.name}: Unrated`
        }
        return `${rs.name}: ${rating.value}`
      })
      .join(' | ')
  }

  const renderStudents = (students: any) => {
    console.log("Render students")
    console.log(JSON.stringify(students))
    return (
      <div className="networked-students">
        <div className="flex flex-row-reverse">
        <div className='mr-4'>
        <Button type='primary' onClick={handleStudentCreate} className="w-40">
            Add Students
        </Button>
        </div>
        <p className="muted-text">
          Initial password for all accounts:{' '}
          {state.showPassword ? (
            <span className="password">
              {academyStore!.academy.shortName}
            </span>
          ) : (
            <span className="click-to-reveal" onClick={handleShowPassword}>
              Click to Reveal
            </span>
          )}
        </p>
        </div>
        <div className="scroller">
          <List
            itemLayout="horizontal"
            dataSource={students}
            renderItem={(s: any) => (
              <List.Item
                key={s.uuid}
                actions={[
                  <Button
                    type="link"
                    size="small"
                    onClick={handleNameEdit(
                      s.username,
                      s.firstname,
                      s.lastname,
                      s.uuid
                    )}
                  >
                    Edit
                  </Button>,
                  <Button
                    type="link"
                    size="small"
                    onClick={handleRatingEdit(s.uuid, s.ratings)}
                  >
                    Ratings
                  </Button>,
                  <Button
                    type="link"
                    size="small"
                    onClick={handlePasswordEdit(s.uuid)}
                  >
                    Reset Password
                  </Button>
                ]}
              >
                <List.Item.Meta
                  title={
                    <>
                      <strong>{s.username}</strong> ({s.firstname}, {s.lastname}
                      )
                    </>
                  }
                  description={renderRating(s.ratings)}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  }

  const handleRatingChange = (ratingSystem: RatingSystem) => (event: any) => {
    setState((prevState: State)=>{
      return {
      ...prevState,  
      studentRatings: _.set(
        state.studentRatings,
        ratingSystem.id,
        parseInt(event.target.value) || 0
      )
      }
    })
  }

  const handleUpdateRating = async () => {
    setState((prevState: State)=> {
    return { ...prevState, loading: true }})

    const ratings: Pick<Rating, 'ratingSystemId' | 'value'>[] = []

    _.forOwn(state.studentRatings, (value: any, ratingSystemId: any) =>
      ratings.push({ value, ratingSystemId })
    )

    const newRatings = await academyStore!.updateRatings(
      state.studentUuid,
      ratings
    )

    studentsGroupsStore!.updateStudentRatings(
      state.studentUuid,
      newRatings
    )
    closeRatingsModal()
  }

  const closeRatingsModal = () => {
    setState((prevState: State)=>{
      return {
      ...prevState,
      loading: false,
      ratingModalVisible: false,
      studentRatings: {}}
    })
  }

  const renderRatingModal = () => {
    const { ratingSystems } = ratingSystemStore
    return (
      <Modal
        title={getFormattedName(
          studentsGroupsStore!.students[state.studentUuid]
        )}
        visible={state.ratingModalVisible}
        onCancel={closeRatingsModal}
        footer={[
          <Button key="btn-rating-cancel" onClick={closeRatingsModal}>
            Cancel
          </Button>,
          <Button
            key="btn-rating-update"
            type="primary"
            loading={state.loading}
            onClick={handleUpdateRating}
          >
            Save
          </Button>
        ]}
      >
        <Row>
          {ratingSystems.map((rs: any) => (
            <Col key={rs.id} span={24} style={{ padding: '.5rem' }}>
              <div>{rs.name}</div>
              <Input
                onChange={handleRatingChange(rs)}
                placeholder="rating"
                value={_.get(state.studentRatings, rs.id, 0)}
              />
            </Col>
          ))}
        </Row>
      </Modal>
    )
  }
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  const handleCreateStudentClose = () => {
    updateState({
      createDrawerVisible: false
    })
  }

  const handleStudentCreate = () => {
    updateState({
      createDrawerVisible: true
    })
  }

  return (
    <div className="students inner">
      <div className="container">
        {renderStudents(students)}
        <CreateStudentDrawer
        visible={state.createDrawerVisible}
        onClose={handleCreateStudentClose}
      />        
        <Modal
          title="Reset Password"
          visible={state.resetPasswordModalVisible}
          onOk={handleResetOk}
          onCancel={handleResetCancel}
        >
          <Input
            type="text"
            value={state.studentPassword}
            onChange={onPasswordChange}
          />
        </Modal>
        <Modal
          title="Reset Name"
          visible={state.resetNameModalVisible}
          onOk={handleResetNameOk}
          onCancel={handleResetNameCancel}
        >
          <Form.Item>
            <Input
              name="username"
              type="text"
              placeholder="User Name"
              value={state.studentUsername}
              onChange={onChange('studentUsername')}
            />
          </Form.Item>
          <Form.Item>
            <Input
              name="firstname"
              type="text"
              placeholder="First Name"
              autoComplete="first-name"
              value={state.studentFirstname}
              onChange={onFirstnameChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              name="lastname"
              type="text"
              placeholder="Last Name"
              value={state.studentLastname}
              onChange={onLastnameChange}
            />
          </Form.Item>
        </Modal>
      </div>
      {renderRatingModal()}
    </div>
  )
})