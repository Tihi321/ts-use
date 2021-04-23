import { TState } from "../typings";
import { generateSelector, stateKeyChanged } from "./state";

export const initialContextState: TState = {};

test("It will create selector function for passed state", () => {
  const stateSelector = generateSelector(initialContextState);

  expect(stateSelector()).toStrictEqual(initialContextState);
});

test("It will test that values did not change inside of object", () => {
  const stateObject: TState = {
    someKey: "someValue"
  };

  expect(stateKeyChanged(stateObject, "someKey", "someValue")).toEqual(false);
});

test("It will test that values did change inside of object", () => {
  const stateObject: TState = {
    someKey: "someOldValue"
  };

  expect(stateKeyChanged(stateObject, "someKey", "someValue")).toEqual(true);
});

test("It will test that value function did change", () => {
  const testFunction = () => 42;
  const stateObject: TState = {
    someKey: ""
  };

  expect(stateKeyChanged(stateObject, "someKey", testFunction)).toEqual(true);
});

test("It will test that value function did not change", () => {
  const testFunction = () => 42;
  const stateObject: TState = {
    someKey: testFunction
  };

  expect(stateKeyChanged(stateObject, "someKey", testFunction)).toEqual(false);
});
