"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.AntdFormTimeRelatedControls = void 0;
var antd_1 = require("antd");
var RangePicker = antd_1.DatePicker.RangePicker;
var formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};
var config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }]
};
var rangeConfig = {
    rules: [{ type: 'array', required: true, message: 'Please select time!' }]
};
exports.AntdFormTimeRelatedControls = function () {
    var onFinish = function (fieldsValue) {
        // Should format date value before submit.
        var rangeValue = fieldsValue['range-picker'];
        var rangeTimeValue = fieldsValue['range-time-picker'];
        var values = __assign(__assign({}, fieldsValue), { 'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'), 'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'), 'month-picker': fieldsValue['month-picker'].format('YYYY-MM'), 'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')], 'range-time-picker': [
                rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
                rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
            ], 'time-picker': fieldsValue['time-picker'].format('HH:mm:ss') });
        console.log('Received values of form: ', values);
    };
    return (React.createElement(antd_1.Form, __assign({ name: "time_related_controls" }, formItemLayout, { onFinish: onFinish }),
        React.createElement(antd_1.Form.Item, __assign({ name: "date-picker", label: "DatePicker" }, config),
            React.createElement(antd_1.DatePicker, null)),
        React.createElement(antd_1.Form.Item, __assign({ name: "date-time-picker", label: "DatePicker[showTime]" }, config),
            React.createElement(antd_1.DatePicker, { showTime: true, format: "YYYY-MM-DD HH:mm:ss" })),
        React.createElement(antd_1.Form.Item, __assign({ name: "month-picker", label: "MonthPicker" }, config),
            React.createElement(antd_1.DatePicker, { picker: "month" })),
        React.createElement(antd_1.Form.Item, __assign({ name: "range-picker", label: "RangePicker" }, rangeConfig),
            React.createElement(RangePicker, null)),
        React.createElement(antd_1.Form.Item, __assign({ name: "range-time-picker", label: "RangePicker[showTime]" }, rangeConfig),
            React.createElement(RangePicker, { showTime: true, format: "YYYY-MM-DD HH:mm:ss" })),
        React.createElement(antd_1.Form.Item, __assign({ name: "time-picker", label: "TimePicker" }, config),
            React.createElement(antd_1.TimePicker, null)),
        React.createElement(antd_1.Form.Item, { wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 }
            } },
            React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit"))));
};
