"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateKeyChanged = exports.generateSelector = void 0;
var lodash_1 = require("lodash");
var generateSelector = function (initialState) { return function () { return initialState; }; };
exports.generateSelector = generateSelector;
var stateFunctionKeyChanged = function (state, key, value) {
    var stateValue = state[key] ? state[key].toString() : state[key];
    var valueToCheck = value ? value.toString() : value;
    return !lodash_1.isEqual(stateValue, valueToCheck);
};
var stateValueKeyChanged = function (state, key, value) {
    return !lodash_1.isEqual(state[key], value);
};
var stateKeyChanged = function (state, key, value) {
    return typeof value === "function"
        ? stateFunctionKeyChanged(state, key, value)
        : stateValueKeyChanged(state, key, value);
};
exports.stateKeyChanged = stateKeyChanged;
//# sourceMappingURL=state.js.map