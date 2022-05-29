import * as React from 'react'
import { MobXProviderContext } from 'mobx-react'
import {
  message,
  Button,
  Divider,
  Select,
  Input,
  Popconfirm
} from 'antd'

import { DeleteOutlined, DownloadOutlined, ShareAltOutlined, UploadOutlined } from '@ant-design/icons'
import { DBList } from '../../../../components/gamebox/db-list/db-list'
import { GameList } from '../../../../components/gamebox/game-list/game-list'
import { GamePreview } from '../../../../components/gamebox/game-preview/game-preview'
import { PgnUploadModal } from '../../../../components/gamebox/pgn-upload-modal/pgn-upload-modal'
import { ShareDatabaseModal } from '../../../../components/gamebox/share-database-modal/share-database-modal'

interface State {
  uploadPgnVisible: boolean
  selectedDatabaseUuid?: string
  selectedGameUuid?: string
  newDatabaseVisible: boolean
  shareDatabaseVisible: boolean
  editDatabaseVisible: boolean
  sortBy: string
  search: string
}

export const MyDatabases = () => {
  const { gameboxDatabaseStore, gameboxDatabaseGameStore } = React.useContext(MobXProviderContext)
  const [state, setState] = React.useState<State>({
    uploadPgnVisible: false,
    selectedDatabaseUuid: undefined, // TODO: two-way bind to URL
    selectedGameUuid: undefined, // TODO: two-way bind to URL
    newDatabaseVisible: false,
    shareDatabaseVisible: false,
    editDatabaseVisible: false,
    sortBy: 'name_asc',
    search: ''
  }
  )
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  const toggleUploadPgnVisible = () => {
    updateState({
      uploadPgnVisible: !state.uploadPgnVisible
    })
  }

  const toggleNewDatabaseVisible = () => {
    updateState({
      newDatabaseVisible: !state.newDatabaseVisible
    })
  }

  const toggleEditDatabaseVisible = () => {
    updateState({
      editDatabaseVisible: !state.editDatabaseVisible
    })
  }

  const toggleShareDatabaseVisible = () => {
    updateState({
      shareDatabaseVisible: !state.shareDatabaseVisible
    })
  }

  const handleDeleteDatabase = async () => {
    const uuid = state.selectedDatabaseUuid!
    try {
      updateState({ selectedDatabaseUuid: undefined })
      const result = await gameboxDatabaseStore!.deleteDb({ uuid })
      if (result) {
        message.success('Database deleted successfuly')
      } else {
        updateState({ selectedDatabaseUuid: uuid })
        message.error('Failed to delete database')
      }
    } catch (e) {
      updateState({ selectedDatabaseUuid: uuid })
      message.error('Failed to delete database')
    }
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
              <Button
                className={'uploadPgnButton'}
                onClick={toggleUploadPgnVisible}
                loading={gameboxDatabaseStore!.uploading}
              >
                <UploadOutlined
                  style={{
                    opacity: gameboxDatabaseStore!.uploading
                      ? 0
                      : 1
                  }}
                />{' '}
                Upload PGN
              </Button>
              {/* <Button
                className={styles.newDbButton}
                onClick={this.toggleNewDatabaseVisible}
                loading={this.props.gameboxDatabaseStore.creating}
              >
                <Icon
                  style={{
                    opacity: this.props.gameboxDatabaseStore.creating ? 0 : 1
                  }}
                  type="file-add"
                />{' '}
                New
              </Button> */}
              {state.selectedDatabaseUuid && (
                <Button
                  className={'shareDbButton'}
                  onClick={toggleShareDatabaseVisible}
                >
                  <ShareAltOutlined /> Share
                </Button>
              )}
              {state.selectedDatabaseUuid && (
                <Button
                  style={{ marginRight: '8px' }}
                  onClick={handleDownloadDatabase}
                >
                  <DownloadOutlined /> Download
                </Button>
              )}
              {/* {this.state.selectedDatabaseUuid && (
                <Button
                  className={styles.editDbButton}
                  onClick={this.toggleEditDatabaseVisible}
                  loading={this.props.gameboxDatabaseStore.updating}
                >
                  <Icon
                    style={{
                      opacity: this.props.gameboxDatabaseStore.updating ? 0 : 1
                    }}
                    type="edit"
                  />{' '}
                  Edit
                </Button>
              )} */}
              {state.selectedDatabaseUuid && (
                <Popconfirm
                  title="Warning, this action cannot be undone"
                  onConfirm={handleDeleteDatabase}
                >
                  <Button
                    className={'deleteDb'}
                    loading={gameboxDatabaseStore!.deleting}
                    danger
                  >
                    <DeleteOutlined
                      style={{
                        opacity: gameboxDatabaseStore!.deleting
                          ? 0
                          : 1
                      }}
                      type="delete"
                    />
                  </Button>
                </Popconfirm>
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
                listSelector="myDatabases"
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
      <PgnUploadModal
        visible={state.uploadPgnVisible}
        onClose={toggleUploadPgnVisible}
      />
      <ShareDatabaseModal
        type="coach"
        databaseUuid={state.selectedDatabaseUuid!}
        visible={state.shareDatabaseVisible}
        onClose={toggleShareDatabaseVisible}
      />
      {/* <NewDatabaseModal
        visible={this.state.newDatabaseVisible}
        onClose={this.toggleNewDatabaseVisible}
        databaseStore={{ creating: false }}
      /> */}
    </div>
  )
}
