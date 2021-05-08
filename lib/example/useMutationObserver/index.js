"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevealElement = void 0;
var react_1 = __importStar(require("react"));
var useMutationObserver_1 = require("../../useMutationObserver");
var RevealElement = function () {
    var element = react_1.useRef({});
    var _a = react_1.useState(false), reveal = _a[0], setReveal = _a[1];
    var observe = useMutationObserver_1.useMutationObserver({
        onChildList: function () {
            setReveal(true);
        }
    }).observe;
    react_1.useEffect(function () {
        if (observe) {
            observe(element.current);
        }
    }, []);
    return react_1.default.createElement("div", { ref: element }, reveal && "reveal");
};
exports.RevealElement = RevealElement;
//# sourceMappingURL=index.js.map