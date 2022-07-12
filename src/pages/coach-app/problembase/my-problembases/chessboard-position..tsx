import { FastBackwardOutlined, BackwardOutlined, SwapOutlined, ForwardOutlined, FastForwardOutlined } from "@ant-design/icons"
import { Button, Col, Row, Tooltip } from "antd"
import Title from "antd/lib/typography/Title"
import { observable } from "mobx"
import { MobXProviderContext, observer } from "mobx-react"
import { useContext, useEffect, useState } from "react"
import Chessgroundboard from "../../../../components/chessgroundboard/Chessgroundboard"
import { Scoresheet } from "../../../../components/scoresheet/scoresheet"
import { ChessTypes } from "../../../../types"
import { SquareLabel } from "../../../../types/ChessTypes/ChessTypes"

interface ChessboardProps {
    pgnTitle: string | undefined
    pgn: string | undefined
}

interface State {
    fen: string
    orientation: string
}

export const ChessboardPosition = observer((props: ChessboardProps) => {
    const { analysisBoardStore } = useContext(MobXProviderContext)
    const [state, setState] = useState<State>({ fen: '', orientation: 'white' })

    useEffect(() => {
        if (props.pgn) {
            analysisBoardStore!.loadPgnText(props.pgn)
            updateBoard()
        }
    }, [props.pgn])

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

    return (<Row className="analysis-board scoresheet-container">
        <Col md={{ span: 12, offset: 2 }} sm={24}>
            <Title level={5}>{props.pgnTitle}</Title>
        </Col>
        <Col md={{ span: 12, offset: 2 }} sm={24}>
            <Chessgroundboard
                height={600}
                width={600}
                orientation='w'
                fen={state.fen}
                turnColor={analysisBoardStore!.sideToPlay}
                onMove={onMove}
                movable={analysisBoardStore!.calcMovable()}
            />
            <Row
                justify="center"
                style={{ marginTop: '1rem', marginBottom: '1rem' }}
            >
                <Col span={2} offset={1}>
                    <Tooltip title="fast-backward (< key)">
                        <Button
                            icon={<FastBackwardOutlined />}
                            type="ghost"
                            shape="circle"
                            onClick={backward}
                        />
                    </Tooltip>
                </Col>
                <Col span={2}>
                    <Tooltip title="backward (left arrow)">
                        <Button
                            icon={<BackwardOutlined />}
                            type="ghost"
                            shape="circle"
                            onClick={prev}
                        />
                    </Tooltip>
                </Col>
                <Col span={2}>
                    <Tooltip title="flip board (f key)">
                        <Button
                            icon={<SwapOutlined />}
                            style={{ transform: 'rotate(90deg)' }}
                            type="ghost"
                            shape="circle"
                            onClick={handleFlip} //{this.props.analysisBoardStore!.prev} //change this
                        />
                    </Tooltip>
                </Col>
                <Col span={2}>
                    <Tooltip title="forward (right arrow)">
                        <Button
                            icon={<ForwardOutlined />}
                            type="ghost"
                            shape="circle"
                            onClick={next}
                        />
                    </Tooltip>
                </Col>
                <Col span={2}>
                    <Tooltip title="fast-forward (> key)">
                        <Button
                            icon={<FastForwardOutlined />}
                            type="ghost"
                            shape="circle"
                            onClick={forward}
                        />
                    </Tooltip>
                </Col>
            </Row>
        </Col>
        <Col md={{ span: 12, offset: 2 }} sm={24}>
            <div>
            <Scoresheet
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
                onHideMovesChange={() => {}}
              />
            </div>
        </Col>    
    </Row>)
})