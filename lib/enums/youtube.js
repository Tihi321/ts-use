"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypes = exports.PlayerState = exports.IFrameStates = void 0;
var IFrameStates;
(function (IFrameStates) {
    IFrameStates[IFrameStates["FALSE"] = 0] = "FALSE";
    IFrameStates[IFrameStates["TRUE"] = 1] = "TRUE";
})(IFrameStates = exports.IFrameStates || (exports.IFrameStates = {}));
var PlayerState;
(function (PlayerState) {
    PlayerState[PlayerState["ENDED"] = 0] = "ENDED";
    PlayerState[PlayerState["PLAYING"] = 1] = "PLAYING";
    PlayerState[PlayerState["PAUSED"] = 2] = "PAUSED";
})(PlayerState = exports.PlayerState || (exports.PlayerState = {}));
var EventTypes;
(function (EventTypes) {
    EventTypes["READY"] = "ready";
    EventTypes["STATE_CHANGE"] = "stateChange";
})(EventTypes = exports.EventTypes || (exports.EventTypes = {}));
//# sourceMappingURL=youtube.js.map