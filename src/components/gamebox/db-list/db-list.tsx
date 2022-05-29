import * as R from 'ramda'
import { useContext, useEffect } from 'react'
import { Button } from 'antd'
import { MobXProviderContext } from 'mobx-react'
import QueueAnim from 'rc-queue-anim'

import './db-list.less'
import { GameboxDatabaseStore } from '../../../stores/gamebox-database'
import { ApiOutlined, FileFilled, LoadingOutlined } from '@ant-design/icons'

interface Db {
  uuid: string
  name: string
  gameCount: number
  lastModified: string | number
  sharedWith: string[]
  owner: any
}

interface Props {
  loading: boolean
  error: boolean
  databases: Db[]
  selectedDatabaseUuid?: string
  onErrorRetry: () => any
  onDatabaseSelect: (uuid: string) => any
  displayOwnerName: boolean
}

interface State {}

const WrappedDbList = (props: Props)=>{
  const handleDatabaseSelect = (uuid: string) => () => {
    props.onDatabaseSelect(uuid)
  }

  const renderLoadingOverlay = () => {
    if (props.loading) {
      return (
        <div className={'loadingOverlay'}>
          <LoadingOutlined/>
        </div>
      )
    }

    return null
  }

  const renderErrorOverlay = () => {
    if (props.error) {
      return (
        <div className={'errorOverlay'}>
          <ApiOutlined/>
          <p>We encountered an error while loading databases</p>
          <Button size="small" type="primary" onClick={props.onErrorRetry}>
            Retry
          </Button>
        </div>
      )
    }

    return null
  }

  const renderEmptyOverlay = () => {
    if (props.error || props.loading) {
      return null
    }

    return (
      <div className={'emptyOverlay'}>
        <FileFilled/>
        <p>You do not have any databases or search criteria doesn't match</p>
      </div>
    )
  }

  // TODO: Infinite list
  const renderDatabases = () => {
    return (
      <QueueAnim type="scale" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {props.databases.map(d => (
          <div
            key={d.uuid}
            className={[
              'database',
              props.selectedDatabaseUuid === d.uuid ? 'selected' : ''
            ].join(' ')}
            onClick={handleDatabaseSelect(d.uuid)}
          >
            <FileFilled className={'fileIcon'}/>
            <span className={'name'}>
              {d.name}{' '}
              {props.displayOwnerName &&
                `(${d.owner.firstname} ${d.owner.lastname})`}
            </span>
            <span className={'gameCount'}>
              {d.gameCount} {d.gameCount === 1 ? 'game' : 'games'}
            </span>
          </div>
        ))}
      </QueueAnim>
    )
  }
  return (
    <div className={'dbList inner'}>
      {props.databases.length > 0 && renderDatabases()}
      {props.databases.length === 0 && renderEmptyOverlay()}
      {renderLoadingOverlay()}
      {renderErrorOverlay()}
    </div>
  )
}

interface WrapperProps {
  sortBy: string
  search: string
  gameboxDatabaseStore?: GameboxDatabaseStore
  selectedDatabaseUuid?: string
  listSelector: 'databases' | 'myDatabases' | 'sharedWithMeDatabases'
  onDatabaseSelect: (uuid: string) => any
}

export const DBList = (props: WrapperProps)=>{
  const {gameboxDatabaseStore} = useContext(MobXProviderContext)
  useEffect(()=>{
    gameboxDatabaseStore!.load()
  })

  const sortDatabases = (sortBy: string, databases: any[]) => {
    const [key, dir] = sortBy.split('_')

    if (key === 'games') {
      const _databases = R.sortBy(d => d.gameCount, databases)
      return dir === 'desc' ? _databases.reverse() : _databases
    }

    if (key === 'name') {
      const _databases = R.sortBy(d => d.name, databases)
      return dir === 'desc' ? _databases.reverse() : _databases
    }

    return databases
  }

  const getDatabaseList = () => {
    if (props.listSelector === 'databases') {
      return gameboxDatabaseStore!.databases || []
    }

    if (props.listSelector === 'myDatabases') {
      return gameboxDatabaseStore!.myDatabases || []
    }

    if (props.listSelector === 'sharedWithMeDatabases') {
      return gameboxDatabaseStore!.sharedWithMeDatabases || []
    }

    return []
  }
 
  const database = gameboxDatabaseStore!
  
  const databases = sortDatabases(
      props.sortBy,
      R.filter(
        (d: any) =>
          (d.name || '')
            .toLowerCase()
            .includes((props.search || '').toLowerCase()),
        getDatabaseList()
      )
    )

    return (
      <WrappedDbList
        loading={database.loading}
        error={database.error}
        onErrorRetry={() => database.load()}
        databases={databases}
        selectedDatabaseUuid={props.selectedDatabaseUuid}
        displayOwnerName={props.listSelector == 'sharedWithMeDatabases'}
        onDatabaseSelect={props.onDatabaseSelect}
      />
    )
}