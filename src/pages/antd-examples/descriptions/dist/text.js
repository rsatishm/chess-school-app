"use strict";
exports.__esModule = true;
exports.AntdDescriptionsText = void 0;
var antd_1 = require("antd");
var dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号'
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
    },
];
var columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
    },
];
exports.AntdDescriptionsText = function () { return React.createElement(antd_1.Descriptions, { title: "User Info", column: 2 },
    React.createElement(antd_1.Descriptions.Item, { label: "Product" }, "Cloud Database"),
    React.createElement(antd_1.Descriptions.Item, { label: React.createElement("div", { style: { display: 'flex' } }, "Billing Mode") }, "Prepaid"),
    React.createElement(antd_1.Descriptions.Item, { label: "Automatic Renewal" }, "YES"),
    React.createElement(antd_1.Descriptions.Item, { label: "Order time" }, "2018-04-24 18:00:00"),
    React.createElement(antd_1.Descriptions.Item, { label: "Usage Time", span: 2 }, "2019-04-24 18:00:00"),
    React.createElement(antd_1.Descriptions.Item, { label: "Status", span: 3 },
        React.createElement(antd_1.Badge, { status: "processing", text: "Running" })),
    React.createElement(antd_1.Descriptions.Item, { label: "Negotiated Amount" }, "$80.00"),
    React.createElement(antd_1.Descriptions.Item, { label: "Discount" }, "$20.00"),
    React.createElement(antd_1.Descriptions.Item, { label: "Official Receipts" }, "$60.00"),
    React.createElement(antd_1.Descriptions.Item, { label: "Config Info" },
        "Data disk type: MongoDB",
        React.createElement("br", null),
        "Database version: 3.4",
        React.createElement("br", null),
        "Package: dds.mongo.mid",
        React.createElement("br", null),
        "Storage space: 10 GB",
        React.createElement("br", null),
        "Replication factor: 3",
        React.createElement("br", null),
        "Region: East China 1",
        React.createElement("br", null)),
    React.createElement(antd_1.Descriptions.Item, { label: "Official Receipts" }, "$60.00"),
    React.createElement(antd_1.Descriptions.Item, { label: "Config Info" },
        React.createElement(antd_1.Table, { size: "small", pagination: false, dataSource: dataSource, columns: columns }))); };
