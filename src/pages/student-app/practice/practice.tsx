import * as React from 'react'
import { Layout } from 'antd'
import { Route, Routes, useLocation } from 'react-router-dom'

import { ItemList } from './item-list/item-list'
import { Play } from './play/play'

const { Content } = Layout

export const Practice = ()=>{
  const location = useLocation()
  console.log("render practise")
  return (
    <Content className="practice content">
      <Routes>
        <Route
          path={'/*'}
          element={<ItemList/>}
        />
        <Route
          path={'/play/:uuid'}
          element={<Play/>}
        />
      </Routes>
    </Content>
  )
}