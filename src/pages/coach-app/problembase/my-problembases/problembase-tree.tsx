import { List } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/lib/tree";
import DirectoryTree from "antd/lib/tree/DirectoryTree";
import { observable } from "mobx";
import { MobXProviderContext, observer } from "mobx-react";
import React, { useState } from "react";
import { ChessboardList } from "./chessboard-list";
import { ChessboardPosition } from "./chessboard-position.";

export const ProblembaseTree: React.FC = observer(() => {
    interface State {
        showProblembaseTree: boolean
    }
    const [state, setState] = useState<State>({
        showProblembaseTree: true
    })
    const { gameboxDatabaseStore } = React.useContext(MobXProviderContext)
    const pgnFiles = (db: any) => {
        console.log("Before rendering: " + JSON.stringify(db))
        return db.pgnFiles ? db.pgnFiles.map((pgnFile: any) => {
            return {
                title: pgnFile.name,
                key: pgnFile.uuid,
                isLeaf: true
            }
        }) : []
    }

    const dbTree = () => {
        const tree: any[] = gameboxDatabaseStore!.databases.map((db: any) => {
            return {
                title: db.name,
                key: db.uuid,
                children: pgnFiles(db)
            }
        })

        //console.log("TREE: " + JSON.stringify(tree))

        return tree
    }

    const treeData: DataNode[] = [
        {
            title: 'My Databases',
            key: '0-0',
            children: dbTree()
        },
        {
            title: 'Public Databases',
            key: '0-1'
        },
    ];

    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
        console.log('Trigger Select', keys, info);
        gameboxDatabaseStore!.getPgnPiecesByFile(keys[0])
        setState({ showProblembaseTree: false })
    };

    const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
        console.log('Trigger Expand', keys, info);
    };

    return (
        <>
            {
                state.showProblembaseTree &&
                <DirectoryTree
                    onSelect={onSelect}
                    treeData={treeData}
                />
            }
            {
                !state.showProblembaseTree &&
                <ChessboardList />
            }
        </>
    );
});