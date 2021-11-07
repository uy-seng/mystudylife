"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeTransformer = exports.dateTransformer = void 0;
exports.dateTransformer = {
    to: (value) => value,
    from: (value) => value.toLocaleDateString(),
};
exports.timeTransformer = {
    to: (value) => value,
    from: (value) => value.toLocaleTimeString(),
};
//# sourceMappingURL=date.utils.js.map