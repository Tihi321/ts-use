import { createContext } from "react";
export var initialContextState = {};
export var ReducerContext = createContext({
    state: initialContextState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch: function (_action) { return null; }
});
export var StateContext = createContext({
    state: initialContextState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setState: function (_value) { return null; }
});
//# sourceMappingURL=context.js.map