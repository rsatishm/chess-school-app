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

interface State {
  uploadPgnVisible: boolean,
  fileList: Array<any>
}
const ONE_KILO_BYTE = 1024
// const TWO_FIFTY_KBYTES = 250 * ONE_KILO_BYTE
const TWO_THOUSAND_KBYTES = 2000 * ONE_KILO_BYTE

export const MyDatabase = observer(() => {
  const { gameboxDatabaseStore, gameboxDatabaseGameStore } = React.useContext(MobXProviderContext)
  const [state, setState] = useState<State>({
    uploadPgnVisible: false,
    fileList: []
  })

  React.useEffect(()=>{
    gameboxDatabaseStore!.load()
  })

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
      console.log("Data: " + data)
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
      updateState({fileList: [{ uid: 1, name: file.name, status: 'done', url: reader.result }]})
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
      children: [
        { title: 'Absolute Pin (Easy)', key: '0-0-0', isLeaf: true },
        { title: 'Absolute Pin (Hard)', key: '0-0-1', isLeaf: true },
        { title: 'Clearance (Easy)', key: '0-0-2', isLeaf: true },
        { title: 'Clearance (Hard)', key: '0-0-3', isLeaf: true },
        { title: 'Blockade (Easy)', key: '0-0-4', isLeaf: true },
        { title: 'Blockade (Hard)', key: '0-0-5', isLeaf: true }
      ],
    },
    {
      title: 'Public Databases',
      key: '0-1'
    },
  ];

  const DatabaseTree: React.FC = () => {
    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
      console.log('Trigger Select', keys, info);
    };

    const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
      console.log('Trigger Expand', keys, info);
    };

    return (
      <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={treeData}
      />
    );
  };

  const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
  const fen = new ChessJS().fen()

  const backward = () => { }
  const prev = () => { }
  const handleFlip = () => { }
  const next = () => { }
  const forward = () => { }

  const PgnUploadLocal = ()=>{
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

  const ChessboardPosition = () => {
    return (<Row className="analysis-board scoresheet-container">
      <Col md={{ span: 12, offset: 2 }} sm={24}>
        <Chessgroundboard
          height={600}
          width={600}
          orientation='w'
          fen={fen}
          turnColor='white'
          onMove={() => { }}
        />
        <Row
          justify="center"
          style={{ marginTop: '1rem', marginBottom: '1rem' }}
        >
          <Col span={2} offset={1}>
            <Tooltip title="fast-backward (< key)">
              <Button
                icon={<FastBackwardOutlined />}
                type="ghost"
                shape="circle"
                onClick={backward}
              />
            </Tooltip>
          </Col>
          <Col span={2}>
            <Tooltip title="backward (left arrow)">
              <Button
                icon={<BackwardOutlined />}
                type="ghost"
                shape="circle"
                onClick={prev}
              />
            </Tooltip>
          </Col>
          <Col span={2}>
            <Tooltip title="flip board (f key)">
              <Button
                icon={<SwapOutlined />}
                style={{ transform: 'rotate(90deg)' }}
                type="ghost"
                shape="circle"
                onClick={handleFlip} //{this.props.analysisBoardStore!.prev} //change this
              />
            </Tooltip>
          </Col>
          <Col span={2}>
            <Tooltip title="forward (right arrow)">
              <Button
                icon={<ForwardOutlined />}
                type="ghost"
                shape="circle"
                onClick={next}
              />
            </Tooltip>
          </Col>
          <Col span={2}>
            <Tooltip title="fast-forward (> key)">
              <Button
                icon={<FastForwardOutlined />}
                type="ghost"
                shape="circle"
                onClick={forward}
              />
            </Tooltip>
          </Col>
        </Row>
      </Col>
    </Row>)
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
            <div>PNG details</div>
            <div>
              <ChessboardPosition />
            </div>
          </SplitterLayout>
        </SplitterLayout>
      </div>
    </Layout.Content>
  )
})