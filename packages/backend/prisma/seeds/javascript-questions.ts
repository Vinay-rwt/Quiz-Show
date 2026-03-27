import type { Difficulty } from '@prisma/client';

interface SeedQuestion {
  difficulty: Difficulty;
  text: string;
  options: { text: string }[];
  correctIndex: number;
  explanation: string;
}

export const javascriptQuestions: SeedQuestion[] = [
  // ─── EASY (15) ────────────────────────────────────────────────────────────

  // 1. var vs let vs const
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which keyword declares a block-scoped variable that cannot be reassigned?',
    options: [
      { text: 'var' },
      { text: 'let' },
      { text: 'const' },
      { text: 'static' },
    ],
    correctIndex: 2,
    explanation:
      '`const` declares a block-scoped binding whose identifier cannot be reassigned after initialisation. Note that for objects and arrays the binding itself is fixed, but the contents of the value can still be mutated.',
  },

  // 2. typeof
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does `typeof null` return in JavaScript?',
    options: [
      { text: '"null"' },
      { text: '"undefined"' },
      { text: '"object"' },
      { text: '"symbol"' },
    ],
    correctIndex: 2,
    explanation:
      '`typeof null` returns `"object"` — a long-standing bug in JavaScript that has never been fixed for backwards-compatibility reasons. Null is not actually an object; always use a strict equality check (`=== null`) to test for null.',
  },

  // 3. == vs ===
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the difference between `==` and `===` in JavaScript?',
    options: [
      { text: '`==` compares only objects; `===` compares primitives' },
      { text: '`==` performs type coercion before comparing; `===` checks value and type without coercion' },
      { text: 'They are identical; `===` is just a style convention' },
      { text: '`===` is faster but only works with numbers' },
    ],
    correctIndex: 1,
    explanation:
      'The loose equality operator `==` converts operands to a common type before comparing (e.g. `"5" == 5` is `true`). The strict equality operator `===` returns `false` if the types differ, making comparisons predictable and avoiding coercion surprises.',
  },

  // 4. null vs undefined
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which statement best describes the difference between `null` and `undefined` in JavaScript?',
    options: [
      { text: '`null` means a variable has not been declared; `undefined` means it was declared but not assigned' },
      { text: '`undefined` is the default value of a declared-but-unassigned variable; `null` is an explicit assignment meaning "no value"' },
      { text: 'They are the same value accessed through different keywords' },
      { text: '`null` is a string; `undefined` is a number' },
    ],
    correctIndex: 1,
    explanation:
      'JavaScript automatically assigns `undefined` to variables that have been declared but never given a value, to missing function parameters, and to absent object properties. `null` must be set explicitly by a developer to signal the intentional absence of an object value.',
  },

  // 5. Array push/pop
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does `Array.prototype.push()` return?',
    options: [
      { text: 'The element that was added' },
      { text: 'The new length of the array' },
      { text: 'The modified array' },
      { text: 'undefined' },
    ],
    correctIndex: 1,
    explanation:
      '`push` appends one or more elements to the end of an array and returns the new `length` of the array, not the element itself. This distinguishes it from methods like `concat`, which return a new array.',
  },

  // 6. Array map
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which array method creates a new array by applying a callback to every element of the original array?',
    options: [
      { text: 'forEach' },
      { text: 'filter' },
      { text: 'map' },
      { text: 'reduce' },
    ],
    correctIndex: 2,
    explanation:
      '`Array.prototype.map` calls the provided callback once per element and returns a new array of the same length containing the callback\'s return values. Unlike `forEach`, it produces a new array rather than returning `undefined`.',
  },

  // 7. Array filter
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does `Array.prototype.filter()` return when no elements pass the test?',
    options: [
      { text: 'null' },
      { text: 'undefined' },
      { text: 'false' },
      { text: 'An empty array []' },
    ],
    correctIndex: 3,
    explanation:
      '`filter` always returns an array — it is never `null` or `undefined`. If no elements satisfy the predicate, the result is simply an empty array `[]`. This makes it safe to chain further array methods without null-checks.',
  },

  // 8. Arrow functions
  {
    difficulty: 'EASY' as Difficulty,
    text: 'How does an arrow function differ from a regular function regarding the `this` keyword?',
    options: [
      { text: 'Arrow functions create their own `this` binding, just like regular functions' },
      { text: 'Arrow functions do not have their own `this`; they inherit it from the enclosing lexical scope' },
      { text: 'Arrow functions always bind `this` to the global object' },
      { text: 'Arrow functions bind `this` to the first argument passed to them' },
    ],
    correctIndex: 1,
    explanation:
      'Arrow functions are not just syntactic sugar — they lexically capture `this` from the surrounding context at the time they are defined. This means `this` inside an arrow function refers to the same value as in the enclosing function or module scope.',
  },

  // 9. Template literals
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which syntax correctly embeds a variable `name` inside a template literal?',
    options: [
      { text: '"Hello, #{name}"' },
      { text: '"Hello, ${name}"' },
      { text: '`Hello, ${name}`' },
      { text: '`Hello, #{name}`' },
    ],
    correctIndex: 2,
    explanation:
      'Template literals use backtick (`` ` ``) delimiters and embed expressions with `${}` syntax. The expression inside `${}` is evaluated and coerced to a string, making string interpolation far more readable than concatenation.',
  },

  // 10. Object destructuring
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the output of: `const { a, b } = { a: 1, b: 2, c: 3 };  console.log(a, b);`?',
    options: [
      { text: '{ a: 1, b: 2 }' },
      { text: '1 2' },
      { text: 'undefined undefined' },
      { text: 'SyntaxError' },
    ],
    correctIndex: 1,
    explanation:
      'Object destructuring extracts named properties from an object into local variables. Properties not mentioned in the destructuring pattern (like `c`) are simply ignored. So `a` gets `1` and `b` gets `2`.',
  },

  // 11. JSON.stringify / JSON.parse
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What happens to a function value inside an object when you call `JSON.stringify` on it?',
    options: [
      { text: 'It is converted to its source code as a string' },
      { text: 'It throws a TypeError' },
      { text: 'The key-value pair is omitted from the resulting JSON string' },
      { text: 'It is replaced with null' },
    ],
    correctIndex: 2,
    explanation:
      'JSON only supports a subset of JavaScript values (strings, numbers, booleans, null, arrays, plain objects). `JSON.stringify` silently omits object properties whose values are functions, `undefined`, or symbols rather than throwing an error.',
  },

  // 12. typeof for functions
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does `typeof function() {}` return?',
    options: [
      { text: '"object"' },
      { text: '"callable"' },
      { text: '"function"' },
      { text: '"undefined"' },
    ],
    correctIndex: 2,
    explanation:
      '`typeof` returns `"function"` for any callable (function declarations, function expressions, arrow functions, class constructors). Under the hood functions are objects, but `typeof` is special-cased to return `"function"` for them.',
  },

  // 13. var hoisting
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is logged by: `console.log(x); var x = 5;`?',
    options: [
      { text: '5' },
      { text: 'ReferenceError: x is not defined' },
      { text: 'undefined' },
      { text: 'null' },
    ],
    correctIndex: 2,
    explanation:
      '`var` declarations are hoisted to the top of their function (or global) scope and initialised to `undefined`. Only the declaration is hoisted, not the assignment, so reading `x` before the assignment yields `undefined`.',
  },

  // 14. Falsy values
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which of the following is NOT a falsy value in JavaScript?',
    options: [
      { text: '0' },
      { text: '""' },
      { text: '"false"' },
      { text: 'null' },
    ],
    correctIndex: 2,
    explanation:
      'The string `"false"` is a non-empty string, so it is truthy. JavaScript\'s falsy values are: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`.',
  },

  // 15. Default parameters
  {
    difficulty: 'EASY' as Difficulty,
    text: 'When does a default parameter value take effect?',
    options: [
      { text: 'When the argument passed is null' },
      { text: 'When the argument is any falsy value' },
      { text: 'When the argument is undefined or omitted entirely' },
      { text: 'When the argument is an empty string' },
    ],
    correctIndex: 2,
    explanation:
      'Default parameter values are applied only when the corresponding argument is `undefined` (including when the caller omits that argument). Passing `null`, `0`, `false`, or `""` will use those values as-is, not the default.',
  },

  // ─── MEDIUM (15) ──────────────────────────────────────────────────────────

  // 16. Closures
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is a closure in JavaScript?',
    options: [
      { text: 'A function that calls itself recursively' },
      { text: 'A function that retains access to its outer scope\'s variables even after that outer function has returned' },
      { text: 'A design pattern for hiding class properties' },
      { text: 'A method that closes an event listener connection' },
    ],
    correctIndex: 1,
    explanation:
      'A closure is formed when an inner function references variables from its enclosing lexical scope. Those variables are kept alive in memory as long as the inner function exists, even after the enclosing function has finished executing.',
  },

  // 17. Hoisting — let/const TDZ
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Why does accessing a `let` variable before its declaration throw a ReferenceError?',
    options: [
      { text: '`let` variables are not hoisted at all' },
      { text: '`let` variables are hoisted but exist in a Temporal Dead Zone (TDZ) until the declaration is reached' },
      { text: 'The engine garbage-collects `let` variables before the declaration line runs' },
      { text: '`let` is block-scoped so it is invisible outside its block' },
    ],
    correctIndex: 1,
    explanation:
      '`let` (and `const`) declarations are hoisted to the top of their block, but they are placed in a Temporal Dead Zone until the declaration statement is evaluated. Any access within the TDZ throws a `ReferenceError`.',
  },

  // 18. Prototype
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the prototype chain in JavaScript used for?',
    options: [
      { text: 'To define the order in which CSS styles are applied' },
      { text: 'To chain Promise handlers' },
      { text: 'To look up properties and methods on an object by traversing its chain of prototypes when a property is not found on the object itself' },
      { text: 'To store a list of all instances created from a constructor' },
    ],
    correctIndex: 2,
    explanation:
      'Every JavaScript object has an internal `[[Prototype]]` link. When a property lookup fails on an object, the engine traverses the chain — checking each prototype in turn — until it either finds the property or reaches `null` at the end of the chain.',
  },

  // 19. Event loop
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'In JavaScript\'s event loop model, what is the call stack?',
    options: [
      { text: 'The queue where Web API callbacks wait before execution' },
      { text: 'A LIFO data structure that tracks the currently executing function frames' },
      { text: 'The list of registered event listeners in the DOM' },
      { text: 'A fixed-size memory pool for storing function arguments' },
    ],
    correctIndex: 1,
    explanation:
      'The call stack is a Last-In-First-Out structure: when a function is called, a new frame is pushed onto the stack; when it returns, the frame is popped. JavaScript is single-threaded, so only one function executes at a time. The event loop only picks up callbacks when the call stack is empty.',
  },

  // 20. Promises
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does `Promise.all([p1, p2, p3])` do when one of the promises rejects?',
    options: [
      { text: 'It ignores the rejection and resolves with the remaining fulfilled values' },
      { text: 'It waits for all promises to settle, then collects all errors' },
      { text: 'It immediately rejects with the reason of the first rejected promise' },
      { text: 'It retries the rejected promise three times before failing' },
    ],
    correctIndex: 2,
    explanation:
      '`Promise.all` follows a "fail-fast" strategy: as soon as any input promise rejects, the returned promise rejects with that reason and the results of still-pending promises are discarded. Use `Promise.allSettled` if you need the outcome of every promise.',
  },

  // 21. async/await
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does an `async` function implicitly return if you return a plain value from it?',
    options: [
      { text: 'The plain value directly' },
      { text: 'A resolved Promise wrapping that value' },
      { text: 'A pending Promise that resolves on the next tick' },
      { text: 'undefined, unless you also use await' },
    ],
    correctIndex: 1,
    explanation:
      'An `async` function always returns a Promise. If you `return 42` inside an async function, the caller receives `Promise.resolve(42)`. This allows async functions to be used seamlessly in Promise chains.',
  },

  // 22. Spread operator
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does the spread operator (`...`) do when used in an array literal?',
    options: [
      { text: 'It creates a deep clone of the array' },
      { text: 'It expands an iterable\'s elements in-place within the new array' },
      { text: 'It flattens nested arrays to a depth of Infinity' },
      { text: 'It converts the array to a comma-separated string' },
    ],
    correctIndex: 1,
    explanation:
      'The spread operator in an array literal (e.g. `[...arr1, ...arr2]`) iterates over the spread operand and inserts each element at that position. This creates a shallow copy of the original and is a concise alternative to `concat`.',
  },

  // 23. Rest parameters
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the difference between rest parameters and the `arguments` object?',
    options: [
      { text: 'They are identical; rest is just newer syntax' },
      { text: 'Rest parameters collect excess arguments into a real array; `arguments` is an array-like object and is not available in arrow functions' },
      { text: '`arguments` holds all parameters; rest parameters hold only named ones' },
      { text: 'Rest parameters require strict mode; `arguments` does not' },
    ],
    correctIndex: 1,
    explanation:
      'Rest parameters (`...args`) produce a true `Array` instance, so array methods work directly on them. The legacy `arguments` object is array-like but not an actual array, and is absent in arrow functions entirely.',
  },

  // 24. Map vs Object
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Which advantage does a `Map` have over a plain object when used as a key-value store?',
    options: [
      { text: 'Maps are serializable to JSON; plain objects are not' },
      { text: 'Maps allow any value — including objects and functions — as keys, and maintain insertion order for all entries' },
      { text: 'Maps have faster property access for string keys' },
      { text: 'Maps inherit fewer prototype properties than plain objects' },
    ],
    correctIndex: 1,
    explanation:
      'Plain object keys are always coerced to strings (or Symbols). A `Map` preserves keys of any type — including other objects — and guarantees iteration in insertion order for all keys, making it more predictable than a plain object.',
  },

  // 25. Set
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the most idiomatic way to remove duplicate values from an array using ES6+?',
    options: [
      { text: '`arr.filter((v, i, a) => a.indexOf(v) === i)`' },
      { text: '`[...new Set(arr)]`' },
      { text: '`arr.unique()`' },
      { text: '`Array.dedupe(arr)`' },
    ],
    correctIndex: 1,
    explanation:
      'A `Set` stores only unique values. Passing the array to the `Set` constructor discards duplicates, and spreading it back into an array literal produces a deduplicated array. It is concise, readable, and leverages native data structures.',
  },

  // 26. WeakMap
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Why must `WeakMap` keys be objects rather than primitives?',
    options: [
      { text: 'Objects are faster to hash than primitives' },
      { text: 'WeakMap holds keys weakly so they can be garbage-collected; primitives have no identity and cannot be referenced weakly' },
      { text: 'Primitives are immutable, which would prevent WeakMap from updating entries' },
      { text: 'It is an arbitrary design choice with no technical reason' },
    ],
    correctIndex: 1,
    explanation:
      'A `WeakMap` holds its keys by weak reference: if no other reference to the key object exists, the garbage collector can reclaim it along with its entry. Primitives are value types with no identity, so "weakly holding" them is meaningless — hence only objects are permitted.',
  },

  // 27. Array.reduce
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the value of `[1, 2, 3, 4].reduce((acc, cur) => acc + cur, 0)`?',
    options: [
      { text: '[1, 2, 3, 4]' },
      { text: '10' },
      { text: '24' },
      { text: 'NaN' },
    ],
    correctIndex: 1,
    explanation:
      '`reduce` accumulates a single value by applying the callback left-to-right. Starting from `0`, it computes `0+1=1`, `1+2=3`, `3+3=6`, `6+4=10`. The second argument to `reduce` is the initial accumulator value.',
  },

  // 28. Symbol
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What guarantee does `Symbol()` provide?',
    options: [
      { text: 'It returns a string that is unique within the current module' },
      { text: 'It returns a globally unique primitive value every time it is called' },
      { text: 'It creates an immutable object whose toString returns a unique ID' },
      { text: 'It registers a name in the global Symbol registry' },
    ],
    correctIndex: 1,
    explanation:
      'Each call to `Symbol()` returns a new primitive value that is guaranteed to be unique — even if two symbols share the same description string. Symbols are primarily used as non-colliding property keys on objects.',
  },

  // 29. Generator basics
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does calling a generator function return?',
    options: [
      { text: 'The first yielded value immediately' },
      { text: 'A Promise that resolves to the first yielded value' },
      { text: 'An iterator object whose `.next()` method controls execution' },
      { text: 'undefined until the first `yield` is reached' },
    ],
    correctIndex: 2,
    explanation:
      'Calling a generator function does not execute its body; it returns an iterator (also an iterable). Each call to `.next()` runs the function until the next `yield`, returning `{ value, done }`. This lazy, pausable execution is the core feature of generators.',
  },

  // 30. Promise chaining
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'In a `.then()` chain, what happens if a handler returns a new Promise?',
    options: [
      { text: 'The outer chain continues immediately with the Promise object as the value' },
      { text: 'A TypeError is thrown because `.then` handlers must return plain values' },
      { text: 'The chain waits for the returned Promise to settle before invoking the next handler' },
      { text: 'The returned Promise is ignored; the chain receives undefined instead' },
    ],
    correctIndex: 2,
    explanation:
      'Promise resolution procedure (the "Promises/A+ spec") unwraps returned thenable values. If a `.then` handler returns a Promise, the downstream handlers are not called until that inner Promise settles, enabling sequential async operations via chaining.',
  },

  // ─── HARD (10) ────────────────────────────────────────────────────────────

  // 31. Microtask queue
  {
    difficulty: 'HARD' as Difficulty,
    text: 'Given this code: `setTimeout(() => console.log("A"), 0); Promise.resolve().then(() => console.log("B")); console.log("C");` — what is the output order?',
    options: [
      { text: 'A B C' },
      { text: 'C A B' },
      { text: 'C B A' },
      { text: 'B C A' },
    ],
    correctIndex: 2,
    explanation:
      'Synchronous code runs first (`C`). After the call stack empties, the microtask queue (Promise callbacks) is drained before the next macrotask (setTimeout callback). So `B` runs next, then `A`. The microtask queue always takes priority over the macrotask queue.',
  },

  // 32. Object.create and prototype chain
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is the prototype of an object created with `Object.create(null)`?',
    options: [
      { text: 'Object.prototype' },
      { text: 'An empty plain object {}' },
      { text: 'null — the object has no prototype' },
      { text: 'undefined' },
    ],
    correctIndex: 2,
    explanation:
      '`Object.create(null)` creates an object with no `[[Prototype]]` at all — its internal prototype slot is `null`. This is sometimes called a "bare" or "dictionary" object and is useful when you need a key-value store with zero prototype pollution (no inherited `toString`, `hasOwnProperty`, etc.).',
  },

  // 33. Generator — two-way communication
  {
    difficulty: 'HARD' as Difficulty,
    text: 'In a generator function, how can the caller pass a value back into the generator body?',
    options: [
      { text: 'By calling `generator.send(value)` on the iterator' },
      { text: 'By passing the value as an argument to `.next(value)`, which becomes the result of the current `yield` expression' },
      { text: 'By setting a property on the generator object before calling `.next()`' },
      { text: 'Values can only flow out of a generator via `yield`; there is no way to pass values in' },
    ],
    correctIndex: 1,
    explanation:
      'The argument passed to `.next(value)` is delivered as the resolved value of the `yield` expression that paused the generator. The first `.next()` call starts execution, so any value passed to it is discarded — two-way communication starts from the second `.next()` call onward.',
  },

  // 34. Proxy / Reflect
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is the purpose of `Reflect.get(target, prop, receiver)` inside a Proxy `get` trap?',
    options: [
      { text: 'It retrieves the property without triggering the Proxy trap, bypassing all interception' },
      { text: 'It performs the default property lookup while correctly setting `this` (receiver) so inherited getters work as expected' },
      { text: 'It returns a Promise that resolves to the property value' },
      { text: 'It copies the property from the target onto the Proxy object directly' },
    ],
    correctIndex: 1,
    explanation:
      '`Reflect` methods are the default implementations of the proxy trap operations. Using `Reflect.get(target, prop, receiver)` inside a `get` trap ensures that prototype-chain lookups and getter methods receive the correct `this` value (the proxy, not the target), which is essential for correctness when subclasses or inherited getters are involved.',
  },

  // 35. Memory leaks
  {
    difficulty: 'HARD' as Difficulty,
    text: 'Which of the following patterns is most likely to cause a memory leak in a long-running JavaScript application?',
    options: [
      { text: 'Using `const` instead of `let` for loop counters' },
      { text: 'Storing large objects in a Map keyed by DOM nodes without removing entries when the DOM nodes are removed' },
      { text: 'Using arrow functions as object methods' },
      { text: 'Declaring variables inside an immediately-invoked function expression (IIFE)' },
    ],
    correctIndex: 1,
    explanation:
      'A regular `Map` holds strong references to its keys and values. If you store data keyed by DOM nodes and those nodes are later removed from the document but not from the Map, neither the nodes nor the associated data can be garbage-collected. A `WeakMap` solves this because it holds keys weakly.',
  },

  // 36. Tail call optimisation
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What condition must a recursive call meet to qualify for Tail Call Optimisation (TCO) in strict-mode JavaScript?',
    options: [
      { text: 'The function must call itself by name, not via a variable' },
      { text: 'The recursive call must be the very last operation before returning, with no pending computation left in the current frame' },
      { text: 'The function must accept at least two parameters' },
      { text: 'TCO applies only to arrow functions, not regular functions' },
    ],
    correctIndex: 1,
    explanation:
      'TCO allows the engine to reuse the current stack frame for a tail call instead of pushing a new one, preventing stack overflows in deep recursion. The call must be in tail position — i.e. its result is immediately returned with no further work (like `return recurse(n - 1)`, not `return recurse(n - 1) + 1`). TCO is mandated by ES2015 strict mode, though adoption across engines is inconsistent.',
  },

  // 37. ESM vs CommonJS
  {
    difficulty: 'HARD' as Difficulty,
    text: 'How does ES Module (ESM) `import` differ from CommonJS `require` regarding when module code is executed?',
    options: [
      { text: 'Both execute module code on the first call and cache the result; they are functionally equivalent' },
      { text: 'ESM statically links bindings at parse time and executes module code once during initialisation; `require` is dynamic and executes module code synchronously at the point of the call' },
      { text: 'ESM evaluates modules lazily on the first property access; `require` evaluates them eagerly' },
      { text: '`require` supports top-level await; ESM does not' },
    ],
    correctIndex: 1,
    explanation:
      'ES Modules are statically analysed: the engine resolves and links the entire import graph before any code runs, enabling live bindings and tree-shaking. `require` is a runtime function call — it can appear anywhere, be conditional, and is resolved dynamically. ESM also supports top-level `await`; CommonJS does not.',
  },

  // 38. WeakRef / FinalizationRegistry
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What does `new WeakRef(obj).deref()` return if the referenced object has been garbage-collected?',
    options: [
      { text: 'null' },
      { text: 'An empty object {}' },
      { text: 'undefined' },
      { text: 'It throws a ReferenceError' },
    ],
    correctIndex: 2,
    explanation:
      '`WeakRef.prototype.deref()` returns the referenced object if it is still alive, or `undefined` if it has been reclaimed by the garbage collector. Code that uses `WeakRef` must always check for `undefined` before accessing the returned value.',
  },

  // 39. Iterators / iterables protocol
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What two methods must an object implement to be both an iterable AND an iterator in JavaScript?',
    options: [
      { text: '`Symbol.iterator` and `Symbol.asyncIterator`' },
      { text: '`next()` and `return()`' },
      { text: '`Symbol.iterator` (returning `this`) and `next()` (returning `{ value, done }`' },
      { text: '`[Symbol.toPrimitive]` and `valueOf()`' },
    ],
    correctIndex: 2,
    explanation:
      'The iterable protocol requires a `[Symbol.iterator]()` method that returns an iterator. The iterator protocol requires a `next()` method returning `{ value, done }`. An object that is its own iterator (common in custom generators) implements both by having `[Symbol.iterator]() { return this; }` alongside `next()`.',
  },

  // 40. Tagged template literals
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What arguments does a tag function receive when used with a tagged template literal like `tag\`Hello ${name}, you are ${age}\``?',
    options: [
      { text: 'A single pre-interpolated string' },
      { text: 'An array of all tokens in order, including expressions' },
      { text: 'A frozen array of string parts as the first argument, then each interpolated expression value as subsequent arguments' },
      { text: 'An object with `strings` and `values` keys' },
    ],
    correctIndex: 2,
    explanation:
      'The tag function receives: (1) a `TemplateStringsArray` — a frozen array of the static string segments between expressions (with a `.raw` property for unprocessed escapes), and (2) the evaluated expression values spread as individual arguments. This enables libraries like `sql`, `html`, or `css` to safely process template literals.',
  },
];
