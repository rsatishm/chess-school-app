"use strict";
exports.__esModule = true;
exports.AntdModal = void 0;
var antd_components_1 = require("../antd-components");
var async_1 = require("./async");
var basic_1 = require("./basic");
var button_props_1 = require("./button-props");
var confirm_1 = require("./confirm");
var confirm_router_1 = require("./confirm-router");
var dark_1 = require("./dark");
var footer_1 = require("./footer");
var hooks_1 = require("./hooks");
var info_1 = require("./info");
var locale_1 = require("./locale");
var manual_1 = require("./manual");
var modal_render_1 = require("./modal-render");
var position_1 = require("./position");
var width_1 = require("./width");
var components = [
    { feature: "async", component: React.createElement(async_1.AntdModalAsync, null) },
    { feature: "basic", component: React.createElement(basic_1.AntdModalBasic, null) },
    { feature: "buttonprops", component: React.createElement(button_props_1.AntdModalButtonProps, null) },
    { feature: "confirmrouter", component: React.createElement(confirm_router_1.AntdModalConfirmRouter, null) },
    { feature: "confirm", component: React.createElement(confirm_1.AntdModalConfirm, null) },
    { feature: "dark", component: React.createElement(dark_1.AntdModalDark, null) },
    { feature: "footer", component: React.createElement(footer_1.AntdModalFooter, null) },
    { feature: "hooks", component: React.createElement(hooks_1.AntdModalHooks, null) },
    { feature: "info", component: React.createElement(info_1.AntdModalInfo, null) },
    { feature: "locale", component: React.createElement(locale_1.AntdModalLocale, null) },
    { feature: "manual", component: React.createElement(manual_1.AntdModalManual, null) },
    { feature: "modalrender", component: React.createElement(modal_render_1.AntdModalRender, null) },
    { feature: "position", component: React.createElement(position_1.AntdModalPosition, null) },
    { feature: "width", component: React.createElement(width_1.AntdModalWidth, null) },
];
exports.AntdModal = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "modal", components: components });
};
