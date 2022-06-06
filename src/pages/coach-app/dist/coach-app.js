"use strict";
exports.__esModule = true;
exports.CoachApp = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var react_router_dom_1 = require("react-router-dom");
var mobx_react_1 = require("mobx-react");
var dashboard_1 = require("../dashboard/dashboard");
var academy_1 = require("./academy/academy");
var sidebar_1 = require("../../components/sidebar/sidebar");
var react_1 = require("react");
var Chessboard_1 = require("../../components/chessboard/Chessboard");
var analysis_board_1 = require("../common-pages/analysis-board/analysis-board");
var ChessboardDemo_1 = require("../../components/chessgroundboard/ChessboardDemo");
var classrooms_1 = require("./classrooms/classrooms");
var create_classroom_form_1 = require("./classrooms/create-classroom-form");
var antd_route_1 = require("../antd-examples/antd-route");
exports.CoachApp = mobx_react_1.observer(function () {
    var state = react_1.useState({
        hasError: false
    })[0];
    var handleReload = function () {
        window.location.reload();
    };
    if (state.hasError) {
        return (React.createElement(antd_1.Layout, { className: "coach app page" },
            React.createElement(antd_1.Layout.Content, { className: "content", style: { paddingLeft: 0 } },
                React.createElement("div", { className: "inner" },
                    React.createElement("div", { className: "error-state container" },
                        React.createElement(icons_1.ExceptionOutlined, null),
                        React.createElement("p", { className: "exception-text" }, "An unexpected error was encountered."),
                        React.createElement(antd_1.Button, { danger: true, onClick: handleReload }, "Reload Page"))))));
    }
    function Assignment() {
        return React.createElement("h1", null, "Assignment");
    }
    function Practice() {
        return React.createElement("h1", null, "Practice");
    }
    function User() {
        return React.createElement("h1", null, "User");
    }
    function Blindbot() {
        return React.createElement("h1", null, "Blindbot");
    }
    function Gamebase() {
        return React.createElement("h1", null, "Gamebase");
    }
    function Gamebox() {
        return React.createElement("h1", null, "Gamebox");
    }
    function Problembase() {
        return React.createElement("h1", null, "Problembase");
    }
    function Analytics() {
        return React.createElement("h1", null, "Analytics");
    }
    function GameArea() {
        //const fen = new Chess().fen()
        var fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        return React.createElement(React.Fragment, null,
            React.createElement("table", null,
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement(Chessboard_1.Chessboard, { width: 300, height: 300, fen: fen, interactionMode: "NONE" }))),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement(Chessboard_1.Chessboard, { width: 300, height: 300, fen: fen, interactionMode: "MOVE" }))),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement(Chessboard_1.Chessboard, { width: 300, height: 300, fen: fen, interactionMode: "ARROW" }))),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement(Chessboard_1.Chessboard, { width: 300, height: 300, fen: fen, interactionMode: "SQUARE_HIGHLIGHT" })))));
    }
    function CreateTournamentForm() {
        return React.createElement("h1", null, "CreateTournamentForm");
    }
    function TournamentViewWithRouter() {
        return React.createElement("h1", null, "TournamentViewWithRouter");
    }
    function TournamentListingWithRouter() {
        return React.createElement("h1", null, "TournamentListingWithRouter");
    }
    function ChessboardExample() {
        return React.createElement(ChessboardDemo_1.ChessboardDemo, null);
    }
    console.log("In coachApp");
    return (React.createElement(antd_1.Layout, { className: "coach app page" },
        React.createElement(sidebar_1.Sidebar, null),
        React.createElement(react_router_dom_1.Routes, null,
            React.createElement(react_router_dom_1.Route, { path: "/academy/*", element: React.createElement(academy_1.Academy, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/assignment", element: React.createElement(Assignment, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/practice", element: React.createElement(Practice, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/preferences", element: React.createElement(User, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/board", element: React.createElement(analysis_board_1.AnalysisBoard, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/classrooms", element: React.createElement(classrooms_1.Classrooms, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/blindbot", element: Blindbot }),
            React.createElement(react_router_dom_1.Route, { path: "/gamebase", element: React.createElement(Gamebase, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/sharebox", element: React.createElement(Gamebox, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/problembase", element: React.createElement(Problembase, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/reports", element: React.createElement(Analytics, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/game-area", element: React.createElement(GameArea, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/tournaments/create", element: React.createElement(CreateTournamentForm, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/classrooms/create", element: React.createElement(create_classroom_form_1.CreateClassRoom, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/tournaments/:uuid/edit", element: React.createElement(CreateTournamentForm, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/tournaments/:uuid", element: React.createElement(TournamentViewWithRouter, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/tournaments", element: React.createElement(TournamentListingWithRouter, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/antd/*", element: React.createElement(antd_route_1.AntdRoute, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/*", element: React.createElement(dashboard_1.Dashboard, null) }))));
});
