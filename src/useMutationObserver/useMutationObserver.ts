// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react-hooks/rules-of-hooks */
import map from "lodash/map";
import { useEffect, useMemo } from "react";

import { isBrowser } from "../utils";

declare let MutationObserver: any;
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

type TUseMutationObserver = (
  mutations: {
    onChildList?: (mutation: IMutations) => void;
    onAttributeName?: (mutation: IMutations) => void;
  },
  config?: {
    attributes?: boolean;
    childList?: boolean;
    subtree?: boolean;
  }
) => IMutationReturn;

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
export const useMutationObserver: TUseMutationObserver = (
  mutations,
  config
) => {
  if (!isBrowser()) {
    return { observe: undefined, isBrowser: false };
  }

  const configDef = config || {
    attributes: true,
    childList: true,
    subtree: true
  };

  const onChildList = (mutation: IMutations) => {
    if (mutations.onChildList) {
      mutations.onChildList(mutation);
    }
  };

  const onAttributeName = (mutation: IMutations) => {
    if (mutations.onAttributeName) {
      mutations.onAttributeName(mutation);
    }
  };

  const callback = (mutationsList: IMutations[]) => {
    map(mutationsList, mutation => {
      if (mutation.type === "childList") {
        onChildList(mutation);
      } else if (mutation.type === "attributes") {
        onAttributeName(mutation);
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const observer = useMemo(() => new MutationObserver(callback), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => observer.disconnect(), []);

  const observe = (element: HTMLElement) =>
    observer.observe(element, configDef);

  return { observe, isBrowser: true };
};
