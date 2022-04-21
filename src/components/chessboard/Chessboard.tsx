import { RefObject, useEffect, useRef, useState } from 'react'
import { ChessTypes } from '../../types'
import * as Util from '../../utils/Util'
import './chessboard.css'

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
import arrow from './arrow.svg'
import { Chess } from 'chess.js'


export interface ChessboardProps {
    width: number
    height: number
    fen: string
    lightSquareColor?: string
    darkSquareColor?: string
    interactionMode: 'NONE' | 'MOVE' | 'SQUARE_HIGHLIGHT' | 'ARROW'
    squareHighlights?: ChessTypes.SquareHighlightAnnotation[]
    arrows?: ChessTypes.ArrowAnnotation[]
    coordinates?: boolean
    orientation?: ChessTypes.Side
    showSideToMove?: boolean
    allowIllegal?: boolean
    blindfold?: boolean
    onMove?: (move: ChessTypes.ChessJSVerboseMove) => any
    onSquareHighlightChange?: (
        squareHighlights: ChessTypes.SquareHighlightAnnotation[]
    ) => any
    onArrowChange?: (arrows: ChessTypes.ArrowAnnotation[]) => any
}

interface State {
    fromRank: number
    fromFile: number
    promotionPrompt?: { file: number; side: ChessTypes.Side },
    dragEvent?: DragEvent
}

export const Chessboard = (props: ChessboardProps = {
    width: 300,
    height: 300,
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    orientation: 'w',
    coordinates: false,
    lightSquareColor: '#f0d9b5',
    darkSquareColor: '#b58863',
    interactionMode: 'NONE',
    squareHighlights: [],
    arrows: [],
    showSideToMove: false,
    allowIllegal: false,
    blindfold: false
}) => {
    const interactionLayerRef: RefObject<HTMLDivElement> = useRef(null)
    const HIGHLIGHT_COLOR = '#208530'
    const [state, setState] = useState<State>({ fromRank: -1, fromFile: -1 })
    const getSize = () => {
        return Math.min(props.width, props.height)
    }
    const size = getSize()
    const fullSize = size

    const getSquareSize = () => {
        return getSize() / 8
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

    const getSquareFill = (rank: number, file: number): string => {
        console.log("r: " + rank + ", f: " + file)
        if (rank % 2 === 0 && file % 2 === 0) {
            console.log("D")
            return props.darkSquareColor!
        }

        if (rank % 2 === 0 && file % 2 !== 0) {
            console.log("L")
            return props.lightSquareColor!
        }

        if (rank % 2 !== 0 && file % 2 === 0) {
            console.log("L")
            return props.lightSquareColor!
        }

        if (rank % 2 !== 0 && file % 2 !== 0) {
            console.log("D")
            return props.darkSquareColor!
        }

        console.log("M")

        return ''
    }

    const getTopLeftCoordinates = (
        rank: number,
        file: number,
        svg = true
    ): [number, number] => {
        const squareSize = getSquareSize()

        if (svg) {
            if (props.orientation === 'w') {
                return [file * squareSize, (7 - rank) * squareSize]
            }

            return [(7 - file) * squareSize, rank * squareSize]
        }

        if (props.orientation === 'w') {
            return [file * squareSize, rank * squareSize]
        }

        return [(7 - file) * squareSize, (7 - rank) * squareSize]
    }

    const renderSquares = () => {
        const squareSize = getSquareSize()

        const rects = []
        for (let rank = 0; rank < 8; rank++) {
            for (let file = 0; file < 8; file++) {
                rects.push(
                    <rect
                        key={getSquareLabel(file, rank)}
                        data-label={getSquareLabel(file, rank)}
                        width={squareSize}
                        height={squareSize}
                        fill={getSquareFill(rank, file)}
                        x={getTopLeftCoordinates(rank, file)[0]}
                        y={getTopLeftCoordinates(rank, file)[1]}
                    />
                )
            }
        }
        return rects
    }

    const renderSelectedSquare = () => {
        const squareSize = getSquareSize()
        const rank = state.fromRank
        const file = state.fromFile

        return (
            <rect
                key={`${rank}${file}`}
                width={squareSize}
                height={squareSize}
                fill={HIGHLIGHT_COLOR}
                opacity={0.3}
                x={getTopLeftCoordinates(rank, file)[0]}
                y={getTopLeftCoordinates(rank, file)[1]}
            />
        )
    }

    const renderRankCoordinates = () => {
        const squareSize = getSquareSize()
        const file = props.orientation === 'w' ? 0 : 7

        const texts = []
        for (let rank = 0; rank < 8; rank++) {
            texts.push(
                <text
                    x={getTopLeftCoordinates(rank, file)[0] + squareSize * 0.04}
                    y={getTopLeftCoordinates(rank, file)[1] + squareSize * 0.225}
                    key={getSquareLabel(file, rank)}
                    width={squareSize}
                    height={squareSize}
                    fill={getSquareFill(rank + 1, file)}
                    fontSize={squareSize * 0.155}
                    textAnchor="bottom"
                >
                    {getRankChar(rank)}
                </text>
            )
        }

        return texts
    }

    const renderFileCoordinates = () => {
        const squareSize = getSquareSize()
        const rank = props.orientation === 'w' ? 0 : 7

        const texts = []
        for (let file = 0; file < 8; file++) {
            console.log("Label: " + getFileChar(file) + getRankChar(rank))
            texts.push(
                <text
                    x={
                        getTopLeftCoordinates(rank, file)[0] +
                        squareSize -
                        squareSize * 0.125
                    }
                    y={
                        getTopLeftCoordinates(rank, file)[1] +
                        squareSize -
                        squareSize * 0.055
                    }
                    key={getSquareLabel(rank, file)}
                    width={squareSize}
                    height={squareSize}
                    fill={getSquareFill(rank, file + 1)}
                    fontSize={squareSize * 0.155}
                >
                    {getFileChar(file)}
                </text>
            )
        }

        return texts
    }

    const getFileRank = (
        squareLabel: ChessTypes.SquareLabel
    ): [number, number] => {
        return [
            squareLabel.charCodeAt(0) - 'a'.charCodeAt(0),
            squareLabel.charCodeAt(1) - '1'.charCodeAt(0)
        ]
    }

    const renderSquareHighlights = () => {
        const squareSize = getSquareSize()
        if (props.squareHighlights === undefined) {
            return
        }

        return props.squareHighlights!.map(a => {
            const [file, rank] = getFileRank(a.square)
            return (
                <rect
                    key={getSquareLabel(file, rank)}
                    data-label={getSquareLabel(file, rank)}
                    width={squareSize}
                    height={squareSize}
                    fill={a.color}
                    opacity={0.5}
                    x={getTopLeftCoordinates(rank, file)[0]}
                    y={getTopLeftCoordinates(rank, file)[1]}
                />
            )
        })
    }

    const renderArrows = () => {
        const squareSize = getSquareSize()
        const halfSize = squareSize * 0.5
        const arrowSize = squareSize / 8

        if (props.arrows === undefined) {
            return
        }

        return props.arrows!.map(a => {
            const [fromFile, fromRank] = getFileRank(a.from)
            const [fromX, fromY] = getTopLeftCoordinates(fromRank, fromFile)
            const [toFile, toRank] = getFileRank(a.to)
            const [toX, toY] = getTopLeftCoordinates(toRank, toFile)

            // TODO: Calculate the bearing angle and reduce x * cos(), y * sin()
            // so that the arrows don't hinder the pieces
            return (
                <path
                    key={`arrow-${a.from}-${a.to}}`}
                    d={`M ${fromX + halfSize},${fromY + halfSize} L ${toX +
                        halfSize},${toY + halfSize}`}
                    strokeWidth={arrowSize}
                    stroke={a.color}
                    fill={a.color}
                    opacity={0.5}
                    markerEnd={`url(#${a.color}-arrowhead)`}
                />
            )
        })
    }

    const renderPieces = (fen: string) => {
        const squareSize = getSquareSize()

        let piecePlacement = ''
        console.log(!fen)
        console.log("fen:" + fen)
        console.log(fen.split(' '))
        if (!fen || fen.split(' ').length === 0) {
            piecePlacement = '8/8/8/8/8/8/8/8'
        } else {
            piecePlacement = fen.split(' ')[0]
            console.log(piecePlacement.split('/'))
            if (piecePlacement.split('/').length < 8) {
                piecePlacement = '8/8/8/8/8/8/8/8'
            }
        }

        console.log(piecePlacement.replace(/8/gi, '44').replace(/4/gi, '22').replace(/2/gi, '11'))

        const pieces = []
        const ranks = piecePlacement
            .replace(/8/gi, '44')
            .replace(/7/gi, '34')
            .replace(/6/gi, '33')
            .replace(/5/gi, '32')
            .replace(/4/gi, '22')
            .replace(/3/gi, '12')
            .replace(/2/gi, '11')
            .split('/')

        console.log(ranks)

        for (let i = 7; i >= 0; i--) {
            const fenChars = ranks[i].split('')
            for (let j = 0; j < 8; j++) {
                const src = getImageSourceForFenChar(fenChars[j])
                if (src) {
                    console.log("piece: " + `${i}${j}${fenChars[j]}`)
                    pieces.push(
                        <img
                            key={`${i}${j}${fenChars[j]}`}
                            style={{
                                left: getTopLeftCoordinates(i, j, false)[0],
                                top: getTopLeftCoordinates(i, j, false)[1]
                            }}
                            width={squareSize}
                            height={squareSize}
                            src={src}
                        />
                    )
                }
            }
        }

        return pieces
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

    const handleMoveDragEnd = (e: DragEvent) => {
        const offset = getOffsetOnBoard(e.clientX, e.clientY)
        const [rank, file] = getRankFile(offset[0], offset[1])

        const from = getSquareLabel(state.fromFile, state.fromRank)
        const to = getSquareLabel(file, rank)

        if (props.onMove && !props.allowIllegal) {
            try {
                const g = new Chess(props.fen)
                const side = g.turn()
                const move = g.move({ from, to })

                if (move) {
                    props.onMove(move)
                } else if (g.move({ from, to, promotion: 'q' })) {
                    // Look for promotion
                    setState((prevState) => {
                        return { ...prevState, promotionPrompt: { file, side } }
                    })
                    return
                }
            } catch (e) {
                return
            }
        }

        if (props.onMove && props.allowIllegal && from !== to) {
            const piece = Util.getFenSquareOccupation(props.fen, from)
            if (piece) {
                props.onMove({
                    type: piece.type,
                    color: piece.color,
                    from,
                    to
                } as any)
            }
        }

        setState((prevState) => {
            return { ...prevState, fromRank: -1, fromFile: -1 }
        })
    }

    const handleMoveDragStart = (e: DragEvent) => {
        const offset = getOffsetOnBoard(e.clientX, e.clientY)
        const [rank, file] = getRankFile(offset[0], offset[1])
        const squareLabel = getSquareLabel(file, rank)

        // TODO: Find a solution for preview image
        const piece = Util.getFenSquareOccupation(props.fen, squareLabel)
        if (piece) {
            const dragPreview = document.createElement('img')
            const pieceSrc = getImageSourceForFenChar(
                piece.color === 'w'
                    ? piece.type.toUpperCase()
                    : piece.type.toLowerCase()
            )
            if (pieceSrc) {
                dragPreview.src = pieceSrc
            }
            e.dataTransfer!.setDragImage(dragPreview, 0, 0)
            setState((prevState) => {
                return { ...prevState, fromRank: rank, fromFile: file }
            })
        } else {
            e.preventDefault()
        }
    }

    const getOffsetOnBoard = (
        clientX: number,
        clientY: number
    ): [number, number] => {
        const boardRect = (interactionLayerRef
            .current as HTMLDivElement).getBoundingClientRect()
        const xOffset = clientX - boardRect.left
        const yOffset = clientY - boardRect.top
        return [xOffset, yOffset]
    }

    const handleMoveDragOver = (e: MouseEvent) => {
        ; (e.currentTarget as HTMLDivElement).style.backgroundColor = HIGHLIGHT_COLOR
            ; (e.currentTarget as HTMLDivElement).style.opacity = '0.35'
    }

    const handleMoveDragLeave = (e: MouseEvent) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = ''
        const targetElement = e.currentTarget as HTMLDivElement
        if ('opacity' in targetElement.style) {
            //delete targetElement.style['opacity']
        }
    }

    const getRankFile = (
        boardOffsetX: number,
        boardOffsetY: number
    ): [number, number] => {
        const squareSize = Math.min(props.width, props.height) / 8
        const rank = Math.floor(boardOffsetY / squareSize)
        const file = Math.floor(boardOffsetX / squareSize)

        if (rank >= 0 && rank <= 7 && file >= 0 && file <= 7) {
            return props.orientation === 'w'
                ? [7 - rank, file]
                : [rank, 7 - file]
        }

        return [-1, -1]
    }

    const handleMoveClick = (e: MouseEvent) => {
        const offset = getOffsetOnBoard(e.clientX, e.clientY)
        const [rank, file] = getRankFile(offset[0], offset[1])

        if (state.fromRank !== -1 && state.fromFile !== -1) {
            const from = getSquareLabel(state.fromFile, state.fromRank)
            const to = getSquareLabel(file, rank)

            if (props.onMove && !props.allowIllegal) {
                try {
                    const g = new Chess(props.fen)
                    const side = g.turn()
                    const move = g.move({ from, to })

                    if (move) {
                        props.onMove(move)
                    } else if (g.move({ from, to, promotion: 'q' })) {
                        // Look for promotion
                        setState((prevState) => {
                            return { ...prevState, promotionPrompt: { file, side } }
                        })
                        return
                    }
                } catch (e) {
                    return
                }
            }

            if (props.onMove && props.allowIllegal && from !== to) {
                const piece = Util.getFenSquareOccupation(props.fen, from)
                if (piece) {
                    props.onMove({
                        type: piece.type,
                        color: piece.color,
                        from,
                        to
                    } as any)
                }
            }
            setState((prevState) => {
                return { ...prevState, fromRank: -1, fromFile: -1 }
            })
        } else {
            const squareLabel = getSquareLabel(file, rank)
            const piece = Util.getFenSquareOccupation(props.fen, squareLabel)

            if (piece) {
                setState((prevState) => {
                    return { ...prevState, fromRank: rank, fromFile: file }
                })
            }
        }
    }

    const renderMoveInteractionEventSource = () => {
        const squareSize = getSquareSize()
        const sources = []

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const props = {
                    key: `${i}${j}`,
                    style: {
                        position: 'absolute',
                        left: getTopLeftCoordinates(i, j)[0],
                        top: getTopLeftCoordinates(i, j)[1],
                        width: squareSize,
                        height: squareSize
                    },
                    draggable: true
                } as any
                sources.push(
                    <div
                        {...props}
                        onDragStart={handleMoveDragStart}
                        onDragEnd={handleMoveDragEnd}
                        onDragOver={handleMoveDragOver}
                        onDragLeave={handleMoveDragLeave}
                        onClick={handleMoveClick}
                    />
                )
            }
        }

        return sources
    }

    const updateState = (newState: Partial<State>) => {
        setState((prevState) => {
            return { ...prevState, ...newState }
        })
    }

    const handlePromotionPromptCancel = () => {
        updateState({ fromRank: -1, fromFile: -1, promotionPrompt: undefined })
    }

    const handlePromotion = (
        file: number,
        rank: number,
        piece: ChessTypes.PromotionPiece
    ) => {
        return () => {
            if (state.fromRank !== -1 && state.fromFile !== -1) {
                const from = getSquareLabel(
                    state.fromFile,
                    state.fromRank
                )
                const to = getSquareLabel(file, rank)

                if (props.onMove) {
                    const g = new Chess(props.fen)
                    const move = g.move({
                        from,
                        to,
                        promotion: piece.toLowerCase() as ChessTypes.ChessJSPromotionPiece
                    })
                    if (move) {
                        props.onMove(move)
                    }
                }
            }

            updateState({ fromRank: -1, fromFile: -1, promotionPrompt: undefined })
        }
    }

    const renderPromotionPrompt = (file: number, side: ChessTypes.Side) => {
        const squareSize = getSquareSize()
        const style = {
            position: 'absolute',
            width: squareSize,
            height: squareSize
        } as any
        const toRank = side === 'w' ? 7 : 0

        return (
            <div>
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,
                        backgroundColor: '#fff',
                        opacity: 0.7
                    }}
                    onClick={handlePromotionPromptCancel}
                />
                <img
                    key={'q'}
                    src={side === 'w' ? wq : bq}
                    style={{
                        ...style,
                        left: getTopLeftCoordinates(side === 'w' ? 7 : 0, file)[0],
                        top: getTopLeftCoordinates(side === 'w' ? 7 : 0, file)[1]
                    }}
                    onClick={handlePromotion(file, toRank, 'Q')}
                />
                <img
                    key={'r'}
                    src={side === 'w' ? wr : br}
                    style={{
                        ...style,
                        left: getTopLeftCoordinates(side === 'w' ? 6 : 1, file)[0],
                        top: getTopLeftCoordinates(side === 'w' ? 6 : 1, file)[1]
                    }}
                    onClick={handlePromotion(file, toRank, 'R')}
                />
                <img
                    key={'b'}
                    src={side === 'w' ? wb : bb}
                    style={{
                        ...style,
                        left: getTopLeftCoordinates(side === 'w' ? 5 : 2, file)[0],
                        top: getTopLeftCoordinates(side === 'w' ? 5 : 2, file)[1]
                    }}
                    onClick={handlePromotion(file, toRank, 'B')}
                />
                <img
                    key={'n'}
                    src={side === 'w' ? wn : bn}
                    style={{
                        ...style,
                        left: getTopLeftCoordinates(side === 'w' ? 4 : 3, file)[0],
                        top: getTopLeftCoordinates(side === 'w' ? 4 : 3, file)[1]
                    }}
                    onClick={handlePromotion(file, toRank, 'N')}
                />
            </div>
        )
    }

    const handleArrowDragStart = (e: DragEvent) => {
        const offset = getOffsetOnBoard(e.clientX, e.clientY)
        const [rank, file] = getRankFile(offset[0], offset[1])

        const dragPreview = document.createElement('img')
        dragPreview.src = arrow
        e.dataTransfer!.setDragImage(dragPreview, 0, 0)
        e.dataTransfer!.effectAllowed = 'all'
        updateState({ fromRank: rank, fromFile: file })
    }

    const getColorForMouseEvent = (e: MouseEvent) => {
        if (e.altKey) return 'green'
        if (e.metaKey || e.ctrlKey) return 'yellow'
        if (e.shiftKey) return 'red'
        return 'green'
    }

    useEffect(() => {
        const e = state.dragEvent
        if (e === undefined) {
            return
        }
        const offset = getOffsetOnBoard(e.clientX, e.clientY)
        const [rank, file] = getRankFile(offset[0], offset[1])

        const from = getSquareLabel(state.fromFile, state.fromRank)
        const to = getSquareLabel(file, rank)
        const color = getColorForMouseEvent(e)
        if (props.onArrowChange) {
            if (file >= 0 && file <= 7 && rank >= 0 && rank <= 7) {
                const existingAnnotation = props.arrows!.filter(
                    a => a.from === from && a.to === to && a.color === color
                )

                const newAnnotations =
                    existingAnnotation.length > 0
                        ? props.arrows!.filter(
                            a => !(a.from === from && a.to === to)
                        )
                        : [
                            ...props.arrows!.filter(
                                a => !(a.from === from && a.to === to)
                            ),
                            { type: 'ARROW', color, from, to }
                        ]

                props.onArrowChange(newAnnotations as ChessTypes.ArrowAnnotation[])
            }
        }
    }, [state.dragEvent])

    const handleArrowDragEnd = (e: DragEvent) => {
        updateState({ fromRank: -1, fromFile: -1, dragEvent: e })
    }

    const renderArrowInteractionEventSource = () => {
        const squareSize = getSquareSize()
        const sources = []

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const props = {
                    key: `${i}${j}`,
                    style: {
                        position: 'absolute',
                        left: getTopLeftCoordinates(i, j)[0],
                        top: getTopLeftCoordinates(i, j)[1],
                        width: squareSize,
                        height: squareSize
                    },
                    draggable: true
                } as any
                sources.push(
                    <div
                        {...props}
                        onDragStart={handleArrowDragStart}
                        onDragEnd={handleArrowDragEnd}
                    />
                )
            }
        }

        return sources
    }

    return <div className={`ChessboardContainer orientation-${props.orientation} interaction-mode-${props.interactionMode.toLowerCase()}`}
        style={{ width: fullSize, height: fullSize }}>
        <div className={`Chessboard ${props.coordinates ? 'Coordinates' : ''}`}
            style={{ width: size, height: size }}>
            <div className="Squares Layer">
                <svg width={size} height={size}>
                    {renderSquares()}
                    {props.interactionMode === 'MOVE' ? renderSelectedSquare() : null}
                </svg>
            </div>
            <div className="FileCoordinates Layer">
                <svg width={size} height={size}>
                    {renderFileCoordinates()}
                </svg>
            </div>
            <div className="RankCoordinates Layer">
                <svg width={size} height={size}>
                    {renderRankCoordinates()}
                </svg>
            </div>
            <div className="Highlights Layer">
                <svg width={size} height={size}>
                    {renderSquareHighlights()}
                </svg>
            </div>
            <div className="Arrow Layer">
                <svg width={size} height={size}>
                    <defs>
                        <marker
                            id="red-arrowhead"
                            viewBox="0 0 10 10"
                            refX="7"
                            refY="5"
                            markerUnits="strokeWidth"
                            markerWidth="4"
                            markerHeight="3"
                            orient="auto"
                        >
                            <path d="M 0 0 L 10 5 L 0 10 z" stroke="none" fill="red" />
                        </marker>
                        <marker
                            id="green-arrowhead"
                            viewBox="0 0 10 10"
                            refX="7"
                            refY="5"
                            markerUnits="strokeWidth"
                            markerWidth="4"
                            markerHeight="3"
                            orient="auto"
                        >
                            <path d="M 0 0 L 10 5 L 0 10 z" stroke="none" fill="green" />
                        </marker>
                        <marker
                            id="yellow-arrowhead"
                            viewBox="0 0 10 10"
                            refX="7"
                            refY="5"
                            markerUnits="strokeWidth"
                            markerWidth="4"
                            markerHeight="3"
                            orient="auto"
                        >
                            <path d="M 0 0 L 10 5 L 0 10 z" stroke="none" fill="green" />
                        </marker>
                    </defs>
                    {renderArrows()}
                </svg>
            </div>
            {!props.blindfold && (
                <div className="Pieces Layer">
                    {renderPieces(props.fen)}
                </div>
            )}
            {props.interactionMode === 'ARROW' ? (
                <div
                    ref={interactionLayerRef}
                    className="Interaction Layer"
                    style={{ width: size, height: size }}
                >
                    {renderArrowInteractionEventSource()}
                </div>
            ) : null}
            {props.interactionMode === 'MOVE' ? (
                <div
                    ref={interactionLayerRef}
                    className="Interaction Layer"
                    style={{ width: size, height: size }}
                >
                    {renderMoveInteractionEventSource()}
                </div>
            ) : null}
            {props.interactionMode === 'MOVE' &&
                state.promotionPrompt ? (
                <div
                    className="PromotionPrompt Layer"
                    style={{ width: size, height: size }}
                >
                    {renderPromotionPrompt(
                        state.promotionPrompt.file,
                        state.promotionPrompt.side
                    )}
                </div>
            ) : null}
        </div>
    </div>
}