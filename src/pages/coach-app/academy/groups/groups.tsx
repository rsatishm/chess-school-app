import * as React from 'react'
import * as R from 'ramda'
import { Input, Button, Divider, Popconfirm } from 'antd'
import { MobXProviderContext } from 'mobx-react'
import { CreateGroupDrawer } from './create-group-drawer/create-group-drawer'

import './groups.less'
import { EditGroupDrawer } from './edit-group-drawer/edit-group-drawer'
import { States } from '../../../../components/states/states'
import { TeamOutlined } from '@ant-design/icons'

interface State {
  search: string
  createDrawerVisible: boolean
  groupDetail: any
}

export const Groups = ()=>{
  const {studentsGroupsStore} = React.useContext(MobXProviderContext)
  const [state, setState] = React.useState<State>({
    search: '',
    createDrawerVisible: false,
    groupDetail: null
  })
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  React.useEffect(()=>{
    studentsGroupsStore!.load()
  })

  const handleGroupCreate = () => {
    updateState({
      createDrawerVisible: true
    })
  }

  const handleCreateGroupClose = () => {
    updateState({
      createDrawerVisible: false
    })
  }

  const handleSearchChange = (event: any) => {
    updateState({
      search: event.target.value
    })
  }

  const filterGroups = (search: string, groups: any[]) => {
    const gs = R.values(groups)
    return R.filter(
      (g: any) => g.name.toLowerCase().indexOf(search.toLowerCase()) >= 0,
      gs
    )
  }

  const sortGroups = (sortByKey: string, groups: any[]) => {
    return R.sortBy((g: any) => g[sortByKey].toLowerCase(), groups)
  }

  const handleDeleteGroup = (uuid: string) => () => {
    studentsGroupsStore!.delete(uuid)
  }

  const handleEditGroup = (uuid: string) => () => {
    updateState({
      groupDetail: studentsGroupsStore.groups[uuid]
    })
  }

  const handleEditGroupClose = () => {
    updateState({
      groupDetail: null
    })
  }

  const renderGroups = (groups: any[]) => {
    if (groups.length === 0) {
      return (
        <div className="blank-state container">
          <TeamOutlined />
          <p className="exception-text">
            No groups found for the search criteria
          </p>
        </div>
      )
    }

    return (
      <div className="group-cards container">
        {groups.map((g: any) => {
          return (
            <div key={g.uuid} className="card">
              <span className="name">{g.name}</span>
              <span className="count">
                {g.userIds.length}{' '}
                {g.userIds.length === 1 ? 'student' : 'students'}
              </span>
              <Button
                icon="edit"
                shape="circle"
                onClick={handleEditGroup(g.uuid)}
              />
              <Popconfirm
                title="Are you sure you want to delete the group?"
                onConfirm={handleDeleteGroup(g.uuid)}
              >
                <Button icon="delete" shape="circle" />
              </Popconfirm>
            </div>
          )
        })}
      </div>
    )
  }

  if (studentsGroupsStore!.loading) {
    return (
      <div className="groups inner">
        <States type="loading" />
      </div>
    )
  }

  if (studentsGroupsStore!.error) {
    return (
      <div className="groups inner">
        <States
          type="error"
          exceptionText={studentsGroupsStore!.error}
          onClick={studentsGroupsStore!.load}
        />
      </div>
    )
  }

  if (R.keys(studentsGroupsStore!.groups! || {}).length === 0) {
    return (
      <div className="groups inner">
        <States
          type="blank"
          icon="usergroup-add"
          exceptionText="You have not created any student groups so far"
          button="Create one now"
          onClick={handleGroupCreate}
        />
        <CreateGroupDrawer
          visible={state.createDrawerVisible}
          onClose={handleCreateGroupClose}
        />
      </div>
    )
  }

  const groups = sortGroups(
    'name',
    filterGroups(
      state.search,
      studentsGroupsStore!.groups! || {}
    )
  )

  return (
    <div className="groups inner">
      <div className="action-bar">
        <div className="left">
          <Button
            size="small"
            type="primary"
            onClick={handleGroupCreate}
          >
            Create
          </Button>
        </div>
        <div className="right">
          <Input.Search
            placeholder="Search"
            style={{ width: 200 }}
            size="small"
            value={state.search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <Divider className="below-action-bar" />
      {renderGroups(groups)}
      <CreateGroupDrawer
        visible={state.createDrawerVisible}
        onClose={handleCreateGroupClose}
      />
      <EditGroupDrawer
        visible={state.groupDetail !== null}
        onClose={handleEditGroupClose}
        groupDetail={state.groupDetail}
      />
    </div>
  )
}