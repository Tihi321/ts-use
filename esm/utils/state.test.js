import { generateSelector, stateKeyChanged } from "./state";
export var initialContextState = {};
test("It will create selector function for passed state", function () {
    var stateSelector = generateSelector(initialContextState);
    expect(stateSelector()).toStrictEqual(initialContextState);
});
test("It will test that values did not change inside of object", function () {
    var stateObject = {
        someKey: "someValue"
    };
    expect(stateKeyChanged(stateObject, "someKey", "someValue")).toEqual(false);
});
test("It will test that values did change inside of object", function () {
    var stateObject = {
        someKey: "someOldValue"
    };
    expect(stateKeyChanged(stateObject, "someKey", "someValue")).toEqual(true);
});
test("It will test that value function did change", function () {
    var testFunction = function () { return 42; };
    var stateObject = {
        someKey: ""
    };
    expect(stateKeyChanged(stateObject, "someKey", testFunction)).toEqual(true);
});
test("It will test that value function did not change", function () {
    var testFunction = function () { return 42; };
    var stateObject = {
        someKey: testFunction
    };
    expect(stateKeyChanged(stateObject, "someKey", testFunction)).toEqual(false);
});
//# sourceMappingURL=state.test.js.map