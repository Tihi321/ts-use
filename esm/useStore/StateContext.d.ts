/// <reference types="react" />
import { IStateProvider, TSelector, TStateProviderHOC, TStateUseStore } from "../typings";
export declare const useStateStore: TStateUseStore;
export declare function useStateSelector<T extends TSelector>(selector: T): ReturnType<T>;
export declare const StateProvider: ({ children, initialState, Context }: IStateProvider) => JSX.Element;
export declare const withStateProvider: TStateProviderHOC;
//# sourceMappingURL=StateContext.d.ts.map