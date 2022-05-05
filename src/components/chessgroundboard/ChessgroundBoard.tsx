import React, { useEffect, useRef, useState } from 'react'
//import Chessground from './chessground'
import { Chessground } from 'chessground'
import { Chess, ShortMove, Square } from 'chess.js'
import * as _ChessJS from 'chess.js';

import wQ from './assets/images/pieces/merida/wQ.svg'
import wR from './assets/images/pieces/merida/wR.svg'
import wB from './assets/images/pieces/merida/wB.svg'
import wN from './assets/images/pieces/merida/wN.svg'
import bQ from './assets/images/pieces/merida/bQ.svg'
import bR from './assets/images/pieces/merida/bR.svg'
import bB from './assets/images/pieces/merida/bB.svg'
import bN from './assets/images/pieces/merida/bN.svg'
import blankPiece from './assets/images/pieces/merida/1.svg'

import './assets/theme.css'
import './assets/chessground.css'
import ReactResizeDetector from 'react-resize-detector'
import PropTypes from 'prop-types'
import { Api } from 'chessground/api'

const PIECE_IMAGES = {
  wq: wQ,
  wr: wR,
  wb: wB,
  wn: wN,
  bq: bQ,
  br: bR,
  bb: bB,
  bn: bN,
  w1: blankPiece,
  b1: blankPiece
}

interface Props {
  height?: number | string
  width?: number | string
  onMove: (...args: any) => void
  fen: string
  orientation: string
  turnColor: string,
  movable?: typeof PropTypes.object,
  lastMove?: typeof PropTypes.array
}

type PromotionPopupDetails = null | {
  file: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
  color: 'w' | 'b'
  pendingMove: ShortMove
}

interface State {
  size: number
  width: number
  promotionPopupDetails: null | {
    file: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
    color: 'w' | 'b'
    pendingMove: ShortMove
  }
}

const Chessgroundboard = (props: Props) => {
  let boardContainer = useRef(null)

  const [state, setState] = useState<State>({
    size: 0,
    width: 400,
    promotionPopupDetails: null
  })

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  const getPromotionDetails = (fen: string, from: string, to: string): PromotionPopupDetails => {
    const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
    const pos = new ChessJS(props.fen)
    const turn = pos.turn()

    const move = pos.move({ from, to, promotion: 'q' } as ShortMove)

    if (move && move.promotion) {
      return { color: turn, file: to.charAt(0) } as PromotionPopupDetails
    }

    return null
  }

  const handleOnMove = (from: Square, to: Square) => {
    const promotion: PromotionPopupDetails = getPromotionDetails(props.fen, from, to)
    if (promotion) {
      updateState({
        promotionPopupDetails: { ...promotion, pendingMove: { from, to } }
      })
    } else {
      props.onMove(from, to)
    }
  }

  const handlePromotePiece = (promotionPiece: 'q' | 'r' | 'n' | 'b') => {
    if (state.promotionPopupDetails) {
      const pendingMove = state.promotionPopupDetails!.pendingMove
      props.onMove(pendingMove.from, pendingMove.to, {
        promotion: promotionPiece
      })
      updateState({ promotionPopupDetails: null })
    }
  }

  const cancelPromotePiece = () => {
    updateState({ promotionPopupDetails: null })
  }

  const onResize = (width: number, height: number) => {
    console.log(width, height)
    updateState(
      {
        size: Math.min(width, height),
        width: width
      }
    )
  }

  const propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fen: PropTypes.string,
    orientation: PropTypes.string,
    turnColor: PropTypes.string,
    lastMove: PropTypes.array,
    movable: PropTypes.object,
    onMove: PropTypes.func
  }

  const buildConfigFromProps = () => {
    const config: any = { events: {} }

    Object.keys(propTypes).forEach(k => {
      const v = (props as any)[k]
      if (v) {
        const match = k.match(/^on([A-Z]\S*)/)
        if (k === 'onMove') {
          config.events['move'] = handleOnMove
        } else if (match) {
          config.events[match[1].toLowerCase()] = v
        } else {
          config[k] = v
        }
      }
    })

    return config
  }

  let ground: Api
  useEffect(() => {
    console.log("Create chessground. Cfg: " + JSON.stringify(buildConfigFromProps()))
    ground = Chessground(
      boardContainer.current,
      buildConfigFromProps()
    )
    return () => {
      console.log("Destroy chessground");
      ground.destroy()
    }
  })


  useEffect(() => {
    console.log("Properties changed: " + JSON.stringify(props))
    ground.set(buildConfigFromProps())
    console.log("Redraw chessground " + ground + ", Cfg: " + buildConfigFromProps())

    // Typical usage (don't forget to compare props):
    ground!.redrawAll()
  }, [props.height, props, props.width, props.orientation, state.size, state.width])

  const playSound = () => {
    var audio = new Audio('https://lichess1.org/assets/sound/standard/Move.ogg')
    audio.play()
  }

  useEffect(() => {
    playSound()
  }, [props.fen])

  type qrnb = 'q' | 'r' | 'n' | 'b'

  const renderPromotionPopup = () => {
    const POPUP_STYLE = {
      position: 'absolute',
      left: 0,
      right: 0,
      top: '30%',
      background: 'rgba(100, 100, 100, 0.35)',
      zIndex: 2,
      textAlign: 'center'
    } as React.CSSProperties

    const OUTER_STYLE = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    } as React.CSSProperties

    if (!state.promotionPopupDetails) return null
    return (

      <div style={OUTER_STYLE} onClick={() => cancelPromotePiece()}>
        {['w', 'b'].map(
          (color: string) =>
            (state.promotionPopupDetails as PromotionPopupDetails)!.color === color && (
              <div key={color} className="promotion-popup" style={POPUP_STYLE}>
                {['q', 'r', 'b', 'n', '1'].map((piece: string) => (
                  <div
                    key={piece}
                    style={{
                      padding: 10,
                      display: 'inline-block',
                      cursor: 'pointer'
                    }}
                    onClick={() => handlePromotePiece(piece as qrnb)}
                  >
                    <img
                      src={PIECE_IMAGES[`${color}${piece}` as (keyof typeof PIECE_IMAGES)]}
                      width={state.size / 6}
                      height={state.size / 6}
                    />
                  </div>
                ))}
              </div>
            )
        )}
      </div>
    )
  }

  const defaultSize = 400
  const padding = 12

  return (
    <>
    <div
      className="brown merida"
      style={{
        height: state.width + 2 * padding,
        maxHeight: '95vh',
        padding: padding
      }}
    >
      <div
        ref={boardContainer}
        className="cg-board-wrap"
        style={{
          height: state.size || defaultSize,
          width: state.size || defaultSize
        }}
      />
      {renderPromotionPopup()}
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={onResize}
      />
    </div>
    </>
  )
}

export default Chessgroundboard
