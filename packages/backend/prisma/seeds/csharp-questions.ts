import type { Difficulty } from '@prisma/client';

interface SeedQuestion {
  difficulty: Difficulty;
  text: string;
  options: { text: string }[];
  correctIndex: number;
  explanation: string;
}

export const csharpQuestions: SeedQuestion[] = [
  // ─── EASY (15) ────────────────────────────────────────────────────────────

  // 1. Value types vs reference types
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which of the following is a value type in C#?',
    options: [
      { text: 'string' },
      { text: 'int' },
      { text: 'object' },
      { text: 'int[]' },
    ],
    correctIndex: 1,
    explanation:
      '`int` (System.Int32) is a struct and lives on the stack when used as a local variable, making it a value type. `string`, `object`, and arrays are all reference types — they store a reference to heap-allocated memory.',
  },

  // 2. String immutability
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Why are C# strings described as immutable?',
    options: [
      { text: 'Once created, the contents of a string object cannot be changed; any "modification" allocates a new string' },
      { text: 'Strings cannot be assigned to variables more than once' },
      { text: 'Strings are sealed classes and cannot be subclassed' },
      { text: 'String literals are stored in read-only ROM by the CLR' },
    ],
    correctIndex: 0,
    explanation:
      'Every operation that appears to modify a string (e.g. concatenation, `Replace`, `ToUpper`) actually returns a new `string` object. The original object in memory is never altered, which is why `StringBuilder` is preferred for repeated modifications in a loop.',
  },

  // 3. var keyword
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does the `var` keyword do in C#?',
    options: [
      { text: 'Declares a dynamically typed variable that can change type at runtime' },
      { text: 'Declares a variable of type `object`' },
      { text: 'Instructs the compiler to infer the variable\'s type from the initialiser expression' },
      { text: 'Creates a variant type that accepts any value' },
    ],
    correctIndex: 2,
    explanation:
      '`var` triggers compile-time type inference: the compiler determines the concrete type from the right-hand side of the assignment. The resulting variable is still strongly typed — `var x = 42` produces an `int`, not a dynamic variable.',
  },

  // 4. Nullable types
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does `int?` mean in C#?',
    options: [
      { text: 'An integer that defaults to zero instead of throwing an exception' },
      { text: 'A nullable value type that can hold an `int` value or `null`' },
      { text: 'An optional parameter that the caller may omit' },
      { text: 'A pointer to an integer in unsafe code' },
    ],
    correctIndex: 1,
    explanation:
      '`int?` is syntactic sugar for `Nullable<int>`. It wraps the value type in a struct that adds a boolean `HasValue` flag, allowing the variable to represent either a valid integer or the absence of a value (`null`).',
  },

  // 5. Properties (get/set)
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the difference between a C# property and a public field?',
    options: [
      { text: 'There is no difference; properties are just fields with a different syntax' },
      { text: 'Properties use `get`/`set` accessors which can encapsulate logic, validation, or change notifications, whereas fields expose memory directly' },
      { text: 'Properties are always read-only; use fields for mutable values' },
      { text: 'Fields support data binding in WPF; properties do not' },
    ],
    correctIndex: 1,
    explanation:
      'Properties provide controlled access to class data through `get` and `set` accessors. This allows you to add validation, lazy initialisation, or event notifications without changing the external API — something a raw public field cannot do.',
  },

  // 6. Access modifiers — internal
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which access modifier restricts a C# member to be accessible only within the same assembly?',
    options: [
      { text: 'private' },
      { text: 'protected' },
      { text: 'internal' },
      { text: 'public' },
    ],
    correctIndex: 2,
    explanation:
      '`internal` limits visibility to the current assembly (.dll or .exe). `private` limits to the containing type, `protected` to the type and its subclasses, and `public` places no restrictions. `internal` is the default for top-level types in C#.',
  },

  // 7. using statement — resource disposal
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the purpose of the `using` statement (not directive) in C#?',
    options: [
      { text: 'It imports a namespace into the current file' },
      { text: 'It creates an alias for a type' },
      { text: 'It ensures `Dispose()` is called on an `IDisposable` object when the block exits, even if an exception occurs' },
      { text: 'It marks a block of code as asynchronous' },
    ],
    correctIndex: 2,
    explanation:
      'The `using` statement is syntactic sugar for a try/finally block that calls `Dispose()` on the target object. This guarantees deterministic cleanup of resources like file handles, database connections, and network sockets regardless of how the block exits.',
  },

  // 8. Arrays vs List<T>
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which statement best describes the difference between `int[]` and `List<int>` in C#?',
    options: [
      { text: '`int[]` is faster for all operations; `List<int>` should never be used' },
      { text: '`int[]` has a fixed size set at creation time, while `List<int>` can dynamically grow or shrink' },
      { text: '`List<int>` stores elements on the stack; `int[]` stores them on the heap' },
      { text: 'Both are the same type; `List<int>` is just an alias for `int[]`' },
    ],
    correctIndex: 1,
    explanation:
      'Arrays are fixed-length contiguous blocks of memory. `List<T>` wraps an internal array and automatically resizes (doubles capacity) when elements are added beyond capacity, making it the preferred choice when the collection size is not known upfront.',
  },

  // 9. if/switch — switch expression
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does the following C# code return when `day = 6`?\n`string result = day switch { 6 or 7 => "Weekend", _ => "Weekday" };`',
    options: [
      { text: '"Weekday"' },
      { text: 'A compile error because `or` is not valid in a switch arm' },
      { text: '"Weekend"' },
      { text: 'null' },
    ],
    correctIndex: 2,
    explanation:
      'C# 9 switch expressions support pattern combinators such as `or` and `and`. The arm `6 or 7 => "Weekend"` matches when `day` equals 6 or 7, so the result is `"Weekend"`. The discard pattern `_` acts as the default case.',
  },

  // 10. Class vs interface
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which statement about C# interfaces is correct?',
    options: [
      { text: 'An interface can contain instance fields' },
      { text: 'A class can implement only one interface' },
      { text: 'Interfaces define a contract of members that implementing types must provide' },
      { text: 'Interface methods must always be marked `virtual`' },
    ],
    correctIndex: 2,
    explanation:
      'An interface declares a set of members (methods, properties, events, indexers) without providing state (no instance fields). A class or struct that implements an interface promises to provide concrete implementations of all declared members, enabling polymorphism.',
  },

  // 11. Abstract class
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is true about an `abstract` class in C#?',
    options: [
      { text: 'It cannot contain any implemented methods' },
      { text: 'It can be instantiated directly with `new`' },
      { text: 'It can mix abstract members (no body) with concrete members (with body), but cannot be instantiated directly' },
      { text: 'It is the same as a sealed class' },
    ],
    correctIndex: 2,
    explanation:
      'Abstract classes act as partially-implemented base types. They can contain fully implemented methods alongside `abstract` methods that subclasses must override. Because they may have unimplemented members, you cannot create an instance with `new` directly.',
  },

  // 12. Reference type default value
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the default value of an uninitialized reference-type variable in C#?',
    options: [
      { text: 'An empty object `{}`' },
      { text: 'A zero-length string' },
      { text: '`null`' },
      { text: '`undefined`' },
    ],
    correctIndex: 2,
    explanation:
      'All reference-type variables default to `null`, meaning they hold no reference to any heap object. Attempting to call a method on a `null` reference throws a `NullReferenceException`. C# 8+ nullable reference types help catch this at compile time.',
  },

  // 13. Object initializer syntax
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does object initializer syntax allow you to do in C#?',
    options: [
      { text: 'Call a private constructor from outside the class' },
      { text: 'Set publicly accessible properties or fields immediately after calling a constructor, without needing extra lines of assignment' },
      { text: 'Initialize a struct without calling any constructor' },
      { text: 'Create an anonymous type with named members' },
    ],
    correctIndex: 1,
    explanation:
      'Object initializer syntax (`new Person { Name = "Alice", Age = 30 }`) lets you set properties inline right after construction. It is purely syntactic sugar that the compiler transforms into sequential property assignments, improving readability.',
  },

  // 14. String interpolation
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which C# syntax produces the string `"Hello, Alice!"` given `string name = "Alice"`?',
    options: [
      { text: '`"Hello, " + name + "!"`' },
      { text: '`$"Hello, {name}!"`' },
      { text: '`String.Format("Hello, {name}!")`' },
      { text: 'Both A and B produce identical output at runtime' },
    ],
    correctIndex: 3,
    explanation:
      'Both concatenation and string interpolation (`$"..."`) produce the same runtime string `"Hello, Alice!"`. Interpolation is preferred for readability. `String.Format` uses indexed placeholders (`{0}`), not names, so option C is syntactically incorrect.',
  },

  // 15. foreach loop
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What requirement must a type satisfy to be usable in a C# `foreach` loop?',
    options: [
      { text: 'It must be an array or inherit from `Array`' },
      { text: 'It must implement `IEnumerable` or `IEnumerable<T>`, or have a public `GetEnumerator()` method' },
      { text: 'It must implement `IList<T>`' },
      { text: 'It must be a sealed class' },
    ],
    correctIndex: 1,
    explanation:
      'The C# compiler applies a duck-typing pattern for `foreach`: it looks for a public `GetEnumerator()` method that returns an object with `MoveNext()` and a `Current` property. Types that implement `IEnumerable` or `IEnumerable<T>` satisfy this automatically.',
  },

  // ─── MEDIUM (15) ──────────────────────────────────────────────────────────

  // 16. LINQ — Where/Select
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Given `var nums = new[] {1,2,3,4,5}`, what does `nums.Where(x => x % 2 == 0).Select(x => x * x)` return?',
    options: [
      { text: 'A sequence containing `4, 16`' },
      { text: 'A sequence containing `1, 9, 25`' },
      { text: 'The sum `20`' },
      { text: 'An immediate `List<int>` with two elements' },
    ],
    correctIndex: 0,
    explanation:
      '`Where` filters to even numbers `{2, 4}`, and `Select` squares each, yielding `{4, 16}`. The result is a lazy `IEnumerable<int>` — not a materialised list. Execution is deferred until the sequence is iterated.',
  },

  // 17. LINQ — FirstOrDefault
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does `FirstOrDefault` return when no element satisfies the predicate?',
    options: [
      { text: 'It throws `InvalidOperationException`' },
      { text: 'It returns `null` for reference types, and the default value (e.g. 0) for value types' },
      { text: 'It returns the last element in the sequence' },
      { text: 'It returns an empty collection' },
    ],
    correctIndex: 1,
    explanation:
      '`FirstOrDefault` is the safe variant of `First`. When no match is found it returns `default(T)` — which is `null` for reference types and the zero-initialised value for structs (e.g. `0` for `int`). C# 6+ overloads let you specify a custom default.',
  },

  // 18. LINQ — GroupBy
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does LINQ\'s `GroupBy` return?',
    options: [
      { text: 'A `Dictionary<TKey, List<T>>`' },
      { text: 'An `IEnumerable<IGrouping<TKey, TElement>>` where each group has a `Key` and an inner sequence' },
      { text: 'A sorted `IOrderedEnumerable<T>`' },
      { text: 'A `Lookup<TKey, TElement>` that is immediately materialised' },
    ],
    correctIndex: 1,
    explanation:
      '`GroupBy` projects elements into `IGrouping<TKey, TElement>` groups, each exposing a `Key` and an `IEnumerable<TElement>`. Like most LINQ operators it is lazily evaluated. To get a `Dictionary`, chain `.ToDictionary()`; to get a `Lookup`, use `.ToLookup()`.',
  },

  // 19. async/await — Task<T>
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the return type of an `async` method that asynchronously produces an `int` result?',
    options: [
      { text: '`int`' },
      { text: '`Task`' },
      { text: '`Task<int>`' },
      { text: '`async<int>`' },
    ],
    correctIndex: 2,
    explanation:
      'An `async` method that returns a value must use `Task<T>` as its return type (or `ValueTask<T>` for low-allocation hot paths). The `async`/`await` machinery wraps the eventual `int` in a `Task<int>` that callers can await. A void-returning async method uses `Task`.',
  },

  // 20. async/await — ConfigureAwait
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the purpose of calling `.ConfigureAwait(false)` on an awaitable in C#?',
    options: [
      { text: 'It disables cancellation for the awaited operation' },
      { text: 'It tells the awaiter not to capture the current synchronisation context, avoiding potential deadlocks in library code and improving performance' },
      { text: 'It makes the method run synchronously on the calling thread' },
      { text: 'It configures the thread pool size used for the continuation' },
    ],
    correctIndex: 1,
    explanation:
      'By default, `await` captures the current `SynchronizationContext` (e.g. UI thread or ASP.NET request context) and resumes the continuation there. `.ConfigureAwait(false)` opts out of this, allowing the continuation to run on any thread pool thread. Library code should use it to prevent deadlocks when the caller blocks synchronously.',
  },

  // 21. Generics — constraints
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does the generic constraint `where T : class, new()` enforce?',
    options: [
      { text: 'T must be a class that implements `IComparable`' },
      { text: 'T must be a reference type and must have a public parameterless constructor' },
      { text: 'T must be a sealed class' },
      { text: 'T must be a struct with a default constructor' },
    ],
    correctIndex: 1,
    explanation:
      'The `class` constraint limits `T` to reference types, and `new()` requires a public parameterless constructor so the generic method or type can create instances with `new T()`. Multiple constraints are combined with commas and must appear in a specific order.',
  },

  // 22. Extension methods
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Which of the following is required to define an extension method in C#?',
    options: [
      { text: 'The method must be inside an interface' },
      { text: 'The method must be a `static` method in a `static` class, with the first parameter preceded by `this`' },
      { text: 'The method must be `virtual` and override an existing method' },
      { text: 'The class being extended must be `partial`' },
    ],
    correctIndex: 1,
    explanation:
      'Extension methods are `static` methods inside `static` classes. The `this` modifier on the first parameter designates the type being extended. At call sites, the compiler rewrites `obj.Method()` to `ClassName.Method(obj)`, giving the appearance of instance methods on types you don\'t own.',
  },

  // 23. Delegates and events
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the key difference between a `delegate` and an `event` in C#?',
    options: [
      { text: 'Delegates support multicast (multiple subscribers); events do not' },
      { text: 'Events can only be invoked from within the class that declares them, while the underlying delegate can be invoked from anywhere' },
      { text: 'Events are value types; delegates are reference types' },
      { text: 'Delegates can only hold a single method; events hold multiple' },
    ],
    correctIndex: 1,
    explanation:
      'An `event` wraps a delegate field with access restrictions: external code can only subscribe (`+=`) or unsubscribe (`-=`), but only the declaring class can invoke (raise) the event. This prevents third parties from resetting all subscribers or firing the event externally.',
  },

  // 24. Func<> / Action<> / Predicate<>
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the difference between `Action<T>` and `Func<T, TResult>` in C#?',
    options: [
      { text: '`Action<T>` returns a value; `Func<T, TResult>` does not' },
      { text: '`Action<T>` represents a method that takes parameters and returns `void`; `Func<T, TResult>` represents a method that takes parameters and returns a value' },
      { text: 'They are identical; one is used in LINQ and the other in events' },
      { text: '`Func<T, TResult>` cannot be used as a lambda expression' },
    ],
    correctIndex: 1,
    explanation:
      '`Action<T>` is a built-in delegate for methods that return `void`. `Func<T, TResult>` is for methods that return a value — the last type parameter is always the return type. `Predicate<T>` is shorthand for `Func<T, bool>` and is commonly used in list search methods.',
  },

  // 25. Pattern matching — is expression
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does the following C# pattern-matching expression do?\n`if (shape is Circle c && c.Radius > 10) { ... }`',
    options: [
      { text: 'It checks if `shape` implements `ICircle` and casts it to `Circle`' },
      { text: 'It tests whether `shape` is of type `Circle`, and if so binds it to the variable `c` for use in the same condition' },
      { text: 'It is a compile error because `&&` cannot follow an `is` pattern' },
      { text: 'It compares `shape` to the constant `Circle` using value equality' },
    ],
    correctIndex: 1,
    explanation:
      'C# 7 introduced type patterns in `is` expressions. `shape is Circle c` both checks the runtime type and declares a pattern variable `c` of type `Circle`. Because pattern variables are in scope for the `&&` right-hand side, `c.Radius` is safe to access in the same expression.',
  },

  // 26. Record types
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does the `record` keyword provide that a regular `class` does not by default in C#?',
    options: [
      { text: 'Immutable fields and a primary constructor' },
      { text: 'Value-based equality (`Equals`/`GetHashCode`), a synthesised `ToString`, and `with` expression support for non-destructive mutation' },
      { text: 'Automatic serialisation to JSON' },
      { text: 'Thread-safe property access' },
    ],
    correctIndex: 1,
    explanation:
      'Records (C# 9+) auto-generate value-based `Equals` and `GetHashCode` that compare all positional properties, a human-readable `ToString`, and a `with` expression that creates a copy with selected properties changed. Classes use reference equality by default and provide none of these out of the box.',
  },

  // 27. readonly struct
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the main benefit of declaring a struct as `readonly` in C#?',
    options: [
      { text: 'It prevents the struct from being allocated on the heap' },
      { text: 'It guarantees that all instance members do not mutate state, enabling the compiler to eliminate defensive copies when the struct is passed as `in` or stored in a `readonly` context' },
      { text: 'It makes the struct serializable by default' },
      { text: 'It allows the struct to implement interfaces' },
    ],
    correctIndex: 1,
    explanation:
      'When a struct is marked `readonly`, the compiler enforces that no member mutates `this`. This allows the JIT to pass the struct by reference in `readonly` or `in` parameters without taking a defensive copy, reducing allocations and improving performance in hot paths.',
  },

  // 28. IEnumerable<T> vs IQueryable<T>
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the key difference between `IEnumerable<T>` and `IQueryable<T>` in a LINQ-to-database scenario?',
    options: [
      { text: '`IEnumerable<T>` executes the query on the database server; `IQueryable<T>` executes it in memory' },
      { text: '`IQueryable<T>` represents a query expression tree that a provider (e.g. EF Core) translates to SQL and executes server-side; `IEnumerable<T>` pulls all records into memory and filters locally' },
      { text: 'They are interchangeable; Entity Framework Core uses both internally' },
      { text: '`IQueryable<T>` supports async enumeration; `IEnumerable<T>` does not' },
    ],
    correctIndex: 1,
    explanation:
      '`IQueryable<T>` builds an expression tree that query providers like EF Core translate into SQL, executing filtering and projection on the database. Switching to `IEnumerable<T>` (e.g. by calling `.AsEnumerable()`) forces the data into memory first, after which all further LINQ operations run locally in the CLR.',
  },

  // 29. Deferred execution in LINQ
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'When does a LINQ query defined with `Where` and `Select` actually execute?',
    options: [
      { text: 'At the point the query expression is written' },
      { text: 'At the point the result is iterated (e.g. in a `foreach` loop or by calling `ToList()`)' },
      { text: 'At the end of the current method scope' },
      { text: 'When the garbage collector runs' },
    ],
    correctIndex: 1,
    explanation:
      'Most LINQ operators use deferred (lazy) execution: they return `IEnumerable<T>` iterators that do no work until iterated. Execution is triggered by iteration operators like `foreach`, `ToList()`, `ToArray()`, `Count()`, `First()`, etc. This allows query composition without redundant passes over data.',
  },

  // 30. Span<T> overview
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is `Span<T>` in C# and why is it useful?',
    options: [
      { text: 'A thread-safe collection for producer-consumer scenarios' },
      { text: 'A ref struct that represents a contiguous region of typed memory (array slice, stack memory, or unmanaged memory) without heap allocation' },
      { text: 'A generic wrapper around `List<T>` that avoids boxing' },
      { text: 'An async stream of `T` elements' },
    ],
    correctIndex: 1,
    explanation:
      '`Span<T>` is a stack-only `ref struct` that holds a pointer and a length, allowing zero-copy slicing of arrays, strings, or unmanaged buffers. Because it cannot be boxed or stored on the heap, the compiler enforces safety constraints. It is widely used in high-performance parsing and I/O code to avoid allocations.',
  },

  // ─── HARD (10) ────────────────────────────────────────────────────────────

  // 31. Expression trees
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is an expression tree (`Expression<TDelegate>`) in C# and how does it differ from a regular `Func<T>`?',
    options: [
      { text: 'An expression tree is a compiled delegate that runs faster than `Func<T>`' },
      { text: 'An expression tree represents code as inspectable data (an AST); a `Func<T>` is a compiled delegate that can only be invoked, not inspected' },
      { text: 'Expression trees are only used in LINQ-to-Objects queries' },
      { text: 'An `Expression<Func<T>>` cannot be converted to a `Func<T>`' },
    ],
    correctIndex: 1,
    explanation:
      'When a lambda is assigned to `Expression<TDelegate>`, the C# compiler emits code that constructs an in-memory abstract syntax tree (using types in `System.Linq.Expressions`) instead of IL bytecode. This AST can be inspected, transformed, and compiled at runtime — the mechanism EF Core and similar ORMs use to translate C# predicates into SQL.',
  },

  // 32. Span<T> / Memory<T> — stack restriction
  {
    difficulty: 'HARD' as Difficulty,
    text: 'Why can `Span<T>` not be stored as a field in a regular class or captured in an async method?',
    options: [
      { text: 'Because `Span<T>` is a generic type, which classes do not support' },
      { text: 'Because `Span<T>` is a `ref struct` that must live on the stack; storing it on the heap would violate memory safety guarantees around stack lifetimes' },
      { text: 'Because `Span<T>` implements `IDisposable`, which conflicts with the GC' },
      { text: 'This is only a convention; the code would compile and run safely' },
    ],
    correctIndex: 1,
    explanation:
      '`ref struct` types are constrained to stack frames by the C# compiler. Allowing them on the heap (inside class fields) or in async state machines (which are heap-allocated) would let them outlive the memory they point to (e.g. a stack-allocated buffer), causing unsafe dangling references. Use `Memory<T>` when heap storage or async usage is required.',
  },

  // 33. ref returns and ref locals
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What does a `ref return` allow a method to do that a normal return cannot?',
    options: [
      { text: 'Return multiple values from a single method' },
      { text: 'Return a reference (alias) to a variable rather than a copy of its value, allowing the caller to modify the original storage location' },
      { text: 'Return an unmanaged pointer to heap memory' },
      { text: 'Return a value from an asynchronous context' },
    ],
    correctIndex: 1,
    explanation:
      'A `ref`-returning method yields a managed reference (not a pointer) to an existing storage location — an array element, a field, or a local. The caller can use a `ref local` to alias that location and write back to it directly, enabling high-performance APIs that avoid copying large structs (e.g. indexing into a `Span<T>`).',
  },

  // 34. unsafe code and pointers
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What must you do before using pointer types in C# code?',
    options: [
      { text: 'Decorate the method with `[SkipLocalsInit]`' },
      { text: 'Enable the `<AllowUnsafeBlocks>true</AllowUnsafeBlocks>` project setting and mark the code block or method with the `unsafe` keyword' },
      { text: 'Reference the `System.Runtime.InteropServices` NuGet package' },
      { text: 'Declare the pointer inside a `fixed` statement' },
    ],
    correctIndex: 1,
    explanation:
      'The C# compiler rejects pointer arithmetic by default. You must opt in by enabling `<AllowUnsafeBlocks>` in the project file (or the `-unsafe` compiler flag) and surrounding pointer code with the `unsafe` contextual keyword. The `fixed` statement is additionally required to pin managed objects so the GC does not move them.',
  },

  // 35. Covariance and contravariance in generics
  {
    difficulty: 'HARD' as Difficulty,
    text: 'Given `IEnumerable<string>`, can it be assigned to `IEnumerable<object>` in C#, and why?',
    options: [
      { text: 'No, because generics in C# are invariant by default' },
      { text: 'Yes, because `IEnumerable<T>` is covariant: its type parameter is declared `out T`, meaning it only produces values of type `T` and is safe to treat as a producer of a base type' },
      { text: 'Yes, because `string` implicitly converts to `object` at runtime' },
      { text: 'No, because `string` is a sealed class' },
    ],
    correctIndex: 1,
    explanation:
      '`IEnumerable<out T>` declares `T` as covariant with the `out` modifier, meaning the interface only ever returns `T` (never accepts it). Since every `string` is an `object`, an `IEnumerable<string>` is safely usable as an `IEnumerable<object>`. Contravariance (`in T`) works in the opposite direction for types that only consume `T`, such as `IComparer<in T>`.',
  },

  // 36. IAsyncEnumerable<T>
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What problem does `IAsyncEnumerable<T>` (C# 8+) solve compared to returning `Task<IEnumerable<T>>`?',
    options: [
      { text: '`IAsyncEnumerable<T>` is faster because it avoids the overhead of `Task`' },
      { text: 'Returning `Task<IEnumerable<T>>` requires all elements to be available before the caller receives any; `IAsyncEnumerable<T>` streams elements one by one asynchronously, allowing consumers to process each item as it arrives' },
      { text: 'They are equivalent; `IAsyncEnumerable<T>` is just a newer syntax' },
      { text: '`IAsyncEnumerable<T>` eliminates the need for cancellation tokens' },
    ],
    correctIndex: 1,
    explanation:
      '`Task<IEnumerable<T>>` forces the producer to materialise the entire sequence before yielding control, wasting memory and increasing latency. `IAsyncEnumerable<T>` paired with `await foreach` lets the producer `yield return` items asynchronously one at a time — ideal for paginated API calls, database result sets streamed via a cursor, or real-time event feeds.',
  },

  // 37. Source generators
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What are C# source generators and at which compilation phase do they run?',
    options: [
      { text: 'Runtime code emitters triggered by reflection; they run when an assembly is loaded' },
      { text: 'Roslyn-based plugins that analyse user code and produce additional C# source files that are compiled into the same assembly, running as part of the compilation pipeline' },
      { text: 'T4 templates that generate code before compilation starts' },
      { text: 'IL rewriters that post-process compiled assemblies' },
    ],
    correctIndex: 1,
    explanation:
      'Source generators are `ISourceGenerator` (v1) or `IIncrementalGenerator` (v2) implementations hosted by the Roslyn compiler. During compilation they receive a `GeneratorExecutionContext` with access to the syntax tree and semantic model, generate additional `.cs` source, and the compiler includes that source in the same pass — enabling zero-runtime-overhead code generation for JSON serialisation, DI registration, logging, and more.',
  },

  // 38. Roslyn compiler APIs
  {
    difficulty: 'HARD' as Difficulty,
    text: 'Which Roslyn API would you use to walk every method declaration in a C# syntax tree and retrieve its return type?',
    options: [
      { text: '`Assembly.GetTypes()` combined with reflection' },
      { text: 'A `CSharpSyntaxWalker` that overrides `VisitMethodDeclaration`, combined with the `SemanticModel` to resolve the return type symbol' },
      { text: '`SyntaxFactory.ParseSyntaxTree` followed by `Compile()` to inspect the resulting IL' },
      { text: 'A custom `DiagnosticAnalyzer` that fires on every token' },
    ],
    correctIndex: 1,
    explanation:
      '`CSharpSyntaxWalker` uses the Visitor pattern to traverse all nodes in a syntax tree. Overriding `VisitMethodDeclaration` gives you each `MethodDeclarationSyntax`. The semantic model\'s `GetDeclaredSymbol()` then resolves it to an `IMethodSymbol` whose `ReturnType` is a fully resolved `ITypeSymbol`, providing richer information than the raw syntax node.',
  },

  // 39. stackalloc and stack allocation
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What does `stackalloc int[128]` do in C#, and what is its main constraint?',
    options: [
      { text: 'It allocates 128 integers on the heap using a pool allocator to avoid GC pressure' },
      { text: 'It allocates a contiguous block of 128 integers on the current thread\'s stack; the memory is automatically freed when the enclosing scope exits and cannot outlive it' },
      { text: 'It pins a managed array in place so the GC cannot move it' },
      { text: 'It is equivalent to `new int[128]` but is only valid in `unsafe` blocks' },
    ],
    correctIndex: 1,
    explanation:
      '`stackalloc` carves out memory directly on the call stack, bypassing the GC entirely. Since C# 7.2, the result can be assigned to a `Span<int>` without the `unsafe` keyword. The critical constraint is lifetime: the buffer is destroyed when the stack frame unwinds, so you must never let a reference to it escape the declaring scope.',
  },

  // 40. Custom attributes and reflection
  {
    difficulty: 'HARD' as Difficulty,
    text: 'How do you define a custom attribute in C# and retrieve it at runtime via reflection?',
    options: [
      { text: 'Decorate the target with `[CustomAttribute]`; retrieve it with `Type.GetField("CustomAttribute")`' },
      { text: 'Create a class that inherits from `System.Attribute`; apply it to a target with `[YourAttribute]`; retrieve it with `MemberInfo.GetCustomAttributes(typeof(YourAttribute), inherit: true)` or the generic `GetCustomAttribute<T>()` extension' },
      { text: 'Use the `[Serializable]` attribute and call `BinaryFormatter.Deserialize`' },
      { text: 'Attributes cannot be read at runtime; they are only used by the compiler' },
    ],
    correctIndex: 1,
    explanation:
      'Custom attributes are classes that inherit from `System.Attribute`. You can control their usage targets with `[AttributeUsage]`. At runtime, the reflection API (`GetCustomAttribute<T>()` on any `MemberInfo` — `Type`, `MethodInfo`, `PropertyInfo`, etc.) reads the metadata the compiler baked into the assembly, enabling frameworks like ASP.NET Core, xUnit, and EF Core to drive behaviour from annotations.',
  },
];
