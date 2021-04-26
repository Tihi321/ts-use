/// <reference types="react" />
import { IStateProvider, TSelector, TStateProviderHOC, TStateUseStore } from "../typings";
/**
 * @typedef {object} ReturnObject
 * @property {object} state - State object
 * @property {function} stateSelector - state in a form of a selector
 * @property {function} setState -  setState function from react
 * @property {function} stateKeyValueChanged -  takes a key and values and checks if value updated with that key in state and returns boolean
 * @property {function} onStateChange - receives the callback and newState, checks if newState is same as old and runs callback with newUpdatedState, with these function state is reactive to state from api
 * @property {function} onStateKeyChange - receives the callback, checks the store with provided key if state object value is updated and runs provided callback with newUpdatedState
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
 * }
 */
export declare const useStateStore: TStateUseStore;
/**
 * Helper hook that works with useStateStore, it accepts selector and return value from store
 * @example
 * const data = useStateSelector(getVideoIOInputs);
 * @param {function} selector - selector funtion that accepts state
 * @return {any} returns value from the store
 */
export declare function useStateSelector<T extends TSelector>(selector: T): ReturnType<T>;
export declare const StateProvider: ({ children, initialState, Context }: IStateProvider) => JSX.Element;
/**
 * Represents a hoc component for StateProvider to wrap passed component
 * @example
 * export default withStateProvider(statusPanelnitialState)(StatusPanel);
 * @param {object} initialState - initial state for local store.
 * @return {function} returns function that expects top component, for example top panel component, to be srapped, it will provide state and setState to bottom component that complimentary hooks can use internaly.
 */
export declare const withStateProvider: TStateProviderHOC;
//# sourceMappingURL=StateContext.d.ts.map