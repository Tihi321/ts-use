import { isEqual } from "lodash";
import React, { useContext, useMemo, useState } from "react";
import { generateSelector, stateKeyChanged } from "../utils";
import { initialContextState, StateContext } from "./context";
export const useStateStore = () => {
    const { state, setState } = useContext(StateContext);
    const setStateOnChange = (newState) => {
        if (!isEqual(state, newState)) {
            setState(newState);
        }
    };
    const setStateKeyOnChange = (key, value) => {
        if (stateKeyChanged(state, key, value)) {
            setState({ ...state, [key]: value });
        }
    };
    return {
        state,
        stateSelector: generateSelector(state),
        setState,
        setStateOnChange,
        setStateKeyOnChange
    };
};
export const useStateSelector = (selector) => {
    const { state } = useStateStore();
    return selector(state);
};
export const StateProvider = ({ children, initialState = initialContextState }) => {
    const stateArray = useState(initialState);
    const [state, setState] = stateArray;
    const contextValue = useMemo(() => ({ state, setState }), [state, setState]);
    return (React.createElement(StateContext.Provider, { value: { state: contextValue.state, setState: contextValue.setState } }, children));
};
export const withStateProvider = (initialState = initialContextState
// eslint-disable-next-line react/display-name
) => (Component) => (props) => (React.createElement(StateProvider, { initialState: initialState },
    React.createElement(Component, Object.assign({}, props))));
//# sourceMappingURL=StateContext.js.map