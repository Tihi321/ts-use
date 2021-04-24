import {
  useReducerSelector,
  useReducerStore,
  withReducerProvider
} from "../../../useStore";
import { initialState, reducer } from "./reducers";

const useStore = useReducerStore;

const useSelector = useReducerSelector;

const withThemeProvider = withReducerProvider(reducer, initialState);

export { useStore, useSelector, withThemeProvider };
