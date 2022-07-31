import { BackwardOutlined, FastBackwardOutlined, FastForwardOutlined, ForwardOutlined, SwapOutlined } from "@ant-design/icons"
import { Button, Checkbox, Collapse, Tooltip } from "antd"
import { MobXProviderContext, observer } from "mobx-react"
import { useContext, useEffect, useState } from "react"

import Chessgroundboard from "../../../../../components/chessgroundboard/Chessgroundboard"
import { Scoresheet } from "../../../../../components/scoresheet/scoresheet"
import { ChessTypes } from "../../../../../types"
import { SquareLabel } from "../../../../../types/ChessTypes/ChessTypes"
import './chessboard-problems.less'
import { CaretRightOutlined } from '@ant-design/icons';

interface ChessboardProps {
    meta: any
    pgn: string | undefined
    index: number
    uuid: string
    selected: boolean
    onSelect: () => any
}

export const ChessboardProblems = observer((props: ChessboardProps) => {
    interface State {
        fen: string
        orientation: string
    }
    const { analysisBoardStore } = useContext(MobXProviderContext)
    const [state, setState] = useState<State>({ fen: '', orientation: 'white' })

    useEffect(() => {
        if (props.pgn) {
            analysisBoardStore!.loadPgnText(props.pgn)
            updateBoard()
        }
    }, [props.pgn])

    const onMove = (orig: SquareLabel, dest: SquareLabel, metadata: ChessTypes.ChessJSVerboseMove) => {
        console.log('Move made', orig, dest, metadata)
        analysisBoardStore!.move({
            from: orig,
            to: dest,
            promotion: metadata && metadata.promotion
        })
        console.log("fen after update " + analysisBoardStore!.fen)
        updateBoard()
    }

    const updateState = (newState: Partial<State>) => {
        setState((prevState) => {
            return { ...prevState, ...newState }
        })
    }

    const updateBoard = () => {
        updateState({ fen: analysisBoardStore!.fen })
    }

    const backward = () => {
        analysisBoardStore!.backward()
        updateBoard()
    }

    const prev = () => {
        analysisBoardStore!.prev()
        updateBoard()
    }

    const next = () => {
        analysisBoardStore!.next()
        updateBoard()
    }

    const forward = () => {
        analysisBoardStore!.forward()
        updateBoard()
    }

    const handleFlip = () => {
        updateState({
            orientation: state.orientation === 'white' ? 'black' : 'white'
        })
    }

    const Chessboard = () => {
        return <div style={{ cursor: 'grab', display: 'flex', height: '200px', width: '200px', position: 'relative' }}>
            <Chessgroundboard
                height={200}
                width={200}
                orientation='w'
                fen={state.fen}
                turnColor={analysisBoardStore!.sideToPlay}
                onMove={onMove}
                movable={analysisBoardStore!.calcMovable()}
                coordinates={false}
            />
        </div>
    }

    const ChessTitle = () => {
        return <div className="flex justify-between">
            <div>
                <p><span>{props.index}. </span>{props.meta['white']} - {props.meta['black']}</p>
                {props.meta['date'] || props.meta['site'] &&
                    (<p className="text-xs text-gray-700">{props.meta['date']}, {props.meta['site']}</p>)}
            </div>
            <div>{props.meta['result']}</div>
        </div>
    }

    const ButtonPanel = () => {
        return <div className="flex flex-col">
            <Button.Group className="mb-2">
                <Tooltip title="fast-backward (< key)">
                    <Button
                        icon={<FastBackwardOutlined />}
                        type="link"
                        size="small"
                        onClick={backward}
                    />
                </Tooltip>
                <Tooltip title="backward (left arrow)">
                    <Button
                        icon={<BackwardOutlined />}
                        type="link"
                        size="small"
                        onClick={prev}
                    />
                </Tooltip>
                <Tooltip title="flip board (f key)">
                    <Button
                        icon={<SwapOutlined />}
                        style={{ transform: 'rotate(90deg)' }}
                        type="link"
                        size="small"
                        onClick={handleFlip} //{this.props.analysisBoardStore!.prev} //change this
                    />
                </Tooltip>
                <Tooltip title="forward (right arrow)">
                    <Button
                        icon={<ForwardOutlined />}
                        type="link"
                        size="small"
                        onClick={next}
                    />
                </Tooltip>
                <Tooltip title="fast-forward (> key)">
                    <Button
                        icon={<FastForwardOutlined />}
                        type="link"
                        size="small"
                        onClick={forward}
                    />
                </Tooltip>
            </Button.Group>
        </div>
    }

    const handleGoToPath = (path: ChessTypes.PlyPath) => {
        analysisBoardStore!.gotoPath(path)
        updateBoard()
    }

    const handlePromoteVariation = (path: ChessTypes.PlyPath) => {
        analysisBoardStore!.promoteVariation(path)
    }

    const handleDeleteVariation = (path: ChessTypes.PlyPath) => {
        analysisBoardStore!.deleteVariation(path)
        updateBoard()
    }

    const handleAddComment = (path: ChessTypes.PlyPath, text: string) => {
        analysisBoardStore!.handleAddComment(path, text)
        updateBoard()
    }

    const handleDeleteComment = (path: ChessTypes.PlyPath) => {
        analysisBoardStore!.handleDeleteComment(path)
        updateBoard()
    }

    const PGN = () => {
        return <Scoresheet
            visible={true}
            currentPath={analysisBoardStore!.state.currentPath}
            mainline={analysisBoardStore!.state.mainline}
            showHideMovesToggle={false}
            areMovesHiddenForStudents={false}
            onGoToPath={handleGoToPath}
            onPromoteVariation={handlePromoteVariation}
            onDeleteVariation={handleDeleteVariation}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
            onHideMovesChange={() => { }}
        />
    }

    const { Panel } = Collapse;

    return <div className="chessproblems">
        <div className="p-2 flex items-baseline">
            <Checkbox
                checked={props.selected}
                onChange={props.onSelect}>
                <strong className="ml-2">Select</strong>
            </Checkbox>
        </div>
        <div className="flex p-2">
            <Chessboard />
            <div className="ml-4 flex-1 flex flex-col">
                <ChessTitle />
                <div className="flex-1 my-1">
                    <Collapse
                    accordion
                        bordered={false}                        
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}                                    >
                        <Panel header="PGN" key="1" style={{ border: "0px", background: "white" }}>
                            <PGN />
                        </Panel>
                    </Collapse>
                </div>
                <ButtonPanel />
            </div>
        </div>
    </div>
})