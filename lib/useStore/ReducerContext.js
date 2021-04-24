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
exports.withReducerProvider = exports.ReducerProvider = exports.useReducerSelector = exports.useReducerStore = void 0;
var react_1 = __importStar(require("react"));
var utils_1 = require("../utils");
var context_1 = require("./context");
var useReducerStore = function (Context) {
    if (Context === void 0) { Context = context_1.ReducerContext; }
    var _a = react_1.useContext(Context), state = _a.state, dispatch = _a.dispatch;
    var createAction = function (type, payload) { return ({
        type: type,
        payload: payload
    }); };
    var dispatchOnChange = function (key, action) {
        if (utils_1.stateKeyChanged(state, key, action.payload)) {
            dispatch(action);
        }
    };
    return {
        state: state,
        stateSelector: utils_1.generateSelector(state),
        dispatch: dispatch,
        createAction: createAction,
        dispatchOnChange: dispatchOnChange
    };
};
exports.useReducerStore = useReducerStore;
function useReducerSelector(selector) {
    var state = exports.useReducerStore().state;
    return selector(state);
}
exports.useReducerSelector = useReducerSelector;
var ReducerProvider = function (_a) {
    var children = _a.children, reducer = _a.reducer, _b = _a.initialState, initialState = _b === void 0 ? context_1.initialContextState : _b, _c = _a.Context, Context = _c === void 0 ? context_1.ReducerContext : _c;
    var reducerArray = react_1.useReducer(reducer, initialState);
    var _d = reducerArray, state = _d[0], dispatch = _d[1];
    var contextValue = react_1.useMemo(function () { return ({ state: state, dispatch: dispatch }); }, [state, dispatch]);
    return (react_1.default.createElement(Context.Provider, { value: { state: contextValue.state, dispatch: contextValue.dispatch } }, children));
};
exports.ReducerProvider = ReducerProvider;
var withReducerProvider = function (reducer, initialState, Context
// eslint-disable-next-line react/display-name
) {
    if (initialState === void 0) { initialState = context_1.initialContextState; }
    if (Context === void 0) { Context = context_1.ReducerContext; }
    return function (Component) { return function (props) { return (react_1.default.createElement(exports.ReducerProvider, { Context: Context, reducer: reducer, initialState: initialState },
        react_1.default.createElement(Component, __assign({}, props)))); }; };
};
exports.withReducerProvider = withReducerProvider;
//# sourceMappingURL=ReducerContext.js.map