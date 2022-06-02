import * as React from 'react'
import * as R from 'ramda'
import {
  Layout,
  Input,
  Select,
  Divider,
  Tag,
  Tabs,
  Button,
  Drawer,
  Form,
  Modal,
  Popconfirm
} from 'antd'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import { PracticeStore } from '../../../../stores/practice'

import './item-list.less'
import { States } from '../../../../components/states/states'
import TextArea from 'antd/lib/input/TextArea'
import { useState } from 'react'
import { SetupChessboard } from '../../../../components/chessboard/setup-chessboard'
import { UserStore, userStore } from '../../../../stores/user'
import { ConfiguredChessboard } from '../../../../components/chessboard/configured-chessboard'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'antd/es/form/Form'
import { ChessTypes } from '../../../../types'
import * as Util from '../../../../utils/Util'

const { Content } = Layout
const { Option } = Select

interface State {
  sortBy: string
  search: string
  problemSolveModalVisible?: boolean
  assignmentToSolve?: any
  problemUuids?: string[]
  createDrawerVisible: boolean
}

export const ItemList = observer(() => {
  const { practiceStore, userStore } = React.useContext(MobXProviderContext)
  const [state, setState] = useState<State>({
    sortBy: 'difficulty_asc',
    search: '',
    createDrawerVisible: false
  })
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  React.useEffect(() => {
    console.log("Load practise")
    practiceStore!.load()
  })
  const navigate = useNavigate()
  const location = useLocation()
  const sortItems = (sortBy: string, items: any[]) => {
    const [sortByKey, dir] = sortBy.split('_')
    const sortedList = (() => R.sortBy(item => item[sortByKey], items))()
    return dir === 'desc' ? R.reverse(sortedList) : sortedList
  }

  const filterItems = (search: string, items: any[]) => {
    return R.filter(
      (item: any) => item.name.toLowerCase().indexOf(search.toLowerCase()) >= 0,
      items
    )
  }

  const handleItemClick = (item: any) => () => {
    navigate(location.pathname + 'play/' + item.uuid)
  }

  const renderLevelTag = (difficultyLevel: string) => {
    if (difficultyLevel === 'EASY') {
      return <Tag color="green">Easy</Tag>
    }
    if (difficultyLevel === 'MEDIUM') {
      return <Tag color="blue">Medium</Tag>
    }
    if (difficultyLevel === 'HARD') {
      return <Tag color="red">Hard</Tag>
    }
  }

  const handleDeleteDrill = (uuid: string) => () => {
    practiceStore!.deleteDrill(uuid)
  }

  const renderDelete = (i: any) => {
    if (i.created_by == userStore.uuid) {
      return (
        <div className="action-buttons">
          <Popconfirm
            title="Are you sure you want to delete the exercise?"
            onConfirm={handleDeleteDrill(i.uuid)}
          >
            <Button icon="delete" danger size="small"></Button>
          </Popconfirm>
        </div>
      )
    }
  }

  const renderItems = (items: any[]) => {
    if (items.length === 0) {
      return (
        <States
          type="blank"
          icon="fire"
          exceptionText="No items found for the search criteria"
        />
      )
    }
    return (
      <div className="items-list">
        {items.map(i => (
          <div className="item" key={i.name}>
            <div className="name" onClick={handleItemClick(i)}>
              {i.name}
            </div>
            <div className="tags">
              {renderLevelTag(i.level)}
              {i.tags.map((t: string) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            {renderDelete(i)}
          </div>
        ))}
      </div>
    )
  }

  const handleSortByChange = (sortBy: any) => {
    updateState({ sortBy } as State)
  }

  const handleSearchChange = (event: any) => {
    updateState({ search: event.target.value })
  }

  const handleOnCreate = (event: any) => {
    updateState({ createDrawerVisible: true })
  }

  const handleOnDrawerClose = () => {
    updateState({ createDrawerVisible: false })
  }

  if (practiceStore!.loading) {
    return (
      <Content className="content">
        <div className="practice inner">
          <States type="loading" />
        </div>
      </Content>
    )
  }

  if (practiceStore!.error) {
    return (
      <Content className="content">
        <div className="practice inner">
          <States
            type="error"
            exceptionText={practiceStore!.error}
            icon="fire"
          />
        </div>
      </Content>
    )
  }

  return (
    <div className="practice inner">
      <div className="action-bar">
        <div className="right">
          {userStore!.role === 'coach' && (
            <Button
              style={{ marginRight: 8 }}
              type="primary"
              onClick={handleOnCreate}
            >
              Create
            </Button>
          )}
          {/* Sort by &nbsp;
          <Select
            className="select-sort-by"
            defaultValue={this.state.sortBy}
            value={this.state.sortBy}
            size="small"
            style={{ width: 160 }}
            onChange={this.handleSortByChange}
          >
            <Option value="difficulty_asc">
              <Icon type="caret-up" style={{ fontSize: 10 }} /> Difficulty
            </Option>
            <Option value="assignedAt_desc">
              <Icon type="caret-down" style={{ fontSize: 10 }} /> Difficulty
            </Option>
            <Option value="name_asc">
              <Icon type="caret-up" style={{ fontSize: 10 }} /> Name
            </Option>
            <Option value="name_desc">
              <Icon type="caret-down" style={{ fontSize: 10 }} /> Name
            </Option>
          </Select>{' '}
          &nbsp;&nbsp; */}
          <Input.Search
            placeholder="Search"
            style={{ width: 200 }}
            size="small"
            value={state.search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <Tabs type="card">
        <Tabs.TabPane tab="Public" key="public-practice">
          {renderItems(
            sortItems(
              state.sortBy,
              filterItems(
                state.search,
                practiceStore!.items.filter((i: any) => i.isPublic)
              )
            )
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Private" key="private-practice">
          {renderItems(
            sortItems(
              state.sortBy,
              filterItems(
                state.search,
                practiceStore!.items.filter((i: any) => !i.isPublic)
              )
            )
          )}
        </Tabs.TabPane>
      </Tabs>
      <Drawer
        title="Create Practice Position"
        placement="right"
        closable={true}
        width={450}
        onClose={handleOnDrawerClose}
        visible={state.createDrawerVisible}
      >
        <div style={{ margin: '1rem' }}>
          <CreatePractiseProblemForm
            onClose={handleOnDrawerClose}
          />
        </div>
      </Drawer>
    </div>
  )
})

interface PracticeFormState {
  fen: string;
    confirmedFen?: string;
    setupModalVisible: boolean;
    loading: boolean
}

const CreatePractiseProblemForm = (props: {
  onClose: () => void
}) => {
  const { practiceStore } = React.useContext(MobXProviderContext)
  const [state, setState] = useState<PracticeFormState>({
    fen: Util.DEFAULT_START_FEN,
    confirmedFen: Util.DEFAULT_START_FEN,
    setupModalVisible: false,
    loading: false
  })
  const updateState = (newState: Partial<PracticeFormState>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  const [form] = useForm()
  React.useEffect(() => {
    const { setFieldsValue } = form
    setFieldsValue({
      fen: state.confirmedFen
    })
  })

  const handleSubmit = (event: any) => {
    event.preventDefault()
    form.validateFields().then(async (values: any) => {
      updateState({ loading: true })
      await practiceStore.createDrill(values)
      updateState({ loading: false })
      props.onClose()
    })
  }

  const handleOnModalCancel = () => {
    updateState({
      setupModalVisible: false
    })
  }

  const handleOnModalOk = () => {
    const { setFieldsValue } = form
    updateState({
      setupModalVisible: false
    })
    setFieldsValue({
      fen: state.fen
    })
  }

  const handleOnFenChange = (fen: string) => {
    updateState({
      fen
    })
  }
  console.log("render item list")
  return (
    <div>
      <Form form={form} onFinish={handleSubmit} className="login-form">
        <Form.Item
          name='name'
          label="Name"
          rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input placeholder="name" />
        </Form.Item>
        <Form.Item
          name='fen'
          label="Fen"
          rules={[{ required: true, message: 'Please setup fen!' }]}>
          <Button
            size="small"
            type="primary"
            onClick={() => updateState({ setupModalVisible: true })}
          >
            Setup Position
          </Button>
        </Form.Item>
        <ConfiguredChessboard
          fen={state.fen}
          width={150}
          height={150}
          interactionMode="NONE"
        />

        <Form.Item
          name='goal'
          label="Goal"
          rules={[{ required: true, message: 'Please select Goal!' }]}>
          <Select placeholder="Goal">
            <Option value="WIN">Win</Option>
            <Option value="DRAW">Draw</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='level'
          label="Level"
          rules={[{ required: true, message: 'Please select Level!' }]}>
          <Select placeholder="Level">
            <Option value="EASY">Easy</Option>
            <Option value="MEDIUM">Medium</Option>
            <Option value="HARD">Hard</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='tags'
          label="Tags">
          <Select mode="tags" placeholder="Tags" />
        </Form.Item>

        <Form.Item
          name='description'
          label="Description">
          <TextArea placeholder="Description" rows={4} />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={state.loading}>
          Create
        </Button>
      </Form>
      <Modal
        title="Setup Position"
        visible={state.setupModalVisible}
        style={{ top: 25 }}
        width={800}
        maskClosable={false}
        onCancel={handleOnModalCancel}
        onOk={handleOnModalOk}
      >
        <div className="position-setup-modal" title="Setup Position">
          <SetupChessboard
            width={550}
            height={550}
            initialFen={state.fen as ChessTypes.FEN}
            onChange={handleOnFenChange}
          />
        </div>
      </Modal>
    </div>
  )
}