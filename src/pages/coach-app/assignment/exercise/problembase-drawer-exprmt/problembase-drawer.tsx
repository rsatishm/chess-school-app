import * as React from 'react'
import * as R from 'ramda'
import { Button, Drawer, Checkbox, Input } from 'antd'
import { inject, MobXProviderContext, observer } from 'mobx-react'

import './problembase-drawer.less'

import { PrivateProblembaseStore } from '../../../../../stores/private-problembase'
import { PublicProblembaseStore } from '../../../../../stores/public-problembase'
import ProblembaseViewerDrawer from '../problembase-viewer-drawer/problembase-viewer-drawer'
import { ProblembaseContentStore } from '../../../../../stores/problembase-content'
import { LoadingOutlined } from '@ant-design/icons'
import { ProblembaseTree } from '../../../problembase/my-problembases/problembase-tree'
import { observable } from 'mobx'
import { ChessboardList } from '../../../problembase/my-problembases/chessboard-list'

interface Props {
  visible: boolean
  selectedProblemUuids: string[]
  onClose: () => any
  onSelectedProblemsChange: (uuids: string[]) => any
}

interface State {
  selectedProblembaseUuid: string
  search: string
  listPrivate: boolean
  listPublic: boolean
  dbDirVisible: boolean 
}

export const ProblembaseDrawer1 = observer((props: Props) => {
  const { privateProblembaseStore, publicProblembaseStore, problembaseContentStore, gameboxDatabaseStore} =
    React.useContext(MobXProviderContext)
  const [state, setState] = React.useState<State>({
    selectedProblembaseUuid: '',
    search: '',
    listPrivate: true,
    listPublic: true,
    dbDirVisible: true
  })
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  React.useEffect(() => {
    gameboxDatabaseStore!.load()
  }, [])
  /*
  React.useEffect(() => {
    privateProblembaseStore!.load()
    publicProblembaseStore!.load()
  })
  React.useEffect(() => {
    if (state.selectedProblembaseUuid != '') {
      problembaseContentStore!.load(state.selectedProblembaseUuid)
    }
  }, [state.selectedProblembaseUuid])
  */

  const handleProblembaseClick = (uuid: string) => () => {
    updateState({
      selectedProblembaseUuid: uuid
    })
  }

  const handleProblembaseViewerDrawerClose = () => {
    updateState({
      selectedProblembaseUuid: ''
    })
  }

  const handleProblemSelect = (uuid: string) => {
    props.onSelectedProblemsChange([
      ...props.selectedProblemUuids,
      uuid
    ])
  }

  const handleProblemSelect10 = () => {
    var allProblemUuids = problembaseContentStore!.content[
      state.selectedProblembaseUuid
    ].problems.map((p: any) => p.uuid)

    var select = []
    let count = 0

    let lastSelectedIndex: number = 0
    allProblemUuids.forEach((uuid: any, index: number) => {
      if (props.selectedProblemUuids.includes(uuid)) {
        lastSelectedIndex = index
      }
    })

    allProblemUuids.splice(0, lastSelectedIndex + 1)

    for (let uuid of allProblemUuids) {
      if (count < 10 && props.selectedProblemUuids.indexOf(uuid) < 0) {
        count += 1
        select.push(uuid)
      }
    }

    props.onSelectedProblemsChange([
      ...props.selectedProblemUuids,
      ...select
    ])
  }

  const handleProblemSelectAll = async () => {
    var allProblems = await problembaseContentStore!.loadAllUuids(
      state.selectedProblembaseUuid
    )
    var allProblemUuids = allProblems.map((p: { uuid: any }) => p.uuid)
    props.onSelectedProblemsChange([
      ...new Set([...allProblemUuids, ...props.selectedProblemUuids])
    ])
  }

  const handleProblemDeselectAll = async () => {
    var allProblems = await problembaseContentStore!.loadAllUuids(
      state.selectedProblembaseUuid
    )
    var allProblemUuids = new Set(allProblems.map((p: { uuid: any }) => p.uuid))

    props.onSelectedProblemsChange(
      props.selectedProblemUuids.filter(uuid => !allProblemUuids.has(uuid))
    )
  }

  const handleProblemUnselect = (uuid: string) => {
    props.onSelectedProblemsChange(
      props.selectedProblemUuids.filter(pUuid => pUuid !== uuid)
    )
  }

  const handleCheckboxToggle = (stateKey: string) => () => {
    updateState(
      R.assoc(stateKey, !(state as any)[stateKey], {} as State)
    )
  }

  const handleSearchChange = (event: any) => {
    updateState({
      search: event.target.value
    })
  }

  const getFilteredProblembases = (search: string, problembases: any[]) => {
    /*
    const publicBases = state.listPublic
      ? publicProblembaseStore!.problembases! || []
      : []
    const privateBases = state.listPrivate
      ? privateProblembaseStore!.problembases! || []
      : []
    return [...publicBases, ...privateBases].filter(
      p => p.name.toLowerCase().indexOf(state.search.toLowerCase()) >= 0
    )*/
    return problembases.filter(
      p => p.name.toLowerCase().indexOf(search.toLowerCase()) >= 0
    )
  }

  const sortProblembases = (problembases: any[]) => {
    return R.sortBy(p => p.name.toLowerCase(), problembases)
  }

  const drawerProps = {
    className: 'problembase-viewer-drawer',
    width: 600,
    placement: 'right',
    onClose: props.onClose,
    maskClosable: false,
    closable: false,
    visible: props.visible
  } as any
/*
  if (
    privateProblembaseStore!.loading ||
    publicProblembaseStore!.loading
  ) {
    return (
      <Drawer {...drawerProps}>
        <div className="drawer-inner">
          <div className="title">
            <h3>Choose problembase to add problems from</h3>
          </div>
          <div className="content">
            <div className="loading-state container">
              <LoadingOutlined spin={true} />
              <p className="exception-text">Loading</p>
            </div>
          </div>
          <div className="button-bar">
            <Button className="cancel-button" onClick={props.onClose}>
              Cancel
            </Button>
            <Button type="primary" onClick={props.onClose}>
              Done
            </Button>
          </div>
        </div>
      </Drawer>
    )
  }*/

  const problembases = sortProblembases(
    getFilteredProblembases(
      state.search,
      gameboxDatabaseStore!.databases! || []
    )
  )

  return (
    <Drawer {...drawerProps}>
      <ProblembaseViewerDrawer
        onClose={handleProblembaseViewerDrawerClose}
        problembaseUuid={state.selectedProblembaseUuid}
        onProblemSelect={handleProblemSelect}
        onProblemSelect10={handleProblemSelect10}
        onProblemSelectAll={handleProblemSelectAll}
        onProblemDeselectAll={handleProblemDeselectAll}
        onProblemUnselect={handleProblemUnselect}
        selectedProblemUuids={props.selectedProblemUuids}
      />
      <div className="drawer-inner">
        <div className="title">
          <h3>Choose problembase to add problems from</h3>
        </div>            
        <div className="content">
        {state.dbDirVisible && <div className="status-bar">
          Selected {props.selectedProblemUuids.length}
          <div>            
            <Input
              className="search-input"
              placeholder="Search"
              size="small"
              value={state.search}
              onChange={handleSearchChange}
            />
          </div>
        </div>}
        {state.dbDirVisible && <ProblembaseTree onSelect={()=>{
              updateState({dbDirVisible: false})
            }} data={problembases}/>}
            {!state.dbDirVisible && <ChessboardList onBack={()=>{
              updateState({dbDirVisible: true})
            }}/>}
          <div className="container">
            {
            /*
            problembases.map((g: any) => {
              return (
                <div
                  key={g.uuid}
                  className="card"
                  onClick={handleProblembaseClick(g.uuid)}
                >
                  <span className="name">{g.name}</span>
                  <span className="count">{g.count}</span>
                </div>
              )
            })*/
            
            }
          </div>
        </div>
        <div className="button-bar">
          <Button className="cancel-button" onClick={props.onClose}>
            Cancel
          </Button>
          <Button type="primary" onClick={props.onClose}>
            Done
          </Button>
        </div>
      </div>
    </Drawer>
  )
})