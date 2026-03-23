import type { Difficulty } from '@prisma/client';

interface SeedQuestion {
  difficulty: Difficulty;
  text: string;
  options: { text: string }[];
  correctIndex: number;
  explanation: string;
}

export const reactQuestions: SeedQuestion[] = [
  // ─── EASY (15) ────────────────────────────────────────────────────────────

  // 1. useState
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does the `useState` hook return?',
    options: [
      { text: 'A single state value' },
      { text: 'A tuple of [state, setState function]' },
      { text: 'A mutable ref object' },
      { text: 'An object with a subscribe method' },
    ],
    correctIndex: 1,
    explanation:
      '`useState` returns an array (tuple) where the first element is the current state value and the second is the setter function used to update it. Destructuring this tuple is the conventional usage pattern.',
  },

  // 2. useEffect cleanup
  {
    difficulty: 'EASY' as Difficulty,
    text: 'How do you clean up a side-effect in `useEffect`?',
    options: [
      { text: 'Call the effect function directly inside the component body' },
      { text: 'Return a cleanup function from the effect callback' },
      { text: 'Pass a second argument of `false` to useEffect' },
      { text: 'Use the `useCleanup` hook' },
    ],
    correctIndex: 1,
    explanation:
      'When you return a function from the `useEffect` callback, React calls it before the component unmounts or before the effect runs again. This is the designated mechanism for subscriptions, timers, or any teardown logic.',
  },

  // 3. useEffect dependency array
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What happens when you pass an empty array `[]` as the dependency array to `useEffect`?',
    options: [
      { text: 'The effect runs on every render' },
      { text: 'The effect never runs' },
      { text: 'The effect runs only once after the initial render' },
      { text: 'The effect runs only when the component unmounts' },
    ],
    correctIndex: 2,
    explanation:
      'An empty dependency array tells React there are no values to watch, so the effect is only executed once — after the component mounts. This mirrors the behavior of `componentDidMount` in class components.',
  },

  // 4. JSX must have one root
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Why must JSX expressions return a single root element?',
    options: [
      { text: 'It is a JavaScript syntax requirement for arrow functions' },
      { text: 'JSX compiles to `React.createElement` calls, which produce a single value' },
      { text: 'Browsers can only parse one root DOM node per component' },
      { text: 'It is only a style convention; multiple roots work fine' },
    ],
    correctIndex: 1,
    explanation:
      'JSX transpiles to `React.createElement(...)` calls which return a single object. A JavaScript expression can only return one value, so JSX must have one root — either a real element or a Fragment.',
  },

  // 5. Functional vs Class component
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which of the following correctly defines a functional component?',
    options: [
      { text: 'A class that extends `React.Component` and has a `render` method' },
      { text: 'A plain JavaScript function that returns JSX' },
      { text: 'Any function stored inside a class' },
      { text: 'A function that must call `ReactDOM.render`' },
    ],
    correctIndex: 1,
    explanation:
      'A functional component is simply a JavaScript function (regular or arrow) that accepts a props object and returns JSX (or null). It does not require extending any class or implementing lifecycle methods.',
  },

  // 6. Props read-only
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which statement about props in React is true?',
    options: [
      { text: 'Props can be mutated inside the child component' },
      { text: 'Props are mutable only during the render phase' },
      { text: 'Props are read-only and must not be modified by the receiving component' },
      { text: 'Props are always optional' },
    ],
    correctIndex: 2,
    explanation:
      'React enforces a one-way data flow: props are passed from parent to child and must be treated as immutable. Mutating props would create unpredictable behavior because the parent controls the source of truth.',
  },

  // 7. Keys in lists
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Why should list items rendered with `.map()` in React have a `key` prop?',
    options: [
      { text: 'Keys are used as CSS selectors for styled-components' },
      { text: 'Keys help React identify which items changed, were added, or were removed during reconciliation' },
      { text: 'Keys prevent XSS attacks in list elements' },
      { text: 'Keys are required by the browser DOM API' },
    ],
    correctIndex: 1,
    explanation:
      'React uses keys to efficiently reconcile the virtual DOM: when a list changes, keys let React match new elements to their previous counterparts so it can minimise re-renders and avoid incorrect state associations.',
  },

  // 8. Array index as key
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the main problem with using an array index as a `key` in a dynamic list?',
    options: [
      { text: 'Array indices are strings, not numbers, which breaks React' },
      { text: 'It causes a syntax error in JSX' },
      { text: 'When items are reordered or removed, indices change and React may mis-identify elements, causing state bugs' },
      { text: 'Indices cannot be passed as JSX props' },
    ],
    correctIndex: 2,
    explanation:
      'Indices shift whenever items are inserted or deleted. React then maps a key to the wrong element, potentially attaching stale state or input values to the wrong list item. Stable, unique IDs are preferred.',
  },

  // 9. Conditional rendering
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which pattern correctly performs conditional rendering in JSX?',
    options: [
      { text: '`if (show) { return <Modal /> }` written inside JSX curly braces' },
      { text: '`{show && <Modal />}` inside the JSX return' },
      { text: '`<if condition={show}><Modal /></if>`' },
      { text: '`show ? <Modal /> : undefined` is not valid JSX' },
    ],
    correctIndex: 1,
    explanation:
      'The `&&` short-circuit operator is idiomatic for conditional rendering: when `show` is truthy the right-hand side is evaluated and rendered; when falsy, nothing (false) is rendered. It works because JSX ignores `false` values.',
  },

  // 10. Event handling
  {
    difficulty: 'EASY' as Difficulty,
    text: 'How do you prevent a form\'s default browser submission behaviour in a React event handler?',
    options: [
      { text: '`return false` from the handler function' },
      { text: 'Call `event.preventDefault()` inside the handler' },
      { text: 'Set the form\'s `action` prop to `"#"`' },
      { text: 'Use `event.stopBubbling()` inside the handler' },
    ],
    correctIndex: 1,
    explanation:
      'React wraps native events in a SyntheticEvent object that mirrors the DOM API. Calling `event.preventDefault()` stops the browser\'s default action (like navigating on form submit) just as it does with native DOM events.',
  },

  // 11. Controlled input
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What makes an input element "controlled" in React?',
    options: [
      { text: 'Wrapping it inside a `<form>` element' },
      { text: 'Using the `ref` attribute to access its DOM node' },
      { text: 'Binding its `value` to component state and updating state via `onChange`' },
      { text: 'Setting the `type` attribute to "text"' },
    ],
    correctIndex: 2,
    explanation:
      'A controlled input\'s `value` is driven entirely by React state. Every keystroke fires `onChange`, which updates state, which re-renders the input with the new value. React owns the source of truth for the input\'s content.',
  },

  // 12. Uncontrolled input
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which mechanism is used to read the value of an uncontrolled input in React?',
    options: [
      { text: '`useState` initialised to the input\'s default value' },
      { text: 'A `ref` created with `useRef` attached to the input element' },
      { text: 'The `onChange` event handler' },
      { text: 'The `value` prop set to `undefined`' },
    ],
    correctIndex: 1,
    explanation:
      'Uncontrolled inputs let the DOM manage their own state. A `ref` gives you imperative access to the underlying DOM node so you can read `ref.current.value` when needed, typically on form submit.',
  },

  // 13. Lifting state up
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does "lifting state up" mean in React?',
    options: [
      { text: 'Moving state from a child component to a shared ancestor so multiple children can access it' },
      { text: 'Storing state in the browser\'s localStorage' },
      { text: 'Using the Context API to make state global' },
      { text: 'Converting class-based state to hooks' },
    ],
    correctIndex: 0,
    explanation:
      'When two sibling components need to share state, you "lift" that state to their closest common ancestor. The ancestor owns the state and passes it down as props, keeping a single source of truth.',
  },

  // 14. React.Fragment
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the purpose of `React.Fragment` (or the `<>…</>` shorthand)?',
    options: [
      { text: 'It creates a new React context' },
      { text: 'It lets you group multiple children without adding an extra DOM node' },
      { text: 'It is a higher-order component wrapper' },
      { text: 'It memoises its children to avoid re-renders' },
    ],
    correctIndex: 1,
    explanation:
      'A Fragment is a lightweight wrapper that satisfies JSX\'s single-root requirement without introducing a real DOM element (like a `<div>`). This avoids unnecessary nesting in the rendered HTML.',
  },

  // 15. Component re-render trigger
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which of the following triggers a React functional component to re-render?',
    options: [
      { text: 'Calling a regular variable assignment inside the component' },
      { text: 'Mutating the props object directly' },
      { text: 'Calling the state setter function returned by `useState`' },
      { text: 'Attaching an event listener with `addEventListener`' },
    ],
    correctIndex: 2,
    explanation:
      'Calling the setter from `useState` schedules a state update and causes React to re-render the component with the new value. Direct variable mutations or prop mutations do not trigger the React update cycle.',
  },

  // ─── MEDIUM (15) ──────────────────────────────────────────────────────────

  // 16. useCallback
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the primary use case for `useCallback`?',
    options: [
      { text: 'To cache an expensive computed value between renders' },
      { text: 'To return a memoised version of a callback so that its reference stays stable between renders' },
      { text: 'To replace `useEffect` for async operations' },
      { text: 'To force a component to re-render synchronously' },
    ],
    correctIndex: 1,
    explanation:
      '`useCallback` memoises a function so the same reference is returned across renders as long as its dependencies do not change. This prevents child components wrapped in `React.memo` from re-rendering unnecessarily when a callback prop is passed.',
  },

  // 17. useMemo
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'When is `useMemo` most beneficial?',
    options: [
      { text: 'When you need to fetch data on mount' },
      { text: 'When storing a DOM ref that should persist across renders' },
      { text: 'When a computation is expensive and its inputs change infrequently' },
      { text: 'When you need to run code after every render' },
    ],
    correctIndex: 2,
    explanation:
      '`useMemo` caches the result of a calculation and only recomputes it when specified dependencies change. It is most valuable when the computation is costly (e.g., filtering a large dataset) so that unnecessary work is skipped on re-renders.',
  },

  // 18. useRef persistence
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What distinguishes `useRef` from `useState` when storing a mutable value?',
    options: [
      { text: '`useRef` triggers a re-render when its value changes; `useState` does not' },
      { text: '`useRef` values are reset on every render; `useState` values persist' },
      { text: 'Mutating `ref.current` does not trigger a re-render, whereas calling a state setter does' },
      { text: '`useRef` can only hold DOM element references' },
    ],
    correctIndex: 2,
    explanation:
      '`useRef` returns a plain mutable object whose `.current` property survives across renders. Unlike state, updating `.current` does not schedule a re-render, making it ideal for storing imperative values such as timers or previous props without causing unnecessary renders.',
  },

  // 19. Custom hooks rule
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the naming convention for custom hooks in React, and why does it matter?',
    options: [
      { text: 'They must start with "use" so the React linter can enforce the Rules of Hooks' },
      { text: 'They must start with "hook" to distinguish them from components' },
      { text: 'They must be default exports from their file' },
      { text: 'The naming convention is cosmetic only and has no functional effect' },
    ],
    correctIndex: 0,
    explanation:
      'Custom hooks must begin with "use" (e.g., `useFetch`) so that the ESLint `react-hooks` plugin can statically analyse them and enforce that hooks are only called at the top level and not conditionally.',
  },

  // 20. Context API
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Which components re-render when a React Context value changes?',
    options: [
      { text: 'Only the component that calls `React.createContext`' },
      { text: 'All components in the entire tree' },
      { text: 'Only components that consume the context via `useContext`' },
      { text: 'Only direct children of the `Context.Provider`' },
    ],
    correctIndex: 2,
    explanation:
      'When the value passed to a `Context.Provider` changes, only the components that are subscribed to that context via `useContext` (or the legacy `Context.Consumer`) will re-render. Unsubscribed components in the tree are unaffected.',
  },

  // 21. React.memo
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does `React.memo` do?',
    options: [
      { text: 'It memoises the return value of a hook' },
      { text: 'It wraps a functional component and skips re-rendering it if its props have not changed (shallow comparison)' },
      { text: 'It replaces `shouldComponentUpdate` in class components' },
      { text: 'It prevents a component from ever unmounting' },
    ],
    correctIndex: 1,
    explanation:
      '`React.memo` is a higher-order component that performs a shallow comparison of previous and next props. If no props changed, React reuses the last rendered output and skips calling the component function again.',
  },

  // 22. Reconciliation
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'During React\'s reconciliation process, what does React do when two elements have different types?',
    options: [
      { text: 'It attempts to patch the existing DOM node with the new type' },
      { text: 'It throws a type mismatch error' },
      { text: 'It tears down the old tree and builds a new one from scratch' },
      { text: 'It keeps the old tree and only updates its props' },
    ],
    correctIndex: 2,
    explanation:
      'When React encounters elements of different types at the same position (e.g., `<div>` replaced by `<span>`), it unmounts the old component tree entirely — including all child state — and mounts a fresh tree for the new type.',
  },

  // 23. Error boundaries
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Which statement correctly describes React Error Boundaries?',
    options: [
      { text: 'They can be implemented as functional components using a hook' },
      { text: 'They catch errors thrown during async event handlers automatically' },
      { text: 'They must be class components implementing `componentDidCatch` or `getDerivedStateFromError`' },
      { text: 'They wrap the entire application automatically when you use `react-dom`' },
    ],
    correctIndex: 2,
    explanation:
      'Error boundaries are class components that implement `static getDerivedStateFromError` (to render a fallback UI) and/or `componentDidCatch` (to log errors). As of React 18, there is no built-in functional equivalent — you must use a class or a third-party wrapper.',
  },

  // 24. Portals
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What problem do React Portals solve?',
    options: [
      { text: 'They allow components to share state without Context' },
      { text: 'They enable rendering a component\'s output into a DOM node outside the parent component\'s DOM hierarchy' },
      { text: 'They provide code-splitting for large component trees' },
      { text: 'They let you render React components in a Web Worker' },
    ],
    correctIndex: 1,
    explanation:
      'Portals (`ReactDOM.createPortal`) let you render children into a DOM node that exists outside the component\'s parent hierarchy (e.g., a `document.body`-level modal). Event bubbling still works through the React tree, not the DOM tree.',
  },

  // 25. Lazy loading
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the correct way to lazily load a component in React?',
    options: [
      { text: '`import LazyComp from "./LazyComp"` placed inside the render function' },
      { text: '`const LazyComp = React.lazy(() => import("./LazyComp"))` combined with `<Suspense>`' },
      { text: '`const LazyComp = useEffect(() => import("./LazyComp"), [])`' },
      { text: '`const LazyComp = React.async(() => import("./LazyComp"))`' },
    ],
    correctIndex: 1,
    explanation:
      '`React.lazy` accepts a function that returns a dynamic `import()` promise. The lazily loaded component must be wrapped in a `<Suspense>` boundary that shows a fallback while the chunk is being fetched.',
  },

  // 26. Suspense
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does the `fallback` prop on `<Suspense>` render?',
    options: [
      { text: 'An error message if the suspended component throws an error' },
      { text: 'A loading indicator while suspended content (lazy components or data) is being resolved' },
      { text: 'The previous version of the component before a state update' },
      { text: 'A skeleton UI that permanently replaces the component' },
    ],
    correctIndex: 1,
    explanation:
      'While a child of `<Suspense>` is suspended — waiting for a lazy chunk or for data — React renders the `fallback` prop instead. Once the Promise resolves, React swaps in the actual component.',
  },

  // 27. Synthetic events
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'In React, what is a SyntheticEvent?',
    options: [
      { text: 'A custom event created with `new CustomEvent()`' },
      { text: 'React\'s cross-browser wrapper around the native browser event with the same interface' },
      { text: 'An event that only fires on synthetic (virtual) DOM nodes' },
      { text: 'An event dispatched by state changes rather than user interaction' },
    ],
    correctIndex: 1,
    explanation:
      'React normalises browser events into SyntheticEvents, which implement the W3C event spec so that event handling works consistently across browsers. They pool objects for performance (though React 17+ removed pooling).',
  },

  // 28. Prop drilling
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is "prop drilling" and what is its main drawback?',
    options: [
      { text: 'Destructuring props; the drawback is verbose syntax' },
      { text: 'Passing props through multiple intermediate components that don\'t use them, making code harder to maintain' },
      { text: 'Deeply nested JSX; the drawback is slower rendering' },
      { text: 'Using spread operators on props; the drawback is accidental prop mutation' },
    ],
    correctIndex: 1,
    explanation:
      'Prop drilling occurs when data must be threaded through several layers of components solely to reach a deeply nested consumer. This creates tight coupling: intermediate components must accept and forward props they don\'t actually need.',
  },

  // 29. useRef DOM access
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'When is a `ref` attached to a DOM element available in `ref.current`?',
    options: [
      { text: 'Immediately when `useRef` is called' },
      { text: 'During the render phase before the component returns JSX' },
      { text: 'After the component mounts (i.e., inside `useEffect` or event handlers)' },
      { text: 'Only inside the constructor of a class component' },
    ],
    correctIndex: 2,
    explanation:
      'React sets `ref.current` after the DOM is updated and the browser has painted — in other words after mount. Accessing `ref.current` during the render phase (before commit) will return `null` for DOM refs.',
  },

  // 30. Context value reference stability
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Why is it important to memoize the value object passed to a Context Provider?',
    options: [
      { text: 'Context values must be serializable, so memoization converts them to JSON' },
      { text: 'A new object reference on every parent render causes all context consumers to re-render unnecessarily' },
      { text: 'Without memoization, the Context Provider throws a stale value error' },
      { text: 'Memoization is only needed for Context values that contain functions' },
    ],
    correctIndex: 1,
    explanation:
      'React compares context values by reference. If the parent re-renders and creates a new object literal `{ ... }` each time, every consumer re-renders even when the data is identical. Wrapping the value in `useMemo` stabilises the reference.',
  },

  // ─── HARD (10) ────────────────────────────────────────────────────────────

  // 31. Fiber architecture
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What fundamental problem did the React Fiber architecture (introduced in React 16) solve over the original stack reconciler?',
    options: [
      { text: 'It removed the need for a virtual DOM entirely' },
      { text: 'It made reconciliation interruptible so high-priority updates (e.g. animations) could preempt low-priority work, preventing dropped frames' },
      { text: 'It introduced JSX as a compile-time transform' },
      { text: 'It replaced class components with functional components' },
    ],
    correctIndex: 1,
    explanation:
      'The old stack reconciler performed a synchronous, depth-first traversal that could not be paused. Fiber replaced it with a linked-list of work units that can be suspended, resumed, or aborted, enabling priority scheduling and the Concurrent features built on top of it.',
  },

  // 32. Concurrent mode
  {
    difficulty: 'HARD' as Difficulty,
    text: 'In React\'s Concurrent Mode, what does "rendering is non-blocking" mean in practice?',
    options: [
      { text: 'Components render in Web Workers off the main thread' },
      { text: 'React can pause an in-progress render to handle a more urgent update and resume or discard it later' },
      { text: 'React batches all setState calls to a single end-of-frame flush' },
      { text: 'Rendering bypasses the browser\'s layout and paint phases' },
    ],
    correctIndex: 1,
    explanation:
      'Concurrent Mode allows React to time-slice render work. If a higher-priority update arrives (like a user keystroke) while React is rendering a low-priority tree, React can interrupt, handle the urgent work, then return to the previous render — keeping the UI responsive.',
  },

  // 33. useTransition
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What does `useTransition` return and how should you use it?',
    options: [
      { text: 'A CSS transition ref and a trigger function' },
      { text: 'A `[isPending, startTransition]` tuple; wrap non-urgent state updates in `startTransition` to keep the UI responsive' },
      { text: 'A promise and a cancel function for async state transitions' },
      { text: 'A boolean and a navigation function for route transitions' },
    ],
    correctIndex: 1,
    explanation:
      '`useTransition` returns `[isPending, startTransition]`. Updates wrapped in `startTransition` are marked as non-urgent; React can interrupt them for more urgent updates. `isPending` is `true` while the transition is in progress, letting you show a loading indicator.',
  },

  // 34. useDeferredValue
  {
    difficulty: 'HARD' as Difficulty,
    text: 'How does `useDeferredValue` differ from `useTransition`?',
    options: [
      { text: 'They are identical; `useDeferredValue` is just an alias' },
      { text: '`useDeferredValue` defers a value you receive (e.g. from props) rather than wrapping an update you control, making it useful when you don\'t own the setter' },
      { text: '`useDeferredValue` works only with string values; `useTransition` works with any type' },
      { text: '`useDeferredValue` cancels the deferred update after 500 ms automatically' },
    ],
    correctIndex: 1,
    explanation:
      'Both defer non-urgent work, but `useTransition` requires you to wrap the state setter you own. `useDeferredValue` accepts any value (including props) and returns a "stale" copy that React will update when there is idle time — useful in libraries or when you cannot modify the source setter.',
  },

  // 35. React Server Components
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is a key characteristic of React Server Components (RSC) that distinguishes them from traditional server-side rendering?',
    options: [
      { text: 'They are rendered to a static HTML string and then hydrated on the client exactly like SSR' },
      { text: 'They run exclusively on the server, have zero client-side JavaScript bundle cost, and can access backend resources directly without shipping that code to the browser' },
      { text: 'They cannot use async/await and must rely on getServerSideProps' },
      { text: 'They replace all client components and remove the need for useState' },
    ],
    correctIndex: 1,
    explanation:
      'Server Components execute only on the server and their output is serialised as a special React payload. Their code is never sent to the client, eliminating bundle cost. They can query databases or call APIs directly but cannot use state, effects, or browser-only APIs.',
  },

  // 36. Hydration
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is "hydration" in the context of React SSR, and what can cause a hydration mismatch?',
    options: [
      { text: 'Hydration is the process of fetching data on the server; mismatches happen when the API is slow' },
      { text: 'Hydration attaches React\'s event listeners to server-rendered HTML; mismatches happen when the server-rendered HTML differs from what the client render would produce' },
      { text: 'Hydration converts JSX to HTML; mismatches happen when a component uses TypeScript generics' },
      { text: 'Hydration is streaming chunks of HTML; mismatches happen when Suspense boundaries are used' },
    ],
    correctIndex: 1,
    explanation:
      'After the browser receives server-rendered HTML, React "hydrates" it by walking the tree and attaching event handlers without re-creating DOM nodes. A mismatch occurs when the server and client produce different markup — e.g. due to browser-only code or non-deterministic rendering — causing React to throw a warning or fall back to a full client render.',
  },

  // 37. CSR vs SSR vs SSG
  {
    difficulty: 'HARD' as Difficulty,
    text: 'Which rendering strategy produces HTML at build time, making it the fastest to serve but unsuitable for frequently changing data?',
    options: [
      { text: 'Client-Side Rendering (CSR)' },
      { text: 'Server-Side Rendering (SSR)' },
      { text: 'Static Site Generation (SSG)' },
      { text: 'Incremental Static Regeneration (ISR)' },
    ],
    correctIndex: 2,
    explanation:
      'SSG pre-renders pages to HTML at build time. The files are served from a CDN with virtually no TTFB, but the content reflects the data available at build. ISR extends SSG by re-generating pages in the background at a revalidation interval.',
  },

  // 38. Render props pattern
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is the render prop pattern and what problem does it solve?',
    options: [
      { text: 'Returning a render function from a hook to avoid prop drilling' },
      { text: 'Passing a function as a prop that a component calls to determine what to render, enabling logic reuse without modifying the consumer\'s JSX structure' },
      { text: 'Using a `render` key in the props object to override the default component output' },
      { text: 'A pattern where a parent component renders its children with additional props via `React.cloneElement`' },
    ],
    correctIndex: 1,
    explanation:
      'Render props decouple behaviour from presentation by having a component call a function prop to get the JSX to render. This lets multiple components share the same logic (e.g. mouse tracking, data fetching) while each controls its own rendered output.',
  },

  // 39. Compound components
  {
    difficulty: 'HARD' as Difficulty,
    text: 'In the compound components pattern, how do sub-components typically share state with the parent without explicit prop drilling?',
    options: [
      { text: 'Via Redux store actions dispatched from the parent' },
      { text: 'By reading a shared React Context provided by the parent component' },
      { text: 'By accessing `window.__sharedState` set by the parent' },
      { text: 'Via a ref forwarded from parent to each child' },
    ],
    correctIndex: 1,
    explanation:
      'The compound components pattern (e.g. `<Tabs>`, `<Tab>`, `<TabPanel>`) uses a Context created by the parent to share internal state with any descendant sub-components. This hides complexity from consumers while allowing flexible composition.',
  },

  // 40. HOC tradeoffs
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is a significant drawback of Higher-Order Components (HOCs) compared to custom hooks?',
    options: [
      { text: 'HOCs cannot be used with functional components' },
      { text: 'HOCs introduce wrapper components that pollute the component tree (making DevTools harder to read) and can cause prop namespace collisions' },
      { text: 'HOCs cannot access React Context' },
      { text: 'HOCs prevent the wrapped component from receiving children' },
    ],
    correctIndex: 1,
    explanation:
      'Each HOC adds a new wrapper component to the React tree, which clutters DevTools with anonymous or identically named wrappers and can shadow props of the same name. Custom hooks solve the same reuse problem without adding components to the tree.',
  },
];
