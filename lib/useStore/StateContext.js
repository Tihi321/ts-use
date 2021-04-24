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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withStateProvider = exports.StateProvider = exports.useStateSelector = exports.useStateStore = void 0;
var lodash_1 = require("lodash");
var react_1 = __importStar(require("react"));
var utils_1 = require("../utils");
var context_1 = require("./context");
var useStateStore = function (Context) {
    if (Context === void 0) { Context = context_1.StateContext; }
    var _a = react_1.useContext(Context), state = _a.state, setState = _a.setState;
    var setStateOnChange = function (newState) {
        if (!lodash_1.isEqual(state, newState)) {
            setState(newState);
        }
    };
    var setStateKeyOnChange = function (key, value) {
        var _a;
        if (utils_1.stateKeyChanged(state, key, value)) {
            setState(__assign(__assign({}, state), (_a = {}, _a[key] = value, _a)));
        }
    };
    return {
        state: state,
        stateSelector: utils_1.generateSelector(state),
        setState: setState,
        setStateOnChange: setStateOnChange,
        setStateKeyOnChange: setStateKeyOnChange
    };
};
exports.useStateStore = useStateStore;
var useStateSelector = function (selector) {
    var state = exports.useStateStore().state;
    return selector(state);
};
exports.useStateSelector = useStateSelector;
var StateProvider = function (_a) {
    var children = _a.children, _b = _a.initialState, initialState = _b === void 0 ? context_1.initialContextState : _b, _c = _a.Context, Context = _c === void 0 ? context_1.StateContext : _c;
    var stateArray = react_1.useState(initialState);
    var _d = stateArray, state = _d[0], setState = _d[1];
    var contextValue = react_1.useMemo(function () { return ({ state: state, setState: setState }); }, [state, setState]);
    return (react_1.default.createElement(Context.Provider, { value: { state: contextValue.state, setState: contextValue.setState } }, children));
};
exports.StateProvider = StateProvider;
var withStateProvider = function (initialState, Context
// eslint-disable-next-line react/display-name
) {
    if (initialState === void 0) { initialState = context_1.initialContextState; }
    if (Context === void 0) { Context = context_1.StateContext; }
    return function (Component) { return function (props) { return (react_1.default.createElement(exports.StateProvider, { Context: Context, initialState: initialState },
        react_1.default.createElement(Component, __assign({}, props)))); }; };
};
exports.withStateProvider = withStateProvider;
//# sourceMappingURL=StateContext.js.map