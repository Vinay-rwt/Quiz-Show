import type { Difficulty } from '@prisma/client';

interface SeedQuestion {
  difficulty: Difficulty;
  text: string;
  options: { text: string }[];
  correctIndex: number;
  explanation: string;
}

export const typescriptQuestions: SeedQuestion[] = [
  // ─── EASY (15) ────────────────────────────────────────────────────────────

  // 1. Basic types – string
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which of the following correctly annotates a variable as a string in TypeScript?',
    options: [
      { text: 'let name = String;' },
      { text: 'let name: string = "Alice";' },
      { text: 'let name: String = "Alice";' },
      { text: 'string name = "Alice";' },
    ],
    correctIndex: 1,
    explanation:
      'TypeScript uses lowercase primitive type names (string, number, boolean) for type annotations. The wrapper object form `String` (capital S) refers to the String constructor object, not the primitive type.',
  },

  // 2. Basic types – number & boolean
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does TypeScript infer as the type of `x` in `let x = 42;`?',
    options: [
      { text: 'int' },
      { text: 'any' },
      { text: 'number' },
      { text: 'Number' },
    ],
    correctIndex: 2,
    explanation:
      "TypeScript's type inference assigns the primitive type `number` to numeric literals. There is no `int` type in TypeScript; all numeric values share the single `number` type.",
  },

  // 3. `any` vs `unknown`
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the key difference between `any` and `unknown` in TypeScript?',
    options: [
      { text: '`any` allows all operations; `unknown` requires a type check before use.' },
      { text: '`unknown` allows all operations; `any` requires a type check before use.' },
      { text: 'They are identical — `unknown` is just an alias for `any`.' },
      { text: '`any` is for objects; `unknown` is for primitive values.' },
    ],
    correctIndex: 0,
    explanation:
      '`any` disables type-checking entirely, letting you call methods or assign anywhere without errors. `unknown` is the type-safe counterpart: you must narrow it (via typeof, instanceof, or a type guard) before performing operations on it.',
  },

  // 4. `never`
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which scenario is a correct use of the `never` type?',
    options: [
      { text: 'A function that returns `undefined` explicitly.' },
      { text: 'A function that sometimes returns nothing.' },
      { text: 'A function that always throws an error and never returns.' },
      { text: 'A variable that holds null.' },
    ],
    correctIndex: 2,
    explanation:
      '`never` represents values that never occur. A function that always throws or runs an infinite loop never produces a return value, so its return type is `never`. This is different from `void`, which is for functions that return `undefined`.',
  },

  // 5. `void`
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What return type should you declare for a function that performs a side effect and returns nothing?',
    options: [
      { text: 'null' },
      { text: 'undefined' },
      { text: 'void' },
      { text: 'never' },
    ],
    correctIndex: 2,
    explanation:
      '`void` is the conventional return type for functions that do not return a meaningful value. While the function actually returns `undefined` at runtime, `void` communicates intent more clearly and is the standard annotation in TypeScript.',
  },

  // 6. Type annotations on function parameters
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Given `function greet(name: string): string { return "Hello, " + name; }`, what happens if you call `greet(42)`?',
    options: [
      { text: 'It throws a runtime error.' },
      { text: 'TypeScript reports a compile-time type error.' },
      { text: 'It works fine; TypeScript converts 42 to a string.' },
      { text: 'It returns "Hello, undefined".' },
    ],
    correctIndex: 1,
    explanation:
      'TypeScript checks argument types at compile time. Passing a `number` where `string` is expected produces a type error during compilation, before the code ever runs.',
  },

  // 7. Interfaces
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which of the following defines an interface with a required `id` (number) and an optional `label` (string)?',
    options: [
      { text: 'interface Item { id: number; label?: string; }' },
      { text: 'interface Item { id: number; label: string | undefined; }' },
      { text: 'interface Item { id?: number; label: string; }' },
      { text: 'interface Item { id: number; label: string; }' },
    ],
    correctIndex: 0,
    explanation:
      'The `?` suffix on a property makes it optional in TypeScript. `label?: string` means the property may be absent or `undefined`, while `id: number` without `?` is required.',
  },

  // 8. Type alias basics
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which keyword is used to create a type alias in TypeScript?',
    options: [
      { text: 'interface' },
      { text: 'typedef' },
      { text: 'type' },
      { text: 'alias' },
    ],
    correctIndex: 2,
    explanation:
      'The `type` keyword creates a type alias. Unlike `interface`, a type alias can represent not just object shapes but also primitives, union types, intersection types, and more.',
  },

  // 9. Arrays
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which two syntaxes are both valid ways to type an array of numbers in TypeScript?',
    options: [
      { text: '`number[]` and `Array<number>`' },
      { text: '`number[]` and `[number]`' },
      { text: '`Array<number>` and `(number)`' },
      { text: '`number[]` and `Number[]`' },
    ],
    correctIndex: 0,
    explanation:
      '`number[]` is the shorthand syntax and `Array<number>` is the generic syntax. Both are semantically identical and interchangeable. `[number]` is a tuple with exactly one element, not an array.',
  },

  // 10. Tuples
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the TypeScript type for a tuple that holds a string followed by a number?',
    options: [
      { text: '[string, number]' },
      { text: 'string | number' },
      { text: 'Array<string | number>' },
      { text: '{ 0: string; 1: number }' },
    ],
    correctIndex: 0,
    explanation:
      'A tuple type uses square bracket notation with positional types: `[string, number]` means index 0 must be a string and index 1 must be a number. Union arrays like `Array<string | number>` allow either type at any position.',
  },

  // 11. Enums
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the default underlying value of enum members when no values are assigned?',
    options: [
      { text: 'Strings starting from ""' },
      { text: 'Numbers starting from 0' },
      { text: 'Numbers starting from 1' },
      { text: 'undefined' },
    ],
    correctIndex: 1,
    explanation:
      'In a numeric enum, the first member defaults to 0 and each subsequent member auto-increments by 1. You can override this by assigning an explicit value to any member.',
  },

  // 12. `readonly`
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does `readonly` do when applied to an interface property?',
    options: [
      { text: 'It prevents the property from being serialized to JSON.' },
      { text: 'It prevents the property from being assigned after initialization.' },
      { text: 'It makes the property invisible at runtime.' },
      { text: 'It restricts the property to primitive types only.' },
    ],
    correctIndex: 1,
    explanation:
      '`readonly` properties can be set during object creation but not reassigned afterward. TypeScript will emit a compile-time error if you attempt to write to a `readonly` property after the object is constructed.',
  },

  // 13. Type inference
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What type does TypeScript infer for the variable `result` in `const result = [1, 2, 3];`?',
    options: [
      { text: 'any[]' },
      { text: 'number[]' },
      { text: '[1, 2, 3]' },
      { text: 'Array<unknown>' },
    ],
    correctIndex: 1,
    explanation:
      'TypeScript infers `number[]` (an array of numbers) from an array literal containing only numeric values. Const-ness alone does not widen to a tuple; you would need `as const` to get the literal tuple type `[1, 2, 3]`.',
  },

  // 14. Union types
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does the type `string | number` mean in TypeScript?',
    options: [
      { text: 'A value that is both a string and a number simultaneously.' },
      { text: 'A value that can be either a string or a number.' },
      { text: 'A string that contains a number.' },
      { text: 'A number stored as a string.' },
    ],
    correctIndex: 1,
    explanation:
      'The pipe `|` creates a union type, meaning the value can be any one of the listed types. It is an "or" relationship. An intersection (`&`) would require both types at once.',
  },

  // 15. Function types
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which type annotation correctly describes a function that takes two numbers and returns a number?',
    options: [
      { text: 'Function<number, number, number>' },
      { text: '(a: number, b: number) => number' },
      { text: 'function(number, number): number' },
      { text: '[number, number] -> number' },
    ],
    correctIndex: 1,
    explanation:
      'TypeScript function types use arrow notation: `(param: Type, ...) => ReturnType`. This is distinct from an actual arrow function — it is purely a type expression used in type positions.',
  },

  // ─── MEDIUM (15) ──────────────────────────────────────────────────────────

  // 16. Generics – functions
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does the generic type parameter `<T>` accomplish in `function identity<T>(value: T): T { return value; }`?',
    options: [
      { text: 'It restricts the function to accept only objects.' },
      { text: 'It makes the return type always `any`.' },
      { text: 'It links the input type to the return type, preserving the specific type passed in.' },
      { text: 'It forces the caller to specify the type explicitly every time.' },
    ],
    correctIndex: 2,
    explanation:
      'The generic `<T>` captures whatever type is passed as `value` and guarantees the return type is the same `T`. Without generics, you would lose type information (e.g., returning `any`). TypeScript can usually infer `T` from the argument.',
  },

  // 17. Generics – interfaces
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Given `interface Box<T> { contents: T; }`, what is the type of `myBox.contents` if `myBox` is typed as `Box<string[]>`?',
    options: [
      { text: 'string' },
      { text: 'string[]' },
      { text: 'T' },
      { text: 'unknown' },
    ],
    correctIndex: 1,
    explanation:
      'When you instantiate the generic interface as `Box<string[]>`, every occurrence of `T` inside the interface is replaced with `string[]`. Therefore `contents` has type `string[]`.',
  },

  // 18. Partial
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does `Partial<User>` produce when `User` is `{ id: number; name: string; }`?',
    options: [
      { text: '{ id?: number; name?: string; }' },
      { text: '{ id: number | null; name: string | null; }' },
      { text: '{ id: number; name?: string; }' },
      { text: 'Removes all properties from User.' },
    ],
    correctIndex: 0,
    explanation:
      '`Partial<T>` is a built-in utility type that maps every property of `T` to optional (`?`). It is commonly used when building update or patch payloads where not all fields are required.',
  },

  // 19. Pick / Omit
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Given `type User = { id: number; name: string; email: string; }`, what is the result of `Omit<User, "email">`?',
    options: [
      { text: '{ email: string }' },
      { text: '{ id: number; name: string }' },
      { text: '{ id: number; name: string; email?: string }' },
      { text: '{ id: number }' },
    ],
    correctIndex: 1,
    explanation:
      '`Omit<T, K>` constructs a type by removing the specified key(s) from `T`. Omitting `"email"` from `User` leaves `{ id: number; name: string }`. `Pick<T, K>` is the complementary type that keeps only the listed keys.',
  },

  // 20. Record
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does `Record<string, number>` represent?',
    options: [
      { text: 'A tuple of one string and one number.' },
      { text: 'An object whose keys are strings and values are numbers.' },
      { text: 'A Map from string to number.' },
      { text: 'A function that takes a string and returns a number.' },
    ],
    correctIndex: 1,
    explanation:
      '`Record<K, V>` is a utility type for objects where all keys are of type `K` and all values are of type `V`. `Record<string, number>` is equivalent to `{ [key: string]: number }` (an index signature).',
  },

  // 21. ReturnType / Parameters
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does `ReturnType<typeof Math.round>` evaluate to?',
    options: [
      { text: 'string' },
      { text: 'void' },
      { text: 'number' },
      { text: 'unknown' },
    ],
    correctIndex: 2,
    explanation:
      '`ReturnType<T>` extracts the return type of a function type `T`. `Math.round` returns `number`, so `ReturnType<typeof Math.round>` is `number`. This is useful for deriving types from existing functions without manual duplication.',
  },

  // 22. keyof
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Given `type Point = { x: number; y: number; }`, what is the type `keyof Point`?',
    options: [
      { text: 'string' },
      { text: '"x" | "y"' },
      { text: 'number | number' },
      { text: 'Point' },
    ],
    correctIndex: 1,
    explanation:
      '`keyof T` produces a union of the string (or number) literal types of all keys of `T`. For `Point`, that union is `"x" | "y"`. This is the foundation of many advanced mapped and indexed access types.',
  },

  // 23. typeof (type-level)
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'In a type position, what does `typeof` do differently from its JavaScript behavior?',
    options: [
      { text: 'It returns a string like "object" or "function".' },
      { text: 'It queries the TypeScript type of a variable or expression.' },
      { text: 'It narrows a union type inside a conditional block.' },
      { text: 'It converts a runtime value into a type literal.' },
    ],
    correctIndex: 1,
    explanation:
      'In a type position (e.g., `type T = typeof someVariable`), `typeof` is a TypeScript type query that returns the inferred or declared TypeScript type. In a value position it still behaves as the JavaScript `typeof` operator, returning a runtime string.',
  },

  // 24. Type guards – typeof
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Inside the true branch of `if (typeof value === "string") { ... }`, what is the narrowed type of `value` if it was `string | number`?',
    options: [
      { text: 'string | number' },
      { text: 'string' },
      { text: 'number' },
      { text: 'unknown' },
    ],
    correctIndex: 1,
    explanation:
      'TypeScript performs control-flow analysis. After a `typeof value === "string"` check, TypeScript narrows the type to `string` inside that branch, and the remaining `number` in the else branch. This is called a typeof type guard.',
  },

  // 25. Intersection types
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the type of a value typed as `{ name: string } & { age: number }`?',
    options: [
      { text: 'An object that is either `{ name: string }` or `{ age: number }`.' },
      { text: 'An object that has both `name: string` and `age: number`.' },
      { text: 'An object with a `name` property whose value is a number.' },
      { text: 'A compile error because types cannot be intersected.' },
    ],
    correctIndex: 1,
    explanation:
      'The `&` operator creates an intersection type requiring the value to satisfy all constituent types simultaneously. The result has every property from both types, making it `{ name: string; age: number }`.',
  },

  // 26. Discriminated unions
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What makes a union type a "discriminated union" in TypeScript?',
    options: [
      { text: 'All members must be class instances.' },
      { text: 'Each member shares a common literal-typed property used to distinguish them.' },
      { text: 'The union must have exactly two members.' },
      { text: 'All members must have identical shapes.' },
    ],
    correctIndex: 1,
    explanation:
      'A discriminated union (also called a tagged union) has each member contain a shared property with a unique literal type (the "discriminant"). TypeScript can then narrow to the specific member type by checking that property, enabling exhaustive pattern matching.',
  },

  // 27. Mapped types
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does the mapped type `{ [K in keyof T]: boolean }` produce for `T = { a: string; b: number }`?',
    options: [
      { text: '{ a: string; b: number }' },
      { text: '{ a: boolean; b: boolean }' },
      { text: '{ [key: string]: boolean }' },
      { text: 'boolean' },
    ],
    correctIndex: 1,
    explanation:
      'A mapped type iterates over every key `K` in `keyof T` and applies the value type expression. Here every property value type is replaced with `boolean`, producing `{ a: boolean; b: boolean }`.',
  },

  // 28. Conditional types – basic
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does `type IsString<T> = T extends string ? "yes" : "no"` evaluate to when `T` is `number`?',
    options: [
      { text: '"yes"' },
      { text: '"no"' },
      { text: 'boolean' },
      { text: 'never' },
    ],
    correctIndex: 1,
    explanation:
      'A conditional type `T extends U ? A : B` checks if `T` is assignable to `U`. `number` does not extend `string`, so the condition is false and the result is the false branch: `"no"`.',
  },

  // 29. Declaration merging
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What happens when you declare two interfaces with the same name in the same scope?',
    options: [
      { text: 'TypeScript throws a compile-time error.' },
      { text: 'The second declaration silently overwrites the first.' },
      { text: 'They are merged into a single interface containing all properties from both.' },
      { text: 'Only the last declaration is used; earlier ones are ignored.' },
    ],
    correctIndex: 2,
    explanation:
      'TypeScript supports interface declaration merging: multiple declarations with the same name are automatically combined into one. This is how library authors augment existing interfaces (e.g., adding properties to Express\'s `Request`).',
  },

  // 30. Required
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does `Required<{ id?: number; name?: string }>` produce?',
    options: [
      { text: '{ id: number; name: string }' },
      { text: '{ id?: number; name?: string }' },
      { text: '{ id: number | undefined; name: string | undefined }' },
      { text: 'never' },
    ],
    correctIndex: 0,
    explanation:
      '`Required<T>` is the inverse of `Partial<T>`: it removes the `?` modifier from every property, making them all required. This is useful when you have received and validated all fields of an otherwise-partial type.',
  },

  // ─── HARD (10) ────────────────────────────────────────────────────────────

  // 31. infer keyword
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What does the `infer` keyword do in `type UnpackPromise<T> = T extends Promise<infer U> ? U : T`?',
    options: [
      { text: 'It asserts that `T` is always a Promise.' },
      { text: 'It declares a new type variable `U` to capture the resolved type of the Promise within the conditional check.' },
      { text: 'It unwraps `T` at runtime and returns the resolved value.' },
      { text: 'It restricts `T` to be a subtype of `Promise<unknown>`.' },
    ],
    correctIndex: 1,
    explanation:
      '`infer` introduces a type variable that is bound during the pattern match of a conditional type. Here, if `T` extends `Promise<something>`, TypeScript binds that "something" to `U`, which can then be referenced in the true branch. It is purely a compile-time mechanism.',
  },

  // 32. Template literal types
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What type does `type EventName<T extends string> = \`on${Capitalize<T>}\`` produce for `T = "click"`?',
    options: [
      { text: '"on click"' },
      { text: '"onClick"' },
      { text: '"onclick"' },
      { text: '"OnClick"' },
    ],
    correctIndex: 1,
    explanation:
      'Template literal types interpolate other string types using backtick syntax. `Capitalize<"click">` produces `"Click"`, so the template literal evaluates to `"onClick"`. These types are evaluated entirely at compile time.',
  },

  // 33. Variadic tuple types
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is the type of `result` in `type Concat<A extends unknown[], B extends unknown[]> = [...A, ...B]` when instantiated as `Concat<[string], [number, boolean]>`?',
    options: [
      { text: 'string | number | boolean' },
      { text: '[string, number, boolean]' },
      { text: '[string, ...[number, boolean]]' },
      { text: 'unknown[]' },
    ],
    correctIndex: 1,
    explanation:
      'Variadic tuple types allow spreading tuple type parameters. `[...A, ...B]` concatenates the two tuples, so `Concat<[string], [number, boolean]>` resolves to the flat tuple `[string, number, boolean]`.',
  },

  // 34. satisfies operator
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is the primary advantage of `satisfies` over a direct type annotation when initializing an object?',
    options: [
      { text: '`satisfies` is faster at runtime than a type annotation.' },
      { text: '`satisfies` validates the object against a type but retains the inferred literal/specific type for subsequent use.' },
      { text: '`satisfies` allows you to bypass strict null checks.' },
      { text: '`satisfies` enables declaration merging on plain objects.' },
    ],
    correctIndex: 1,
    explanation:
      'A direct annotation (`: Type`) widens the inferred type to `Type`, losing specificity. `satisfies Type` checks compatibility without widening, so you keep the precise inferred type (e.g., specific string literals) while still catching type errors at the point of definition.',
  },

  // 35. const assertions
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What effect does `as const` have on `const config = { env: "production", port: 3000 } as const`?',
    options: [
      { text: 'It freezes the object at runtime so properties cannot be changed.' },
      { text: 'It widens all property types to their base types.' },
      { text: 'It narrows all property types to their literal types and marks them readonly.' },
      { text: 'It converts the object to a JavaScript Symbol.' },
    ],
    correctIndex: 2,
    explanation:
      '`as const` asserts the deepest possible literal types: `env` becomes `"production"` (not `string`) and `port` becomes `3000` (not `number`). All properties also become `readonly`. This is a compile-time-only assertion with no runtime effect.',
  },

  // 36. Declaration files (.d.ts)
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is the purpose of a `.d.ts` (declaration file) in TypeScript?',
    options: [
      { text: 'To provide runtime polyfills for older browsers.' },
      { text: 'To describe the shape of JavaScript code that TypeScript cannot infer, without containing any implementation.' },
      { text: 'To define CSS-in-JS styles alongside component types.' },
      { text: 'To store test fixtures for type-level unit tests.' },
    ],
    correctIndex: 1,
    explanation:
      'Declaration files contain only type information (interfaces, function signatures, module exports) — no executable JavaScript. They allow TypeScript to type-check code that consumes plain JavaScript libraries or pre-compiled packages whose source is unavailable.',
  },

  // 37. Module augmentation
  {
    difficulty: 'HARD' as Difficulty,
    text: 'You want to add a `currentUser` property to Express\'s `Request` interface. Which approach is correct?',
    options: [
      { text: 'Edit the `node_modules/express/index.d.ts` file directly.' },
      { text: 'Declare a module augmentation: `declare module "express" { interface Request { currentUser?: User; } }` in your own `.d.ts` file.' },
      { text: 'Create a new interface that extends Request and use it everywhere.' },
      { text: 'Use `Object.assign` at runtime to attach the property.' },
    ],
    correctIndex: 1,
    explanation:
      'Module augmentation lets you extend types from third-party modules in your own declaration files. Using `declare module "express"` and re-opening the `Request` interface merges your additions into the existing type without modifying node_modules.',
  },

  // 38. Covariance / Contravariance
  {
    difficulty: 'HARD' as Difficulty,
    text: 'Why is a function type `(x: Dog) => Animal` NOT assignable to `(x: Animal) => Animal` in TypeScript (with strict function types)?',
    options: [
      { text: 'TypeScript does not allow function type assignments at all.' },
      { text: 'Function parameters are contravariant: a function expecting a specific subtype cannot safely accept a broader supertype argument.' },
      { text: 'Return types must be identical, not related by subtyping.' },
      { text: 'Functions in TypeScript are always invariant on all positions.' },
    ],
    correctIndex: 1,
    explanation:
      'Under `--strictFunctionTypes`, function parameters are checked contravariantly. If you have a callback typed `(x: Animal) => Animal`, callers may pass any `Animal` (not just `Dog`). A function that only handles `Dog` would break with a non-Dog `Animal`, so TypeScript correctly rejects the assignment.',
  },

  // 39. Structural typing edge cases
  {
    difficulty: 'HARD' as Difficulty,
    text: 'TypeScript uses structural typing. Given `interface A { x: number }` and `interface B { x: number; y: number }`, which assignment is valid?',
    options: [
      { text: 'Only `const a: A = b` where `b: B` is valid.' },
      { text: 'Only `const b: B = a` where `a: A` is valid.' },
      { text: 'Both assignments are valid.' },
      { text: 'Neither assignment is valid.' },
    ],
    correctIndex: 0,
    explanation:
      'Structural typing allows assigning a more specific (wider) type to a less specific (narrower) variable. `B` has all properties of `A` plus more, so a `B` satisfies `A`. The reverse (`const b: B = a`) fails because `a` lacks `y`, which `B` requires.',
  },

  // 40. Strict null checks
  {
    difficulty: 'HARD' as Difficulty,
    text: 'With `strictNullChecks` enabled, what is wrong with `function getLength(s: string | null): number { return s.length; }`?',
    options: [
      { text: 'Nothing — TypeScript automatically guards against null.' },
      { text: '`s` could be `null`, which has no `length` property, so TypeScript emits an error requiring a null check first.' },
      { text: 'The return type should be `number | null`.' },
      { text: '`string | null` is not a valid union type.' },
    ],
    correctIndex: 1,
    explanation:
      'With `strictNullChecks` on, `null` is not assignable to `string` and is not automatically excluded. Accessing `.length` on a possibly-null value is a type error. You must guard with `if (s !== null)`, the non-null assertion `s!.length`, or the nullish coalescing/optional chaining operators.',
  },
];
