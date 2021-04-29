import { useReactiveState } from "../../useState";
export var useCustomHook = function (propThatUpdates) {
    var _a = useReactiveState(propThatUpdates), reactiveState = _a[0], setReactiveState = _a[1];
    return [reactiveState, setReactiveState];
};
//# sourceMappingURL=useState.js.map