import { List } from "antd"
import { MobXProviderContext } from "mobx-react"
import { observer } from "mobx-react-lite"
import React from "react"
import InfiniteScroll from "react-infinite-scroller"
import { ChessboardPosition } from "./chessboard-position."

export const ChessboardList = observer(() => {
  const { gameboxDatabaseStore } = React.useContext(MobXProviderContext)
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
    const list = 

    <List
    itemLayout="vertical"
    style={ {overflow: 'auto', height: '500px'}}
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
          <List.Item.Meta/>
          <div>
          <ChessboardPosition
                    pgn={item.pgn}
                    pgnTitle={item.pgnTitle} />
          </div>
        </List.Item>
      )}
    />
    /*
    return <div>
        {
            data.map((rec: any) => {
                return <ChessboardPosition
                    pgn={rec?.pgn}
                    pgnTitle={rec?.pgnTitle} />
            })
        }
    </div>*/
    return list
})
