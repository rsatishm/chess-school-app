import * as React from 'react'
import { Input, Checkbox, Button, Select, message, Row, Col } from 'antd'

import clearPieceSvg from './pieces/1.svg'
import bb from './pieces/bb.svg'
import bk from './pieces/bk.svg'
import bn from './pieces/bn.svg'
import bp from './pieces/bp.svg'
import bq from './pieces/bq.svg'
import br from './pieces/br.svg'
import wb from './pieces/wb.svg'
import wk from './pieces/wk.svg'
import wn from './pieces/wn.svg'
import wp from './pieces/wp.svg'
import wq from './pieces/wq.svg'
import wr from './pieces/wr.svg'

import { ConfiguredChessboard } from './configured-chessboard'
import { ChessTypes } from '../../types'
import * as _ChessJS from 'chess.js';
import { Chess } from 'chess.js'
import { useEffect, useRef, useState } from 'react'

interface Props {
  width: number
  height: number
  lightSquareColor?: string
  darkSquareColor?: string
  initialFen?: ChessTypes.FEN
  onChange?: (fen: ChessTypes.FEN) => any
}

interface State {
  fen: ChessTypes.FEN
  selectedPieceFenChar: string | null
}

export const SetupChessboard = (props: Props) => {
  const {
    initialFen= '8/8/8/8/8/8/8/8 w KQkq - 0 1'
  } = props
  const [state, setState] = useState<State>({
    fen: initialFen!,
    selectedPieceFenChar: null
  })
  const interactionLayerRef: React.RefObject<HTMLDivElement> = useRef(null)
  const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
  const backingGame = new ChessJS(state.fen)
  //const backingGame = new Chess(state.fen)
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  const hasCastlingRight = (fen: ChessTypes.FEN, right: string) => {
    if (isValidFen()) {
      const castlingRights = fen.split(' ')[2]
      return castlingRights.indexOf(right) >= 0
    }

    return true
  }
  const isValidFen = () => {
    //const g = new Chess()
    const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
    const g = new ChessJS()
    return g.validate_fen(state.fen).valid
  }
  const cleanFenWithCastlingRights = (fen: ChessTypes.FEN) => {
    //const g = new Chess(fen)
    const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
    const g = new ChessJS(fen)
    const e1 = g.get('e1')
    const h1 = g.get('h1')
    const a1 = g.get('a1')
    const e8 = g.get('e8')
    const h8 = g.get('h8')
    const a8 = g.get('a8')

    let cleanCastlingRights = ''

    if (
      hasCastlingRight(fen, 'K') &&
      e1 &&
      e1.color === 'w' &&
      e1.type === 'k' &&
      h1 &&
      h1.color === 'w' &&
      h1.type === 'r'
    ) {
      cleanCastlingRights += 'K'
    }

    if (
      hasCastlingRight(fen, 'Q') &&
      e1 &&
      e1.color === 'w' &&
      e1.type === 'k' &&
      a1 &&
      a1.color === 'w' &&
      a1.type === 'r'
    ) {
      cleanCastlingRights += 'Q'
    }

    if (
      hasCastlingRight(fen, 'k') &&
      e8 &&
      e8.color === 'b' &&
      e8.type === 'k' &&
      h8 &&
      h8.color === 'b' &&
      h8.type === 'r'
    ) {
      cleanCastlingRights += 'k'
    }

    if (
      hasCastlingRight(fen, 'q') &&
      e8 &&
      e8.color === 'b' &&
      e8.type === 'k' &&
      a8 &&
      a8.color === 'b' &&
      a8.type === 'r'
    ) {
      cleanCastlingRights += 'q'
    }

    const parts = fen.split(' ')
    return [
      parts[0],
      parts[1],
      cleanCastlingRights ? cleanCastlingRights : '-',
      parts[3],
      parts[4],
      parts[5]
    ].join(' ')
  }
  const setStateFen = (fen: ChessTypes.FEN) => updateState({
    fen: cleanFenWithCastlingRights(fen)
  })
  useEffect(() => {
    backingGame.load(state.fen)
    props.onChange && props.onChange(state.fen)
  }, [state.fen])

  const renderSquareClicks = () => {
    const squareSize = getSquareSize()

    const rects = []
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const squareLabel = getSquareLabel(file, rank)
        rects.push(
          <rect
            key={squareLabel}
            width={squareSize}
            height={squareSize}
            fill="transparent"
            x={getTopLeftCoordinates(rank, file)[0]}
            y={getTopLeftCoordinates(rank, file)[1]}
            onClick={handlePlacePiece(squareLabel, false)}
            onContextMenu={handlePlacePiece(squareLabel, true)}
          />
        )
      }
    }
    return rects
  }

  const renderDraggablePiece = (
    fenChar: string,
    left: number,
    top: number
  ) => {
    const squareSize = getSquareSize()
    const src = getImageSourceForFenChar(fenChar)
    const selected = state.selectedPieceFenChar === fenChar

    const onDragStart: (e: any) => void = handlePieceDragStart(fenChar)
    const onDragEnd: (e: any) => void = handlePieceDragEnd(fenChar)

    if (src) {
      return (
        <img
          key={`setup-piece-${fenChar}`}
          style={{ background: selected ? 'rgba(0, 255, 0, 0.5)' : '' }}
          width={squareSize}
          height={squareSize}
          src={src}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onClick={togglePieceSelect(fenChar)}
        />
      )
    }
  }

  const renderDraggableClearPiece = (left: number, top: number) => {
    const squareSize = getSquareSize()
    const selected = state.selectedPieceFenChar === '1'

    const onDragStart: (e: any) => void = handlePieceDragStart('1')
    const onDragEnd: (e: any) => void = handlePieceDragEnd('1')

    return (
      <img
        key={`setup-piece-1`}
        style={{ background: selected ? 'rgba(0, 150, 0, 0.5)' : '' }}
        width={squareSize}
        height={squareSize}
        src={clearPieceSvg}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onClick={togglePieceSelect('1')}
      />
    )
  }

  const handleFenLoad = () => {
    const fen = fenField.current!['input']['value']
    if (fen) {
      setFen(fen)
    }
  }

  const handleFenTextChangeOnEnter = (e: any) => {
    setFen(e.target.value)
  }

  const setFen = (fen: ChessTypes.FEN) => {
    //const chess = new Chess()
    const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
    const chess = new ChessJS()
    const isValid = chess.validate_fen(fen)
    if (isValid.valid == true) {
      if (
        state.fen.indexOf(fen) >= 0 ||
        fen.indexOf(state.fen) >= 0
      ) {
        // If substring, dont do anything
      } else {
        setStateFen(fen)
      }
    } else {
      message.error('Invalid Fen')
    }
  }

  const fenField = useRef(null)

  const handlePGNTextChange = (e: any) => {
    const pgn = e.target.value
    //const pgnBoard = new Chess()
    const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
    const pgnBoard = new ChessJS()
    pgnBoard.load_pgn(pgn)
    const inputFen = pgnBoard.fen()

    if (
      state.fen.indexOf(inputFen) >= 0 ||
      inputFen.indexOf(state.fen) >= 0
    ) {
      // If substring, dont do anything
    } else {
      setStateFen(inputFen)
    }
  }

  const handleFenInputFocus = (e: any) => {
    e.target.select()
  }

  const togglePieceSelect = (fenChar: string) => () => {
    updateState({
      selectedPieceFenChar:
        fenChar === state.selectedPieceFenChar ? null : fenChar
    })
  }

  const renderLeftPieces = () => {
    const squareSize = getSquareSize()

    return ['K', 'Q', 'R', 'N', 'B', 'P']
      .map((fenChar, i) => {
        const top = i * squareSize + squareSize * 2
        return renderDraggablePiece(fenChar, 0, top)
      })
      .concat([renderDraggableClearPiece(0, squareSize)])
  }

  const renderRightPieces = () => {
    const squareSize = getSquareSize()
    const left = squareSize * 10 - squareSize

    return ['k', 'q', 'r', 'n', 'b', 'p']
      .map((fenChar, i) => {
        const top = i * squareSize + squareSize * 2
        return renderDraggablePiece(fenChar, left, top)
      })
      .concat([renderDraggableClearPiece(left, squareSize)])
  }

  const handlePieceDragStart = (fenChar: string) => (e: DragEvent) => {
    const dragPreview = document.createElement('img')
    const dragPrevSrc = getImageSourceForFenChar(fenChar)
    if (dragPrevSrc) {
      dragPreview.src = dragPrevSrc
    }
    e.dataTransfer!.setDragImage(dragPreview, 0, 0)

    if (state.selectedPieceFenChar !== fenChar) {
      togglePieceSelect(fenChar)()
    }
  }

  const handlePieceDragEnd = (fenChar: string) => (e: DragEvent) => {
    const offset = getOffsetOnBoard(e.clientX, e.clientY)
    const [rank, file] = getRankFile(offset[0], offset[1])

    if (rank >= 0 && rank <= 7 && file >= 0 && file <= 7) {
      const squareLabel = getSquareLabel(file, rank)

      if (fenChar !== '1') {
        const color = fenChar === fenChar.toUpperCase() ? 'w' : 'b'

        backingGame.put(
          {
            color,
            type: fenChar.toLowerCase() as ChessTypes.ChessJSPiece
          },
          squareLabel
        )
      } else {
        backingGame.remove(squareLabel)
      }

      setStateFen(backingGame.fen())
    }
  }

  const handlePlacePiece = (
    squareLabel: ChessTypes.SquareLabel,
    invert: boolean
  ) => (e: any) => {
    e.preventDefault()

    const fenChar = (state.selectedPieceFenChar || '') as string

    if (fenChar) {
      if (fenChar !== '1') {
        const color = (() => {
          const c = fenChar === fenChar.toUpperCase() ? 'w' : 'b'
          if (invert && c === 'w') return 'b'
          if (invert && c === 'b') return 'w'
          return c
        })()
        const currentPiece = backingGame.get(squareLabel)

        if (
          currentPiece &&
          currentPiece.color === color &&
          currentPiece.type === fenChar.toLowerCase()
        ) {
          backingGame.remove(squareLabel)
        } else {
          backingGame.put(
            {
              color,
              type: fenChar.toLowerCase() as ChessTypes.ChessJSPiece
            },
            squareLabel
          )
        }
      } else {
        backingGame.remove(squareLabel)
      }

      setStateFen(backingGame.fen())
    }
  }

  const toggleSideToMove = (value: string) => {
    const fenParts = state.fen.split(' ')
    fenParts.splice(1, 1, value)
    const newFen = fenParts.join(' ')

    setStateFen(newFen)
  }

  const toggleCastlingRight = (right: string) => () => {
    const fen = state.fen

    const newRights = (() => {
      const castlingRights = fen.split(' ')[2]
      if (hasCastlingRight(fen, right)) {
        return castlingRights.replace(right, '')
      } else {
        return castlingRights + right
      }
    })()

    const formattedRights = (() => {
      let rights = ''
      if (!newRights || newRights === '-') return '-'
      if (newRights.indexOf('K') >= 0) rights += 'K'
      if (newRights.indexOf('Q') >= 0) rights += 'Q'
      if (newRights.indexOf('k') >= 0) rights += 'k'
      if (newRights.indexOf('q') >= 0) rights += 'q'

      return rights
    })()

    const fenParts = fen.split(' ')
    fenParts.splice(2, 1, formattedRights)
    const newFen = fenParts.join(' ')

    setStateFen(newFen)
  }

  const handleClearButton = () => {
    backingGame.load('8/8/8/8/8/8/8/8 w KQkq - 0 1')
    setStateFen(backingGame.fen())
  }

  const handleResetButton = () => {
    backingGame.load(initialFen!)
    setStateFen(backingGame.fen())
  }

  const handleStartButton = () => {
    backingGame.load(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    )
    setStateFen(backingGame.fen())
  }

  const getSize = () => {
    const size = Math.min(props.width, props.height)
    return size
  }

  const getInnerChessboardSize = () => {
    return getSquareSize() * 8
  }

  const getSquareSize = () => {
    return getSize() / 10
  }

  const getFileChar = (file: number): string => {
    return String.fromCharCode('a'.charCodeAt(0) + file)
  }

  const getRankChar = (rank: number): string => {
    return String.fromCharCode('1'.charCodeAt(0) + rank)
  }

  const getSquareLabel = (
    file: number,
    rank: number
  ): ChessTypes.SquareLabel => {
    return `${getFileChar(file)}${getRankChar(
      rank
    )}` as ChessTypes.SquareLabel
  }

  const getOffsetOnBoard = (
    clientX: number,
    clientY: number
  ): [number, number] => {
    const boardRect = (interactionLayerRef
      .current as HTMLDivElement).getBoundingClientRect()
    const xOffset = clientX - boardRect.left
    const yOffset = clientY - boardRect.top + getSquareSize() * 0.5 // FIXME: Not sure why this hack works!
    return [xOffset, yOffset]
  }

  const getRankFile = (
    boardOffsetX: number,
    boardOffsetY: number
  ): [number, number] => {
    const squareSize = getSquareSize()
    const innerSize = getInnerChessboardSize()

    // Check if offsetX and offsetY are in the bounding box (inner chessboard)
    if (
      boardOffsetX >= 0 &&
      boardOffsetX <= innerSize &&
      boardOffsetY >= 0 &&
      boardOffsetY <= innerSize
    ) {
      const rank = Math.floor(boardOffsetY / squareSize)
      const file = Math.floor(boardOffsetX / squareSize)

      return [7 - rank, file]
    }

    return [-1, -1]
  }

  const getTopLeftCoordinates = (
    rank: number,
    file: number,
    svg = true
  ): [number, number] => {
    const squareSize = getSquareSize()

    if (svg) {
      return [file * squareSize, (7 - rank) * squareSize]
    }

    return [file * squareSize, rank * squareSize]
  }

  const getImageSourceForFenChar = (fenChar: string) => {
    switch (fenChar) {
      case '1':
        return null

      case 'P':
        return wp
      case 'p':
        return bp
      case 'K':
        return wk
      case 'k':
        return bk
      case 'Q':
        return wq
      case 'q':
        return bq
      case 'R':
        return wr
      case 'r':
        return br
      case 'B':
        return wb
      case 'b':
        return bb
      case 'N':
        return wn
      case 'n':
        return bn
    }
  }

  const getSideToMove = () => {
    if (isValidFen()) {
      return state.fen.split(' ')[1]
    }

    return 'w'
  }

  //useEffect(() => {
  //backingGame.load(this.state.fen)
  //props.onChange && props.onChange(this.state.fen)
  //})[state.fen]

  const size = getSize()
  const innerSize = getInnerChessboardSize()

  return (
    <div className="SetupChessboardContainer">
      <div className="left">
        <div className="left-inner">
          <div className="LeftPieces" style={{ width: getSquareSize() }}>
            {renderLeftPieces()}
          </div>
          <div
            className="InnerChessboardContainer"
            style={{
              position: 'relative',
              width: innerSize,
              height: innerSize
            }}
          >
            <ConfiguredChessboard
              width={innerSize}
              height={innerSize}
              fen={state.fen}
              interactionMode="NONE"
              coordinates={false}
            />
            <div
              className="DragCapture Layer"
              ref={interactionLayerRef}
            />
            <div className="SquareClick Layer">
              <svg width={innerSize} height={innerSize}>
                {renderSquareClicks()}
              </svg>
            </div>
          </div>
          <div
            className="RightPieces"
            style={{ width: getSquareSize() }}
          >
            {renderRightPieces()}
          </div>
        </div>
        <div className="bottom-container" style={{ marginTop: -10 }}>
          <span className="label">FEN</span>
          <Row>
            <Col>
          <Input
            ref={fenField}
            style={{ width: 500, margin: '0 auto', display: 'block' }}          
            defaultValue={state.fen}
            onPressEnter={handleFenTextChangeOnEnter}
          // onFocus={this.handleFenInputFocus}
          />
          </Col>
          <Col>
          <Button onClick={handleFenLoad} type="primary">
            Load
          </Button>
          </Col>
          </Row>
          </div>
          <p>Type or paste FEN and press 'Enter' </p>
        <div className="bottom-container" style={{ marginTop: -10 }}>
          <span className="label">PGN moves</span>
          <Input
            style={{ width: 500, margin: '0 auto', display: 'block' }}
            onChange={handlePGNTextChange}
            onFocus={handleFenInputFocus}
          />
          <p className="muted-text">e.g. 1.e4 e5 2.Nf3 Nc6 </p>
        </div>
      </div>
      <div className="right">
        <div className="settings-container">
          <div className="castling">
            <div className="white">
              <span className="label">White:</span>
              <Checkbox
                checked={hasCastlingRight(state.fen, 'K')}
                onChange={toggleCastlingRight('K')}
              >
                O-O
              </Checkbox>
              <Checkbox
                checked={hasCastlingRight(state.fen, 'Q')}
                onChange={toggleCastlingRight('Q')}
              >
                O-O-O
              </Checkbox>
            </div>
            <div className="black">
              <span className="label">Black:</span>
              <Checkbox
                checked={hasCastlingRight(state.fen, 'k')}
                onChange={toggleCastlingRight('k')}
              >
                O-O
              </Checkbox>
              <Checkbox
                checked={hasCastlingRight(state.fen, 'q')}
                onChange={toggleCastlingRight('q')}
              >
                O-O-O
              </Checkbox>
            </div>
          </div>
          <div className="buttons">
            <span className="label">Presets:</span>
            <Button size="small" onClick={handleClearButton}>
              Clear
            </Button>
            <Button size="small" onClick={handleResetButton}>
              Reset
            </Button>
            <Button size="small" onClick={handleStartButton}>
              Initial
            </Button>
          </div>
          <div className="side-to-play">
            <span className="label">To Play:</span>&nbsp;
            <Select
              size="small"
              value={getSideToMove()}
              onChange={toggleSideToMove}
            >
              <Select.Option value="w">White</Select.Option>
              <Select.Option value="b">Black</Select.Option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
