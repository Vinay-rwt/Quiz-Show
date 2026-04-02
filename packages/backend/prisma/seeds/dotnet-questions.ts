import type { Difficulty } from '@prisma/client';

interface SeedQuestion {
  difficulty: Difficulty;
  text: string;
  options: { text: string }[];
  correctIndex: number;
  explanation: string;
}

export const dotnetQuestions: SeedQuestion[] = [
  // ─── EASY (15) ────────────────────────────────────────────────────────────

  // 1. CLR
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the role of the Common Language Runtime (CLR) in .NET?',
    options: [
      { text: 'It compiles C# source code to native machine code at build time' },
      { text: 'It is a virtual machine that manages execution of .NET programs, providing services like garbage collection, JIT compilation, and type safety' },
      { text: 'It is a package manager for NuGet libraries' },
      { text: 'It is a web server that hosts ASP.NET Core applications' },
    ],
    correctIndex: 1,
    explanation:
      'The CLR is the runtime engine for .NET. It loads assemblies, compiles CIL (intermediate language) to native code via the JIT compiler, manages memory through garbage collection, and enforces type safety. All .NET languages compile down to CIL that the CLR executes.',
  },

  // 2. Managed vs unmanaged code
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the primary difference between managed code and unmanaged code in .NET?',
    options: [
      { text: 'Managed code runs faster because it bypasses the operating system' },
      { text: 'Managed code is executed by the CLR, which handles memory allocation and garbage collection; unmanaged code runs directly by the OS without CLR oversight' },
      { text: 'Unmanaged code can only be written in C#; managed code must be written in C++' },
      { text: 'Managed code cannot call native Windows APIs' },
    ],
    correctIndex: 1,
    explanation:
      'Managed code runs under CLR supervision, meaning the runtime handles object lifetimes and memory safety automatically. Unmanaged code (e.g., native C/C++ libraries) runs outside the CLR and requires manual memory management; .NET interoperates with it via P/Invoke or unsafe blocks.',
  },

  // 3. .NET runtime vs .NET Framework vs .NET Core
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which statement correctly distinguishes modern .NET (6–9) from the legacy .NET Framework?',
    options: [
      { text: '.NET Framework is cross-platform; modern .NET runs only on Windows' },
      { text: 'Modern .NET is the cross-platform, open-source successor to .NET Framework; .NET Framework is Windows-only and receives only security updates' },
      { text: 'Modern .NET replaced .NET Framework for desktop apps only; ASP.NET still uses .NET Framework' },
      { text: 'They are identical runtimes — the name change was cosmetic' },
    ],
    correctIndex: 1,
    explanation:
      'Modern .NET (formerly .NET Core, unified in .NET 5+) is cross-platform, open-source, and actively developed with new features. The .NET Framework remains Windows-only, ships with Windows, and is in maintenance mode — new applications should target modern .NET.',
  },

  // 4. NuGet packages
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is NuGet in the .NET ecosystem?',
    options: [
      { text: 'A build system that compiles .NET projects' },
      { text: 'The package manager for .NET; it lets you add, update, and restore third-party and Microsoft libraries' },
      { text: 'A testing framework for unit tests' },
      { text: 'A deployment tool that publishes apps to Azure' },
    ],
    correctIndex: 1,
    explanation:
      'NuGet is the official package manager for .NET. Packages are hosted on nuget.org (or private feeds) and referenced in a project file with `<PackageReference>`. The `dotnet restore` command downloads declared packages before building.',
  },

  // 5. Solution and project structure
  {
    difficulty: 'EASY' as Difficulty,
    text: 'In a .NET solution, what is the relationship between a `.sln` file and `.csproj` files?',
    options: [
      { text: 'A `.csproj` file contains the entire solution; `.sln` files are optional build caches' },
      { text: 'A `.sln` (solution) file is a container that groups one or more `.csproj` (project) files so they can be built and managed together in an IDE' },
      { text: '`.sln` files are used only by Visual Studio; `dotnet` CLI ignores them' },
      { text: 'Each `.sln` file defines a single microservice; `.csproj` files define individual methods' },
    ],
    correctIndex: 1,
    explanation:
      'A solution file (`.sln`) organises multiple projects and their dependencies so tools like `dotnet build` or Visual Studio can process them as a unit. Each `.csproj` file defines one project — its target framework, dependencies, and build settings.',
  },

  // 6. appsettings.json
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is `appsettings.json` used for in an ASP.NET Core application?',
    options: [
      { text: 'It stores the compiled IL code for faster startup' },
      { text: 'It is a JSON configuration file that holds application settings such as connection strings, logging levels, and feature flags' },
      { text: 'It defines the HTTP routes for the API' },
      { text: 'It replaces `Program.cs` as the application entry point' },
    ],
    correctIndex: 1,
    explanation:
      'ASP.NET Core uses `appsettings.json` as the default configuration source. The `IConfiguration` system reads it at startup and merges it with environment variables, command-line arguments, and environment-specific files like `appsettings.Production.json`.',
  },

  // 7. IHostedService basics
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What interface do you implement to run background work that starts and stops with the .NET host?',
    options: [
      { text: '`IBackgroundWorker`' },
      { text: '`IHostedService`' },
      { text: '`IServiceProvider`' },
      { text: '`IApplicationLifetime`' },
    ],
    correctIndex: 1,
    explanation:
      '`IHostedService` exposes `StartAsync` and `StopAsync` methods that the generic host calls when the application starts and shuts down. For long-running loops, `BackgroundService` is a convenient abstract base class that implements `IHostedService`.',
  },

  // 8. ASP.NET Core middleware pipeline
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the ASP.NET Core middleware pipeline?',
    options: [
      { text: 'A database connection pool managed by the CLR' },
      { text: 'A chain of components that each receive an HTTP request, optionally perform work, and pass it to the next component or generate a response' },
      { text: 'A background thread pool for handling async I/O operations' },
      { text: 'The NuGet restore process that runs before the first request' },
    ],
    correctIndex: 1,
    explanation:
      'The middleware pipeline in ASP.NET Core is assembled in `Program.cs` using `app.Use...` extension methods. Each middleware can inspect or transform the request/response and call `next()` to pass control to the following middleware, or short-circuit the pipeline by writing a response directly.',
  },

  // 9. HTTP verbs in ASP.NET Core
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which attribute maps a controller action to HTTP GET requests in ASP.NET Core?',
    options: [
      { text: '`[Route("GET")]`' },
      { text: '`[HttpGet]`' },
      { text: '`[GetMethod]`' },
      { text: '`[ActionGet]`' },
    ],
    correctIndex: 1,
    explanation:
      '`[HttpGet]` (along with `[HttpPost]`, `[HttpPut]`, `[HttpDelete]`, etc.) are ASP.NET Core verb attributes that constrain a controller action to the specified HTTP method. They can also optionally include a route template, e.g. `[HttpGet("{id}")]`.',
  },

  // 10. Dependency Injection basics
  {
    difficulty: 'EASY' as Difficulty,
    text: 'How do you register a service so it can be injected in ASP.NET Core?',
    options: [
      { text: 'Decorate the class with `[Injectable]`' },
      { text: 'Call `services.AddSingleton`, `services.AddScoped`, or `services.AddTransient` in `Program.cs`' },
      { text: 'Add the class to `appsettings.json` under the "Services" key' },
      { text: 'Mark the constructor with the `[Inject]` attribute' },
    ],
    correctIndex: 1,
    explanation:
      'ASP.NET Core has a built-in IoC container. Services are registered in `Program.cs` (or `Startup.cs` in older templates) on the `IServiceCollection`. At runtime, the container resolves constructor parameters by matching registered types, eliminating manual object creation.',
  },

  // 11. `dotnet run` vs `dotnet watch`
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does `dotnet watch run` do differently compared to `dotnet run`?',
    options: [
      { text: 'It watches CPU usage and kills the process if it spikes' },
      { text: 'It runs the application and automatically restarts it whenever source files change, enabling a hot-reload development loop' },
      { text: 'It streams application logs to the console in color' },
      { text: 'It compiles the project in Release configuration' },
    ],
    correctIndex: 1,
    explanation:
      '`dotnet watch run` uses the file-system watcher to detect source changes and then restarts (or hot-reloads, for supported scenarios) the running application. This dramatically speeds up the inner development loop without requiring manual restarts.',
  },

  // 12. Value types vs reference types
  {
    difficulty: 'EASY' as Difficulty,
    text: 'In .NET, where are value types (e.g., `int`, `struct`) typically allocated?',
    options: [
      { text: 'Always on the managed heap, like reference types' },
      { text: 'On the stack when declared as local variables, or inline within the containing object on the heap' },
      { text: 'In a special read-only segment of memory' },
      { text: 'They are never allocated — they are resolved at compile time' },
    ],
    correctIndex: 1,
    explanation:
      'Value types stored as local variables live on the thread stack, giving fast allocation and deallocation without GC pressure. When a value type is a field of a class (reference type), it is stored inline within that object on the heap. Boxed value types are also heap-allocated.',
  },

  // 13. Garbage collector basics
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which statement best describes how the .NET garbage collector reclaims memory?',
    options: [
      { text: 'It uses reference counting — an object is freed when its reference count reaches zero' },
      { text: 'It periodically identifies objects on the managed heap that are no longer reachable from any root (stack, static fields, GC handles) and frees their memory' },
      { text: 'The developer must explicitly call `GC.Free(obj)` to release an object' },
      { text: 'Memory is only reclaimed when the application exits' },
    ],
    correctIndex: 1,
    explanation:
      'The .NET GC uses a tracing/mark-and-sweep approach organised into three generations (0, 1, 2). It starts from GC roots, marks all reachable objects, and then sweeps unmarked objects. Short-lived objects in Gen0 are collected most frequently at low cost.',
  },

  // 14. `async`/`await` — what it is
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does the `await` keyword do when applied to a `Task` in C#?',
    options: [
      { text: 'It blocks the current thread until the task completes, similar to `Task.Wait()`' },
      { text: 'It suspends the async method without blocking the thread, returning control to the caller until the awaited task finishes' },
      { text: 'It cancels the task if it does not complete within a timeout' },
      { text: 'It runs the task on a background thread using `ThreadPool`' },
    ],
    correctIndex: 1,
    explanation:
      '`await` is syntactic sugar over continuations. It pauses execution of the current async method and releases the thread back to the thread pool (or caller). When the awaited task completes, execution resumes after the `await` expression — without blocking any thread while waiting.',
  },

  // 15. `IDisposable` / `using`
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the purpose of the `using` statement in C# when used with an object?',
    options: [
      { text: 'It imports a namespace into the current file' },
      { text: 'It ensures `Dispose()` is called on the object when the block exits, even if an exception is thrown, releasing unmanaged resources deterministically' },
      { text: 'It declares a variable as read-only within the block' },
      { text: 'It creates a deep copy of the object for safe mutation' },
    ],
    correctIndex: 1,
    explanation:
      'The `using` statement calls `Dispose()` on the object when control leaves the block, providing deterministic cleanup. This is essential for objects holding unmanaged resources (file handles, database connections, HTTP clients) since the GC alone cannot guarantee timely release.',
  },

  // ─── MEDIUM (15) ──────────────────────────────────────────────────────────

  // 16. ASP.NET Core routing
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'In ASP.NET Core, what is the difference between conventional routing and attribute routing?',
    options: [
      { text: 'Conventional routing is for REST APIs; attribute routing is for MVC views' },
      { text: 'Conventional routing maps URLs using patterns defined centrally (e.g., `{controller}/{action}/{id?}`); attribute routing uses `[Route]` attributes directly on controllers and actions for explicit per-action URL templates' },
      { text: 'Attribute routing requires a separate NuGet package; conventional routing is built-in' },
      { text: 'They are identical — the terms are interchangeable' },
    ],
    correctIndex: 1,
    explanation:
      'Conventional routing is configured once (typically in `Program.cs`) and infers controller/action names from URL segments. Attribute routing annotates each controller/action with its exact URL template, giving finer control and making routes self-documenting — the recommended approach for Web APIs.',
  },

  // 17. Entity Framework Core — DbContext
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the role of `DbContext` in Entity Framework Core?',
    options: [
      { text: 'It is a static helper class for building raw SQL queries' },
      { text: 'It is the primary class that coordinates database operations; it represents a session with the database, tracks entity changes, and maps .NET objects to database tables via `DbSet<T>` properties' },
      { text: 'It is a connection pool that manages multiple database connections' },
      { text: 'It is an attribute applied to model classes to mark them as database entities' },
    ],
    correctIndex: 1,
    explanation:
      '`DbContext` is the unit of work and repository in EF Core. It maintains a change tracker that records modifications to entities, and calling `SaveChangesAsync()` translates those changes into SQL INSERT/UPDATE/DELETE statements. `DbSet<T>` properties represent database tables.',
  },

  // 18. EF Core migrations
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does running `dotnet ef migrations add <Name>` do in an Entity Framework Core project?',
    options: [
      { text: 'It immediately applies schema changes to the production database' },
      { text: 'It generates a migration file containing the `Up` and `Down` methods that describe the schema changes needed to bring the database in sync with the current model' },
      { text: 'It creates a new `DbContext` subclass' },
      { text: 'It removes an existing migration from the history table' },
    ],
    correctIndex: 1,
    explanation:
      'The `migrations add` command compares the current EF model snapshot against the previous one and scaffolds a new migration class. The `Up` method contains the schema changes (e.g., `CreateTable`, `AddColumn`); `Down` reverses them. `dotnet ef database update` then applies pending migrations.',
  },

  // 19. Service lifetimes
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'In ASP.NET Core DI, what is the difference between `Singleton`, `Scoped`, and `Transient` service lifetimes?',
    options: [
      { text: 'Singleton lasts one request; Scoped lasts the application lifetime; Transient is created per dependency' },
      { text: 'Singleton is created once for the application lifetime; Scoped is created once per HTTP request; Transient is created each time it is injected' },
      { text: 'All three are equivalent for stateless services' },
      { text: 'Transient is created at startup; Scoped is per controller; Singleton is per action method' },
    ],
    correctIndex: 1,
    explanation:
      'Singleton instances are shared for the entire app lifetime — suitable for stateless, thread-safe services. Scoped instances live for one request (or one DI scope), making them ideal for `DbContext`. Transient instances are created fresh every injection, keeping state isolated.',
  },

  // 20. IConfiguration
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'How do you read a nested configuration value from `appsettings.json` using `IConfiguration` in .NET?',
    options: [
      { text: '`config.GetObject("Section.Key")`' },
      { text: '`config["Section:Key"]` or `config.GetSection("Section").GetValue<string>("Key")`' },
      { text: '`config.Read<string>("Section/Key")`' },
      { text: '`config.Deserialize("Section", "Key")`' },
    ],
    correctIndex: 1,
    explanation:
      '`IConfiguration` uses a colon (`:`) as the hierarchy separator. `config["Section:Key"]` is the shorthand indexer syntax, while `GetSection("Section").GetValue<T>("Key")` is more explicit. You can also use `config.GetSection("Section").Get<MyOptions>()` to bind an entire section to a typed POCO.',
  },

  // 21. Middleware order
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Why does the order in which middleware is added in `Program.cs` matter in ASP.NET Core?',
    options: [
      { text: 'It does not matter; middleware is sorted alphabetically at runtime' },
      { text: 'Middleware executes in the order it is registered; placing authentication before authorisation ensures the user identity is established before access checks run' },
      { text: 'The order only affects performance, not correctness' },
      { text: 'Only the first and last middleware in the pipeline affect request processing' },
    ],
    correctIndex: 1,
    explanation:
      'The pipeline is a sequential chain: each `app.Use...` call adds a component at the next position. If `UseAuthentication` is placed after `UseAuthorization`, the identity is not populated when the authorisation check runs and requests will be rejected as unauthenticated. Order is critical for correctness.',
  },

  // 22. Minimal APIs
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the primary benefit of Minimal APIs (introduced in .NET 6) over controller-based APIs?',
    options: [
      { text: 'Minimal APIs support more HTTP verbs than controller-based APIs' },
      { text: 'They reduce ceremony by letting you define routes and handlers directly in `Program.cs` without controllers, attributes, or action method conventions, resulting in less boilerplate' },
      { text: 'Minimal APIs are significantly faster at runtime due to a different serialisation engine' },
      { text: 'They eliminate the need for dependency injection' },
    ],
    correctIndex: 1,
    explanation:
      'Minimal APIs use a lambda-based routing API (`app.MapGet`, `app.MapPost`, etc.) that requires no controller class, no `[ApiController]` attribute, and no action method conventions. This reduces startup code and is well-suited for microservices and simple endpoints.',
  },

  // 23. Blazor components
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'In Blazor, what file extension and language are used to define a component?',
    options: [
      { text: '`.jsx` files using JavaScript and HTML' },
      { text: '`.razor` files using C# and Razor syntax (HTML with `@` directives for C# code)' },
      { text: '`.cshtml` files using pure C# classes' },
      { text: '`.blazor` files using TypeScript' },
    ],
    correctIndex: 1,
    explanation:
      'Blazor components are `.razor` files that combine Razor markup with C# in `@code { }` blocks. The Razor compiler generates a C# class from each file. Blazor can run this component either server-side (Blazor Server) or in the browser via WebAssembly (Blazor WASM).',
  },

  // 24. SignalR basics
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What problem does ASP.NET Core SignalR solve?',
    options: [
      { text: 'It provides a type-safe HTTP client for calling REST APIs' },
      { text: 'It enables real-time, bidirectional communication between server and clients by abstracting transports (WebSockets, Server-Sent Events, long polling) behind a single Hub API' },
      { text: 'It is a message broker replacement for RabbitMQ' },
      { text: 'It batches outgoing HTTP responses to improve throughput' },
    ],
    correctIndex: 1,
    explanation:
      'SignalR provides a high-level API for push-based communication. The server can call methods on connected clients at any time, and clients can call methods on the server Hub. SignalR automatically selects the best available transport and handles reconnection logic.',
  },

  // 25. Background Services
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the recommended way to implement a long-running background loop (e.g., polling a queue) in .NET?',
    options: [
      { text: 'Spawn a raw `Thread` in the `Main` method' },
      { text: 'Extend `BackgroundService` and implement `ExecuteAsync(CancellationToken stoppingToken)`, registering it via `services.AddHostedService<T>()`' },
      { text: 'Use a `System.Timers.Timer` inside a static class' },
      { text: 'Call `Task.Run` inside a controller action' },
    ],
    correctIndex: 1,
    explanation:
      '`BackgroundService` is the built-in abstract base for long-running hosted services. `ExecuteAsync` runs for the lifetime of the application and receives a `CancellationToken` that is triggered on shutdown. Registering with `AddHostedService` integrates it with the generic host lifecycle.',
  },

  // 26. Health Checks
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'How do you expose a health check endpoint in ASP.NET Core?',
    options: [
      { text: 'Install the `Microsoft.Health` package and decorate controllers with `[HealthCheck]`' },
      { text: 'Call `services.AddHealthChecks()` in the service registration, then `app.MapHealthChecks("/health")` in the pipeline to expose an endpoint that reports the application health status' },
      { text: 'Add a `GET /health` route manually and return HTTP 200 from a controller' },
      { text: 'Configure the `HEALTHCHECK` key in `appsettings.json`' },
    ],
    correctIndex: 1,
    explanation:
      'ASP.NET Core has first-class health check support. `AddHealthChecks()` registers the service, and custom checks (database connectivity, external services) are added via `.AddCheck<T>()`. `MapHealthChecks` wires the endpoint; orchestrators like Kubernetes probe it to determine pod readiness.',
  },

  // 27. LINQ queries with EF Core
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'When using LINQ with EF Core, what does calling `.AsNoTracking()` on a query do?',
    options: [
      { text: 'It disables query logging in the database provider' },
      { text: 'It instructs EF Core not to add the returned entities to the change tracker, improving read performance when you do not intend to update the data' },
      { text: 'It prevents the query from being translated to SQL and forces in-memory evaluation' },
      { text: 'It applies a `NOLOCK` hint to the underlying SQL query' },
    ],
    correctIndex: 1,
    explanation:
      'By default, EF Core tracks every queried entity so it can detect changes for `SaveChanges`. `.AsNoTracking()` skips this overhead entirely, which is a significant performance win for read-only scenarios (e.g., displaying a list of records in a UI).',
  },

  // 28. `record` types
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What distinguishes a C# `record` from a regular `class`?',
    options: [
      { text: 'Records are value types allocated on the stack; classes are reference types' },
      { text: 'Records provide built-in value-based equality, immutability (with `init` setters), and a generated `ToString` that includes all property values; classes use reference equality by default' },
      { text: 'Records cannot implement interfaces; classes can' },
      { text: 'Records are serialised to binary automatically; classes use JSON' },
    ],
    correctIndex: 1,
    explanation:
      'Records (introduced in C# 9) are reference types that automatically synthesise `Equals`, `GetHashCode`, and `ToString` based on their property values. Combined with `init`-only setters, they make immutable data transfer objects (DTOs) concise. `with` expressions enable non-destructive mutation.',
  },

  // 29. `IOptions<T>` pattern
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the purpose of the `IOptions<T>` pattern in ASP.NET Core?',
    options: [
      { text: 'It provides a way to pass command-line arguments to the application' },
      { text: 'It allows you to bind a strongly-typed POCO to a configuration section and inject it via DI, giving compile-time safety over raw `IConfiguration` string keys' },
      { text: 'It caches database query results in memory' },
      { text: 'It enables hot-swapping middleware at runtime' },
    ],
    correctIndex: 1,
    explanation:
      'The options pattern (`services.Configure<MySettings>(config.GetSection("MySettings"))`) binds config values to a typed class. Consuming code injects `IOptions<MySettings>` to access `Value`, gaining IntelliSense, null safety, and validation support via `IValidateOptions<T>`.',
  },

  // 30. `CancellationToken` propagation
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Why should ASP.NET Core controller actions and service methods accept and propagate `CancellationToken`?',
    options: [
      { text: 'Because ASP.NET Core requires it as a method signature convention' },
      { text: 'So that when the HTTP client disconnects or times out, the token is cancelled and downstream work (database queries, HTTP calls) can be abandoned early, freeing resources' },
      { text: 'To enable automatic retry logic in the framework' },
      { text: 'Because `async` methods cannot compile without a `CancellationToken` parameter' },
    ],
    correctIndex: 1,
    explanation:
      'ASP.NET Core sets `HttpContext.RequestAborted` when the client disconnects. Passing this token through async call chains lets EF Core queries, `HttpClient` calls, and custom operations stop early rather than completing work whose result will never be delivered, improving server throughput under load.',
  },

  // ─── HARD (10) ────────────────────────────────────────────────────────────

  // 31. Memory-mapped files
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is a memory-mapped file in .NET and when would you use `System.IO.MemoryMappedFiles`?',
    options: [
      { text: 'An in-memory `MemoryStream` that automatically flushes to disk' },
      { text: 'A file mapped into the process virtual address space via the OS, enabling zero-copy random access to large files and efficient inter-process shared memory without reading the entire file into a managed array' },
      { text: 'A file stored in the managed heap so the GC can pin it during I/O operations' },
      { text: 'A caching layer for `FileStream` that reduces syscall overhead' },
    ],
    correctIndex: 1,
    explanation:
      'Memory-mapped files (`MemoryMappedFile.CreateFromFile`) let the OS page-in only the regions of a file that are actually accessed, making them ideal for large binary files, databases, and IPC shared memory. `MemoryMappedViewAccessor` and `MemoryMappedViewStream` expose the mapped region as readable/writable memory.',
  },

  // 32. gRPC with .NET
  {
    difficulty: 'HARD' as Difficulty,
    text: 'In a .NET gRPC project, where are service contracts defined, and how does C# code get generated from them?',
    options: [
      { text: 'Contracts are C# interfaces annotated with `[GrpcService]`; no code generation is needed' },
      { text: 'Contracts are defined in `.proto` (Protocol Buffers) files; adding a `<Protobuf>` item in the `.csproj` triggers the Grpc.Tools build task to auto-generate strongly-typed C# server stubs and client proxies' },
      { text: 'Contracts are JSON schemas; `dotnet grpc generate` produces C# from them' },
      { text: 'Contracts are OpenAPI specs; the gRPC SDK converts them at runtime' },
    ],
    correctIndex: 1,
    explanation:
      'gRPC uses Protocol Buffers for its IDL. The `.proto` file defines services and messages, and `Grpc.Tools` (invoked automatically via the `<Protobuf Include="...">` MSBuild item) generates `*Base` server classes and `*Client` types at build time. This ensures the client and server share the exact same contract.',
  },

  // 33. Kestrel server internals
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What I/O model does Kestrel (the default ASP.NET Core web server) use to achieve high throughput?',
    options: [
      { text: 'One dedicated OS thread per connection (thread-per-request model)' },
      { text: 'A non-blocking, event-loop model built on `System.IO.Pipelines` and libuv-style I/O completion ports; a small thread pool handles many concurrent connections without blocking threads on I/O waits' },
      { text: 'Synchronous blocking I/O with a large managed thread pool' },
      { text: 'It delegates all I/O to IIS; Kestrel only handles request routing' },
    ],
    correctIndex: 1,
    explanation:
      'Kestrel is built on `System.IO.Pipelines`, which provides back-pressure-aware, zero-copy buffer management. Combined with async/await and `SocketAsyncEventArgs`-style completions, it handles tens of thousands of concurrent connections on a handful of threads, consistently ranking at the top of TechEmpower benchmarks.',
  },

  // 34. AOT compilation
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What trade-off does Native AOT compilation introduce compared to standard JIT compilation in .NET?',
    options: [
      { text: 'AOT produces larger binaries but the app cannot run on Windows' },
      { text: 'AOT produces a fully native binary with fast startup and lower memory usage, but disallows runtime code generation (reflection emit, `dynamic`, unconstrained generics), requiring source generators or trimming-compatible patterns' },
      { text: 'AOT removes the need for any NuGet packages' },
      { text: 'AOT improves throughput on long-running workloads more than JIT with tiered compilation' },
    ],
    correctIndex: 1,
    explanation:
      'Native AOT (available in .NET 7+) compiles the entire application ahead-of-time to native code, eliminating JIT startup cost and reducing memory footprint — ideal for serverless and CLI tools. The restriction is that runtime reflection-based patterns (like unconstrained `Activator.CreateInstance` or LINQ expression trees compiled at runtime) must be replaced with source-generated alternatives.',
  },

  // 35. .NET Aspire
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What does .NET Aspire provide that differs from a standard ASP.NET Core project template?',
    options: [
      { text: 'It is a UI component library similar to MudBlazor' },
      { text: 'It is an opinionated, cloud-ready stack for building observable distributed applications; it includes an AppHost orchestrator for local multi-service development, a dashboard for traces/metrics/logs, and composable integrations for Redis, databases, and message brokers' },
      { text: 'It replaces the generic host with a new hosting model incompatible with `IHostedService`' },
      { text: 'It is a deployment tool that provisions Azure resources from C# code' },
    ],
    correctIndex: 1,
    explanation:
      '.NET Aspire (GA in .NET 8) tackles the complexity of running multiple microservices locally. The AppHost project declares each service and its dependencies in C#; Aspire starts them, wires service discovery, injects connection strings, and exposes an OpenTelemetry-powered dashboard — reducing "works on my machine" friction.',
  },

  // 36. YARP reverse proxy
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is YARP and what makes it different from configuring a reverse proxy in nginx?',
    options: [
      { text: 'YARP is a .NET HTTP client wrapper; nginx is a separate process' },
      { text: 'YARP (Yet Another Reverse Proxy) is a .NET library that runs inside an ASP.NET Core process, allowing the proxy rules to be programmed in C# and updated dynamically at runtime without restarting, unlike static nginx config files' },
      { text: 'YARP is Microsoft\'s fork of nginx compiled for Windows only' },
      { text: 'YARP handles only WebSocket traffic; nginx handles HTTP/1.1 and HTTP/2' },
    ],
    correctIndex: 1,
    explanation:
      'YARP is a reverse proxy toolkit that integrates into the ASP.NET Core pipeline as middleware. Routes and clusters can be loaded from `appsettings.json` or programmatically via `IProxyConfigProvider`, enabling dynamic routing, load balancing, header transforms, and custom middleware chains — all within a single managed .NET process.',
  },

  // 37. Source-generated JSON serialisation
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What advantage does `System.Text.Json` source generation (`JsonSerializerContext`) offer over reflection-based serialisation?',
    options: [
      { text: 'It supports more JSON features than the default serialiser' },
      { text: 'It generates serialisation logic at compile time, eliminating runtime reflection; this makes it compatible with Native AOT, reduces startup overhead, and improves throughput because type metadata is baked in rather than discovered dynamically' },
      { text: 'It automatically handles circular references without configuration' },
      { text: 'It replaces `System.Text.Json` with a faster Newtonsoft engine' },
    ],
    correctIndex: 1,
    explanation:
      'By decorating a `partial class` that derives from `JsonSerializerContext` with `[JsonSerializable(typeof(MyType))]`, the source generator produces fully optimised serialise/deserialise code at build time. This is mandatory for Native AOT (where reflection is restricted) and measurably faster in benchmarks due to eliminated dictionary lookups for property metadata.',
  },

  // 38. System.Threading.Channels
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What scenario is `System.Threading.Channels` designed for in high-performance .NET applications?',
    options: [
      { text: 'Managing database connection pools across multiple threads' },
      { text: 'Providing a high-performance, backpressure-aware producer-consumer pipeline between async tasks without the overhead of `BlockingCollection<T>` or `ConcurrentQueue<T>` with manual signalling' },
      { text: 'Replacing `async`/`await` with a continuation-passing callback model' },
      { text: 'Synchronising access to shared state using lock-free compare-and-swap operations' },
    ],
    correctIndex: 1,
    explanation:
      '`Channel<T>` provides `ChannelWriter<T>` and `ChannelReader<T>` for decoupled producer-consumer workflows. `BoundedChannel` adds backpressure (the writer blocks/drops when the buffer is full), and all operations are allocation-efficient. It is the recommended primitive for building async pipelines in ASP.NET Core, replacing older `BlockingCollection`-based patterns.',
  },

  // 39. Tiered compilation and dynamic PGO
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is Dynamic Profile-Guided Optimisation (Dynamic PGO) in the .NET runtime?',
    options: [
      { text: 'A build-time tool that analyses test runs to pre-optimise AOT binaries' },
      { text: 'A runtime feature where the JIT first compiles methods quickly at Tier 0, instruments them to collect call-site and type data, then recompiles hot paths at Tier 1 with full optimisations informed by real execution profiles — unlike traditional PGO which requires a separate profiling run' },
      { text: 'A GC mode that adjusts generation sizes based on allocation patterns at startup' },
      { text: 'A CPU branch predictor hint inserted by the compiler for `if` statements' },
    ],
    correctIndex: 1,
    explanation:
      'Dynamic PGO (enabled by default from .NET 7) combines tiered JIT compilation with runtime instrumentation. Methods start at a fast Tier 0 JIT; the runtime records which branches are taken, which virtual methods are called, and which casts succeed. Tier 1 recompilation uses this live data for inlining, devirtualisation, and branch layout optimisations — delivering near-profile-guided performance without offline profiling.',
  },

  // 40. Custom middleware — IMiddleware vs RequestDelegate
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is the key difference between implementing custom middleware via `IMiddleware` versus the convention-based `RequestDelegate` approach?',
    options: [
      { text: '`IMiddleware` runs before the routing middleware; convention-based middleware runs after' },
      { text: '`IMiddleware` is a strongly-typed interface (`InvokeAsync(HttpContext, RequestDelegate)`) resolved from DI per-request, enabling scoped dependency injection into middleware; convention-based (constructor-injected `RequestDelegate`) creates middleware once as a singleton, making scoped service injection unsafe without using `IServiceScopeFactory`' },
      { text: 'Convention-based middleware supports `async`; `IMiddleware` is synchronous only' },
      { text: '`IMiddleware` is for Minimal API handlers; convention-based is for MVC only' },
    ],
    correctIndex: 1,
    explanation:
      'Convention-based middleware is instantiated once and its constructor dependencies are resolved as singletons. Injecting a scoped service (like `DbContext`) into the constructor causes a "captive dependency" bug. `IMiddleware` is activated per-request via the DI container, so its `InvokeAsync` method can safely receive scoped services — making it the preferred pattern for middleware with request-scoped dependencies.',
  },
];
