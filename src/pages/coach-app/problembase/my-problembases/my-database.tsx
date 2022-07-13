import React, { Component, useContext, useEffect, useState } from 'react'
import { Layout, Row, Col, Button, Table, List, Skeleton, message, Modal, UploadProps, Space, Form, Input, Tooltip } from 'antd'
import { observer, inject, MobXProviderContext } from 'mobx-react'
import moment from 'moment-timezone'

import './my-database.less'
import '../../../common-pages/analysis-board/analysis-board.less'
import '../../../../components/scoresheet/scoresheet.less'
import { Link, useNavigate } from 'react-router-dom'
import Dragger from 'antd/lib/upload/Dragger'
import { BackwardOutlined, FastBackwardOutlined, FastForwardOutlined, ForwardOutlined, InboxOutlined, SwapOutlined, UploadOutlined } from '@ant-design/icons'
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { DataNode, DirectoryTreeProps } from 'antd/lib/tree'
import DirectoryTree from 'antd/lib/tree/DirectoryTree'
import { Chessboard } from '../../../../components/chessboard/Chessboard'
import * as _ChessJS from 'chess.js';
import { SetupChessboard } from '../../../../components/chessboard/setup-chessboard'
import Chessgroundboard from '../../../../components/chessgroundboard/Chessgroundboard'
import { PgnUploadModal } from './pgn-upload-modal'
import { PGNList } from './PGNList'
import { ProblembaseTree } from './problembase-tree'

interface State {
  uploadPgnVisible: boolean,
  fileList: Array<any>
}
const ONE_KILO_BYTE = 1024
// const TWO_FIFTY_KBYTES = 250 * ONE_KILO_BYTE
const TWO_THOUSAND_KBYTES = 2000 * ONE_KILO_BYTE


export const MyDatabase = observer(() => {
  const { gameboxDatabaseStore } = React.useContext(MobXProviderContext)
  const [state, setState] = useState<State>({
    uploadPgnVisible: false,
    fileList: []
  })

  React.useEffect(() => {
    console.log("PGN DATABASE LOAD!")
    gameboxDatabaseStore!.load()
  }, [])

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  const handleOk = () => {
    updateState({
      uploadPgnVisible: false
    })
  }

  const toggleUploadPgnVisible = () => {
    updateState({
      uploadPgnVisible: !state.uploadPgnVisible
    })
  }

  return (
    <Layout.Content className="content databases">
      <div className='header'>
        <p className="title"><span className='cursor-pointer'>Database</span></p>
        <div className='button'>
          <Button type='primary' block onClick={toggleUploadPgnVisible} loading={gameboxDatabaseStore!.uploading}>
            <UploadOutlined
              style={{
                opacity: gameboxDatabaseStore!.uploading
                  ? 0
                  : 1
              }}
            />{' '}
            Upload PGN
          </Button>

        </div>
      </div>
      {state.uploadPgnVisible && (
        <PgnUploadModal
          visible={state.uploadPgnVisible}
          onClose={toggleUploadPgnVisible}
        />
      )}
      <div className='inner'>
        <SplitterLayout percentage secondaryInitialSize={85}>
          <ProblembaseTree data={gameboxDatabaseStore!.databases}/>
          <SplitterLayout percentage secondaryInitialSize={65}>
            <PGNList/>            
          </SplitterLayout>
        </SplitterLayout>
      </div>
    </Layout.Content>
  )
})