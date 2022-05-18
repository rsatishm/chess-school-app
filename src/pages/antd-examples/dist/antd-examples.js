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
        }
    ];
    return React.createElement(React.Fragment, null,
        React.createElement(antd_1.Layout, null,
            React.createElement("h1", null, "Antd Examples"),
            React.createElement(antd_1.List, { itemLayout: "vertical", dataSource: data, renderItem: function (item) { return (React.createElement(antd_1.List.Item, null,
                    React.createElement(react_router_dom_1.Link, { to: item.to }, item.title))); } })));
};
