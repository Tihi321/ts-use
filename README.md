<div align="center">
  <h1>
    TS-Use
  </h1>
  <sup>
    React Hooks</a>.</em>
  </sup>
  <br />
  <br />
  <pre>yarn add <a href="https://www.npmjs.com/package/react-use">ts-use</a></pre>
  <br />
</div>

- **Side-effects**
  - `useLocalStorage` &mdash; hook for managing local storage. Supports SSR rendering.
<br/>
<br/>
<br/>
- **State**
  - `ReducerProvider` &mdash; Provider to wrap outer components, takes reducer and initial state.
  - `withReducerProvider` &mdash; HOC for ReducerProvider Provider to top component.
  - `useReducerStore` &mdash; returns state, selector and functions for for updating the state form context 
  - `useReducerSelector` &mdash; takes selector and returns value
  similar hooks for providing simple state without using reducer
  `StateProvider`, `withStateProvider`, `useStateStore`, `useStateSelector`