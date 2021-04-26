import React from "react";
import { IProviderProps, TKeyValueChanged, TOnStateKeyChange, TSelector, TState, TValue } from "./shared";
export declare type TContextReducer<S = TState> = React.Context<{
    state: S;
    dispatch: any;
}>;
export declare type TAction<V = TValue> = {
    type: string;
    payload: V;
};
export declare type TCreateAction<V = TValue> = (type: string, payload?: V) => TAction<V>;
export declare type TReducerUseStore<S = TState> = (Context?: TContextReducer<S>) => {
    state: S;
    stateSelector: TSelector<S>;
    dispatch: any;
    stateKeyValueChanged: TKeyValueChanged;
    onStateKeyChange: TOnStateKeyChange;
};
export interface IReducerProvider<S = TState> extends IProviderProps<S> {
    reducer: any;
    Context?: TContextReducer<S>;
}
export declare type TReducerProviderComponent<S = TState> = (Component: React.ComponentType<any>) => React.ComponentType<IReducerProvider<S>>;
export declare type TReducerProviderHOC<S = TState> = (reducer: any, initialState: S, Context?: TContextReducer<S>) => TReducerProviderComponent<S>;
//# sourceMappingURL=reducer.d.ts.map