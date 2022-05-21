"use strict";
exports.__esModule = true;
exports.AntdForm = void 0;
var antd_components_1 = require("../antd-components");
var advanced_search_1 = require("./advanced-search");
var basic_1 = require("./basic");
var col_24_debug_1 = require("./col-24-debug");
var complex_form_control_1 = require("./complex-form-control");
var control_hooks_1 = require("./control-hooks");
var control_ref_1 = require("./control-ref");
var customized_form_controls_1 = require("./customized-form-controls");
var dep_debug_1 = require("./dep-debug");
var disabled_input_debug_1 = require("./disabled-input-debug");
var dynamic_form_items_complex_1 = require("./dynamic-form-items-complex");
var dynamic_form_items_no_style_1 = require("./dynamic-form-items-no-style");
var dynamic_form_item_1 = require("./dynamic-form-item");
var dynamic_form_items_1 = require("./dynamic-form-items");
var dynamic_rule_1 = require("./dynamic-rule");
var form_in_modal_1 = require("./form-in-modal");
var global_state_1 = require("./global-state");
var form_context_1 = require("./form-context");
var inline_login_1 = require("./inline-login");
var label_debug_1 = require("./label-debug");
var layout_can_wrap_1 = require("./layout-can-wrap");
var layout_1 = require("./layout");
var components = [
    { feature: "advancedsearch", component: React.createElement(advanced_search_1.AntdFormAdavancedSearch, null) },
    { feature: "basic", component: React.createElement(basic_1.AntdFormBasic, null) },
    { feature: "col24debug", component: React.createElement(col_24_debug_1.AntdFormCol24Debug, null) },
    { feature: "complexformcontrol", component: React.createElement(complex_form_control_1.AntdFormComplexFormControl, null) },
    { feature: "controlhooks", component: React.createElement(control_hooks_1.AntdFormControlHooks, null) },
    { feature: "controlref", component: React.createElement(control_ref_1.AntdFormControlRef, null) },
    { feature: "customizedformcontrols", component: React.createElement(customized_form_controls_1.AntdFormCustomizedFormControls, null) },
    { feature: "depdebug", component: React.createElement(dep_debug_1.AntdFormDepDebug, null) },
    { feature: "disabledinputdebug", component: React.createElement(disabled_input_debug_1.AntdFormDisabledInputDebug, null) },
    { feature: "dynamicformitem", component: React.createElement(dynamic_form_item_1.AntdFormDynamicFormItem, null) },
    { feature: "dynamicformitemscomplex", component: React.createElement(dynamic_form_items_complex_1.AntdFormDynamicFormItemsComplex, null) },
    { feature: "dynamicformitemsnostyle", component: React.createElement(dynamic_form_items_no_style_1.AntdFormDynamicFormItemsNoStyle, null) },
    { feature: "dynamicformitems", component: React.createElement(dynamic_form_items_1.AntdFormDynamicFormItems, null) },
    { feature: "dynamicrule", component: React.createElement(dynamic_rule_1.AntdFormDynamicRule, null) },
    { feature: "formcontext", component: React.createElement(form_context_1.AntdFormContext, null) },
    { feature: "forminmodal", component: React.createElement(form_in_modal_1.AntdFormInModal, null) },
    { feature: "globalstate", component: React.createElement(global_state_1.AntdFormGlobalState, null) },
    { feature: "inlinelogin", component: React.createElement(inline_login_1.AntdFormInlineLogin, null) },
    { feature: "labeldebug", component: React.createElement(label_debug_1.AntdFormLabelDebug, null) },
    { feature: "layoutcanwrap", component: React.createElement(layout_can_wrap_1.AntdFormLayoutCanWrap, null) },
    { feature: "layout", component: React.createElement(layout_1.AntdFormLayout, null) },
];
exports.AntdForm = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "form", components: components });
};
