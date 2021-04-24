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
export var useStateStore = function (Context) {
    if (Context === void 0) { Context = StateContext; }
    var _a = useContext(Context), state = _a.state, setState = _a.setState;
    var setStateOnChange = function (newState) {
        if (!isEqual(state, newState)) {
            setState(newState);
        }
    };
    var setStateKeyOnChange = function (key, value) {
        var _a;
        if (stateKeyChanged(state, key, value)) {
            setState(__assign(__assign({}, state), (_a = {}, _a[key] = value, _a)));
        }
    };
    return {
        state: state,
        stateSelector: generateSelector(state),
        setState: setState,
        setStateOnChange: setStateOnChange,
        setStateKeyOnChange: setStateKeyOnChange
    };
};
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
export var withStateProvider = function (initialState, Context
// eslint-disable-next-line react/display-name
) {
    if (initialState === void 0) { initialState = initialContextState; }
    if (Context === void 0) { Context = StateContext; }
    return function (Component) { return function (props) { return (React.createElement(StateProvider, { Context: Context, initialState: initialState },
        React.createElement(Component, __assign({}, props)))); }; };
};
//# sourceMappingURL=StateContext.js.map