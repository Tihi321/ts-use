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
/**
 * @typedef {object} ReturnObject
 * @property {object} state - State object
 * @property {function} stateSelector - state in a form of a selector
 * @property {function} setState -  setState function from react
 * @property {function} stateKeyValueChanged -  takes a key and values and checks if value updated with that key in state and returns boolean
 * @property {function} onStateChange - receives the callback and newState, checks if newState is same as old and runs callback with newUpdatedState, with these function state is reactive to state from api
 * @property {function} onStateKeyChange - receives the callback, checks the store with provided key if state object value is updated and runs provided callback with newUpdatedState
 * @property {function} onStateObjectChange - receives the object state or part of the state and callback, checks if state updated then it call the callback with new state
 */
/**
 * A store hook that works with StateProvider, if used with getHooks this needs to be in top package under withStateProvider component, you can check status panel package useContextState hook for more details
 * @example
 * const { setState, stateKeyValueChanged, onStateKeyChange } = useStateStore();
 * const { data: quotes } = useGetData("quotesApi");
 * const stateChanged = stateKeyValueChanged("quotes", quotes);
 * onStateKeyChange("quotes", quotes, newState => setState(newState));
 * if (stateChanged) {
 *  // ... some code
 * }
 * @example
 * const { setState, onStateObjectChange } = useStateStore();
 *  onStateObjectChange(
 *  {
 *    theme: themeData,
 *    quotes: quotesData,
 *  },
 *  newState => setState(newState)
 * )
 * @example
 * const { stateSelector } = useStateStore();
 *
 * // useSelector from redux, used with createSelector
 * const data = useSelector(getDataWith(stateSelector));
 * @example
 * const { dispatch } = useReducerStore();
 * onClick{() => dispatch(switchTheme()}
 * @return {ReturnObject} {
 * state {object} - State object,
 * stateSelector {function} - state in a form of a selector,
 * setState {function} - setState function from react,
 * stateKeyValueChanged {function} - takes a key and values and checks if value updated with that key in state and returns boolean,
 * onStateChange {function} - receives the callback and newState, checks if newState is same as old and runs callback with newUpdatedState, with these function state is reactive to state from api
 * onStateKeyChange {function} - receives the callback, checks the store with provided key if state object value is updated and runs provided callback with newUpdatedState
 * onStateObjectChange {function} - receives the object state or part of the state and callback, checks if state updated then it call the callback with new state
 * useMemoizedValue - memoizes value from state, so it can be used as dependecy in useEffect, receives key for item in state
 * }
 */
var useStateStore = function (Context) {
    if (Context === void 0) { Context = context_1.StateContext; }
    var _a = react_1.useContext(Context), state = _a.state, setState = _a.setState;
    var onStateChange = function (newState, callback) {
        if (!lodash_1.isEqual(state, newState)) {
            callback(newState);
        }
    };
    var stateKeyValueChanged = function (key, value) {
        return utils_1.stateKeyChanged(state, key, value);
    };
    var onStateKeyChange = function (key, value, callback) {
        var _a;
        if (stateKeyValueChanged(key, value)) {
            callback(__assign(__assign({}, state), (_a = {}, _a[key] = value, _a)));
        }
    };
    var onStateObjectChange = function (passedState, callback) {
        var updatedState = __assign({}, state);
        Object.keys(passedState).forEach(function (key) {
            var _a;
            if (!lodash_1.isEqual(state[key], passedState[key])) {
                updatedState = __assign(__assign({}, state), (_a = {}, _a[key] = passedState[key], _a));
            }
        });
        if (!lodash_1.isEqual(state, updatedState)) {
            callback(__assign(__assign({}, state), updatedState));
        }
    };
    var useMemoizedValue = function (key) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return react_1.useMemo(function () { return state[key]; }, [state[key]]);
    };
    return {
        state: state,
        stateSelector: utils_1.generateSelector(state),
        setState: setState,
        onStateChange: onStateChange,
        stateKeyValueChanged: stateKeyValueChanged,
        onStateObjectChange: onStateObjectChange,
        onStateKeyChange: onStateKeyChange,
        useMemoizedValue: useMemoizedValue,
    };
};
exports.useStateStore = useStateStore;
/**
 * Helper hook that works with useStateStore, it accepts selector and return value from store
 * @example
 * const data = useStateSelector(getVideoIOInputs);
 * @param {function} selector - selector funtion that accepts state
 * @return {any} returns value from the store
 */
function useStateSelector(selector) {
    var state = exports.useStateStore().state;
    return selector(state);
}
exports.useStateSelector = useStateSelector;
var StateProvider = function (_a) {
    var children = _a.children, _b = _a.initialState, initialState = _b === void 0 ? context_1.initialContextState : _b, _c = _a.Context, Context = _c === void 0 ? context_1.StateContext : _c;
    var stateArray = react_1.useState(initialState);
    var _d = stateArray, state = _d[0], setState = _d[1];
    var contextValue = react_1.useMemo(function () { return ({ state: state, setState: setState }); }, [state, setState]);
    return (react_1.default.createElement(Context.Provider, { value: { state: contextValue.state, setState: contextValue.setState } }, children));
};
exports.StateProvider = StateProvider;
/**
 * Represents a hoc component for StateProvider to wrap passed component
 * !Important do not use useState hooks in this provider component
 * @example
 * const StatusPanel = () => {
 *
 *  // in component
 *  const { setStateKeyOnChange } = useStateStore();
 *
 *  // custom hook
 *  useContextStateProvider();
 *
 *  return <StatusPanelContainer />;
 * };
 *
 * export default withStateProvider(statusPanelnitialState)(StatusPanel);
 * @param {object} initialState - initial state for local store.
 * @return {function} returns function that expects top component, for example top panel component, to be srapped, it will provide state and setState to bottom component that complimentary hooks can use internaly.
 */
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