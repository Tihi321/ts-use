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
exports.Youtube = void 0;
var react_1 = __importStar(require("react"));
var useYoutube_1 = require("../../useYoutube");
var Youtube = function (params) {
    var youtubeRef = react_1.useRef({});
    var addElement = useYoutube_1.useYoutube({
        videoId: params.videoId,
        options: params.options,
        events: params.events,
    }).addElement;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    react_1.useEffect(function () { return addElement(youtubeRef.current); }, [youtubeRef.current]);
    return (react_1.default.createElement("div", { className: "youtube-container" },
        react_1.default.createElement("div", { ref: youtubeRef, className: "youtube-element" })));
};
exports.Youtube = Youtube;
//# sourceMappingURL=index.js.map