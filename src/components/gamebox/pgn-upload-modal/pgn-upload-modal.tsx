import { ChangeEvent, useContext, useState } from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import {
  Modal,
  Upload,
  Divider,
  Input,
  Radio,
  Select,
  Button,
  message,
  Progress
} from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'

import './pgn-upload-modal.less'

import { GameboxDatabaseStore } from '../../../stores/gamebox-database'
import { UploadOutlined } from '@ant-design/icons'

const ONE_KILO_BYTE = 1024
// const TWO_FIFTY_KBYTES = 250 * ONE_KILO_BYTE
const TWO_THOUSAND_KBYTES = 2000 * ONE_KILO_BYTE

interface Props {
  gameboxDatabaseStore?: GameboxDatabaseStore
  visible: boolean
  onClose: () => any
}

interface State {
  afterUploadAction: 'create' | 'merge'
  file: null | File
  newDatabaseName: string
  mergeDatabaseUuid?: string
}

function isPGN(file: File) {
  return file.name.endsWith('.pgn')
}

function isLessThan2MB(file: File) {
  return file.size < TWO_THOUSAND_KBYTES
}

const INIT_STATE: State = {
  afterUploadAction: 'create', // or 'merge'
  file: null,
  newDatabaseName: '',
  mergeDatabaseUuid: undefined
}

export const PgnUploadModal = observer((props: Props)=>{
  const {gameboxDatabaseStore} = useContext(MobXProviderContext)
  const [state, setState] = useState<State>(INIT_STATE)

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
        return { ...prevState, ...newState }
    })
  }
  
  const cleanUpAndClose = () => {
    props.onClose()
    updateState(INIT_STATE)
  }

  const allFieldsValid = () => {
    return (
      (!!state.file &&
        state.afterUploadAction === 'create' &&
        state.newDatabaseName.trim()) ||
      (state.afterUploadAction === 'merge' && state.mergeDatabaseUuid)
    )
  }

  const databaseSelectFilterOption = (inputValue: string, option: any) => {
    return (
      option.props.children
        .toString()
        .toLowerCase()
        .indexOf(inputValue.toLowerCase()) >= 0
    )
  }

  const handleNewDatabaseNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateState({ newDatabaseName: e.currentTarget.value })
  }

  const handleMergeDatabaseChange = (uuid: any) => {
    updateState({ mergeDatabaseUuid: uuid })
  }

  const handleAfterUploadActionChange = (action: RadioChangeEvent) => {
    updateState({
      afterUploadAction: action.target.value as 'create' | 'merge'
    })
  }

  const handleFileRemove = () => {
    updateState({ file: null })
  }

  const beforeUpload = (file: File) => {
    if (!isPGN(file)) {
      message.error('Only PGN files are allowed')
    }
    if (!isLessThan2MB(file)) {
      message.error('PGN file size must be lesser than 2 MB')
    }

    if (isPGN(file) && isLessThan2MB(file)) {
      updateState({ file })
    }

    return false
  }

  const handleUpload = async () => {
    try {
      await gameboxDatabaseStore!.upload({
        file: state.file!,
        ...(state.afterUploadAction === 'create'
          ? { create: state.newDatabaseName }
          : {}),
        ...(state.afterUploadAction === 'merge'
          ? { merge: state.mergeDatabaseUuid }
          : {})
      })
      cleanUpAndClose()
      message.success('Uploaded, parsing PGN')
    } catch (e) {
      console.log('--> error: ', e)
      message.error('There was an error uploading the PGN')
    }
  }

  const renderUploader = () => {
    if (state.file) {
      return (
        <div className="ant-upload ant-upload-drag">
          {gameboxDatabaseStore!.uploading && (
            <Progress
              style={{ position: 'relative', top: -8 }}
              percent={gameboxDatabaseStore!.uploadProgressPercent}
              status="active"
              showInfo={false}
            />
          )}
          <span className="ant-upload ant-upload-btn">
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">
              {state.file.name}{' '}
              <Button
                disabled={gameboxDatabaseStore!.uploading}
                size="small"
                danger
                shape="circle"
                icon="close"
                onClick={handleFileRemove}
              />
            </p>
            <p className="ant-upload-hint">
              {(state.file.size / ONE_KILO_BYTE).toFixed(2)}kB
            </p>
          </span>
        </div>
      )
    }

    return (
      <Upload.Dragger
        disabled={gameboxDatabaseStore!.uploading}
        accept=".pgn,application/x-chess-pgn"
        supportServerRender={true}
        showUploadList={false}
        fileList={state.file ? [state.file] : []}
        beforeUpload={beforeUpload}
      >
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">Click or drag PGN File to this area</p>
        <p className="ant-upload-hint">File size limit: 2 MB</p>
      </Upload.Dragger>
    )
  }

  const mockOptions = gameboxDatabaseStore!.databases.map(
    (d: any) => (
      <Select.Option key={d.uuid} value={d.uuid}>
        {d.name}
      </Select.Option>
    )
  )
  return (
    <Modal
      title={
        gameboxDatabaseStore!.uploading
          ? 'Uploading PGN...'
          : 'Upload PGN'
      }
      style={{ width: 600 }}
      visible={props.visible}
      onCancel={cleanUpAndClose}
      maskClosable={false}
      okButtonProps={{
        loading: gameboxDatabaseStore!.uploading,
        disabled: !allFieldsValid()
      }}
      okText="Upload"
      cancelButtonProps={{
        disabled: gameboxDatabaseStore!.uploading
      }}
      closable={!gameboxDatabaseStore!.uploading}
      destroyOnClose={true}
      onOk={handleUpload}
    >
      {renderUploader()}
      <Divider>
        After upload: &nbsp;
        <Radio.Group
          disabled={gameboxDatabaseStore!.uploading}
          defaultValue="create"
          buttonStyle="solid"
          onChange={handleAfterUploadActionChange}
          value={state.afterUploadAction}
        >
          <Radio.Button value="create">Create Database</Radio.Button>
          <Radio.Button value="merge">Merge with Existing</Radio.Button>
        </Radio.Group>
      </Divider>
      {state.afterUploadAction === 'create' && (
        <Input
          disabled={gameboxDatabaseStore!.uploading}
          placeholder="Enter New Database Name"
          onChange={handleNewDatabaseNameChange}
          value={state.newDatabaseName}
          maxLength={50}
        />
      )}
      {state.afterUploadAction === 'merge' && (
        <Select
          disabled={gameboxDatabaseStore!.uploading}
          style={{ width: '100%' }}
          showSearch={true}
          placeholder="Search for an existing database"
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={databaseSelectFilterOption}
          // onSearch={this.handleSearch}
          onChange={handleMergeDatabaseChange}
          value={state.mergeDatabaseUuid}
          // notFoundContent={null}
        >
          {mockOptions}
        </Select>
      )}
    </Modal>
  )
})