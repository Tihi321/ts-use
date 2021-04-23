/// <reference types="react" />
import { TAction, TState, TValue } from "../typings";
export declare const initialContextState: TState;
export declare const ReducerContext: import("react").Context<{
    state: TState;
    dispatch: (_action: TAction) => null;
}>;
export declare const StateContext: import("react").Context<{
    state: TState;
    setState: (_value: TValue) => null;
}>;
//# sourceMappingURL=context.d.ts.map