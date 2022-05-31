import * as React from 'react'
import { Layout } from 'antd'
import { Route, Routes, useLocation } from 'react-router-dom'

import { ItemList } from './item-list/item-list'
import { Play } from './play/play'

const { Content } = Layout

export const Practice = ()=>{
  const location = useLocation()
  return (
    <Content className="practice content">
      <Routes>
        <Route
          path={location.pathname + '/'}
          element={ItemList}
        />
        <Route
          path={location.pathname + '/play/:uuid'}
          element={Play}
        />
      </Routes>
    </Content>
  )
}