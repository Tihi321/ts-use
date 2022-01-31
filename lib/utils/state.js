"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateKeyChanged = exports.generateSelector = void 0;
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var tsl_utils_1 = require("tsl-utils");
Object.defineProperty(exports, "generateSelector", { enumerable: true, get: function () { return tsl_utils_1.generateSelector; } });
var stateFunctionKeyChanged = function (state, key, value) {
    var stateValue = state[key] ? state[key].toString() : state[key];
    var valueToCheck = value ? value.toString() : value;
    return !isEqual_1.default(stateValue, valueToCheck);
};
var stateValueKeyChanged = function (state, key, value) {
    return !isEqual_1.default(state[key], value);
};
var stateKeyChanged = function (state, key, value) {
    return typeof value === "function"
        ? stateFunctionKeyChanged(state, key, value)
        : stateValueKeyChanged(state, key, value);
};
exports.stateKeyChanged = stateKeyChanged;
//# sourceMappingURL=state.js.map