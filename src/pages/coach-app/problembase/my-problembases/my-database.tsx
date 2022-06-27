import React, { Component, useContext, useEffect, useState } from 'react'
import { Layout, Row, Col, Button, Table, List, Skeleton, message, Modal, UploadProps, Space, Form, Input } from 'antd'
import { observer, inject, MobXProviderContext } from 'mobx-react'
import moment from 'moment-timezone'

import './my-database.less'
import { Link, useNavigate } from 'react-router-dom'
import Dragger from 'antd/lib/upload/Dragger'
import { InboxOutlined } from '@ant-design/icons'

interface State {
  showUploadPgn: boolean
}

export const MyDatabase = observer(() => {
  const [state, setState] = useState({
    showUploadPgn: false
  })
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  const handleOk = () => {
    updateState({
      showUploadPgn: false
    })
  }
  const handleUploadPGN = () => {
    updateState({
      showUploadPgn: true
    })
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
    },
  };

  const UploadPgn: React.FC = () => (
    <Dragger {...props}>
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

  return (
    <Layout.Content className="content databases">
      <div className='header'>
        <p className="title"><span className='cursor-pointer'>Database</span></p>
        <div className='button'>
          <Button type='primary' block onClick={handleUploadPGN}>
            Upload PGN
          </Button>
        </div>
      </div>
      {state.showUploadPgn && (
        <Modal
          title="Upload PGN"
          visible={state.showUploadPgn}
          style={{ top: 25 }}
          width={800}
          maskClosable={false}
          onCancel={handleOk}
          onOk={handleOk} >
          <div className="position-setup-modal" title="Setup Position">
            <UploadPgn />
            <Button type='primary' block onClick={handleUploadPGN}>
              Create Database
            </Button>
            <Button type='primary' block onClick={handleUploadPGN}>
              Merging with Database
            </Button>
            <Form.Item name="name" rules={[{ required: true, message: 'Name is required' }]} label="Database name">
              <Input placeholder="Enter New Database Name" />
            </Form.Item>
          </div>
        </Modal>
      )}
    </Layout.Content>
  )
})