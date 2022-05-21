"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AntdSelectSearchBox = void 0;
var antd_1 = require("antd");
var fetch_jsonp_1 = require("fetch-jsonp");
var qs_1 = require("qs");
var react_1 = require("react");
var Option = antd_1.Select.Option;
var timeout;
var currentValue;
function fetch(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;
    function fake() {
        var str = qs_1["default"].stringify({
            code: 'utf-8',
            q: value
        });
        fetch_jsonp_1["default"]("https://suggest.taobao.com/sug?" + str)
            .then(function (response) { return response.json(); })
            .then(function (d) {
            if (currentValue === value) {
                var result = d.result;
                var data_1 = [];
                result.forEach(function (r) {
                    data_1.push({
                        value: r[0],
                        text: r[0]
                    });
                });
                callback(data_1);
            }
        });
    }
    timeout = setTimeout(fake, 300);
}
var SearchInput = /** @class */ (function (_super) {
    __extends(SearchInput, _super);
    function SearchInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            data: [],
            value: undefined
        };
        _this.handleSearch = function (value) {
            if (value) {
                fetch(value, function (data) { return _this.setState({ data: data }); });
            }
            else {
                _this.setState({ data: [] });
            }
        };
        _this.handleChange = function (value) {
            _this.setState({ value: value });
        };
        return _this;
    }
    SearchInput.prototype.render = function () {
        var options = this.state.data.map(function (d) { return react_1["default"].createElement(Option, { key: d.value }, d.text); });
        return (react_1["default"].createElement(antd_1.Select, { showSearch: true, value: this.state.value, placeholder: this.props.placeholder, style: this.props.style, defaultActiveFirstOption: false, showArrow: false, filterOption: false, onSearch: this.handleSearch, onChange: this.handleChange, notFoundContent: null }, options));
    };
    return SearchInput;
}(react_1["default"].Component));
exports.AntdSelectSearchBox = function () { return react_1["default"].createElement(SearchInput, { placeholder: "input search text", style: { width: 200 } }); };
