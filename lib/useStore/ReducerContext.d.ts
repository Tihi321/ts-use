/// <reference types="react" />
import { IReducerProvider, TReducerProviderHOC, TReducerUseStore, TSelector } from "../typings";
export declare const useReducerStore: TReducerUseStore;
export declare function useReducerSelector<T extends TSelector>(selector: T): ReturnType<T>;
export declare const ReducerProvider: ({ children, reducer, initialState, Context }: IReducerProvider) => JSX.Element;
export declare const withReducerProvider: TReducerProviderHOC;
//# sourceMappingURL=ReducerContext.d.ts.map