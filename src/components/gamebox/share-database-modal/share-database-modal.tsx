import * as R from 'ramda'
import { useContext, useEffect, useState } from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import { message, Modal, Select } from 'antd'
import Form  from 'antd/lib/form'

import './share-database-modal.less'
import { userStore } from '../../../stores/user'
import { useForm } from 'antd/es/form/Form'

interface Props {
  type: 'student' | 'coach'
  databaseUuid: string
  registerSubmitHandler: (submitHandler: Function) => any
  cleanupAndClose: () => any
}

interface State {
  confirmDirty: boolean
  loading: boolean
  formFields: {
    coaches: string[]
    students: string[]
  }
}

const INIT_STATE: State = {
  confirmDirty: false,
  loading: false,
  formFields: {
    coaches: [],
    students: []
  }
}

const ShareModalForm = observer((props: Props)=>{
  const {studentsGroupsStore, coachNetworkStore, gameboxDatabaseStore} = useContext(MobXProviderContext)
  const [state, setState] = useState<State>(INIT_STATE)
  const [form] = useForm()
  const database = gameboxDatabaseStore!.findByUuid(props.databaseUuid)
  useEffect(()=>{
    load()
    props.registerSubmitHandler(handleShare)
  })

  async function load() {
    if (props.type === 'coach') {
      await studentsGroupsStore!.load()
    }
    if (props.type === 'student') {
      await coachNetworkStore!.load()
    }
  }

  const studentSelectFilterOption = (inputValue: string, option: any) => {
    return (
      option.props.children
        .toString()
        .toLowerCase()
        .indexOf(inputValue.toLowerCase()) >= 0
    )
  }

  const coachSelectFilterOption = (inputValue: string, option: any) => {
    return (
      option.props.children
        .toString()
        .toLowerCase()
        .indexOf(inputValue.toLowerCase()) >= 0
    )
  }

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  const handleShare = () => {
    form.validateFields().then(async (values: any) => {
      const userUuids = (() => {
        if (props.type === 'coach') {
          const [studentUuids, groupUuids] = R.partition(
            uuid => studentsGroupsStore!.students[uuid],
            form.getFieldValue('students')
          )
          const studentUuidsFromGroups = R.chain(
            uuid => studentsGroupsStore!.groups[uuid].userIds,
            groupUuids
          )

          return R.concat(studentUuids, studentUuidsFromGroups) as string[]
        }

        if (props.type === 'student') {
          return form.getFieldValue('coaches')
        }

        return [] as string[]
      })()

      try {
        updateState({ loading: true })

        const response = await userStore
          .getApiCoreAxiosClient()!
          .put(`game-collections/${props.databaseUuid}/share`, {
            sharedWith: userUuids.map((uuid: string) => ({
              user_uuid: uuid,
              type: 'w'
            }))
          })
        message.success('Database shared successfuly')
        props.cleanupAndClose()
      } catch (e) {
        message.error('Error sharing database')
      } finally {
        updateState({ loading: false })
      }
    })
  }

  if (props.type === 'coach') {
    const studentIds = database
      ? database.sharedWith.map(({ user_uuid }: any) => user_uuid)
      : []

    return (
      <Form form={form}>
        <Form.Item initialValue={studentIds}>
        <Select
              size="large"
              mode="multiple"
              placeholder="Students and Groups"
              filterOption={studentSelectFilterOption}
              disabled={studentsGroupsStore!.loading}
            >
              <Select.OptGroup key="students" label="Students">
                {R.values(studentsGroupsStore!.students).map(
                  (s: any) => (
                    <Select.Option key={s.uuid} value={s.uuid}>
                      {s.firstname + ', ' + s.lastname} ({s.username})
                    </Select.Option>
                  )
                )}
              </Select.OptGroup>
              <Select.OptGroup key="groups" label="Groups">
                {R.values(studentsGroupsStore!.groups).map(
                  (g: any) => (
                    <Select.Option key={g.uuid} value={g.uuid}>
                      {g.name}
                    </Select.Option>
                  )
                )}
              </Select.OptGroup>
            </Select>
        </Form.Item>
      </Form>
    )
  }

  if (props.type === 'student') {
    const coachIds = database
      ? database.sharedWith.map(({ user_uuid }: any) => user_uuid)
      : []

    return (
      <Form form={form}>
        <Form.Item initialValue={coachIds}>
        <Select
              size="large"
              mode="multiple"
              placeholder="Coaches"
              filterOption={coachSelectFilterOption}
              disabled={coachNetworkStore!.loading}
            >
              {R.values(coachNetworkStore!.coaches).map(
                (c: any) => (
                  <Select.Option key={c.uuid} value={c.uuid}>
                    {c.firstname + ', ' + c.lastname} ({c.username})
                  </Select.Option>
                )
              )}
            </Select>
        </Form.Item>
      </Form>
    )
  }

  return <Form form={form}/>
})

interface OuterProps {
  type: 'student' | 'coach'
  visible: boolean
  databaseUuid: string
  onClose: () => any
}

interface OuterState {
  loading: boolean
}

export const ShareDatabaseModal = (props: OuterProps)=>{
  const [state, setState] = useState<OuterState>({
    loading: false
  })
  let submitHandler: Function | null = null

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  const cleanUpAndClose = () => {
    props.onClose()
    updateState({ loading: false })
  }

  const handleRegisterSubmitHandler = (handler: Function) => {
    submitHandler = handler
  }

  const handleShare = () => {
    if (submitHandler) {
      submitHandler()
    }
  }

  return (
    <Modal
      title="Share Database"
      style={{ width: 600 }}
      visible={props.visible}
      onCancel={cleanUpAndClose}
      maskClosable={false}
      okButtonProps={{
        loading: state.loading
      }}
      okText="Share"
      closable={!state.loading}
      destroyOnClose={true}
      onOk={handleShare}
    >
      <ShareModalForm
        type={props.type}
        databaseUuid={props.databaseUuid}
        registerSubmitHandler={handleRegisterSubmitHandler}
        cleanupAndClose={cleanUpAndClose}
      />
    </Modal>
  )
}