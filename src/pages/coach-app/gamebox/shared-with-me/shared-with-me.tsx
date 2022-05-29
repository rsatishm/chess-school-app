import * as React from 'react'
import { MobXProviderContext } from 'mobx-react'
import {
  Button,
  Divider,
  Select,
  Input
} from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { DBList } from '../../../../components/gamebox/db-list/db-list'
import { GameList } from '../../../../components/gamebox/game-list/game-list'
import { GamePreview } from '../../../../components/gamebox/game-preview/game-preview'


interface State {
  selectedDatabaseUuid?: string
  selectedGameUuid?: string
  sortBy: string
  search: string
}

export const SharedWithMe = () => {
  const { gameboxDatabaseStore } = React.useContext(MobXProviderContext)
  const [state, setState] = React.useState<State>({
    selectedDatabaseUuid: undefined, // TODO: two-way bind to URL
    selectedGameUuid: undefined, // TODO: two-way bind to URL
    sortBy: 'name_asc',
    search: ''
  })
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  const handleDbListDatabaseSelect = (uuid: string) => {
    updateState({
      selectedDatabaseUuid: uuid,
      selectedGameUuid: undefined
    })
  }

  const handleGameListGameSelect = (uuid: string) => {
    updateState({ selectedGameUuid: uuid })
  }

  const handleSortByChange = (value: any) => {
    updateState({ sortBy: value })
  }

  const handleSearchInputChange = (e: any) => {
    updateState({ search: e.currentTarget.value })
  }

  const handleDownloadDatabase = (e: any) => {
    gameboxDatabaseStore?.download(state.selectedDatabaseUuid!)
  }

  return (
    <div className="gamebox inner">
      <div className={'container'}>
        <div className={'innerContainer'}>
          <div className={'left'}>
            <div className={'actionBar'}>
              {state.selectedDatabaseUuid && (
                <Button
                  style={{ marginRight: '8px' }}
                  onClick={handleDownloadDatabase}
                >
                  <DownloadOutlined /> Download
                </Button>
              )}

              <div className={'spacer'} />
              <Input.Search
                style={{ width: 200 }}
                className={'searchInput'}
                placeholder="Search by name"
                onChange={handleSearchInputChange}
              />
              <Select
                style={{ width: 200 }}
                placeholder="Sort (↑ Name)"
                onChange={handleSortByChange}
              >
                <Select.Option value="name_asc">↑ Name</Select.Option>
                <Select.Option value="name_desc">↓ Name</Select.Option>
                <Select.Option value="games_asc">↑ Games</Select.Option>
                <Select.Option value="games_desc">↓ Games</Select.Option>
              </Select>
            </div>
            <Divider />
            <div className={'dbList'}>
              <DBList
                listSelector="sharedWithMeDatabases"
                sortBy={state.sortBy}
                search={state.search}
                onDatabaseSelect={handleDbListDatabaseSelect}
                selectedDatabaseUuid={state.selectedDatabaseUuid}
              />
            </div>
            <div className={'gameList'}>
              <GameList
                databaseUuid={state.selectedDatabaseUuid}
                onGameSelect={handleGameListGameSelect}
                selectedGameUuid={state.selectedGameUuid}
              />
            </div>
          </div>
          <Divider style={{ height: '100%' }} type="vertical" />
          <div className={'right'}>
            <div className={'gamePreview'}>
              <GamePreview
                gameUuid={state.selectedGameUuid}
                isAnalyzeFeatureOn={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}