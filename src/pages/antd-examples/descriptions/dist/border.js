"use strict";
exports.__esModule = true;
exports.AntdDescriptionsBorder = void 0;
var antd_1 = require("antd");
exports.AntdDescriptionsBorder = function () { return React.createElement(antd_1.Descriptions, { title: "User Info", bordered: true },
    React.createElement(antd_1.Descriptions.Item, { label: "Product" }, "Cloud Database"),
    React.createElement(antd_1.Descriptions.Item, { label: "Billing Mode" }, "Prepaid"),
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
        React.createElement("br", null))); };
