import { BackwardOutlined, DownOutlined, FastBackwardOutlined, FastForwardOutlined, ForwardOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Table, Tooltip } from 'antd';
import { set } from 'mobx';
import { MobXProviderContext, observer } from 'mobx-react';
import React, {useState } from 'react';
import SplitterLayout from 'react-splitter-layout';
import './PGNList.css'
import * as _Chess from 'chess.js'
import { ChessboardPosition } from './chessboard-position.';

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
        pgn: string,
        pgnTitle: string
    }

    const [chessboardState, setChessboardState] = useState<ChessboardState>()

    const updateState = (newState: Partial<ChessboardState>) => {
        setChessboardState((prevState: ChessboardState) => {
          return { ...prevState, ...newState }
        })
      }

    //console.log("prop: " + JSON.stringify(props.pgnList))
    const data = gameboxDatabaseStore!.loading ? [] :
        gameboxDatabaseStore!.pgnList.map((pgnRec: any) => ({
            sno: pgnRec.sno,
            white: pgnRec.white,
            black: pgnRec.black,
            result: pgnRec.result,
            uuid: pgnRec.uuid,
            pgn: pgnRec.pgn,
            fen: pgnRec.fen,
            pgnTitle: pgnRec.white + ' vs ' + pgnRec.black + ' ' + pgnRec.result
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
                            updateState({ uuid: record.uuid, fen: record.fen, pgn: record.pgn, pgnTitle: record.pgnTitle })
                        }
                    })} />
            </div>
            <div>
                <ChessboardPosition
                    pgn={chessboardState?.pgn} 
                    pgnTitle={chessboardState?.pgnTitle}/>
            </div>
        </SplitterLayout>
    </div>
})