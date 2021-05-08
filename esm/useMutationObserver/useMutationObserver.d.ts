/// <reference types="react" />
interface IMutations {
    addedNodes: HTMLElement[];
    attributeName: string;
    attributeNamespace: string;
    nextSibling: HTMLElement;
    oldValue: any;
    previousSibling: HTMLElement;
    removedNodes: HTMLElement[];
    target: HTMLElement;
    type: "childList" | "attributes";
}
interface IMutationReturn {
    observe: undefined | Function;
    isBrowser: boolean;
}
declare type TUseMutationObserver = (mutations: {
    onChildList?: (mutation: IMutations) => void;
    onAttributeName?: (mutation: IMutations) => void;
}, config?: {
    attributes?: boolean;
    childList?: boolean;
    subtree?: boolean;
}) => IMutationReturn;
/**
 * Use mutation Observer with this hook in react. Safe with SSR rendering
 * @example
 * const [reveal, setReveal] = useState(false);
 * const observerElement = useRef(undefined as any);
 * useMutationObserver({
 *   onChildList: () => {
 *     setReveal(true);
 *   }
 * });
 * useEffect(() => {
 *   if (observe) {
 *     observe(observerElement.current);
 *   }
 * }, []);
 * @param {Object} mutations - object with 2 optional callbacks that will be called eather when child or attribute mutations are triggered, they pass mutation object to callback function
 * @param {object} config (Optional) config object, on what should be observed. Keys are attributes , childList and subtree
 * @return {object} return observe function that accepts HTMLElement to observe, if SSR observe will return undefined. It returns isBrowser boolean for checking
 */
export declare const useMutationObserver: TUseMutationObserver;
export {};
//# sourceMappingURL=useMutationObserver.d.ts.map