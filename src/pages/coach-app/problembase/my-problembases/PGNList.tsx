import { BackwardOutlined, DownOutlined, FastBackwardOutlined, FastForwardOutlined, ForwardOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Table, Tooltip } from 'antd';
import { set } from 'mobx';
import { MobXProviderContext, observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';
import SplitterLayout from 'react-splitter-layout';
import Chessgroundboard from '../../../../components/chessgroundboard/Chessgroundboard';
import './PGNList.css'
import * as _Chess from 'chess.js'
import { SquareLabel } from '../../../../types/ChessTypes/ChessTypes';
import { ChessTypes } from '../../../../types';

interface PGNRecord {
    sno: number,
    white: string,
    black: string,
    result: string,
    uuid: string,
    fen: string,
    pgn: string
}

/*
interface Props {
    pgnList: PGNRecord[],
    loading: boolean,
    selectPgn: (uuid: string, fen: string, pgn: string) => void
}*/

const columns = [
    {
        title: 'S No',
        dataIndex: 'sno'
    },
    {
        title: 'White',
        dataIndex: 'white'
    },
    {
        title: 'Black',
        dataIndex: 'black'
    },
    {
        title: 'Result',
        dataIndex: 'result'
    },
    {
        title: 'Action',
        key: 'action',
        sorter: true,
        render: () => (
            <Space size="middle">
                <a>Delete</a>
                <a className="ant-dropdown-link">
                    More actions <DownOutlined />
                </a>
            </Space>
        ),
    },
];

const Chess = typeof _Chess == 'function' ? _Chess : _Chess.Chess
const g = new Chess()
export const PGNList = observer(() => {
    const { gameboxDatabaseStore } = React.useContext(MobXProviderContext)

    interface ChessboardState {
        uuid: string,
        fen: string,
        pgn: string
    }

    const [chessboardState, setChessboardState] = useState<ChessboardState>()

    //console.log("prop: " + JSON.stringify(props.pgnList))
    const data = gameboxDatabaseStore!.loading ? [] :
        gameboxDatabaseStore!.pgnList.map((pgnRec: any) => ({
            sno: pgnRec.sno,
            white: pgnRec.white,
            black: pgnRec.black,
            result: pgnRec.result,
            uuid: pgnRec.uuid,
            pgn: pgnRec.pgn,
            fen: pgnRec.fen
        }))

    return <div>
        <SplitterLayout percentage secondaryInitialSize={50}>
            <div>
                <Table
                    className='pgnTable'
                    rowClassName={(record) => {
                        if (!record || !chessboardState) {
                            return ''
                        }
                        return record.uuid == chessboardState!.uuid ? 'rowSelected' : ''
                    }
                    }
                    rowKey="uuid"
                    columns={columns}
                    dataSource={data}
                    loading={gameboxDatabaseStore!.loading}
                    onRow={(record: any) => ({
                        onClick: () => {
                            setChessboardState({ uuid: record.uuid, fen: record.fen, pgn: record.pgn })
                        }
                    })} />
            </div>
            <div>
                <ChessboardPosition
                    pgn={chessboardState?.pgn} />
            </div>
        </SplitterLayout>
    </div>
})

interface ChessboardProps {
    pgn: string | undefined
}

interface State {
    fen: string
    orientation: string
}

const ChessboardPosition = (props: ChessboardProps) => {
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

    return (<Row className="analysis-board scoresheet-container">
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
    </Row>)
}