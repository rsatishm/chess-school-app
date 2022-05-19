"use strict";
exports.__esModule = true;
exports.AntdTableNestedTable = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var menu = (React.createElement(antd_1.Menu, null,
    React.createElement(antd_1.Menu.Item, null, "Action 1"),
    React.createElement(antd_1.Menu.Item, null, "Action 2")));
function AntdTableNestedTable() {
    var expandedRowRender = function () {
        var columns = [
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            {
                title: 'Status',
                key: 'state',
                render: function () { return (React.createElement("span", null,
                    React.createElement(antd_1.Badge, { status: "success" }),
                    "Finished")); }
            },
            { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                render: function () { return (React.createElement(antd_1.Space, { size: "middle" },
                    React.createElement("a", null, "Pause"),
                    React.createElement("a", null, "Stop"),
                    React.createElement(antd_1.Dropdown, { overlay: menu },
                        React.createElement("a", null,
                            "More ",
                            React.createElement(icons_1.DownOutlined, null))))); }
            },
        ];
        var data = [];
        for (var i = 0; i < 3; ++i) {
            data.push({
                key: i,
                date: '2014-12-24 23:12:00',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56'
            });
        }
        return React.createElement(antd_1.Table, { columns: columns, dataSource: data, pagination: false });
    };
    var columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Platform', dataIndex: 'platform', key: 'platform' },
        { title: 'Version', dataIndex: 'version', key: 'version' },
        { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        { title: 'Creator', dataIndex: 'creator', key: 'creator' },
        { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
        { title: 'Action', key: 'operation', render: function () { return React.createElement("a", null, "Publish"); } },
    ];
    var data = [];
    for (var i = 0; i < 3; ++i) {
        data.push({
            key: i,
            name: 'Screem',
            platform: 'iOS',
            version: '10.3.4.5654',
            upgradeNum: 500,
            creator: 'Jack',
            createdAt: '2014-12-24 23:12:00'
        });
    }
    return (React.createElement(antd_1.Table, { className: "components-table-demo-nested", columns: columns, expandable: { expandedRowRender: expandedRowRender }, dataSource: data }));
}
exports.AntdTableNestedTable = AntdTableNestedTable;
