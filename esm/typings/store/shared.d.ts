import React from "react";
export declare type TValue = any;
export declare type TState<T = any> = T;
export interface IProviderProps<S = TState> {
    children: React.ReactNode;
    initialState: S;
}
export declare type TSelector<S = TState, V = TValue> = (state: S) => V;
export declare type TKeyValueChanged = (key: string, value: any) => boolean;
export declare type TOnStateKeyChange<V = TValue> = (key: string, value: V, callback: Function) => void;
export declare type TOnStateKeysChange = (keyValues: Record<string, any>, callback: Function) => void;
//# sourceMappingURL=shared.d.ts.map