import * as React from 'react'
import { Editor, EditorState, RichUtils, DraftEditorCommand } from 'draft-js'
import * as draftConvert from 'draft-convert'

import './rich-text-editor.less'
import { BarsOutlined, BoldOutlined, ItalicOutlined, OrderedListOutlined, UndoOutlined } from '@ant-design/icons'

interface Props {
  className?: string
  style?: any
  placeholder?: string
  minHeight?: number
  value?: string
  onChange?: (value: string) => any
}

interface State {
  hasFocus: boolean
  editorState: EditorState
}

export const RichTextEditor = (props: Props)=>{
  const [state, setState] = React.useState<State>({
    hasFocus: false,
    editorState: EditorState.createWithContent(
      draftConvert.convertFromHTML(props.value as any) as any
    )
  })

  React.useEffect(()=>{
    () => {
      if (props.onChange) {
        const htmlContent = draftConvert.convertToHTML(
          state.editorState.getCurrentContent()
        )
        props.onChange(htmlContent)
      }
    }
  }, [props.onChange])

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  const handleChange = (newEditorState: EditorState) => {
    updateState({ editorState: newEditorState })
  }

  const handleKeyCommand = (
    command: DraftEditorCommand,
    editorState: EditorState
  ) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      handleChange(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  const handleFocus = () => {
    updateState({ hasFocus: true })
  }

  const handleBlur = () => {
    updateState({ hasFocus: false })
  }

  const logEditorState = () => {
    console.log('--> ', state.editorState)
  }

  const toggleInlineStyle = (style: string) => (e: any) => {
    e.preventDefault()
    const newState = RichUtils.toggleInlineStyle(state.editorState, style)
    handleChange(newState)
  }

  const toggleBlockType = (type: string) => (e: any) => {
    e.preventDefault()
    const newState = RichUtils.toggleBlockType(state.editorState, type)
    handleChange(newState)
  }

  const iconStyle = { fontSize: 20, width: 20 }

  const selection = state.editorState.getSelection()
  const currentBlockType = state.editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()
  const currentInlineStyle = state.editorState.getCurrentInlineStyle()

  return (
    <div
      className={`rich-text-editor ${props.className || ''} ${state
        .hasFocus && 'focused'}`}
      style={props.style}
    >
      <style>{`.public-DraftEditor-content { min-height: ${
        props.minHeight ? props.minHeight + 'px' : 'auto'
      }; }`}</style>
      <div className="control-bar">
        <span
          className={`icon-container ${
            currentInlineStyle.has('BOLD') ? 'active' : ''
          }`}
          onMouseDown={toggleInlineStyle('BOLD')}
        >
          <BoldOutlined style={iconStyle} />
        </span>
        <span
          className={`icon-container ${
            currentInlineStyle.has('ITALIC') ? 'active' : ''
          }`}
          onMouseDown={toggleInlineStyle('ITALIC')}
        >
          <ItalicOutlined style={iconStyle} />
        </span>
        <span
          className={`icon-container ${
            currentInlineStyle.has('UNDERLINE') ? 'active' : ''
          }`}
          onMouseDown={toggleInlineStyle('UNDERLINE')}
        >
          <UndoOutlined style={iconStyle} />
        </span>
        <span
          className={`icon-container ${
            currentBlockType === 'unordered-list-item' ? 'active' : ''
          }`}
          onMouseDown={toggleBlockType('unordered-list-item')}
        >
          <BarsOutlined style={iconStyle} />
        </span>
        <span
          className={`icon-container ${
            currentBlockType === 'ordered-list-item' ? 'active' : ''
          }`}
          onMouseDown={toggleBlockType('ordered-list-item')}
        >
          <OrderedListOutlined style={iconStyle} />
        </span>
      </div>
      <div className="editor-container">
        <Editor
          editorState={state.editorState}
          onChange={handleChange}
          handleKeyCommand={handleKeyCommand}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </div>
  )
}
