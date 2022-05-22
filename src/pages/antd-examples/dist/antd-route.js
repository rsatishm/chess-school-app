"use strict";
exports.__esModule = true;
exports.AntdRoute = void 0;
var react_router_dom_1 = require("react-router-dom");
var afflix_1 = require("./afflix/afflix");
var alert_1 = require("./alert/alert");
var anchor_1 = require("./anchor/anchor");
var antd_examples_1 = require("./antd-examples");
var auto_complete_1 = require("./auto-complete/auto-complete");
var avatar_1 = require("./avatar/avatar");
var back_top_1 = require("./back-top/back-top");
var badge_1 = require("./badge/badge");
var breadcrumb_1 = require("./breadcrumb/breadcrumb");
var button_1 = require("./button/button");
var calendar_1 = require("./calendar/calendar");
var carousel_1 = require("./carousel/carousel");
var datepicker_1 = require("./date-picker/datepicker");
var descriptions_1 = require("./descriptions/descriptions");
var form_1 = require("./form/form");
var grid_1 = require("./grid/grid");
var layout_1 = require("./layout/layout");
var page_header_1 = require("./page-header/page-header");
var select_1 = require("./select/select");
var space_1 = require("./space/space");
var statistic_1 = require("./statistic/statistic");
var table_1 = require("./table/table");
var tabs_1 = require("./tabs/tabs");
var tag_1 = require("./tag/tag");
var timepicker_1 = require("./time-picker/timepicker");
var timeline_1 = require("./timeline/timeline");
var transfer_1 = require("./transfer/transfer");
var tree_1 = require("./tree/tree");
var treeselect_1 = require("./treeselect/treeselect");
var typography_1 = require("./typography/typography");
var upload_1 = require("./upload/upload");
exports.AntdRoute = function () {
    return React.createElement(react_router_dom_1.Routes, null,
        React.createElement(react_router_dom_1.Route, { path: "/*", element: React.createElement(antd_examples_1.AntdExamples, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/pageheader/*", element: React.createElement(page_header_1.AntdPageHeader, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/afflix/*", element: React.createElement(afflix_1.AntdAfflix, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/alert/*", element: React.createElement(alert_1.AntdAlert, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/anchor/*", element: React.createElement(anchor_1.AntdAnchor, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/autoComplete/*", element: React.createElement(auto_complete_1.AntdAutoComplete, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/avatar/*", element: React.createElement(avatar_1.AntdAvatar, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/backtop/*", element: React.createElement(back_top_1.AntdBackTop, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/badge/*", element: React.createElement(badge_1.AntdBadge, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/breadcrumb/*", element: React.createElement(breadcrumb_1.AntdBreadcrumb, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/button/*", element: React.createElement(button_1.AntdButton, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/calendar/*", element: React.createElement(calendar_1.AntdCalendar, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/upload/*", element: React.createElement(upload_1.AntdUpload, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/tree/*", element: React.createElement(tree_1.AntdTree, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/treeselect/*", element: React.createElement(treeselect_1.AntdTreeSelect, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/transfer/*", element: React.createElement(transfer_1.AntdTransfer, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/timeline/*", element: React.createElement(timeline_1.AntdTimeline, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/timepicker/*", element: React.createElement(timepicker_1.AntdTimePicker, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/typography/*", element: React.createElement(typography_1.AntdTypography, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/tag/*", element: React.createElement(tag_1.AntdTag, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/tabs/*", element: React.createElement(tabs_1.AntdTabs, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/table/*", element: React.createElement(table_1.AntdTable, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/carousel/*", element: React.createElement(carousel_1.AntdCarousel, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/form/*", element: React.createElement(form_1.AntdForm, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/layout/*", element: React.createElement(layout_1.AntdLayout, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/space/*", element: React.createElement(space_1.AntdSpace, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/descriptions/*", element: React.createElement(descriptions_1.AntdDescriptions, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/datepicker/*", element: React.createElement(datepicker_1.AntdDatePicker, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/grid/*", element: React.createElement(grid_1.AntdGrid, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/select/*", element: React.createElement(select_1.AntdSelect, null) }),
        React.createElement(react_router_dom_1.Route, { path: "/statistic/*", element: React.createElement(statistic_1.AntdStatistic, null) }));
};
