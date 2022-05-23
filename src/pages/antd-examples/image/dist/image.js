"use strict";
exports.__esModule = true;
exports.AntdImage = void 0;
var antd_components_1 = require("../antd-components");
var basic_1 = require("./basic");
var controlled_preview_1 = require("./controlled-preview");
var fallback_1 = require("./fallback");
var placeholder_1 = require("./placeholder");
var preview_group_1 = require("./preview-group");
var preview_group_visible_1 = require("./preview-group-visible");
var preview_mask_1 = require("./preview-mask");
var previewSrc_1 = require("./previewSrc");
var components = [
    { feature: "basic", component: React.createElement(basic_1.AntdImageBasic, null) },
    { feature: "controlledpreview", component: React.createElement(controlled_preview_1.AntdImageControlledPreview, null) },
    { feature: "fallback", component: React.createElement(fallback_1.AntdImageFallback, null) },
    { feature: "placeholder", component: React.createElement(placeholder_1.AntdImagePlaceholder, null) },
    { feature: "previewgroupvisible", component: React.createElement(preview_group_visible_1.AntdImagePreviewGroupVisible, null) },
    { feature: "previewgroup", component: React.createElement(preview_group_1.AntdImagePreviewGroup, null) },
    { feature: "previewmask", component: React.createElement(preview_mask_1.AntdImagePreviewMask, null) },
    { feature: "previewsrc", component: React.createElement(previewSrc_1.AntdImagePreviewSrc, null) },
];
exports.AntdImage = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "image", components: components });
};
