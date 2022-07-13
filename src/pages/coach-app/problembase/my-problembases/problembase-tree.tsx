import { DataNode, DirectoryTreeProps } from "antd/lib/tree";
import DirectoryTree from "antd/lib/tree/DirectoryTree";
import { MobXProviderContext, observer } from "mobx-react";
import React from "react";


interface Props {
    onSelect?: (uuid: string) => any
}

export const ProblembaseTree = observer((props: Props) => {
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
        //setState({ showProblembaseTree: false })
        if (props.onSelect) {
            props.onSelect(keys[0] as string)
        }
    };

    const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
        console.log('Trigger Expand', keys, info);
    };

    return <DirectoryTree onSelect={onSelect} treeData={treeData} />
});