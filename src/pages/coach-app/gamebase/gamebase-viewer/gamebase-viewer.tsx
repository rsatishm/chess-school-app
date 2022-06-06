import * as React from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { Divider, Breadcrumb } from 'antd'
import { MobXProviderContext, observer } from 'mobx-react'
import InfiniteScroller from 'react-infinite-scroller'

import './gamebase-viewer.less'
import { States } from '../../../../components/states/states'
import { BarsOutlined, DatabaseOutlined } from '@ant-design/icons'

export const GamebaseViewer = observer(()=>{
  const {uuid} = useParams()
  const {gamebaseContentStore} = React.useContext(MobXProviderContext)
  const navigate = useNavigate()
  const location = useLocation()

  React.useEffect(()=>{
    gamebaseContentStore!.load(uuid)
  })

  const handleClick = (uuid: string) => () => {
    navigate(location.pathname + '/' + uuid)
  }

  const handleLoadMore = (page: number) => {
    gamebaseContentStore!.loadMore(
      uuid,
      page
    )
  }

  const handleRetry = () => {
    gamebaseContentStore!.load(uuid)
  }

  const renderGames = () => {
    return (
      <InfiniteScroller
        className="games-list"
        pageStart={0}
        hasMore={true}
        loadMore={handleLoadMore}
        useWindow={false}
      >
        {gamebaseContentStore!.content[uuid!].games.map((g: any) => {
          return (
            <div
              key={g.uuid}
              className="game"
              onClick={handleClick(g.uuid)}
            >
              <div>
                <span className="white">{g.meta.white}</span>
                <span> - </span>
                <span className="black">{g.meta.black}</span>
                <span className="result"> ({g.meta.result})</span>
              </div>

              <div>
                <span className="date">{g.meta.date}</span>
                {g.meta.round && (
                  <span className="round">({g.meta.round})</span>
                )}
                <span className="site">{g.meta.site}</span>
              </div>
            </div>
          )
        })}
      </InfiniteScroller>
    )
  }

  const actionBar = (
    <div className="action-bar">
      <div className="left">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link
              to={location.pathname.replace(
                '/' + uuid,
                ''
              )}
            >
              <DatabaseOutlined/>
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <BarsOutlined />
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="right" />
    </div>
  )

  if (
    !gamebaseContentStore!.content[uuid!] ||
    gamebaseContentStore!.content[uuid!].loading
  ) {
    return (
      <div className="gamebase-viewer inner">
        {actionBar}
        <Divider className="below-action-bar" />
        <div className="container">
          <States type="loading" />
        </div>
      </div>
    )
  }

  if (gamebaseContentStore!.content[uuid!].error) {
    return (
      <div className="gamebase-viewer inner">
        {actionBar}
        <Divider className="below-action-bar" />
        <div className="container">
          <States
            type="error"
            exceptionText={
              gamebaseContentStore!.content[uuid!].error
            }
            onClick={handleRetry}
          />
        </div>
      </div>
    )
  }

  if (gamebaseContentStore!.content[uuid!].games.length === 0) {
    return (
      <div className="gamebase-viewer inner">
        {actionBar}
        <Divider className="below-action-bar" />
        <div className="container">
          <States
            type="blank"
            icon="database"
            exceptionText="This gamebase does not contain any games"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="gamebase-viewer inner">
      {actionBar}
      <Divider className="below-action-bar" />
      <div className="container">{renderGames()}</div>
    </div>
  )
})