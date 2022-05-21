"use strict";
exports.__esModule = true;
exports.AntdDatePicker = void 0;
var antd_components_1 = require("../antd-components");
var basic_1 = require("./basic");
var bordered_1 = require("./bordered");
var date_render_1 = require("./date-render");
var disabled_1 = require("./disabled");
var disabled_date_1 = require("./disabled-date");
var extra_footer_1 = require("./extra-footer");
var format_1 = require("./format");
var mode_1 = require("./mode");
var placement_1 = require("./placement");
var presetted_ranges_1 = require("./presetted-ranges");
var range_picker_1 = require("./range-picker");
var select_in_range_1 = require("./select-in-range");
var size_1 = require("./size");
var start_end_1 = require("./start-end");
var status_1 = require("./status");
var suffix_1 = require("./suffix");
var switchable_1 = require("./switchable");
var time_1 = require("./time");
var components = [
    { feature: "basic", component: React.createElement(basic_1.AntdDatePickerBasic, null) },
    { feature: "bordered", component: React.createElement(bordered_1.AntdDatePickerBordered, null) },
    { feature: "daterender", component: React.createElement(date_render_1.AntdDatePickerDateRender, null) },
    { feature: "disableddate", component: React.createElement(disabled_date_1.AntdDatePickerDisabledDate, null) },
    { feature: "disabled", component: React.createElement(disabled_1.AntdDatePickerDisabled, null) },
    { feature: "extrafooter", component: React.createElement(extra_footer_1.AntdDatePickerExtraFooter, null) },
    { feature: "format", component: React.createElement(format_1.AntdDatePickerFormat, null) },
    { feature: "mode", component: React.createElement(mode_1.AntdDatePickerMode, null) },
    { feature: "placement", component: React.createElement(placement_1.AntdDatePickerPlacement, null) },
    { feature: "presettedranges", component: React.createElement(presetted_ranges_1.AntdDatePickerPresettedRanges, null) },
    { feature: "rangepicker", component: React.createElement(range_picker_1.AntdDatePickerRangePicker, null) },
    { feature: "selectinrange", component: React.createElement(select_in_range_1.AntdDatePickerSelectInRange, null) },
    { feature: "size", component: React.createElement(size_1.AntdDatePickerSize, null) },
    { feature: "startend", component: React.createElement(start_end_1.AntdDatePickerStartEnd, null) },
    { feature: "status", component: React.createElement(status_1.AntdDatePickerStatus, null) },
    { feature: "suffix", component: React.createElement(suffix_1.AntdDatePickerSuffix, null) },
    { feature: "switchable", component: React.createElement(switchable_1.AntdDatePickerSwitchable, null) },
    { feature: "time", component: React.createElement(time_1.AntdDatePickerTime, null) },
];
exports.AntdDatePicker = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "datepicker", components: components });
};
