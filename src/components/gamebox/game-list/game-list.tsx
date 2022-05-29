import { useContext, useEffect, useState } from 'react'
import { Button, Table } from 'antd'
import Measure from 'react-measure'
import { MobXProviderContext } from 'mobx-react'

import './game-list.less'
import { useNavigate } from 'react-router'
import { ApiOutlined, LoadingOutlined } from '@ant-design/icons'

interface GameShape {
  uuid: string
  index: number
  meta: {
    event: string
    site: string
    date: string
    round: string
    white: string
    black: string
    result: '1-0' | '0-1' | '1/2-1/2' | '*'
    [key: string]: string
  }
}

interface Props {
  loading: boolean
  error: boolean
  games: GameShape[]
  selectedGameUuid?: string
  onErrorRetry: () => any
  onGameSelect: (uuid: string) => any
  onGameEdit: (uuid: string) => any
}

interface State {
  height: number
}

const WrappedGameList = (props: Props)=>{
  const [state, setState] = useState<State>({
    height: -1
  })

  const handleGameSelect = (uuid: string) => () => {
    props.onGameSelect(uuid)
  }

  const getRowClassName = (record: GameShape, _: any) => {
    return record.uuid === props.selectedGameUuid ? 'rowSelected' : ''
  }

  const handleRow = (record: GameShape, _: any) => ({
    onClick: () => {
      props.onGameSelect(record.uuid)
    }
  })

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
          <ApiOutlined />
          <p>We encountered an error while loading games</p>
          <Button size="small" type="primary" onClick={props.onErrorRetry}>
            Retry
          </Button>
        </div>
      )
    }

    return null
  }

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  // TODO: Infinite list
  const renderGames = () => {
    const columns = [
      {
        width: 100,
        title: 'S No',
        dataIndex: 'index'

      },
      {
        width: 200,
        title: 'White',
        dataIndex: 'meta.white'
      },
      {
        width: 200,
        title: 'Black',
        dataIndex: 'meta.black'
      },
      {
        width: 250,
        title: 'Event',
        dataIndex: 'meta.event'
      },
      {
        width: 200,
        title: 'Date',
        dataIndex: 'meta.date'
      },
      {
        width: 100,
        title: 'Result',
        dataIndex: 'meta.result'
      },
      {
        width: 100,
        title: 'Edit Game',
        key: 'edit-game',
        render: (text: any, record: any) => {
          return (
            <a
              onClick={() => {
                props.onGameEdit(record.uuid)
              }}
            >
              Edit
            </a>
          )
        }
      }
    ]

    return (
      <Table
        style={{ width: '100%' }}
        scroll={{ x: true, y: 300 }}
        size="small"
        pagination={false}
        dataSource={props.games}
        rowKey="uuid"
        columns={columns}
        rowClassName={getRowClassName}
        onRow={handleRow}
      />
    )
  }
  return (
    <Measure
      bounds
      onResize={(contentRect: any) => {
        updateState({ height: contentRect.bounds!.height })
      }}
    >
      {({ measureRef }: any) => (
        <div ref={measureRef} className={'gameList inner'}>
          {renderGames()}
          {renderLoadingOverlay()}
          {renderErrorOverlay()}
        </div>
      )}
    </Measure>
  )
}

interface DatabaseGameProps {
  databaseUuid?: string
  selectedGameUuid?: string
  onGameSelect: (uuid: string) => any
}

export const GameList = (props: DatabaseGameProps)=>{
  const {gameboxDatabaseGameStore} = useContext(MobXProviderContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if (props.databaseUuid) {
      gameboxDatabaseGameStore!.load({
        databaseUuid: props.databaseUuid
      })
    }
  }, [props.databaseUuid])

  const handleGameEdit = (gameUuid: string) => {
    navigate('/app/board?gameUuid=' + gameUuid)
  }

  const databaseGame = gameboxDatabaseGameStore!

  if (!props.databaseUuid) {
    return (
      <div className={'gameList noDbSelected'}>
        <p>Select a database to list the games</p>
      </div>
    )
  }

  return (
    <WrappedGameList
      loading={databaseGame.loading}
      error={databaseGame.error}
      onErrorRetry={() =>
        databaseGame.load({
          databaseUuid: props.databaseUuid!
        })
      }
      games={databaseGame.games}
      onGameSelect={props.onGameSelect}
      selectedGameUuid={props.selectedGameUuid}
      onGameEdit={handleGameEdit}
    />
  )
}