import { Button, Checkbox, List } from "antd"
import { MobXProviderContext } from "mobx-react"
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { ChessboardPosition } from "./chessboard-position."
import '../../assignment/exercise/problembase-viewer-drawer/problembase-viewer-drawer.less'
import { props } from "ramda"

interface Props {
    onBack: ()=>void
}

export const ChessboardList = observer((props: Props) => {
    interface State {
        pgnSelected: any
    }
    const [state, setState] = useState<State>({
        pgnSelected: {}
    })
    const { gameboxDatabaseStore } = React.useContext(MobXProviderContext)

    const handlePgnSelected = (e: any) => {
        console.log(JSON.stringify(e))
        console.log("State:" + JSON.stringify(state))
        setState((prevState: State) => {
            console.log("prevState: " + JSON.stringify(prevState))
            let uuidChecked: State = { pgnSelected: {} }
            uuidChecked.pgnSelected[e.target.value] = e.target.checked
            const newState = {
                pgnSelected: { ...prevState.pgnSelected, ...uuidChecked.pgnSelected }
            }
            console.log("newState: " + JSON.stringify(newState))
            return newState
        })
    }

    const data: any[] = gameboxDatabaseStore!.loading ? [] :
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

    const list = <List
        itemLayout="vertical"
        style={{ overflow: 'auto', height: '420px' }}
        pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: 30,
        }}
        loading={gameboxDatabaseStore!.loading}
        dataSource={data}
        renderItem={item => (
            <List.Item key={item.uuid}>
                <List.Item.Meta />
                <div>
                    <div className="left">
                        <Checkbox
                            value={item.uuid}
                            checked={state.pgnSelected[item.uuid] ? state.pgnSelected[item.uuid] : false}
                            onChange={handlePgnSelected}><strong>Selected</strong></Checkbox>
                    </div>
                    <ChessboardPosition
                        pgn={item.pgn}
                        pgnTitle={item.pgnTitle} />
                </div>
            </List.Item>
        )}
    />
    return <>
        <div className="select-bar">
            <Button
                size="small"
                className="select-button"
                onClick={props.onBack}
            >
                Back
            </Button>
            <Button
                size="small"
                className="select-button"
                onClick={() => { }}
            >
                Select 10
            </Button>
            <Button
                size="small"
                className="select-button"
                onClick={() => { }}
            >
                Select all
            </Button>
            <Button size="small" onClick={() => { }}>
                Deselect all
            </Button>
        </div>
        {list}
    </>
})
