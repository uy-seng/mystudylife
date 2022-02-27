"use strict";
exports.__esModule = true;
exports.Sidebar = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var SidebarMenu_1 = require("../SidebarMenu");
var msl_icon_svg_1 = require("../../../assets/msl-icon.svg");
var Sidebar_module_css_1 = require("./Sidebar.module.css");
var ai_1 = require("react-icons/ai");
var ProfileAvatar_1 = require("./ProfileAvatar");
exports.Sidebar = function (_a) {
    var menu = _a.menu, userName = _a.userName;
    var location = react_router_dom_1.useLocation();
    var path = location.pathname.split("/");
    var current = path[path.length - 1];
    return (react_1["default"].createElement("div", { className: Sidebar_module_css_1["default"].sidebar },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/dashboard" },
                react_1["default"].createElement("div", { className: Sidebar_module_css_1["default"].logo },
                    react_1["default"].createElement("img", { src: msl_icon_svg_1["default"], alt: "" }))),
            react_1["default"].createElement("div", null, menu.map(function (m, index) { return (react_1["default"].createElement(SidebarMenu_1.SidebarMenu, { pathname: m.pathname, active: m.pathname === current, key: index, icon: m.icon })); }))),
        userName ? (react_1["default"].createElement(SidebarMenu_1.SidebarMenu, { style: {
                textDecoration: "none"
            }, pathname: "setting", active: current === "setting", icon: react_1["default"].createElement(ProfileAvatar_1.ProfileAvatar, { userNameInitial: userName.charAt(0).toUpperCase() }) })) : (react_1["default"].createElement(SidebarMenu_1.SidebarMenu, { style: {
                textDecoration: "none"
            }, pathname: "setting", active: current === "setting", icon: react_1["default"].createElement(ai_1.AiFillSetting, null) }))));
};
