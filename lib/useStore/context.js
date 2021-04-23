import { createContext } from "react";
export const initialContextState = {};
export const ReducerContext = createContext({
    state: initialContextState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch: (_action) => null
});
export const StateContext = createContext({
    state: initialContextState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setState: (_value) => null
});
//# sourceMappingURL=context.js.map