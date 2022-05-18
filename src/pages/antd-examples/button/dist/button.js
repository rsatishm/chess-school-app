"use strict";
exports.__esModule = true;
exports.AntdButton = void 0;
var antd_components_1 = require("../antd-components");
var basic_1 = require("./basic");
var block_1 = require("./block");
var danger_1 = require("./danger");
var disabled_1 = require("./disabled");
var ghost_1 = require("./ghost");
var icon_1 = require("./icon");
var legacy_group_1 = require("./legacy-group");
var loading_1 = require("./loading");
var components = [
    { feature: "basic", component: React.createElement(basic_1.AntdButtonBasic, null) },
    { feature: "block", component: React.createElement(block_1.AntdButtonBlock, null) },
    { feature: "danger", component: React.createElement(danger_1.AntdButtonDanger, null) },
    { feature: "disabled", component: React.createElement(disabled_1.AntdButtonDisabled, null) },
    { feature: "ghost", component: React.createElement(ghost_1.AntdButtonGhost, null) },
    { feature: "icon", component: React.createElement(icon_1.AntdButtonIcon, null) },
    { feature: "legacygroup", component: React.createElement(legacy_group_1.AntdButtonLegacyGroup, null) },
    { feature: "loading", component: React.createElement(loading_1.AntdButtonLoading, null) }
];
exports.AntdButton = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "button", components: components });
};
