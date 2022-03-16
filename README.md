<div align="center">
  <h1>
    TS Use
  </h1>
  <sup>
    React Hooks</a>.</em>
  </sup>
  <br />
  <br />
  <pre>yarn add ts-use</a></pre>
  <br />
</div>

- **Animation**

  - [`useAnimationEvents`](./src/example/useAnimation/index.tsx) &mdash; use with animations, it tracks and start and exit animation so component can unmount after exit animation has ended
    <br/>
    <br/>

- **Side-effects**

  - [`useLocalStorage`](./src/example/localStorage/index.tsx) &mdash; hook for managing local storage. Safe with SSR rendering.
  - [`useMutationObserver`](./src/example/useMutationObserver/index.tsx) &mdash; Use mutation Observer with this hook in react. Safe with SSR rendering.
  - `usePromiseMap` &mdash; Resolves array of promises within react in a non blocking way.
    <br/>
    <br/>

- **State**

  - `ReducerProvider` &mdash; Provider to wrap outer components, takes reducer and initial state.
  - [`withReducerProvider`](./src/example/useStore/index.tsx) &mdash; HOC for ReducerProvider Provider to top component.
  - [`useReducerStore`](./src/example/useStore/index.tsx) &mdash; returns state, selector and functions for for updating the state from context
  - [`useReducerSelector`](./src/example/useStore/index.tsx) &mdash; takes selector and returns value
    similar hooks for providing simple state without using reducer
    `StateProvider`, `withStateProvider`, `useStateStore`, `useStateSelector`
  - [`useReactiveState`](./src/example/useState/index.ts) &mdash; reactive state that updates with change in initial state
    <br/>
    <br/>

- **Lifecycles**

  - [`useMount`](./src/example/useMount/index.ts) &mdash; hook returns state after first mount, takes optional callback to run, it can be resolved with promise
    <br/>
    <br/>

- **Network**

  - [`useFetch`](./src/example/useFetch/index.tsx) &mdash; hook for using fetch in React, work on SSR also, as it checks to use node or window fetch, suppoers optional queryBuilder
    <br/>
    <br/>

- **API**

  - [`useYoutube`](./src/example/useYoutube/index.tsx) &mdash; hook to add youtube player logic to component based on [Youtube Player](youtube-player) library.

- **HOC**

  - `withHooksHOC` &mdash; Add hooks data to class component.

- **React Native**
  - `useAsyncStorage` &mdash; hook for managing storage within react native.
    <br/>
    <br/>
