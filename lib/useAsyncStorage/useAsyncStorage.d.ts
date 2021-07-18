export declare type TKey = string | number | boolean;
export declare const useAsyncStorage: (key: string, initialState?: TKey | null) => {
    data: string | number | boolean | null;
    storeData: (value: TKey) => Promise<void>;
    getData: () => Promise<void>;
};
//# sourceMappingURL=useAsyncStorage.d.ts.map