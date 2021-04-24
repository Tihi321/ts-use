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

- **Side-effects**
  - [`useLocalStorage`](./src/example/localStorage/index.tsx) &mdash; hook for managing local storage. Supports SSR rendering.
<br/>
<br/>

- **State**
  - `ReducerProvider` &mdash; Provider to wrap outer components, takes reducer and initial state.
  - [`withReducerProvider`](./src/example/useStore/index.tsx) &mdash; HOC for ReducerProvider Provider to top component.
  - [`useReducerStore`](./src/example/useStore/index.tsx) &mdash; returns state, selector and functions for for updating the state form context 
  - [`useReducerSelector`](./src/example/useStore/index.tsx) &mdash; takes selector and returns value
  similar hooks for providing simple state without using reducer
  `StateProvider`, `withStateProvider`, `useStateStore`, `useStateSelector`