import * as R from 'ramda'
import * as React from 'react'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import {
  Divider,
  Select,
  Input,
  Breadcrumb,
  Row,
  Col,
  Tag
} from 'antd'
import {useLocation, useNavigate } from 'react-router-dom'

import './public-problembases.less'

import { States } from '../../../../components/states/states'
import { useState } from 'react'
import { DatabaseOutlined } from '@ant-design/icons'

const { Option } = Select

interface PublicProblembasesState {
  sortBy: string
  search: string
}

export const PublicProblembases = ()=>{
  const {publicProblembaseStore} = React.useContext(MobXProviderContext)
  const [state, setState] = useState<PublicProblembasesState>({
    sortBy: 'name',
    search: ''
  })
  const updateState = (newState: Partial<PublicProblembasesState>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  const navigate = useNavigate()
  const location = useLocation()
  React.useEffect(()=>{
    publicProblembaseStore!.load()
  })
  const handleProblembaseClick = (uuid: string) => () => {
    navigate(location.pathname + '/' + uuid)
  }

  const handleSortByChange = (sortBy: any) => {
    updateState({ sortBy: sortBy as string })
  }

  const handleSearchChange = (event: any) => {
    updateState({ search: event.target.value })
  }

  const sortProblembases = (sortBy: string, problembases: any[]) => {
    return R.sortBy(g => g[sortBy], problembases)
  }

  const filterProblembases = (search: string, problembases: any[]) => {
    return R.filter(
      (g: any) => g.name.toLowerCase().indexOf(search.toLowerCase()) >= 0,
      problembases
    )
  }

  const getProblembaseNameForUuid = (uuid: string) => {
    const problembase = R.find(
      R.propEq('uuid', uuid),
      publicProblembaseStore!.problembases! || []
    )
    return problembase ? (problembase as any).name : ''
  }

  const renderProblembases = (problembases: any[]) => {
    if (problembases.length === 0) {
      return (
        <div className="blank-state container">
          <DatabaseOutlined/>
          <p className="exception-text">
            No problembases found for the search criteria
          </p>
        </div>
      )
    }

    return (
      <Row className="problembase-cards container" gutter={16}>
        {problembases.map((g: any) => {
          return (
            <Col
              sm={24}
              md={12}
              lg={8}
              key={g.uuid}
              className="card"
              flex={1}
              onClick={handleProblembaseClick(g.uuid)}
            >
              <span className="name">{g.name}</span>

              <span className="count">{g.count}</span>
              <Tag style={{ marginLeft: 8 }} className="tags" color="green">
                {g.tags}
              </Tag>
            </Col>
          )
        })}
      </Row>
    )
  }
  if (publicProblembaseStore!.error) {
    return (
      <div className="public-problembases inner">
        <States
          type="error"
          exceptionText={publicProblembaseStore!.error}
          onClick={publicProblembaseStore!.load}
        />
      </div>
    )
  }

  if (publicProblembaseStore!.loading) {
    return (
      <div className="public-problembases inner">
        <States type="loading" />
      </div>
    )
  }

  const problembases = sortProblembases(
    state.sortBy,
    filterProblembases(
      state.search,
      publicProblembaseStore!.problembases! || []
    )
  )

  return (
    <div className="public-problembases inner">
      <div className="action-bar">
        <div className="left" />
        <div className="right">
          Sort by:&nbsp;
          <Select
            className="select-sort-by"
            defaultValue={state.sortBy}
            value={state.sortBy}
            size="small"
            style={{ width: 120 }}
            onChange={handleSortByChange}
          >
            <Option value="name">Name</Option>
            <Option value="count">Count</Option>
            <Option value="tags">Tags</Option>
          </Select>
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
      {problembases.length === 0 ? (
        <States
          type="blank"
          icon="database"
          exceptionText="There are no public problembases to show"
        />
      ) : (
        renderProblembases(problembases)
      )}
    </div>
  )
}
