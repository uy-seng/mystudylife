"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoute = void 0;
const express_1 = require("express");
const auth_route_1 = require("./auth.route");
exports.apiRoute = (0, express_1.Router)();
exports.apiRoute.get("/", (_req, res) => {
    return res.status(200).json({
        message: "My Study Life API"
    });
});
exports.apiRoute.use("/auth", auth_route_1.authRoute);
//# sourceMappingURL=index.js.map