"use strict";
exports.__esModule = true;
exports.AntdFormDepDebug = void 0;
var antd_1 = require("antd");
var acc = 0;
exports.AntdFormDepDebug = function () {
    var form = antd_1.Form.useForm()[0];
    return (React.createElement(antd_1.Form, { form: form, name: "debug", initialValues: {
            debug1: 'debug1',
            debug2: 'debug2'
        } },
        React.createElement(antd_1.Form.Item, { noStyle: true, dependencies: ['debug1'] }, function () { return acc++; }
        // return <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>;
        ),
        React.createElement(antd_1.Form.Item, { label: "debug1", name: "debug1" },
            React.createElement(antd_1.Input, null)),
        React.createElement(antd_1.Form.Item, { label: "debug2", name: "debug2" },
            React.createElement(antd_1.Input, null))));
};
