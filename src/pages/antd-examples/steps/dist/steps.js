"use strict";
exports.__esModule = true;
exports.AntdSteps = void 0;
var antd_components_1 = require("../antd-components");
var clickable_1 = require("./clickable");
var customized_progress_dot_1 = require("./customized-progress-dot");
var error_1 = require("./error");
var icon_1 = require("./icon");
var nav_1 = require("./nav");
var progress_1 = require("./progress");
var progress_debug_1 = require("./progress-debug");
var progress_dot_1 = require("./progress-dot");
var simple_1 = require("./simple");
var small_size_1 = require("./small-size");
var step_next_1 = require("./step-next");
var steps_in_steps_1 = require("./steps-in-steps");
var vertical_1 = require("./vertical");
var vertical_small_1 = require("./vertical-small");
var components = [
    { feature: "clickable", component: React.createElement(clickable_1.AntdStepsClickable, null) },
    { feature: "customizedProgressDot", component: React.createElement(customized_progress_dot_1.AntdStepsCustomizedProgressDot, null) },
    { feature: "error", component: React.createElement(error_1.AntdStepsError, null) },
    { feature: "icon", component: React.createElement(icon_1.AntdStepsIcon, null) },
    { feature: "nav", component: React.createElement(nav_1.AntdStepsNav, null) },
    { feature: "progressDebug", component: React.createElement(progress_debug_1.AntdStepsProgressDebug, null) },
    { feature: "progressDot", component: React.createElement(progress_dot_1.AntdStepsProgressDot, null) },
    { feature: "progress", component: React.createElement(progress_1.AntdStepsProgress, null) },
    { feature: "simple", component: React.createElement(simple_1.AntdStepsSimple, null) },
    { feature: "smallSize", component: React.createElement(small_size_1.AntdStepsSmallSize, null) },
    { feature: "stepNext", component: React.createElement(step_next_1.AntdStepsStepNext, null) },
    { feature: "stepsInSteps", component: React.createElement(steps_in_steps_1.AntdStesStepsInSteps, null) },
    { feature: "verticalSmall", component: React.createElement(vertical_small_1.AntdStepsVerticalSmall, null) },
    { feature: "vertical", component: React.createElement(vertical_1.AntdStepsVertical, null) }
];
exports.AntdSteps = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "steps", components: components });
};
