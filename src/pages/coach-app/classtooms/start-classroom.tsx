import { BackwardOutlined, FastBackwardOutlined, FastForwardOutlined, ForwardOutlined, SwapOutlined } from "@ant-design/icons"
import { Button, Col, Row, Tabs, Tooltip } from "antd"
import { MobXProviderContext } from "mobx-react"
import { useContext, useState } from "react"
import Chessgroundboard from "../../../components/chessgroundboard/Chessgroundboard"
import { Jitsi } from "../../../components/jitsi/Jitsi"
import { Scoresheet } from "../../../components/scoresheet/scoresheet"
import { ChessTypes } from "../../../types"
import { SquareLabel } from "../../../types/ChessTypes/ChessTypes"

const { TabPane } = Tabs

interface State {
    // moves: String
    modalState: string
    selectedDatabase: { uuid: string; name: string }
    setupPositionModalVisible: boolean,
    pastePgnModalVisible: boolean,
    setupPositionFen: ChessTypes.FEN
    orientation: string,
    fen?: string,
    pgn?: string
}

export const StartClassRoom = () => {
    const [state, setState] = useState<State>({
        modalState: 'HIDDEN',
        selectedDatabase: { uuid: '', name: '' },
        setupPositionModalVisible: false,
        pastePgnModalVisible: false,
        setupPositionFen: '',
        orientation: 'white'
        // moves: []
    })
    const { analysisBoardStore, gameboxDatabaseStore, userStore } = useContext(MobXProviderContext)
    console.log('board state', analysisBoardStore!.state)
    console.log("fen " + analysisBoardStore!.fen)
    console.log("sideToPlay: " + analysisBoardStore!.sideToPlay)

    const onMove = (orig: SquareLabel, dest: SquareLabel, metadata: ChessTypes.ChessJSVerboseMove) => {
        console.log('Move made', orig, dest, metadata)
        analysisBoardStore!.move({
            from: orig,
            to: dest,
            promotion: metadata && metadata.promotion
        })
        console.log("fen after update " + analysisBoardStore!.fen)
        updateBoard()
        //return {}
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

    const RenderChessboard = () => {

        return (
            <Row className="analysis-board scoresheet-container">
                <Col md={{ span: 12, offset: 2 }} sm={24}>
                    <Chessgroundboard
                        height={600}
                        width={600}
                        orientation={state.orientation}
                        fen={state.fen!}
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
                    </Row>  ``
                </Col>
                <Col
                    className="analysis-board--tabs"
                    md={{ span: 8, offset: 2 }}
                    sm={24}
                >

                    <Tabs type="card" defaultActiveKey="moves">
                        <TabPane tab="Moves" key="moves">
                            {/* <div className="analysis-board--moves">
                  <p>{this.state.moves}</p>
                </div> */}
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
                                onHideMovesChange={() => { }}
                            />
                        </TabPane>
                        <TabPane tab="Chat" key="chat"></TabPane>
                        <TabPane tab="Leaderboard" key="leaderboard"></TabPane>
                        <TabPane tab="Participants" key="participants"></TabPane>
                        <TabPane tab="Response" key="response"></TabPane>
                        <TabPane tab="Engine" key="engine"></TabPane>
                        <TabPane tab="Notes" key="notes"></TabPane>
                        {/* <TabPane tab="Analysis" key="analysis">
                  <div className="analysis-board--analyse">
                    <p>Game analysis will show up here</p>
                  </div>
                </TabPane> */}
                    </Tabs>
                </Col>
            </Row>
        )
    }
    

    return <Row>
        <Col span={18}><RenderChessboard/></Col>
        <Col span={6}><Jitsi /></Col>        
    </Row>
}