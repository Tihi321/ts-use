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
import React, { useContext, useMemo, useReducer } from "react";
import { generateSelector, stateKeyChanged } from "../utils";
import { initialContextState, ReducerContext } from "./context";
export var useReducerStore = function (Context) {
    if (Context === void 0) { Context = ReducerContext; }
    var _a = useContext(Context), state = _a.state, dispatch = _a.dispatch;
    var createAction = function (type, payload) { return ({
        type: type,
        payload: payload
    }); };
    var dispatchOnChange = function (key, action) {
        if (stateKeyChanged(state, key, action.payload)) {
            dispatch(action);
        }
    };
    return {
        state: state,
        stateSelector: generateSelector(state),
        dispatch: dispatch,
        createAction: createAction,
        dispatchOnChange: dispatchOnChange
    };
};
export function useReducerSelector(selector) {
    var state = useReducerStore().state;
    return selector(state);
}
export var ReducerProvider = function (_a) {
    var children = _a.children, reducer = _a.reducer, _b = _a.initialState, initialState = _b === void 0 ? initialContextState : _b, _c = _a.Context, Context = _c === void 0 ? ReducerContext : _c;
    var reducerArray = useReducer(reducer, initialState);
    var _d = reducerArray, state = _d[0], dispatch = _d[1];
    var contextValue = useMemo(function () { return ({ state: state, dispatch: dispatch }); }, [state, dispatch]);
    return (React.createElement(Context.Provider, { value: { state: contextValue.state, dispatch: contextValue.dispatch } }, children));
};
export var withReducerProvider = function (reducer, initialState, Context
// eslint-disable-next-line react/display-name
) {
    if (initialState === void 0) { initialState = initialContextState; }
    if (Context === void 0) { Context = ReducerContext; }
    return function (Component) { return function (props) { return (React.createElement(ReducerProvider, { Context: Context, reducer: reducer, initialState: initialState },
        React.createElement(Component, __assign({}, props)))); }; };
};
//# sourceMappingURL=ReducerContext.js.map