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
exports.withReducerProvider = exports.ReducerProvider = exports.useReducerSelector = exports.useReducerStore = exports.createAction = void 0;
var react_1 = __importStar(require("react"));
var utils_1 = require("../utils");
var context_1 = require("./context");
/**
 * A function that returns action object
 * @example
 * const setTheme = payload => createAction("SET_THEME", payload);
 * @param {string} type - action type
 * @param {any} payload - optional payload that action needs.
 * @return {object} { type: string, payload: any }
 */
var createAction = function (type, payload) { return ({
    type: type,
    payload: payload,
}); };
exports.createAction = createAction;
/**
 * @typedef {object} ReturnObject
 * @property {object} state - State object
 * @property {function} stateSelector - state in a form of a selector
 * @property {function} dispatch - Dispatch function from react
 * @property {function} stateKeyValueChanged -  takes a key and values and checks if value updated with that key in state and returns boolean
 * @property {function} onStateKeyChange - receives the callback, checks the store with provided key if state object value is updated and runs provided callback with newUpdatedState
 */
/**
 * A store hook that works with ReducerProvider,  if used with getHooks this needs to be in top package under withReducerProvider component
 * @example
 * const { dispatch, stateKeyValueChanged, onStateKeyChange } = useStateStore();
 * const { data: quotes } = useGetData("quotesApi");
 * const stateChanged = stateKeyValueChanged("quotes", quotes);
 * onStateKeyChange("quotes", quotes, () => dispatch(setQuotes(quotes)));
 * if (stateChanged) {
 *  // ... some code
 * }
 * @example
 * const { stateSelector } = useReducerStore();
 *
 * // useSelector from redux, used with createSelector
 * const data = useSelector(getDataWith(stateSelector));
 * @example
 * const { dispatch } = useReducerStore();
 * onClick{() => dispatch(switchTheme()}
 * @return {ReturnObject} {
 * state {object} - State object,
 * stateSelector {function} - state in a form of a selector,
 * dispatch {function} - dispatch function from react,
 * stateKeyValueChanged {function} - takes a key and values and checks if value updated with that key in state and returns boolean,
 * onStateKeyChange {function} - receives the callback, checks the store with provided key if state object value is updated and runs provided callback
 * }
 */
var useReducerStore = function (Context) {
    if (Context === void 0) { Context = context_1.ReducerContext; }
    var _a = react_1.useContext(Context), state = _a.state, dispatch = _a.dispatch;
    var stateKeyValueChanged = function (key, value) { return utils_1.stateKeyChanged(state, key, value); };
    var onStateKeyChange = function (key, value, callback) {
        if (callback === void 0) { callback = dispatch; }
        if (stateKeyValueChanged(key, value)) {
            callback();
        }
    };
    return {
        state: state,
        stateSelector: utils_1.generateSelector(state),
        dispatch: dispatch,
        stateKeyValueChanged: stateKeyValueChanged,
        onStateKeyChange: onStateKeyChange,
    };
};
exports.useReducerStore = useReducerStore;
/**
 * Helper hook that works with useReducerStore, it accepts selector and return value from store
 * @example
 * const theme = useReducerSelector(getTheme);
 * @param {function} selector - selector funtion that accepts state
 * @return {any} returns value from the store
 */
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
/**
 * Represents a hoc component for ReducerProvider to wrap passed component
 * !Important do not use useState hooks in this provider component
 * @example
 * const StatusPanel = () => {
 *
 *  // in component
 *  const { setStateKeyOnChange } = useReducerStore();
 *
 *  // custom hook
 *  useContextReducerProvider();
 *
 *  return <StatusPanelContainer />;
 * };
 *
 * export default withStateProvider(statusPanelnitialState)(StatusPanel);
 * @param {function} reducer - reducer to work with state
 * @param {object} initialState - initial state for local store.
 * @return {function} returns function that expects top component, for example top panel component, to be srapped, it will provide state and dispatch to bottom component that complimentary hooks can use internaly.
 */
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