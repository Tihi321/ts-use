"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCustomHook = void 0;
var useState_1 = require("../../useState");
var useCustomHook = function (propThatUpdates) {
    var _a = useState_1.useReactiveState(propThatUpdates), reactiveState = _a[0], setReactiveState = _a[1];
    return [reactiveState, setReactiveState];
};
exports.useCustomHook = useCustomHook;
//# sourceMappingURL=useState.js.map