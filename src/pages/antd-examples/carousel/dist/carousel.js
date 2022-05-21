"use strict";
exports.__esModule = true;
exports.AntdCarousel = void 0;
var antd_components_1 = require("../antd-components");
var autoplay_1 = require("./autoplay");
var basic_1 = require("./basic");
var fade_1 = require("./fade");
var position_1 = require("./position");
var components = [
    { feature: "autoplay", component: React.createElement(autoplay_1.AntdCarouselAutoplay, null) },
    { feature: "basic", component: React.createElement(basic_1.AntdCarouselBasic, null) },
    { feature: "fade", component: React.createElement(fade_1.AntdCarouselFade, null) },
    { feature: "position", component: React.createElement(position_1.AntdCarouselPosition, null) },
];
exports.AntdCarousel = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "carousel", components: components });
};
