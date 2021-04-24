"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateContext = exports.ReducerContext = exports.initialContextState = void 0;
var react_1 = require("react");
exports.initialContextState = {};
exports.ReducerContext = react_1.createContext({
    state: exports.initialContextState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch: function (_action) { return null; }
});
exports.StateContext = react_1.createContext({
    state: exports.initialContextState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setState: function (_value) { return null; }
});
//# sourceMappingURL=context.js.map