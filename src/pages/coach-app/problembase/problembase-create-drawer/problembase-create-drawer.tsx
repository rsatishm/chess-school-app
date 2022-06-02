import * as React from 'react'
import { Drawer, Button, Form, Progress, message } from 'antd'
import { MobXProviderContext, observer } from 'mobx-react'

import './problembase-create-drawer.less'
import { useState } from 'react'
import * as ProblemsImporter from '../../../../ProblemsImporter/ProblemsImporter'

interface Props {
  visible: boolean
  onClose: () => any
}

interface State {
  file: any
  importStatus: ProblemsImporter.Status
}

export const ProblembaseCreateDrawer = observer((props: Props) => {
  const [state, setState] = useState<State>({
    file: null,
    importStatus: {
      uploadedCount: 0,
      totalCount: 0,
      failedCount: 0,
      uploading: false
    }
  })
  const { userStore, privateProblembaseStore } = React.useContext(MobXProviderContext)
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  React.useEffect(() => {
    props.onClose()
    const shouldRefresh = state.importStatus.uploadedCount > 0
    if (shouldRefresh) {
      privateProblembaseStore!.refresh()
    }
  }, [state.importStatus.uploadedCount])
  let importer: ProblemsImporter.ProblemsImporter | null = null

  const handleCancelClick = () => {
    updateState(
      {
        file: null,
        importStatus: {
          uploadedCount: 0,
          totalCount: 0,
          failedCount: 0,
          uploading: false
        }
      }
    )
  }

  const handleSubmit = () => {
    if (state.file) {
      importer = new ProblemsImporter.ProblemsImporter({
        baseUrl: process.env.API_CORE_URL as string,
        jwtProvider: () => userStore!.accessToken,
        problembaseName: (state.file as any).name.replace(/\.pgn$/gi, ''),
        file: state.file
      })

      importer
        .getStatusStream()
        .subscribe((status: ProblemsImporter.Status) => {
          updateState({ importStatus: status })
        })

      importer.startUpload()
    }
  }

  const handleRetry = () => {
    if (importer) {
      importer.retry()
    }
  }

  const handleFileChange = (e: any) => {
    if (e.target.files[0]) {
      const sizeKb = e.target.files[0].size / 1024
      if (sizeKb > 250) {
        message.error('PGN file size is greater than 250kb')
      } else {
        updateState({
          file: e.target.files[0]
        })
      }
    }
  }

  const renderContent = () => {
    if (
      !state.importStatus.uploading &&
      state.importStatus.uploadedCount > 0
    ) {
      if (
        state.importStatus.uploadedCount ===
        state.importStatus.totalCount
      ) {
        return (
          <div className="progress container">
            <Progress type="circle" percent={100} />
            <p>Upload Completed</p>
            <Button type="primary" onClick={handleCancelClick}>
              Done
            </Button>
          </div>
        )

        // TODO: Refresh problembase store
      }

      if (
        state.importStatus.uploadedCount ===
        state.importStatus.totalCount
      ) {
        const percent = parseInt(
          (
            (state.importStatus.uploadedCount /
              state.importStatus.totalCount) *
            100
          ).toFixed(0),
          10
        )

        return (
          <div className="progress container">
            <Progress type="circle" percent={percent} status="exception" />
            <p>Partial upload failure</p>
            <Button danger onClick={handleRetry}>
              Retry
            </Button>
          </div>
        )
      }
    }

    if (state.importStatus.uploading) {
      const percent = Math.max(
        parseInt(
          (
            (state.importStatus.uploadedCount /
              state.importStatus.totalCount) *
            100
          ).toFixed(0),
          10
        ),
        10
      )

      return (
        <div className="progress container">
          <Progress
            type="circle"
            percent={isNaN(percent) || percent === 0 ? 10 : percent}
          />
          <p>Uploading</p>
        </div>
      )
    }

    return (
      <Form>
        <Form.Item help="Max 250kb. For 500+ games, uploads will take more than 2 minutes to complete.">
          <input
            style={{ marginBottom: '1em' }}
            type="file"
            accept=".pgn"
            onChange={handleFileChange}
          />
        </Form.Item>
      </Form>
    )
  }

  return <Drawer
    className="create-problembase-drawer"
    width={400}
    placement="right"
    onClose={props.onClose}
    maskClosable={false}
    closable={false}
    visible={props.visible}
  >
    <div className="drawer-inner">
      <div className="title">
        <h3>Create Problembase</h3>
      </div>
      <div className="content">{renderContent()}</div>
      <div className="button-bar">
        <Button className="cancel-button" onClick={handleCancelClick}>
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={
            state.importStatus.uploading ||
            state.importStatus.uploadedCount > 0
          }
        >
          Submit
        </Button>
      </div>
    </div>
  </Drawer>
})