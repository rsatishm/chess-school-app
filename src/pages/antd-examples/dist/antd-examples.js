"use strict";
exports.__esModule = true;
exports.AntdExamples = void 0;
var antd_1 = require("antd");
var react_router_dom_1 = require("react-router-dom");
exports.AntdExamples = function () {
    var data = [
        {
            to: '/app/antd/pageheader',
            title: 'Page Header'
        },
        {
            to: '/app/antd/afflix',
            title: 'Afflix'
        },
        {
            to: '/app/antd/alert',
            title: 'Alert'
        },
        {
            to: '/app/antd/anchor',
            title: 'Anchor'
        },
        {
            to: '/app/antd/autoComplete',
            title: 'AutoComplete'
        },
        {
            to: '/app/antd/avatar',
            title: 'Avatar'
        },
        {
            to: '/app/antd/backtop',
            title: 'BackTop'
        },
        {
            to: '/app/antd/badge',
            title: 'Badge'
        },
        {
            to: '/app/antd/breadcrumb',
            title: 'Breadcrumb'
        },
        {
            to: '/app/antd/button',
            title: 'Button'
        },
        {
            to: '/app/antd/calendar',
            title: 'Calendar'
        },
        {
            to: '/app/antd/upload',
            title: 'Upload'
        },
        {
            to: '/app/antd/tree',
            title: 'Tree'
        },
        {
            to: '/app/antd/treeselect',
            title: 'TreeSelect'
        },
        {
            to: '/app/antd/transfer',
            title: 'Transfer'
        },
        {
            to: '/app/antd/timeline',
            title: 'Timeline'
        },
        {
            to: '/app/antd/timepicker',
            title: 'TimePicker'
        },
        {
            to: '/app/antd/typography',
            title: 'Typography'
        },
        {
            to: '/app/antd/tag',
            title: 'Tag'
        },
        {
            to: '/app/antd/tabs',
            title: 'Tabs'
        },
        {
            to: '/app/antd/table',
            title: 'Table'
        },
        {
            to: '/app/antd/carousel',
            title: 'Carousel'
        },
        {
            to: '/app/antd/form',
            title: 'Form'
        },
        {
            to: '/app/antd/layout',
            title: 'Layout'
        },
        {
            to: '/app/antd/space',
            title: 'Space'
        },
        {
            to: '/app/antd/descriptions',
            title: 'Descriptions'
        },
        {
            to: '/app/antd/datepicker',
            title: 'DatePicker'
        },
        {
            to: '/app/antd/grid',
            title: 'Grid'
        },
        {
            to: '/app/antd/select',
            title: 'Select'
        },
        {
            to: '/app/antd/statistic',
            title: 'Statistic'
        }
    ];
    return React.createElement(React.Fragment, null,
        React.createElement(antd_1.Layout, null,
            React.createElement("h1", null, "Antd Examples"),
            React.createElement(antd_1.List, { itemLayout: "vertical", dataSource: data, renderItem: function (item) { return (React.createElement(antd_1.List.Item, null,
                    React.createElement(react_router_dom_1.Link, { to: item.to }, item.title))); } })));
};
