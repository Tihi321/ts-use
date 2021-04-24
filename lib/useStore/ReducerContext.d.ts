import React from "react";
import { IProviderReducerProps, TAction, TSelector, TState } from "../typings";
export declare const useReducerStore: (Context?: React.Context<{
    state: TState;
    dispatch: (_action: TAction) => null;
}>) => {
    state: TState;
    stateSelector: () => any;
    dispatch: (_action: TAction) => null;
    createAction: (type: string, payload: any) => {
        type: string;
        payload: any;
    };
    dispatchOnChange: (key: string, action: TAction) => void;
};
export declare const useReducerSelector: (selector: TSelector) => import("../typings").TValue;
export declare const ReducerProvider: ({ children, reducer, initialState, Context }: IProviderReducerProps) => JSX.Element;
export declare const withReducerProvider: (reducer: any, initialState?: TState, Context?: React.Context<{
    state: TState;
    dispatch: (_action: TAction) => null;
}>) => (Component: React.ComponentType<any>) => (props: any) => JSX.Element;
//# sourceMappingURL=ReducerContext.d.ts.map