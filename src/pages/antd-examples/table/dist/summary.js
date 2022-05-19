"use strict";
exports.__esModule = true;
exports.AntdTableSummary = void 0;
var antd_1 = require("antd");
var Text = antd_1.Typography.Text;
var columns = [
    {
        title: 'Name',
        dataIndex: 'name'
    },
    {
        title: 'Borrow',
        dataIndex: 'borrow'
    },
    {
        title: 'Repayment',
        dataIndex: 'repayment'
    },
];
var data = [
    {
        key: '1',
        name: 'John Brown',
        borrow: 10,
        repayment: 33
    },
    {
        key: '2',
        name: 'Jim Green',
        borrow: 100,
        repayment: 0
    },
    {
        key: '3',
        name: 'Joe Black',
        borrow: 10,
        repayment: 10
    },
    {
        key: '4',
        name: 'Jim Red',
        borrow: 75,
        repayment: 45
    },
];
var fixedColumns = [
    {
        title: 'Name',
        dataIndex: 'name',
        fixed: true,
        width: 100
    },
    {
        title: 'Description',
        dataIndex: 'description'
    },
];
var fixedData = [];
for (var i = 0; i < 20; i += 1) {
    fixedData.push({
        key: i,
        name: ['Light', 'Bamboo', 'Little'][i % 3],
        description: 'Everything that has a beginning, has an end.'
    });
}
exports.AntdTableSummary = function () { return React.createElement(React.Fragment, null,
    React.createElement(antd_1.Table, { columns: columns, dataSource: data, pagination: false, bordered: true, summary: function (pageData) {
            var totalBorrow = 0;
            var totalRepayment = 0;
            pageData.forEach(function (_a) {
                var borrow = _a.borrow, repayment = _a.repayment;
                totalBorrow += borrow;
                totalRepayment += repayment;
            });
            return (React.createElement(React.Fragment, null,
                React.createElement(antd_1.Table.Summary.Row, null,
                    React.createElement(antd_1.Table.Summary.Cell, { index: 1 }, "Total"),
                    React.createElement(antd_1.Table.Summary.Cell, { index: 2 },
                        React.createElement(Text, { type: "danger" }, totalBorrow)),
                    React.createElement(antd_1.Table.Summary.Cell, { index: 3 },
                        React.createElement(Text, null, totalRepayment))),
                React.createElement(antd_1.Table.Summary.Row, null,
                    React.createElement(antd_1.Table.Summary.Cell, { index: 1 }, "Balance"),
                    React.createElement(antd_1.Table.Summary.Cell, { index: 2, colSpan: 2 },
                        React.createElement(Text, { type: "danger" }, totalBorrow - totalRepayment)))));
        } }),
    React.createElement("br", null),
    React.createElement(antd_1.Table, { columns: fixedColumns, dataSource: fixedData, pagination: false, scroll: { x: 2000, y: 500 }, bordered: true, summary: function () { return (React.createElement(antd_1.Table.Summary, { fixed: true },
            React.createElement(antd_1.Table.Summary.Row, null,
                React.createElement(antd_1.Table.Summary.Cell, { index: 0 }, "Summary"),
                React.createElement(antd_1.Table.Summary.Cell, { index: 1 }, "This is a summary content")))); } })); };
