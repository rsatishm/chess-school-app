import React, { Component, useContext, useEffect } from 'react'
import { Button, Spin, Table } from 'antd'
import { AnalyzerStore } from '../../stores/analyzer'
import './analyzer.less'
import { MobXProviderContext } from 'mobx-react'
import { integer } from 'aws-sdk/clients/storagegateway'
import { ApiOutlined, LoadingOutlined } from '@ant-design/icons'

interface Props {
  moves: any
  fen: any
  onClick: Function
  onAnalyzeMoveClick: Function
}

export const Analyzer = (props: Props)=>{
  const {analyzerStore} = useContext(MobXProviderContext)
  useEffect(()=>{
    analyzerStore.resetValues()
    analyzerStore.setParams(props.fen, props.moves)
    analyzerStore.setPrevFen('')
    analyzerStore.setNextFen('')
    return ()=>analyzerStore.resetValues()
  })
  const analyze = () => {
    analyzerStore.fetchData()
  }

  function setFen(fen: string) {
    props.onAnalyzeMoveClick(fen)
    analyzerStore.setBoardFen(fen)
  }

  const clickNext = () => {
    if (analyzerStore.nextFen != '') {
      props.onAnalyzeMoveClick(analyzerStore.nextFen)
      analyzerStore.setBoardFen(analyzerStore.nextFen)
    }
  }
  
  const clickPrev = () => {
    if (analyzerStore.prevFen != '') {
      props.onAnalyzeMoveClick(analyzerStore.prevFen)
      analyzerStore.setBoardFen(analyzerStore.prevFen)
    }
  }

  function errorDisplay() {
    return (
      <div className={'errorOverlay'}>
        <ApiOutlined/>
        <p>We encountered an error while loading the analysis.</p>
        <Button size="small" type="primary" onClick={analyze}>
          Retry
        </Button>
      </div>
    )
  }
  function onTableRowExpand(expanded: any, record: any) {
    var keys = []
    if (expanded) {
      keys.push(record.key)
    }

    analyzerStore.setExpandedRowKeys(keys)
    analyzerStore.setBoardFen('')
    analyzerStore.setNextFen(record.bestVarMoves[0].fen)
  }

  function loadingDisplay() {
    return (
      <div className={'loadingOverlay'}>
        <LoadingOutlined />
      </div>
    )
  }
  const rowClick = (record: any) => {
    analyzerStore.setPrevFen('')
    analyzerStore.setNextFen(record.bestVarMoves[0].fen)
    analyzerStore.setBoardFen('')
    props.onClick([record.key])
  }
  return (
    <div className={'analyzer'}>
      <h1 style={{ display: 'none' }}>{analyzerStore.boardFen}</h1>
      <Button type="primary" onClick={analyze} block>
        ANALYZE
      </Button>
      {analyzerStore.isLoading && loadingDisplay()}
      {analyzerStore.analysisLoaded && (
        <Table
          columns={analyzerStore.columns}
          onRow={(record: any) => ({
            onClick: () => {
              rowClick(record)
            }
          })}
          expandedRowKeys={analyzerStore.expandedRowKeys}
          onExpand={onTableRowExpand}
          expandedRowRender={(record: any) => {
            let a = (
              <div className={'best-move'} style={{ margin: 0 }}>
                <span>{record.bestMove}</span>
                <br />
                <br />
                <div className={'variation'}>
                  {record.bestVarMoves.map((rec: any, i: integer) => {
                    let str_classname = 'move'
                    if (analyzerStore.boardFen == rec.fen) {
                      str_classname += ' current'
                      if (i > 0) {
                        analyzerStore.setPrevFen(
                          record.bestVarMoves[i - 1].fen
                        )
                      } else {
                        analyzerStore.setPrevFen('')
                      }
                      if (i < record.bestVarMoves.length - 1) {
                        analyzerStore.setNextFen(
                          record.bestVarMoves[i + 1].fen
                        )
                      } else {
                        analyzerStore.setNextFen('')
                      }
                    }
                    if (rec.side == 'w') {
                      let b = (
                        <span
                          className={str_classname}
                          onClick={() => {
                            setFen(rec.fen)
                          }}
                          style={{ margin: 5 }}
                        >
                          {rec.moveNumber.toString() + '.' + rec.san}
                        </span>
                      )

                      return b
                    } else {
                      let j = ''
                      if (
                        rec.moveNumber == record.moveNumber &&
                        record.move1 == '...'
                      ) {
                        j = rec.moveNumber.toString() + '. ... '
                      }
                      let b = (
                        <span
                          className={'move ' + str_classname}
                          onClick={() => {
                            setFen(rec.fen)
                          }}
                          style={{ margin: 5 }}
                        >
                          {j + rec.san}
                        </span>
                      )

                      return b
                    }
                  })}
                  <div className={'controlButtons'}>
                    <Button
                      icon="step-backward"
                      size="small"
                      onClick={clickPrev}
                    />
                    <Button
                      icon="step-forward"
                      size="small"
                      onClick={clickNext}
                    />
                  </div>
                </div>
              </div>
            )
            return a
          }}
          dataSource={analyzerStore.analysisData}
          pagination={false}
        />
      )}
      {analyzerStore.noData && <h2>All good moves!</h2>}
      {analyzerStore.errorPresent && errorDisplay()}
    </div>
  )
}
