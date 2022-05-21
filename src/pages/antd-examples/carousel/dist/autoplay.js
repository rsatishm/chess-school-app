"use strict";
exports.__esModule = true;
exports.AntdCarouselAutoplay = void 0;
var antd_1 = require("antd");
var contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
};
exports.AntdCarouselAutoplay = function () { return React.createElement(antd_1.Carousel, { autoplay: true },
    React.createElement("div", null,
        React.createElement("h3", { style: contentStyle }, "1")),
    React.createElement("div", null,
        React.createElement("h3", { style: contentStyle }, "2")),
    React.createElement("div", null,
        React.createElement("h3", { style: contentStyle }, "3")),
    React.createElement("div", null,
        React.createElement("h3", { style: contentStyle }, "4"))); };
