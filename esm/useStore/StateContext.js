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
import { isEqual } from "lodash";
import React, { useContext, useMemo, useState } from "react";
import { generateSelector, stateKeyChanged } from "../utils";
import { initialContextState, StateContext } from "./context";
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
export var useStateStore = function (Context) {
    if (Context === void 0) { Context = StateContext; }
    var _a = useContext(Context), state = _a.state, setState = _a.setState;
    var onStateChange = function (newState, callback) {
        if (callback === void 0) { callback = setState; }
        if (!isEqual(state, newState)) {
            callback(newState);
        }
    };
    var stateKeyValueChanged = function (key, value) { return stateKeyChanged(state, key, value); };
    var onStateKeyChange = function (key, value, callback) {
        var _a;
        if (callback === void 0) { callback = setState; }
        if (stateKeyValueChanged(key, value)) {
            callback(__assign(__assign({}, state), (_a = {}, _a[key] = value, _a)));
        }
    };
    var onStateObjectChange = function (passedState, callback) {
        if (callback === void 0) { callback = setState; }
        var updatedState = __assign({}, state);
        Object.keys(passedState).forEach(function (key) {
            var _a;
            if (!isEqual(state[key], passedState[key])) {
                updatedState = __assign(__assign({}, state), (_a = {}, _a[key] = passedState[key], _a));
            }
        });
        if (!isEqual(state, updatedState)) {
            callback(__assign(__assign({}, state), updatedState));
        }
    };
    var useMemoizedValue = function (key) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return useMemo(function () { return state[key]; }, [state[key]]);
    };
    return {
        state: state,
        stateSelector: generateSelector(state),
        setState: setState,
        onStateChange: onStateChange,
        stateKeyValueChanged: stateKeyValueChanged,
        onStateObjectChange: onStateObjectChange,
        onStateKeyChange: onStateKeyChange,
        useMemoizedValue: useMemoizedValue,
    };
};
/**
 * Helper hook that works with useStateStore, it accepts selector and return value from store
 * @example
 * const data = useStateSelector(getVideoIOInputs);
 * @param {function} selector - selector funtion that accepts state
 * @return {any} returns value from the store
 */
export function useStateSelector(selector) {
    var state = useStateStore().state;
    return selector(state);
}
export var StateProvider = function (_a) {
    var children = _a.children, _b = _a.initialState, initialState = _b === void 0 ? initialContextState : _b, _c = _a.Context, Context = _c === void 0 ? StateContext : _c;
    var stateArray = useState(initialState);
    var _d = stateArray, state = _d[0], setState = _d[1];
    var contextValue = useMemo(function () { return ({ state: state, setState: setState }); }, [state, setState]);
    return (React.createElement(Context.Provider, { value: { state: contextValue.state, setState: contextValue.setState } }, children));
};
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
export var withStateProvider = function (initialState, Context
// eslint-disable-next-line react/display-name
) {
    if (initialState === void 0) { initialState = initialContextState; }
    if (Context === void 0) { Context = StateContext; }
    return function (Component) { return function (props) { return (React.createElement(StateProvider, { Context: Context, initialState: initialState },
        React.createElement(Component, __assign({}, props)))); }; };
};
//# sourceMappingURL=StateContext.js.map