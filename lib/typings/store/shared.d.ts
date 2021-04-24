import React from "react";
export declare type TValue = any;
export declare type TState<T = any> = T;
export interface IProviderProps<S = TState> {
    children: React.ReactNode;
    initialState: S;
}
export declare type TSelector<S = TState, V = TValue> = (state: S) => V;
//# sourceMappingURL=shared.d.ts.map