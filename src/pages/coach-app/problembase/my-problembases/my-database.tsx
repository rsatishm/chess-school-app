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

  const pgnFiles = (db: any) => {
    console.log("Before rendering: " + JSON.stringify(db))
    return db.pgnFiles ? db.pgnFiles.map((pgnFile: any) => {
      return {
        title: pgnFile.name,
        key: pgnFile.uuid,
        isLeaf: true
      }
    }) : []
  }

  React.useEffect(() => {
    console.log("PGN DATABASE LOAD!")
    gameboxDatabaseStore!.load()
  }, [])

  const dbTree = () => {
    const tree: any[] = gameboxDatabaseStore!.databases.map((db: any) => {
      return {
        title: db.name,
        key: db.uuid,
        children: pgnFiles(db)
      }
    })

    //console.log("TREE: " + JSON.stringify(tree))

    return tree
  }

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

  const handleUploadPGN = () => {
    updateState({
      uploadPgnVisible: true
    })
  }

  const toggleUploadPgnVisible = () => {
    updateState({
      uploadPgnVisible: !state.uploadPgnVisible
    })
  }

  const uploadPgn = (values: any) => {
    const data = values.pgnFile.file.originFileObj
   // console.log("Data: " + data)
  }

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    }
  };

  function isPGN(file: File) {
    return file.name.endsWith('.pgn')
  }

  function isLessThan2MB(file: File) {
    return file.size < TWO_THOUSAND_KBYTES
  }

  const beforeUpload = (file: File) => {
    if (!isPGN(file)) {
      message.error('Only PGN files are allowed')
    }
    if (!isLessThan2MB(file)) {
      message.error('PGN file size must be lesser than 2 MB')
    }

    if (isPGN(file) && isLessThan2MB(file)) {
      const reader: FileReader = new FileReader();
      updateState({ fileList: [{ uid: 1, name: file.name, status: 'done', url: reader.result }] })
    }

    return false
  }

  const UploadPgn: React.FC = () => (
    <Dragger
      disabled={gameboxDatabaseStore!.uploading}
      accept=".pgn,application/x-chess-pgn"
      supportServerRender={true}
      showUploadList={false}
      fileList={state.fileList ? state.fileList : []}
      beforeUpload={beforeUpload}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files
      </p>
    </Dragger>
  );

  const treeData: DataNode[] = [
    {
      title: 'My Databases',
      key: '0-0',
      children: dbTree()
    },
    {
      title: 'Public Databases',
      key: '0-1'
    },
  ];

  const DatabaseTree: React.FC = () => {
    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
      console.log('Trigger Select', keys, info);
      gameboxDatabaseStore!.getPgnPiecesByFile(keys[0])
    };

    const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
      console.log('Trigger Expand', keys, info);
    };

    return (
      <DirectoryTree
        onSelect={onSelect}
        treeData={treeData}        
      />
    );
  };

  const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
  //const fen = new ChessJS().fen()
  const PgnUploadLocal = () => {
    return <Modal
      title={
        gameboxDatabaseStore!.uploading
          ? 'Uploading PGN...'
          : 'Upload PGN'
      }
      style={{ width: 600 }}
      visible={state.uploadPgnVisible}
      width={800}
      maskClosable={false}
      onCancel={handleOk}
      onOk={handleOk} >
      <div className="position-setup-modal" title="Setup Position">
        <Form name="pgn-upload" onFinish={uploadPgn}>
          <Form.Item name="pgnFile" rules={[{ required: true, message: 'Upload PGN file' }]} label="PGN File">
            <UploadPgn />
          </Form.Item>
          <Button type='primary' block onClick={handleUploadPGN}>
            Create Database
          </Button>
          <Button type='primary' block onClick={handleUploadPGN}>
            Merging with Database
          </Button>
          <Form.Item name="name" rules={[{ required: true, message: 'Name is required' }]} label="Database name">
            <Input placeholder="Enter New Database Name" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
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
          <DatabaseTree />
          <SplitterLayout percentage secondaryInitialSize={65}>
            <PGNList/>            
          </SplitterLayout>
        </SplitterLayout>
      </div>
    </Layout.Content>
  )
})