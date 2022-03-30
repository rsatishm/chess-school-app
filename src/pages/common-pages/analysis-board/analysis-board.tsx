import React, { useState } from "react"
import ReactDOM from "react-dom"
import * as _ChessJS from 'chess.js'
import "../../../components/chessgroundboard/chessground.css"
import { Col, Modal } from "antd"
import queen from "../../../components/chessgroundboard/assets/images/pieces/merida/wQ.svg"
import rook from "../../../components/chessgroundboard/assets/images/pieces/merida/wR.svg"
import bishop from "../../../components/chessgroundboard/assets/images/pieces/merida/wB.svg"
import knight from "../../../components/chessgroundboard/assets/images/pieces/merida/wN.svg"
import { ChessgroundBoard } from "../../../components/chessgroundboard/ChessgroundBoard"

export const AnalysisBoard = () => {  
  const ChessJS = typeof _ChessJS === 'function' ? _ChessJS : _ChessJS.Chess
  const [chess, setChess] = useState(new ChessJS())
  const [pendingMove, setPendingMove] = useState([] as _ChessJS.Square[])
  const [selectVisible, setSelectVisible] = useState(false)
  const [fen, setFen] = useState("")
  const [lastMove, setLastMove] = useState([] as _ChessJS.Square[])

  const onMove = (from: any, to: any) => {
    const moves = chess.moves({ verbose: true })
    for (let i = 0, len = moves.length; i < len; i++) { /* eslint-disable-line */
      if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
        setPendingMove([from, to])
        setSelectVisible(true)
        return {}
      }
    }
    if (chess.move({ from, to, promotion: "b" })) {
      setFen(chess.fen())
      setLastMove([from, to])
      setTimeout(randomMove, 500)
    }
    return {}
  }

  const randomMove = () => {
    const moves = chess.moves({ verbose: true })
    const move = moves[Math.floor(Math.random() * moves.length)]
    if (moves.length > 0) {
      chess.move(move.san)
      setFen(chess.fen())
      setLastMove([move.from, move.to])
    }
  }

  const promotion = (e: any) => {
    const from = pendingMove[0]
    const to = pendingMove[1]
    chess.move({ from, to, promotion: e })
    setFen(chess.fen())
    setLastMove([from, to])
    setSelectVisible(false)
    setTimeout(randomMove, 500)
  }

  const turnColor = () => {
    return chess.turn() === "w" ? "white" : "black"
  }

 
  const calcMovable = () => {
    const dests = new Map()
    chess.SQUARES.forEach(s => {
      const ms = chess.moves({ square: s, verbose: true })
      if (ms.length) dests.set(s, ms.map(m => m.to))
    })
    return {
      free: false,
      dests,
      color: "white"
    }
  }

  return (
    <div style={{ background: "#2b313c", height: "100vh" }}>
      <Col span={6} />
      <Col span={12} style={{ top: "10%" }}>
        <ChessgroundBoard
          width="38vw"
          height="38vw"
          orientation=""
          turnColor={turnColor()}
          fen={fen}
          onMove={onMove}
        />
      </Col>
      <Col span={6} />
      <Modal visible={selectVisible} footer={null} closable={false}>
        <div style={{ textAlign: "center", cursor: "pointer" }}>
          <span role="presentation" onClick={() => promotion("q")}>
            <img src={queen} alt="" style={{ width: 50 }} />
          </span>
          <span role="presentation" onClick={() => promotion("r")}>
            <img src={rook} alt="" style={{ width: 50 }} />
          </span>
          <span role="presentation" onClick={() => promotion("b")}>
            <img src={bishop} alt="" style={{ width: 50 }} />
          </span>
          <span role="presentation" onClick={() => promotion("n")}>
            <img src={knight} alt="" style={{ width: 50 }} />
          </span>
        </div>
      </Modal>
    </div>
  )
}