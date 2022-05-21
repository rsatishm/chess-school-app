"use strict";
exports.__esModule = true;
exports.AntdSelect = void 0;
var antd_components_1 = require("../antd-components");
var automatic_tokenization_1 = require("./automatic-tokenization");
var basic_1 = require("./basic");
var big_data_1 = require("./big-data");
var bordered_1 = require("./bordered");
var coordinate_1 = require("./coordinate");
var custom_dropdown_menu_1 = require("./custom-dropdown-menu");
var custom_tag_render_1 = require("./custom-tag-render");
var debug_1 = require("./debug");
var hide_selected_1 = require("./hide-selected");
var label_in_value_1 = require("./label-in-value");
var multiple_1 = require("./multiple");
var optgroup_1 = require("./optgroup");
var option_label_prop_1 = require("./option-label-prop");
var placement_1 = require("./placement");
var responsive_1 = require("./responsive");
var search_box_1 = require("./search-box");
var size_1 = require("./size");
var components = [
    { feature: "automatictokenization", component: React.createElement(automatic_tokenization_1.AntdSelectAutoToken, null) },
    { feature: "basic", component: React.createElement(basic_1.AntdSelectBasic, null) },
    { feature: "bigdata", component: React.createElement(big_data_1.AntdSelectBigData, null) },
    { feature: "bordered", component: React.createElement(bordered_1.AntdSelectBordered, null) },
    { feature: "coordinate", component: React.createElement(coordinate_1.AntdSelectCoordinate, null) },
    { feature: "customdropdownmenu", component: React.createElement(custom_dropdown_menu_1.AntdSelectCustomDropdownMenu, null) },
    { feature: "customtagrender", component: React.createElement(custom_tag_render_1.AntdSelectCustomTagRender, null) },
    { feature: "debug", component: React.createElement(debug_1.AntdSelectDebug, null) },
    { feature: "hideselected", component: React.createElement(hide_selected_1.AntdSelectHideSelected, null) },
    { feature: "labelinvalue", component: React.createElement(label_in_value_1.AntdSelectLabelInValue, null) },
    { feature: "multiple", component: React.createElement(multiple_1.AntdSelectMultiple, null) },
    { feature: "optgroup", component: React.createElement(optgroup_1.AntdSelectOptGroup, null) },
    { feature: "optionlabelprop", component: React.createElement(option_label_prop_1.AntdSelectOptionLabelProp, null) },
    { feature: "placement", component: React.createElement(placement_1.AntdSelectPlacement, null) },
    { feature: "responsive", component: React.createElement(responsive_1.AntdSelectResponsive, null) },
    { feature: "searchbox", component: React.createElement(search_box_1.AntdSelectSearchBox, null) },
    { feature: "size", component: React.createElement(size_1.AntdSelectSize, null) },
];
exports.AntdSelect = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "select", components: components });
};
