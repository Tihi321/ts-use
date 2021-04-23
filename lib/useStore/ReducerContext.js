import React, { useContext, useMemo, useReducer } from "react";
import { generateSelector, stateKeyChanged } from "../utils";
import { initialContextState, ReducerContext } from "./context";
export const useReducerStore = () => {
    const { state, dispatch } = useContext(ReducerContext);
    const createAction = (type, payload) => ({
        type,
        payload
    });
    const dispatchOnChange = (key, action) => {
        if (stateKeyChanged(state, key, action.payload)) {
            dispatch(action);
        }
    };
    return {
        state,
        stateSelector: generateSelector(state),
        dispatch,
        createAction,
        dispatchOnChange
    };
};
export const useReducerSelector = (selector) => {
    const { state } = useReducerStore();
    return selector(state);
};
export const ReducerProvider = ({ children, reducer, initialState = initialContextState }) => {
    const reducerArray = useReducer(reducer, initialState);
    const [state, dispatch] = reducerArray;
    const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
    return (React.createElement(ReducerContext.Provider, { value: { state: contextValue.state, dispatch: contextValue.dispatch } }, children));
};
export const withReducerProvider = (reducer, initialState = initialContextState
// eslint-disable-next-line react/display-name
) => (Component) => (props) => (React.createElement(ReducerProvider, { reducer: reducer, initialState: initialState },
    React.createElement(Component, Object.assign({}, props))));
//# sourceMappingURL=ReducerContext.js.map