import React from "react";
import { IProviderProps, TSelector, TState, TValue } from "../typings";
export declare const useStateStore: (Context?: React.Context<{
    state: TState;
    setState: (_value: TValue) => null;
}>) => {
    state: TState;
    stateSelector: () => any;
    setState: (_value: TValue) => null;
    setStateOnChange: (newState: TValue) => void;
    setStateKeyOnChange: (key: string, value: TState) => void;
};
export declare const useStateSelector: (selector: TSelector) => TValue;
export declare const StateProvider: ({ children, initialState, Context }: IProviderProps) => JSX.Element;
export declare const withStateProvider: (initialState?: TState, Context?: React.Context<{
    state: TState;
    setState: (_value: TValue) => null;
}>) => (Component: React.ComponentType<any>) => (props: any) => JSX.Element;
//# sourceMappingURL=StateContext.d.ts.map