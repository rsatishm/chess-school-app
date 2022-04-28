import * as React from 'react'
import * as R from 'ramda'

import './scoresheet.less'
import { Menu, Dropdown, Switch, Row, Col, Modal, Input } from 'antd'
import { toJS } from 'mobx'
import TextArea from 'antd/lib/input/TextArea'
import { ChessTypes } from '../../types'
import { useState } from 'react'

interface Props {
  visible: boolean
  currentPath: ChessTypes.PlyPath | null
  mainline: ChessTypes.Variation
  onGoToPath: (path: ChessTypes.PlyPath) => any
  onPromoteVariation: (path: ChessTypes.PlyPath) => any
  onAddComment: (path: ChessTypes.PlyPath, text: string) => any
  onDeleteComment: (path: ChessTypes.PlyPath) => any
  onDeleteVariation: (path: ChessTypes.PlyPath) => any
  onNagAnnotation?: (path: ChessTypes.PlyPath, code: number) => any
  areMovesHiddenForStudents: boolean
  onHideMovesChange: (checked: boolean) => any
  showHideMovesToggle: boolean
}

const MOVE_NAGS = [
  { key: 'good', symbol: '!', code: 1, text: 'good' },
  { key: 'bad', symbol: '?', code: 2, text: 'bad' },
  { key: 'excellent', symbol: '!!', code: 3, text: 'excellent' },
  { key: 'blunder', symbol: '??', code: 4, text: 'blunder' },
  { key: 'interesting', symbol: '!?', code: 5, text: 'interesting' },
  { key: 'dubious', symbol: '?!', code: 6, text: 'dubious' }
]

const EVAL_NAGS = [
  {
    key: 'w-slight-better',
    symbol: '⩲',
    text: 'white is slighly better',
    code: 14
  },
  { key: 'w-advantage', symbol: '±', text: 'advantage for white', code: 16 },
  {
    key: 'w-winning',
    symbol: '+-',
    text: 'decisive advantage for white',
    code: 18
  },
  { key: 'equal', symbol: '=', text: 'decisive advantage for white', code: 10 },
  {
    key: 'b-slight-better',
    symbol: '⩱',
    text: 'black is slighly better',
    code: 15
  },
  { key: 'b-advantage', symbol: '∓', text: 'advantage for black', code: 17 },
  {
    key: 'b-winning',
    symbol: '-+',
    text: 'decisive advantage for black',
    code: 19
  },
  { key: 'unclear', symbol: '∞', text: 'unclear', code: 13 }
]

// TODO: Move this to chess lib
const getFullMoveNumber = (fen: ChessTypes.FEN) => {
  return fen ? fen.split(' ')[5] : ' '
}

interface State {
  isAddCommentModalVisible: boolean
  comment: string
  commentPath: ChessTypes.PlyPath | null
}

export const Scoresheet = (props: Props)=>{
  const [state, setState] = useState<State>({
    isAddCommentModalVisible: false,
    comment: '',
    commentPath: null
  })

  const handleHideMovesChange = (checked: boolean) => {
    props.onHideMovesChange(checked)
  }

  const handlePromoteVariation = (path: ChessTypes.PlyPath) => () => {
    props.onPromoteVariation(path)
  }

  const handleDeleteVariation = (path: ChessTypes.PlyPath) => () => {
    props.onDeleteVariation(path)
  }

  const handleNagAnnotation = (path: ChessTypes.PlyPath, code: number) => () => {
    // TODO: Missing implementation
    // this.props.onNagAnnotation(path, code);
  }

  const renderAnnotationMenu = (path: ChessTypes.PlyPath, text: string) => {
    return (
      <Menu>
        <Menu.Item key="edit" onClick={handleEditComment(path, text)}>
          Edit
        </Menu.Item>
        <Menu.Item key="delete" onClick={handleDeleteComment(path)}>
          Delete
        </Menu.Item>
      </Menu>
    )
  }
  const renderMoveContextMenu = (path: ChessTypes.PlyPath) => {
    return (
      <Menu>
        <Menu.Item key="promote" onClick={handlePromoteVariation(path)}>
          Promote Variation
        </Menu.Item>
        <Menu.Item key="delete" onClick={handleDeleteVariation(path)}>
          Delete Variation
        </Menu.Item>
        <Menu.Item key="add-comment" onClick={handleAddComment(path)}>
          Add Comment
        </Menu.Item>
        {/*{MOVE_NAGS.map((mn) => <Menu.Item key={mn.key} onClick={this.handleNagAnnotation(path, mn.code)}><strong>{mn.symbol}</strong> ({mn.text})</Menu.Item> )}*/}
        {/*</Menu.SubMenu>*/}
        {/*<Menu.SubMenu key="evaluation" title="Evaluation">*/}
        {/*{EVAL_NAGS.map((mn) => <Menu.Item key={mn.key} onClick={this.handleNagAnnotation(path, mn.code)}><strong>{mn.symbol}</strong> ({mn.text})</Menu.Item> )}*/}
        {/*</Menu.SubMenu>*/}
      </Menu>
    )
  }

  const renderVariation = (variation: ChessTypes.Variation, level: number): any => {
    if (!variation || variation.length === 0) return null

    return (
      <div
        key={`variation-${level}-${variation[0].path}`}
        className={`variation level-${level}`}
      >
        {level > 0 && '('}
        {variation.map((m, i) => {
          const nagAnnotations = R.filter(
            a => a.type === 'NAG',
            m.annotations || []
          ) as ChessTypes.NAGAnnotation[]
          const textAnnotations = R.filter(
            a => a.type === 'TEXT',
            m.annotations || []
          )

          return (
            <React.Fragment key={m.path.toString()}>
              <span
                key={m.path.toString()}
                className={`move ${((
                  props.currentPath || ''
                ).toString() === m.path.toString() &&
                  'current') ||
                  ''}`}
                onClick={() => props.onGoToPath(m.path)}
              >
                <Dropdown
                  overlay={renderMoveContextMenu(m.path)}
                  trigger={['contextMenu']}
                >
                  <span>
                    <span className="number">
                      {m.side === 'w' && getFullMoveNumber(m.fen) + '. '}
                      {i === 0 &&
                        m.side === 'b' &&
                        (getFullMoveNumber(m.fen) as any) - 1 + '... '}
                    </span>
                    {m.san}
                  </span>
                </Dropdown>
              </span>
              {nagAnnotations.length > 0 &&
                nagAnnotations.map(a => `$${a.code}`).join(' ')}
              {textAnnotations.length > 0 && (
                <Dropdown
                  overlay={renderAnnotationMenu(
                    m.path,
                    (textAnnotations[0] as ChessTypes.TextAnnotation).body
                  )}
                  trigger={['hover', 'contextMenu']}
                >
                  <span className="text annotation">
                    ({(textAnnotations[0] as ChessTypes.TextAnnotation).body})
                  </span>
                </Dropdown>
              )}
              {m.variations && m.variations.length > 0 && (
                <div
                  key={`${m.path}-variation`}
                  className={`variations-container level-${level}`}
                >
                  {m.variations.map(v => renderVariation(v, level + 1))}
                </div>
              )}
            </React.Fragment>
          )
        })}
        {level > 0 && ')'}
      </div>
    )
  }

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
        return { ...prevState, ...newState }
    })
  }

  const handleCommentChange = ({ target: { value } }: any) => {
    updateState({
      comment: value
    })
  }

  const handleAddComment = (path: ChessTypes.PlyPath) => () => {
    updateState({
      isAddCommentModalVisible: true,
      commentPath: path
    })
  }

  const handleEditComment = (path: ChessTypes.PlyPath, text: string) => () => {
    updateState({
      isAddCommentModalVisible: true,
      commentPath: path,
      comment: text
    })
  }

  const handleDeleteComment = (path: ChessTypes.PlyPath) => () => {
    props.onDeleteComment(path)
    updateState({
      isAddCommentModalVisible: false,
      comment: '',
      commentPath: null
    })
  }

  const handleCommentModalOk = () => {
    if (state.commentPath != null) {
      props.onAddComment(state.commentPath!, state.comment)
    }

    updateState({
      isAddCommentModalVisible: false,
      comment: '',
      commentPath: null
    })
  }

  const handleCommentModalCancel = () => {
    updateState({
      isAddCommentModalVisible: false,
      comment: '',
      commentPath: null
    })
  }

  return (
    <div className={`scoresheet ${props.visible ? 'visible' : ''}`}>
      <Row
        justify="start"
        gutter={8}
        className="hide-moves-panel"
      >
        {props.showHideMovesToggle && (
          <>
            <Col>
              <Switch
                checked={!props.areMovesHiddenForStudents}
                onChange={handleHideMovesChange}
              />
            </Col>
            <Col>
              {props.areMovesHiddenForStudents ? (
                <p>Moves are hidden for students (press h key to show)</p>
              ) : (
                <p>Moves are visible to students (press h key to hide)</p>
              )}
            </Col>
          </>
        )}
      </Row>
      <div
        className={`moves ${
          props.areMovesHiddenForStudents ? 'moves-hidden' : ''
        }`}
      >
        {renderVariation(props.mainline, 0)}
      </div>
      <Modal
        title="Add comment"
        onOk={handleCommentModalOk}
        onCancel={handleCommentModalCancel}
        visible={state.isAddCommentModalVisible}
      >
        <TextArea
          value={state.comment}
          onChange={handleCommentChange}
          onPressEnter={handleCommentModalOk}
          autoSize={{ minRows: 3 }}
        ></TextArea>
      </Modal>
    </div>
  )
}
