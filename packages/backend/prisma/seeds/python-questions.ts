import type { Difficulty } from '@prisma/client';

interface SeedQuestion {
  difficulty: Difficulty;
  text: string;
  options: { text: string }[];
  correctIndex: number;
  explanation: string;
}

export const pythonQuestions: SeedQuestion[] = [
  // ─── EASY (15) ────────────────────────────────────────────────────────────

  // 1. print / input
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does the built-in `print()` function do in Python?',
    options: [
      { text: 'Returns a string representation of its arguments' },
      { text: 'Writes its arguments to standard output followed by a newline' },
      { text: 'Stores its arguments in a variable named `output`' },
      { text: 'Raises a `PrintError` if the argument is not a string' },
    ],
    correctIndex: 1,
    explanation:
      '`print()` writes the string representation of its arguments to `sys.stdout` and appends a newline by default. You can customise the separator with `sep=` and the line ending with `end=`.',
  },

  // 2. input()
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What type does the `input()` function always return in Python 3?',
    options: [
      { text: '`int` if the user types a number, `str` otherwise' },
      { text: '`str`' },
      { text: '`bytes`' },
      { text: '`object`' },
    ],
    correctIndex: 1,
    explanation:
      'In Python 3, `input()` always returns a `str`, regardless of what the user types. If you need a number, you must explicitly convert the result with `int()` or `float()`.',
  },

  // 3. Variables and assignment
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which of the following is a valid variable name in Python?',
    options: [
      { text: '2count' },
      { text: 'my-variable' },
      { text: '_total_score' },
      { text: 'class' },
    ],
    correctIndex: 2,
    explanation:
      'Python identifiers must start with a letter or underscore and may only contain letters, digits, and underscores. `2count` starts with a digit, `my-variable` contains a hyphen, and `class` is a reserved keyword.',
  },

  // 4. int / float / str / bool
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the result of `type(3.0)` in Python?',
    options: [
      { text: "`<class 'int'>`" },
      { text: "`<class 'float'>`" },
      { text: "`<class 'str'>`" },
      { text: "`<class 'number'>`" },
    ],
    correctIndex: 1,
    explanation:
      'A literal with a decimal point like `3.0` is a `float` in Python. `type()` returns the class object of its argument, so `type(3.0)` is `<class \'float\'>`.',
  },

  // 5. list vs tuple
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which statement correctly describes the difference between a Python list and a tuple?',
    options: [
      { text: 'Lists are ordered; tuples are unordered' },
      { text: 'Lists are mutable; tuples are immutable' },
      { text: 'Lists can hold any type; tuples can only hold numbers' },
      { text: 'Lists use curly braces; tuples use square brackets' },
    ],
    correctIndex: 1,
    explanation:
      'Both lists and tuples are ordered sequences, but lists are mutable (you can add, remove, or change elements) while tuples are immutable (their contents cannot change after creation).',
  },

  // 6. dict
  {
    difficulty: 'EASY' as Difficulty,
    text: 'How do you access the value associated with key `"name"` in the dictionary `d = {"name": "Alice", "age": 30}`?',
    options: [
      { text: '`d.name`' },
      { text: '`d["name"]`' },
      { text: '`d{name}`' },
      { text: '`d->name`' },
    ],
    correctIndex: 1,
    explanation:
      'Dictionary values are retrieved with square-bracket notation using the key: `d["name"]`. Dot notation does not work on plain dicts; it is used for attribute access on objects.',
  },

  // 7. set
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which of the following correctly creates a set containing the values 1, 2, and 3 in Python?',
    options: [
      { text: '`s = [1, 2, 3]`' },
      { text: '`s = (1, 2, 3)`' },
      { text: '`s = {1, 2, 3}`' },
      { text: '`s = set([1, 2, 3, 2])` — this will have 4 elements' },
    ],
    correctIndex: 2,
    explanation:
      'A set literal uses curly braces with comma-separated values: `{1, 2, 3}`. Note that `{}` creates an empty dict, not a set — use `set()` for an empty set. Sets automatically deduplicate values.',
  },

  // 8. if/elif/else
  {
    difficulty: 'EASY' as Difficulty,
    text: 'In Python, which keyword is used to check an additional condition after an `if` block?',
    options: [
      { text: '`else if`' },
      { text: '`elseif`' },
      { text: '`elif`' },
      { text: '`case`' },
    ],
    correctIndex: 2,
    explanation:
      'Python uses `elif` (short for "else if") to chain additional conditions. Unlike many other languages, there is no `else if` or `elseif` — using two words would require a new block and Python would treat it as `else:` followed by `if`.',
  },

  // 9. for loop with range
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does `range(3)` produce when iterated?',
    options: [
      { text: 'The values 1, 2, 3' },
      { text: 'The values 0, 1, 2' },
      { text: 'The values 0, 1, 2, 3' },
      { text: 'A single value: 3' },
    ],
    correctIndex: 1,
    explanation:
      '`range(n)` generates integers from 0 up to (but not including) n. So `range(3)` yields 0, 1, 2. This zero-based convention is consistent with list indexing in Python.',
  },

  // 10. while loop
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What will the following code print?\n```python\nx = 0\nwhile x < 3:\n    print(x)\n    x += 1\n```',
    options: [
      { text: '0 1 2 3' },
      { text: '1 2 3' },
      { text: '0 1 2' },
      { text: 'Nothing — infinite loop' },
    ],
    correctIndex: 2,
    explanation:
      'The loop runs while `x < 3`. Starting at 0, it prints 0, 1, 2 and then increments `x` to 3, at which point the condition is false and the loop ends.',
  },

  // 11. list indexing / slicing
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Given `lst = [10, 20, 30, 40, 50]`, what does `lst[1:4]` return?',
    options: [
      { text: '`[10, 20, 30, 40]`' },
      { text: '`[20, 30, 40]`' },
      { text: '`[20, 30, 40, 50]`' },
      { text: '`[10, 20, 30]`' },
    ],
    correctIndex: 1,
    explanation:
      'Python slices use `[start:stop]` where `start` is inclusive and `stop` is exclusive. `lst[1:4]` returns elements at indices 1, 2, and 3 — which are 20, 30, and 40.',
  },

  // 12. basic string methods
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does `"  hello  ".strip()` return?',
    options: [
      { text: '`"  hello  "`' },
      { text: '`"hello  "`' },
      { text: '`"hello"`' },
      { text: '`"HELLO"`' },
    ],
    correctIndex: 2,
    explanation:
      '`str.strip()` removes leading and trailing whitespace (spaces, tabs, newlines) from a string. Use `lstrip()` to remove only leading whitespace or `rstrip()` for trailing only.',
  },

  // 13. len / type
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the value of `len({"a": 1, "b": 2, "c": 3})`?',
    options: [
      { text: '6' },
      { text: '3' },
      { text: '2' },
      { text: 'Raises a `TypeError`' },
    ],
    correctIndex: 1,
    explanation:
      '`len()` on a dictionary returns the number of key-value pairs (i.e., the number of keys). This dict has three keys — `"a"`, `"b"`, `"c"` — so `len()` returns 3.',
  },

  // 14. defining functions
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which syntax correctly defines a function named `add` that takes two parameters and returns their sum?',
    options: [
      { text: '`function add(a, b): return a + b`' },
      { text: '`def add(a, b):\n    return a + b`' },
      { text: '`def add(a, b) -> return a + b`' },
      { text: '`lambda add(a, b): a + b`' },
    ],
    correctIndex: 1,
    explanation:
      'Python functions are defined with the `def` keyword, followed by the function name, parameters in parentheses, a colon, and an indented body. `return` sends the result back to the caller.',
  },

  // 15. None vs False
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which of the following statements about `None` in Python is correct?',
    options: [
      { text: '`None` is the same as `False`' },
      { text: '`None` is the same as `0`' },
      { text: '`None` is a singleton object of type `NoneType` representing the absence of a value' },
      { text: '`None` is an empty string `""`' },
    ],
    correctIndex: 2,
    explanation:
      '`None` is Python\'s null value — a singleton of type `NoneType`. While it is falsy (so `bool(None)` is `False`), it is not equal to `False`, `0`, or `""`. Always use `is None` / `is not None` to check for it.',
  },

  // ─── MEDIUM (15) ──────────────────────────────────────────────────────────

  // 16. list comprehension
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does `[x**2 for x in range(5) if x % 2 == 0]` evaluate to?',
    options: [
      { text: '`[0, 1, 4, 9, 16]`' },
      { text: '`[0, 4, 16]`' },
      { text: '`[1, 9]`' },
      { text: '`[4, 16]`' },
    ],
    correctIndex: 1,
    explanation:
      '`range(5)` yields 0–4. The `if x % 2 == 0` filter keeps only even numbers: 0, 2, 4. Squaring those gives `[0, 4, 16]`. The conditional in a comprehension is applied before the expression.',
  },

  // 17. dict comprehension
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Which expression produces the dict `{"a": 1, "b": 2, "c": 3}` from the list `[("a",1),("b",2),("c",3)]`?',
    options: [
      { text: '`{k, v for k, v in pairs}`' },
      { text: '`{k: v for k, v in pairs}`' },
      { text: '`dict(k=v for k, v in pairs)`' },
      { text: '`[k: v for k, v in pairs]`' },
    ],
    correctIndex: 1,
    explanation:
      'A dict comprehension uses `{key: value for ...}` syntax. Each iteration unpacks the tuple into `k` and `v`, and `k: v` constructs the key-value pair in the resulting dictionary.',
  },

  // 18. set comprehension
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does `{len(w) for w in ["hi", "hello", "hey", "hi"]}` return?',
    options: [
      { text: '`[2, 5, 3, 2]`' },
      { text: '`{2, 3, 5}`' },
      { text: '`{2, 5, 3, 2}`' },
      { text: '`(2, 5, 3)`' },
    ],
    correctIndex: 1,
    explanation:
      'A set comprehension uses `{expr for ...}` and automatically deduplicates results. `len` of "hi"=2, "hello"=5, "hey"=3, "hi"=2 again — the set removes the duplicate 2, leaving `{2, 3, 5}`.',
  },

  // 19. lambda
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the output of `(lambda x, y: x * y)(3, 4)`?',
    options: [
      { text: '7' },
      { text: '`<lambda>`' },
      { text: '12' },
      { text: 'A `TypeError` because lambdas cannot be called directly' },
    ],
    correctIndex: 2,
    explanation:
      'A lambda expression defines an anonymous function inline. `(lambda x, y: x * y)(3, 4)` immediately calls the lambda with arguments 3 and 4, returning `3 * 4 = 12`.',
  },

  // 20. *args / **kwargs
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'In the function signature `def f(*args, **kwargs)`, what do `args` and `kwargs` hold when calling `f(1, 2, a=3)`?',
    options: [
      { text: '`args = [1, 2]`, `kwargs = {"a": 3}`' },
      { text: '`args = (1, 2)`, `kwargs = {"a": 3}`' },
      { text: '`args = (1, 2, 3)`, `kwargs = {}`' },
      { text: '`args = 1`, `kwargs = (2, {"a": 3})`' },
    ],
    correctIndex: 1,
    explanation:
      '`*args` collects positional arguments into a **tuple** (not a list). `**kwargs` collects keyword arguments into a **dict**. So calling `f(1, 2, a=3)` sets `args = (1, 2)` and `kwargs = {"a": 3}`.',
  },

  // 21. decorators basics
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does the `@` decorator syntax do in Python?',
    options: [
      { text: 'It marks a function as asynchronous' },
      { text: 'It applies a higher-order function to wrap or transform the decorated function' },
      { text: 'It declares a class method' },
      { text: 'It imports a function from another module' },
    ],
    correctIndex: 1,
    explanation:
      'The `@decorator` syntax is syntactic sugar for `func = decorator(func)`. It passes the decorated function to `decorator` and rebinds the name to whatever `decorator` returns — typically a wrapper function that adds behaviour.',
  },

  // 22. generators / yield
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What makes a Python function a **generator function**?',
    options: [
      { text: 'Decorating it with `@generator`' },
      { text: 'Using the `yield` keyword inside its body' },
      { text: 'Returning a list from the function' },
      { text: 'Calling it with `next()` instead of `()`' },
    ],
    correctIndex: 1,
    explanation:
      'Any function containing a `yield` statement is a generator function. Calling it returns a generator object without executing the body. Each call to `next()` on the generator runs the body until the next `yield`, suspending execution and returning the yielded value.',
  },

  // 23. file I/O with context managers
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Why is it recommended to open files using `with open(...) as f:` rather than `f = open(...)`?',
    options: [
      { text: 'It is faster because it bypasses the OS file descriptor table' },
      { text: 'The `with` block automatically closes the file when the block exits, even if an exception occurs' },
      { text: 'Files opened with `with` are read into memory immediately, improving performance' },
      { text: 'It is only a style preference; there is no functional difference' },
    ],
    correctIndex: 1,
    explanation:
      'The `with` statement uses the context manager protocol (`__enter__` / `__exit__`). When the block exits — normally or via an exception — `__exit__` is called, which closes the file handle and releases the OS resource automatically.',
  },

  // 24. exception handling
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'In a `try/except/finally` block, when is the `finally` clause executed?',
    options: [
      { text: 'Only when an exception is raised' },
      { text: 'Only when no exception is raised' },
      { text: 'Always — whether or not an exception was raised or caught' },
      { text: 'Only when the `except` clause does not match the exception type' },
    ],
    correctIndex: 2,
    explanation:
      '`finally` is a guaranteed cleanup block. It executes unconditionally after the `try` (and any matching `except`) block finishes, making it ideal for releasing resources like file handles or database connections.',
  },

  // 25. class definitions / inheritance
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'How does a subclass call the initialiser of its parent class in Python 3?',
    options: [
      { text: '`parent.__init__(self)`' },
      { text: '`super().__init__()`' },
      { text: '`self.base()`' },
      { text: '`inherit.__init__()`' },
    ],
    correctIndex: 1,
    explanation:
      '`super().__init__()` is the idiomatic Python 3 way to call the parent\'s `__init__`. It works correctly with multiple inheritance because Python\'s MRO (Method Resolution Order) determines which parent to call.',
  },

  // 26. @staticmethod / @classmethod
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the key difference between `@staticmethod` and `@classmethod` in Python?',
    options: [
      { text: '`@staticmethod` receives `cls`; `@classmethod` receives `self`' },
      { text: '`@classmethod` receives the class as its first argument (`cls`); `@staticmethod` receives no implicit first argument' },
      { text: 'Both receive `self`; the difference is only decorative' },
      { text: '`@staticmethod` can only be called from inside the class; `@classmethod` can be called externally' },
    ],
    correctIndex: 1,
    explanation:
      'A `@classmethod` automatically receives the class (conventionally named `cls`) as its first argument, making it useful as an alternative constructor. A `@staticmethod` is a plain function namespaced inside the class — it receives neither `self` nor `cls`.',
  },

  // 27. f-strings
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does `f"{3.14159:.2f}"` evaluate to?',
    options: [
      { text: '`"3.14159"`' },
      { text: '`"3.14"`' },
      { text: '`"3.1"`' },
      { text: '`"3.142"`' },
    ],
    correctIndex: 1,
    explanation:
      'Inside an f-string, `:.2f` is a format spec meaning "fixed-point notation with 2 decimal places". So `f"{3.14159:.2f}"` rounds and formats the float to `"3.14"`.',
  },

  // 28. list / dict comprehension with nested
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the output of `[i * j for i in range(1, 3) for j in range(1, 3)]`?',
    options: [
      { text: '`[1, 2, 2, 4]`' },
      { text: '`[[1, 2], [2, 4]]`' },
      { text: '`[1, 4]`' },
      { text: '`[2, 4]`' },
    ],
    correctIndex: 0,
    explanation:
      'Nested `for` clauses in a comprehension work like nested loops: the outer loop runs first. For `i=1`: `1*1=1`, `1*2=2`; for `i=2`: `2*1=2`, `2*2=4`. The flat result is `[1, 2, 2, 4]`.',
  },

  // 29. try/except specific exception
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Which built-in exception is raised when you try to access a dictionary key that does not exist?',
    options: [
      { text: '`IndexError`' },
      { text: '`AttributeError`' },
      { text: '`KeyError`' },
      { text: '`LookupError`' },
    ],
    correctIndex: 2,
    explanation:
      'Accessing a missing key with `d["missing"]` raises a `KeyError`. To avoid this, use `d.get("missing")` which returns `None` (or a default) instead of raising, or check with `"missing" in d` first.',
  },

  // 30. generator expression vs list comprehension
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the main advantage of a generator expression `(x**2 for x in range(1000000))` over the equivalent list comprehension `[x**2 for x in range(1000000)]`?',
    options: [
      { text: 'Generator expressions execute faster due to C optimisations' },
      { text: 'The generator expression uses constant memory by yielding values one at a time; the list comprehension allocates all values at once' },
      { text: 'Generator expressions support the `+` operator for concatenation' },
      { text: 'There is no advantage; they are equivalent' },
    ],
    correctIndex: 1,
    explanation:
      'A generator expression is lazy: it produces values on demand without storing them all in memory. A list comprehension eagerly evaluates every element into a list in memory. For large sequences, the generator is far more memory-efficient.',
  },

  // ─── HARD (10) ────────────────────────────────────────────────────────────

  // 31. metaclasses
  {
    difficulty: 'HARD' as Difficulty,
    text: 'In Python, what is a metaclass?',
    options: [
      { text: 'A class that can only be instantiated once (a singleton)' },
      { text: 'The class of a class — it controls how new classes are constructed and what attributes they have' },
      { text: 'A class decorated with `@abstract`' },
      { text: 'Any class that inherits from `object`' },
    ],
    correctIndex: 1,
    explanation:
      'In Python, classes are themselves objects, and a metaclass is the class that creates them. `type` is the default metaclass. By subclassing `type` and passing `metaclass=MyMeta`, you can intercept and customise class creation, attribute lookup, and instance creation.',
  },

  // 32. descriptor protocol
  {
    difficulty: 'HARD' as Difficulty,
    text: 'Which methods must a class implement to be a **data descriptor** in Python?',
    options: [
      { text: '`__get__` only' },
      { text: '`__get__` and at least one of `__set__` or `__delete__`' },
      { text: '`__getattr__` and `__setattr__`' },
      { text: '`__init__` and `__call__`' },
    ],
    correctIndex: 1,
    explanation:
      'A descriptor object implements `__get__`. A **data descriptor** additionally defines `__set__` or `__delete__`, giving it priority over the instance `__dict__` during attribute lookup. A non-data descriptor (only `__get__`) is overridden by instance attributes.',
  },

  // 33. __slots__
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is the primary benefit of defining `__slots__` in a Python class?',
    options: [
      { text: 'It makes all attributes immutable' },
      { text: 'It prevents subclassing' },
      { text: 'It eliminates the per-instance `__dict__`, reducing memory usage and slightly improving attribute access speed' },
      { text: 'It allows the class to be serialised with `pickle` automatically' },
    ],
    correctIndex: 2,
    explanation:
      'By declaring `__slots__ = [\'x\', \'y\']`, Python allocates a fixed-size array for those attributes instead of a per-instance dictionary. This reduces memory by ~50-70 % for classes with many instances, and attribute access is marginally faster because it skips the dict lookup.',
  },

  // 34. GIL
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is the Global Interpreter Lock (GIL) in CPython and what is its main implication for CPU-bound multi-threaded code?',
    options: [
      { text: 'The GIL prevents multiple processes from running simultaneously, so multi-processing is also blocked' },
      { text: 'The GIL is a mutex that allows only one thread to execute Python bytecode at a time, meaning CPU-bound threads cannot truly run in parallel on multiple cores' },
      { text: 'The GIL only affects I/O-bound code; CPU-bound threads always run in parallel' },
      { text: 'The GIL is removed in Python 3 and only exists in Python 2' },
    ],
    correctIndex: 1,
    explanation:
      'The GIL ensures memory safety in CPython by serialising bytecode execution across threads. For CPU-bound work, threads cannot leverage multiple cores simultaneously. The workaround is `multiprocessing`, which spawns separate interpreter processes each with their own GIL. I/O-bound threads do benefit from threading because the GIL is released during I/O waits.',
  },

  // 35. asyncio / coroutines
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What keyword pair is used to define and call a coroutine in Python\'s `asyncio` model?',
    options: [
      { text: '`yield` / `next()`' },
      { text: '`async def` / `await`' },
      { text: '`@coroutine` / `yield from`' },
      { text: '`thread` / `join()`' },
    ],
    correctIndex: 1,
    explanation:
      '`async def` defines a coroutine function; calling it returns a coroutine object. `await` suspends the current coroutine until the awaitable (another coroutine, `asyncio.Task`, or `Future`) completes. This cooperative multitasking is orchestrated by the event loop.',
  },

  // 36. memory management / garbage collection
  {
    difficulty: 'HARD' as Difficulty,
    text: 'CPython\'s primary memory management strategy is reference counting. What problem does the cyclic garbage collector (`gc` module) address?',
    options: [
      { text: 'It defragments heap memory to improve allocation speed' },
      { text: 'It collects objects involved in reference cycles that reference counting alone cannot reclaim' },
      { text: 'It compresses long-lived strings to save memory' },
      { text: 'It manages memory for extension modules written in C' },
    ],
    correctIndex: 1,
    explanation:
      'Reference counting cannot free objects in reference cycles (e.g., `a.ref = b; b.ref = a`) because each object\'s count stays above zero. CPython\'s cyclic GC periodically scans for such cycles using a generational tri-colour algorithm and frees them.',
  },

  // 37. functools.lru_cache / partial / reduce
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What does `functools.lru_cache(maxsize=128)` do when applied as a decorator?',
    options: [
      { text: 'It runs the decorated function in a background thread up to 128 times' },
      { text: 'It memoises the function\'s return values keyed by its arguments, keeping the 128 most recently used results and discarding older ones' },
      { text: 'It limits the function to at most 128 calls total before raising `RuntimeError`' },
      { text: 'It batches calls to the function into groups of 128 for efficiency' },
    ],
    correctIndex: 1,
    explanation:
      '`lru_cache` implements a Least Recently Used cache. Return values are stored in a dict keyed by the (hashable) arguments. When the cache is full, the least recently used entry is evicted. This is ideal for expensive pure functions called repeatedly with the same arguments.',
  },

  // 38. context managers with __enter__ / __exit__
  {
    difficulty: 'HARD' as Difficulty,
    text: 'In a custom context manager class, what arguments does `__exit__` receive, and what does returning `True` from it signify?',
    options: [
      { text: '`__exit__(self)` — returning `True` closes the resource' },
      { text: '`__exit__(self, exc_type, exc_val, exc_tb)` — returning `True` suppresses the exception; returning `False`/`None` re-raises it' },
      { text: '`__exit__(self, error)` — returning `True` logs the error' },
      { text: '`__exit__(self, exc_type)` — returning `True` retries the `with` block' },
    ],
    correctIndex: 1,
    explanation:
      '`__exit__` receives three arguments describing any exception: the exception type, value, and traceback. If the `with` block exited normally, all three are `None`. Returning a truthy value tells Python to suppress the exception; a falsy return lets it propagate.',
  },

  // 39. dataclasses
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What does the `@dataclass` decorator from the `dataclasses` module automatically generate for a class?',
    options: [
      { text: 'Only a `__repr__` method' },
      { text: '`__init__`, `__repr__`, and `__eq__` based on the class\'s annotated fields, reducing boilerplate' },
      { text: 'A `__slots__` declaration for all annotated fields' },
      { text: '`__init__` and `__hash__` only' },
    ],
    correctIndex: 1,
    explanation:
      '`@dataclass` inspects type-annotated class variables and auto-generates `__init__` (with a parameter per field), `__repr__`, and `__eq__`. Optional flags like `frozen=True`, `order=True`, and `slots=True` (Python 3.10+) enable additional generated methods.',
  },

  // 40. walrus operator / structural pattern matching
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What does the walrus operator `:=` (introduced in Python 3.8) allow you to do?',
    options: [
      { text: 'Perform integer division and assign the result in one step' },
      { text: 'Assign a value to a variable as part of an expression, so the variable can be used in the same statement' },
      { text: 'Compare two objects by identity (same as `is`)' },
      { text: 'Destructure a tuple into named variables' },
    ],
    correctIndex: 1,
    explanation:
      'The walrus operator (`:=`) is the assignment expression. It assigns the right-hand value to the left-hand name **and** evaluates to that value. A common use is `while chunk := f.read(8192):` — this reads and assigns in one step, avoiding a duplicate call to `read`.',
  },
];
