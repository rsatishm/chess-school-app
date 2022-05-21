"use strict";
exports.__esModule = true;
exports.AntdCarouselBasic = void 0;
var antd_1 = require("antd");
function onChange(a) {
    console.log(a);
}
var contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
};
exports.AntdCarouselBasic = function () { return React.createElement(antd_1.Carousel, { afterChange: onChange },
    React.createElement("div", null,
        React.createElement("h3", { style: contentStyle }, "1")),
    React.createElement("div", null,
        React.createElement("h3", { style: contentStyle }, "2")),
    React.createElement("div", null,
        React.createElement("h3", { style: contentStyle }, "3")),
    React.createElement("div", null,
        React.createElement("h3", { style: contentStyle }, "4"))); };
