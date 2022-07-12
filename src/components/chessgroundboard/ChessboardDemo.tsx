import React, { useState } from "react"
import ReactDOM from "react-dom"
import Chess from "chess.js"
//import Chessground from "react-chessground"
//import "./reactchessground.css"
import { Col, Modal } from "antd"
import queen from "./images/wQ.svg"
import rook from "./images/wR.svg"
import bishop from "./images/wB.svg"
import knight from "./images/wN.svg"
import XChessground from "./XChessground"
import * as _ChessJS from 'chess.js';
import './assets/theme.css'
import './assets/chessground.css'

export const ChessboardDemo = () => {
  const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
  const [chess, setChess] = useState(new ChessJS())
  const [pendingMove, setPendingMove] = useState()
  const [selectVisible, setSelectVisible] = useState(false)
  const [fen, setFen] = useState("")
  const [lastMove, setLastMove] = useState()

  const onMove = (from: Chess.Square, to: Chess.Square) => {
    const moves = chess.moves({ verbose: true })
    for (let i = 0, len = moves.length; i < len; i++) { /* eslint-disable-line */
      if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
        //setPendingMove([from, to])
        setSelectVisible(true)
        return
      }
    }
  }

  const randomMove = () => {
    const moves = chess.moves({ verbose: true })
    const move = moves[Math.floor(Math.random() * moves.length)]
    if (moves.length > 0) {
      chess.move(move.san)
      setFen(chess.fen())
      //setLastMove([move.from, move.to])
    }
  }

  const turnColor = () => {
    return chess.turn() === "w" ? "white" : "black"
  }

  const calcMovable = () => {
    const dests = new Map()
    _ChessJS.SQUARES.forEach(s => {
      const ms = chess.moves({ square: s, verbose: true })
      if (ms.length) dests.set(s, ms.map(m => m.to))
    })
    return {
      free: false,
      dests,
      color: "white"
    }
  }
  console.log("turncolor: " + turnColor())
  return (    
    <div style={{ background: "#2b313c", height: "100vh" }}>
      <Col span={6} />
      <Col span={12} style={{ top: "10%" }}>
        <XChessground
          width="38vw"
          height="38vw"
          turnColor={turnColor()}
          movable={calcMovable()}
          //lastMove={lastMove}
          fen={"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"}
          onMove={onMove}
          //style={{ margin: "auto" }}
        />
      </Col>
      <Col span={6} />
    </div>
  )
}
