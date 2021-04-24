import React from "react";
export interface IProviderProps {
    children: React.ReactNode;
    initialState: TState;
    Context?: React.Context<any>;
}
export interface IProviderReducerProps extends IProviderProps {
    reducer: any;
}
export declare type TValue = object | string | number | boolean;
export declare type TState = Record<string, TValue>;
export declare type TAction = {
    type: string;
    payload: TValue;
};
export declare type TSelector = (state: TState) => TValue;
//# sourceMappingURL=store.d.ts.map