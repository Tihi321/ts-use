"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialContextState = void 0;
var state_1 = require("./state");
exports.initialContextState = {};
test("It will create selector function for passed state", function () {
    var stateSelector = state_1.generateSelector(exports.initialContextState);
    expect(stateSelector()).toStrictEqual(exports.initialContextState);
});
test("It will test that values did not change inside of object", function () {
    var stateObject = {
        someKey: "someValue"
    };
    expect(state_1.stateKeyChanged(stateObject, "someKey", "someValue")).toEqual(false);
});
test("It will test that values did change inside of object", function () {
    var stateObject = {
        someKey: "someOldValue"
    };
    expect(state_1.stateKeyChanged(stateObject, "someKey", "someValue")).toEqual(true);
});
test("It will test that value function did change", function () {
    var testFunction = function () { return 42; };
    var stateObject = {
        someKey: ""
    };
    expect(state_1.stateKeyChanged(stateObject, "someKey", testFunction)).toEqual(true);
});
test("It will test that value function did not change", function () {
    var testFunction = function () { return 42; };
    var stateObject = {
        someKey: testFunction
    };
    expect(state_1.stateKeyChanged(stateObject, "someKey", testFunction)).toEqual(false);
});
//# sourceMappingURL=state.test.js.map