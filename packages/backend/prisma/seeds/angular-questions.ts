import type { Difficulty } from '@prisma/client';

interface SeedQuestion {
  difficulty: Difficulty;
  text: string;
  options: { text: string }[];
  correctIndex: number;
  explanation: string;
}

export const angularQuestions: SeedQuestion[] = [
  // ─── EASY (15) ────────────────────────────────────────────────────────────

  // 1. Component decorator
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which decorator is used to define an Angular component?',
    options: [
      { text: '@NgModule' },
      { text: '@Injectable' },
      { text: '@Component' },
      { text: '@Directive' },
    ],
    correctIndex: 2,
    explanation:
      '`@Component` is the decorator that marks a TypeScript class as an Angular component. It accepts metadata such as `selector`, `templateUrl`, and `styleUrls` that Angular\'s compiler uses to process the class.',
  },

  // 2. Interpolation
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which syntax represents interpolation data binding in an Angular template?',
    options: [
      { text: '[property]="expression"' },
      { text: '(event)="handler()"' },
      { text: '{{ expression }}' },
      { text: '[(ngModel)]="value"' },
    ],
    correctIndex: 2,
    explanation:
      'Double curly braces `{{ expression }}` are Angular\'s interpolation syntax. Angular evaluates the expression in the component\'s context and inserts the string result into the template.',
  },

  // 3. Property binding
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does `[disabled]="isDisabled"` demonstrate in an Angular template?',
    options: [
      { text: 'Event binding' },
      { text: 'Two-way binding' },
      { text: 'Interpolation' },
      { text: 'Property binding' },
    ],
    correctIndex: 3,
    explanation:
      'Square brackets denote property binding. Angular evaluates the expression on the right and sets the element\'s DOM property (here `disabled`) to the result. It flows data one-way from component to template.',
  },

  // 4. Event binding
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which syntax correctly binds a button\'s click event to a component method in Angular?',
    options: [
      { text: '[click]="handleClick()"' },
      { text: '{{click}}="handleClick()"' },
      { text: '(click)="handleClick()"' },
      { text: 'on-click="handleClick()"' },
    ],
    correctIndex: 2,
    explanation:
      'Parentheses denote event binding in Angular templates. `(click)="handleClick()"` listens to the DOM `click` event and calls the component\'s `handleClick` method when it fires.',
  },

  // 5. Two-way binding
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the "banana-in-a-box" syntax in Angular, and what does it achieve?',
    options: [
      { text: '`{[value]}` — it achieves structural transformation of the DOM' },
      { text: '`[(ngModel)]` — it combines property binding and event binding for two-way data flow' },
      { text: '`[[value]]` — it achieves deep property binding on nested objects' },
      { text: '`((value))` — it creates a two-way event subscription' },
    ],
    correctIndex: 1,
    explanation:
      '`[(ngModel)]` is called "banana-in-a-box" because `()` inside `[]` resembles a banana in a box. It is shorthand for both binding a property value and listening for the corresponding change event, enabling two-way synchronisation between a form control and component state.',
  },

  // 6. ngIf
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does `*ngIf="condition"` do in an Angular template?',
    options: [
      { text: 'It adds or removes the element from the DOM based on the truthiness of `condition`' },
      { text: 'It toggles the element\'s CSS `display` property between `block` and `none`' },
      { text: 'It hides the element using the `hidden` HTML attribute' },
      { text: 'It adds a CSS class to the element when `condition` is true' },
    ],
    correctIndex: 0,
    explanation:
      '`*ngIf` is a structural directive that physically adds or removes the host element (and its children) from the DOM based on the expression. When false, no DOM node exists — unlike `display: none` which keeps the element in the DOM.',
  },

  // 7. ngFor
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the correct syntax to iterate over an array called `items` in Angular?',
    options: [
      { text: '`*ngFor="item of items"`' },
      { text: '`*ngFor="let item of items"`' },
      { text: '`[ngFor]="items"`' },
      { text: '`(ngFor)="item in items"`' },
    ],
    correctIndex: 1,
    explanation:
      '`*ngFor="let item of items"` declares a local template variable `item` for each element in the `items` array. The `let` keyword is required; omitting it causes a template parse error.',
  },

  // 8. ngClass
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which of the following correctly uses `ngClass` to conditionally apply the CSS class "active"?',
    options: [
      { text: '`[ngClass]="active"`' },
      { text: '`*ngClass="isActive ? \'active\' : \'\'"`' },
      { text: '`[ngClass]="{ active: isActive }"`' },
      { text: '`(ngClass)="isActive"`' },
    ],
    correctIndex: 2,
    explanation:
      '`[ngClass]` accepts an object where each key is a class name and the value is a boolean expression. When the expression is truthy the class is added; when falsy it is removed. This is the idiomatic object-map form.',
  },

  // 9. ngStyle
  {
    difficulty: 'EASY' as Difficulty,
    text: 'How do you use `ngStyle` to set the font size from a component property `fontSize`?',
    options: [
      { text: '`[ngStyle]="fontSize"`' },
      { text: '`[ngStyle]="{ \'font-size\': fontSize + \'px\' }"`' },
      { text: '`*ngStyle="fontSize: 16"`' },
      { text: '`(ngStyle)="{ fontSize }"`' },
    ],
    correctIndex: 1,
    explanation:
      '`[ngStyle]` accepts an object whose keys are CSS property names (as strings) and values are the style values. You can build the value dynamically, for example by appending a unit like `"px"` to a numeric variable.',
  },

  // 10. Pipes
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the purpose of the pipe operator `|` in Angular templates?',
    options: [
      { text: 'It is a logical OR operator for template expressions' },
      { text: 'It transforms a value through a pipe class before display, e.g. formatting dates or currency' },
      { text: 'It passes events between sibling components' },
      { text: 'It concatenates two template strings' },
    ],
    correctIndex: 1,
    explanation:
      'Pipes are pure transformation functions applied in the template. `{{ price | currency:\'USD\' }}` passes `price` to Angular\'s built-in `CurrencyPipe`, which formats and returns the localised string for display.',
  },

  // 11. NgModule
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the role of `NgModule` in a traditional Angular application?',
    options: [
      { text: 'It is a base class that all components must extend' },
      { text: 'It is a TypeScript namespace that groups related files' },
      { text: 'It is a decorator that declares a cohesive compilation context: components, directives, pipes, and providers' },
      { text: 'It is used exclusively for lazy-loading routes' },
    ],
    correctIndex: 2,
    explanation:
      '`@NgModule` groups related Angular building blocks into a compilation unit. The `declarations` array lists components/directives/pipes; `imports` brings in other modules; `providers` registers services; `exports` makes declarations available to other modules.',
  },

  // 12. @Input
  {
    difficulty: 'EASY' as Difficulty,
    text: 'How does a child component expose a property so a parent can pass data into it?',
    options: [
      { text: 'By prefixing the property with `public`' },
      { text: 'By decorating the property with `@Input()`' },
      { text: 'By adding the property to the `exports` array of its NgModule' },
      { text: 'By emitting the value through an `EventEmitter`' },
    ],
    correctIndex: 1,
    explanation:
      '`@Input()` marks a class property as an input binding. The parent sets it with property binding syntax `[childProp]="value"`. Angular then populates the decorated property before the child\'s change detection runs.',
  },

  // 13. @Output
  {
    difficulty: 'EASY' as Difficulty,
    text: 'How does a child component send data or events to its parent in Angular?',
    options: [
      { text: 'By injecting the parent component via the constructor' },
      { text: 'By directly modifying a shared service' },
      { text: 'By decorating an `EventEmitter` property with `@Output()` and calling `.emit()`' },
      { text: 'By updating a property decorated with `@Input()`' },
    ],
    correctIndex: 2,
    explanation:
      '`@Output()` exposes an `EventEmitter` that the parent can listen to with event-binding syntax `(childEvent)="handler($event)"`. The child calls `this.myOutput.emit(data)` to publish a value up to the parent.',
  },

  // 14. Template reference variable
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does `#myInput` do when placed on an HTML element in an Angular template?',
    options: [
      { text: 'It assigns the element a CSS ID of "myInput"' },
      { text: 'It creates a template reference variable that holds a reference to the element or directive instance' },
      { text: 'It registers the element with the parent component\'s NgModule' },
      { text: 'It applies the `myInput` directive to the element' },
    ],
    correctIndex: 1,
    explanation:
      'A template reference variable (prefixed with `#`) gives you a handle to a DOM element, component, or directive instance directly in the template. For example, `<input #myInput>` lets you reference `myInput.value` elsewhere in the same template.',
  },

  // 15. ViewChild basic
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does `@ViewChild(\'myInput\') inputRef!: ElementRef;` do in an Angular component class?',
    options: [
      { text: 'It creates a new input element and appends it to the component\'s view' },
      { text: 'It queries the component\'s template for the element with template reference `#myInput` and assigns it to `inputRef`' },
      { text: 'It listens for events emitted from a child component named `myInput`' },
      { text: 'It declares an `@Input` property named `myInput` of type `ElementRef`' },
    ],
    correctIndex: 1,
    explanation:
      '`@ViewChild` queries the component\'s own template (not its children\'s templates) for the first match — by template reference variable name, component type, or directive type — and injects the result. `inputRef.current` is populated after `ngAfterViewInit`.',
  },

  // ─── MEDIUM (15) ──────────────────────────────────────────────────────────

  // 16. Dependency Injection
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'In Angular\'s dependency injection system, what does `providedIn: \'root\'` mean on an `@Injectable` decorator?',
    options: [
      { text: 'The service is provided only in the root component\'s template' },
      { text: 'A single instance of the service is created for the entire application and tree-shaken if unused' },
      { text: 'The service is provided in every NgModule automatically' },
      { text: 'The service must be explicitly listed in a module\'s `providers` array' },
    ],
    correctIndex: 1,
    explanation:
      '`providedIn: \'root\'` registers the service in the root injector as a singleton available application-wide. It also enables tree-shaking: if nothing injects the service, the Angular build tools can omit it from the bundle.',
  },

  // 17. RxJS map operator
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does the RxJS `map` operator do?',
    options: [
      { text: 'Subscribes to an inner observable and flattens its emissions' },
      { text: 'Filters values emitted by an observable based on a predicate' },
      { text: 'Transforms each emitted value using a projection function and re-emits the result' },
      { text: 'Merges multiple observables into one' },
    ],
    correctIndex: 2,
    explanation:
      '`map(fn)` applies `fn` to each value emitted by the source observable and emits the transformed value downstream. It is the observable equivalent of `Array.prototype.map`, operating on a stream over time.',
  },

  // 18. switchMap
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Why is `switchMap` preferred over `mergeMap` for HTTP search requests triggered by user input?',
    options: [
      { text: 'switchMap runs requests in parallel; mergeMap runs them sequentially' },
      { text: 'switchMap cancels the previous inner observable when a new outer value arrives, preventing stale responses from overtaking newer ones' },
      { text: 'switchMap retries failed requests automatically; mergeMap does not' },
      { text: 'switchMap only works with HTTP observables; mergeMap works with all observables' },
    ],
    correctIndex: 1,
    explanation:
      'When a new search term arrives, `switchMap` unsubscribes from the previous HTTP observable (cancelling any in-flight XHR if the underlying implementation supports it) and subscribes to the new one. `mergeMap` would let all requests run concurrently, risking out-of-order results.',
  },

  // 19. takeUntil
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the common Angular pattern using `takeUntil` for managing subscriptions?',
    options: [
      { text: 'Unsubscribing after the first emitted value by completing the stream' },
      { text: 'Using a `Subject` that emits in `ngOnDestroy` to automatically complete all subscriptions that pipe through `takeUntil(this.destroy$)`' },
      { text: 'Delaying subscription until a condition becomes true' },
      { text: 'Throttling emissions to one per destroy cycle' },
    ],
    correctIndex: 1,
    explanation:
      'A common pattern declares a private `destroy$ = new Subject<void>()` and in `ngOnDestroy` calls `this.destroy$.next(); this.destroy$.complete()`. Piping observables through `takeUntil(this.destroy$)` automatically completes them when the component is destroyed, preventing memory leaks.',
  },

  // 20. Lifecycle hooks order
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'In which order do Angular\'s lifecycle hooks fire for a component that is being initialised?',
    options: [
      { text: 'ngOnInit → ngOnChanges → ngAfterContentInit → ngAfterViewInit' },
      { text: 'ngOnChanges → ngOnInit → ngDoCheck → ngAfterContentInit → ngAfterContentChecked → ngAfterViewInit → ngAfterViewChecked' },
      { text: 'ngAfterViewInit → ngOnInit → ngOnChanges → ngDoCheck' },
      { text: 'ngOnInit → ngAfterViewInit → ngOnChanges → ngAfterContentInit' },
    ],
    correctIndex: 1,
    explanation:
      'The initialisation sequence is: `ngOnChanges` (if inputs exist) → `ngOnInit` → `ngDoCheck` → `ngAfterContentInit` → `ngAfterContentChecked` → `ngAfterViewInit` → `ngAfterViewChecked`. On subsequent change detection cycles `ngOnChanges`, `ngDoCheck`, and the AfterChecked hooks repeat.',
  },

  // 21. Reactive forms vs template-driven
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the key architectural difference between Angular Reactive Forms and Template-Driven Forms?',
    options: [
      { text: 'Reactive Forms can only be used with HTTP requests; Template-Driven Forms work offline' },
      { text: 'Reactive Forms define the form model in the component class with explicit `FormGroup`/`FormControl` objects; Template-Driven Forms define the model implicitly in the template via directives like `ngModel`' },
      { text: 'Template-Driven Forms support validation; Reactive Forms do not' },
      { text: 'Reactive Forms require a separate `ReactiveFormsModule` import; Template-Driven Forms use the same module' },
    ],
    correctIndex: 1,
    explanation:
      'Reactive Forms are model-driven: you create `FormGroup` and `FormControl` instances in the component class and bind them to the template. This makes the form logic testable and explicit. Template-Driven Forms rely on Angular directives in the template to create the model implicitly, which is simpler but less testable.',
  },

  // 22. RouterModule
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the difference between `RouterModule.forRoot(routes)` and `RouterModule.forChild(routes)`?',
    options: [
      { text: '`forRoot` lazy-loads routes; `forChild` eagerly loads them' },
      { text: '`forRoot` registers the router services and should be called once in the root module; `forChild` registers additional routes in feature modules without re-providing the router services' },
      { text: '`forRoot` handles named outlets; `forChild` handles the primary outlet only' },
      { text: 'They are interchangeable; the names are just conventions' },
    ],
    correctIndex: 1,
    explanation:
      '`RouterModule.forRoot` sets up the router singleton (including the `Location` service and route directives) and should appear exactly once at the app root. `RouterModule.forChild` adds routes to the existing router without duplicating the singleton services, making it safe to use in feature modules.',
  },

  // 23. ActivatedRoute
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'How do you read a route parameter (e.g. `:id`) from the URL in an Angular component?',
    options: [
      { text: '`this.router.url.split(\'/\').pop()`' },
      { text: '`this.route.snapshot.paramMap.get(\'id\')` or `this.route.paramMap` (observable)' },
      { text: '`window.location.pathname.split(\'/\').pop()`' },
      { text: '`this.route.queryParams.get(\'id\')`' },
    ],
    correctIndex: 1,
    explanation:
      'Inject `ActivatedRoute` and use `this.route.snapshot.paramMap.get(\'id\')` for a one-time read, or subscribe to `this.route.paramMap` for reactive updates when the parameter changes without the component being destroyed (e.g. with `routerLink` navigation in the same component).',
  },

  // 24. Route guards
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Which Angular route guard interface do you implement to prevent a user from navigating away from a form with unsaved changes?',
    options: [
      { text: 'CanActivate' },
      { text: 'CanLoad' },
      { text: 'CanDeactivate' },
      { text: 'Resolve' },
    ],
    correctIndex: 2,
    explanation:
      '`CanDeactivate` is called before the router navigates away from the current route. Implementing it lets you check for unsaved state and prompt the user with a confirmation dialog, returning `false` to abort navigation.',
  },

  // 25. HttpClient
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does Angular\'s `HttpClient.get<T>(url)` return?',
    options: [
      { text: 'A `Promise<T>` that resolves with the response body' },
      { text: 'The response body of type `T` synchronously' },
      { text: 'A cold `Observable<T>` that executes the HTTP request upon subscription' },
      { text: 'A `Subject<T>` that emits as data streams in' },
    ],
    correctIndex: 2,
    explanation:
      '`HttpClient` methods return cold observables. The HTTP request is only sent when something subscribes. This allows operators like `switchMap` to cancel in-flight requests and makes the call composable with the rest of the RxJS pipeline.',
  },

  // 26. async pipe
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does the Angular `async` pipe do when used in a template like `{{ data$ | async }}`?',
    options: [
      { text: 'It converts a Promise or Observable to a synchronous value by blocking the thread' },
      { text: 'It subscribes to an Observable or Promise, unwraps the latest value for display, and automatically unsubscribes when the component is destroyed' },
      { text: 'It defers rendering of the template until the observable emits' },
      { text: 'It catches errors from observables and displays an empty string' },
    ],
    correctIndex: 1,
    explanation:
      'The `async` pipe handles subscription lifecycle management automatically: it subscribes when the component initialises, triggers change detection on each emission, and unsubscribes on component destruction — preventing memory leaks without manual subscription management.',
  },

  // 27. ngOnChanges
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'When does `ngOnChanges` fire in an Angular component?',
    options: [
      { text: 'Once during initialisation, before `ngOnInit`' },
      { text: 'Every time any component in the application changes state' },
      { text: 'Before `ngOnInit` and subsequently whenever one or more `@Input` property values change' },
      { text: 'Only when the component is destroyed' },
    ],
    correctIndex: 2,
    explanation:
      '`ngOnChanges` receives a `SimpleChanges` object and is called before `ngOnInit` on the first render, then again whenever a bound `@Input` property receives a new value from the parent. It does NOT fire for changes to internal state.',
  },

  // 28. RxJS filter
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does the RxJS `filter` operator do?',
    options: [
      { text: 'Transforms each emitted value using a projection function' },
      { text: 'Only emits values from the source that satisfy a predicate function' },
      { text: 'Limits the number of values an observable emits' },
      { text: 'Merges two observables and only emits values common to both' },
    ],
    correctIndex: 1,
    explanation:
      '`filter(predicate)` passes only those values through for which `predicate(value)` returns `true`. Values that return `false` are silently discarded. It is the observable equivalent of `Array.prototype.filter`.',
  },

  // 29. ngAfterViewInit
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Why is `ngAfterViewInit` the correct lifecycle hook to access `@ViewChild` references?',
    options: [
      { text: 'Because `@ViewChild` is asynchronous and requires a lifecycle hook to await it' },
      { text: 'Because the component\'s view (and child views) are only fully compiled and rendered after `ngAfterViewInit` fires, so `@ViewChild` references are guaranteed to be populated' },
      { text: 'Because Angular only resolves DI tokens during `ngAfterViewInit`' },
      { text: 'Because `@ViewChild` decorates the view rather than the class, so it is available after view compilation' },
    ],
    correctIndex: 1,
    explanation:
      'Angular populates `@ViewChild` references after it finishes creating and inserting the component\'s view into the DOM, which happens before `ngAfterViewInit` is called. Accessing a `@ViewChild` in `ngOnInit` is unreliable because the view has not been checked yet.',
  },

  // 30. Reactive form validation
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'In Angular Reactive Forms, how do you add a required validator to a `FormControl`?',
    options: [
      { text: 'Add `required="true"` to the HTML input element' },
      { text: 'Pass `Validators.required` as the second argument when constructing the `FormControl`' },
      { text: 'Call `control.setRequired(true)` after creating the control' },
      { text: 'Add `[required]="true"` to the template alongside `formControlName`' },
    ],
    correctIndex: 1,
    explanation:
      'In Reactive Forms the validation logic lives in the component class. `new FormControl(\'\', Validators.required)` attaches the built-in required validator programmatically. Multiple validators are composed with `Validators.compose([...])` or passed as an array.',
  },

  // ─── HARD (10) ────────────────────────────────────────────────────────────

  // 31. Signals
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is an Angular Signal (introduced in Angular 16/17) and how does it differ from an RxJS Observable?',
    options: [
      { text: 'A Signal is a hot observable that broadcasts to all subscribers simultaneously' },
      { text: 'A Signal is a synchronous, reactive primitive that always holds a current value; reading it in a reactive context automatically tracks it as a dependency, unlike Observables which are lazy and require explicit subscription' },
      { text: 'A Signal is Angular\'s replacement for `@Input()` decorators' },
      { text: 'A Signal is a compile-time construct that inlines values into templates without runtime overhead' },
    ],
    correctIndex: 1,
    explanation:
      'Signals are synchronous and always hold a value — you call `signal()` to create, `.set()` to update, and `signal()` to read. Reading inside a `computed` or template automatically registers a dependency. Observables are pull-based and require subscription; Signals are push-based and track dependencies implicitly.',
  },

  // 32. Standalone components
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is the primary benefit of Angular standalone components (Angular 14+)?',
    options: [
      { text: 'They compile faster because they bypass TypeScript type-checking' },
      { text: 'They eliminate the need for NgModules by declaring their own imports directly, reducing boilerplate and simplifying the mental model of Angular apps' },
      { text: 'They enable hot module replacement (HMR) for faster development' },
      { text: 'They allow components to be used in non-Angular frameworks without adapters' },
    ],
    correctIndex: 1,
    explanation:
      'Standalone components set `standalone: true` in `@Component` and list their dependencies in the `imports` array directly. This removes the coupling to an `NgModule`, making each component self-contained and easier to reason about, lazy-load, and test.',
  },

  // 33. OnPush change detection
  {
    difficulty: 'HARD' as Difficulty,
    text: 'Under `ChangeDetectionStrategy.OnPush`, when will Angular run change detection for that component?',
    options: [
      { text: 'On every browser event, regardless of whether the component\'s inputs changed' },
      { text: 'Only when a new object/array reference is passed as an `@Input`, an Observable emits via `async` pipe, an event originates inside the component, or `markForCheck()` is called' },
      { text: 'Only when the component is first created' },
      { text: 'Only when a service method is called inside the component' },
    ],
    correctIndex: 1,
    explanation:
      'OnPush skips the component subtree during the global change-detection sweep unless: an input reference changes (shallow comparison), an event fires within the component\'s template, an `async` pipe receives a new value, or `ChangeDetectorRef.markForCheck()` is explicitly called. This dramatically reduces unnecessary checks in large trees.',
  },

  // 34. Zone.js
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What role does Zone.js play in Angular\'s default change detection?',
    options: [
      { text: 'It compiles Angular templates into JavaScript at runtime' },
      { text: 'It monkey-patches asynchronous browser APIs (setTimeout, Promise, etc.) so Angular\'s NgZone can detect when async tasks complete and automatically trigger change detection' },
      { text: 'It provides the dependency injection container for Angular services' },
      { text: 'It polyfills modern JavaScript features for older browsers' },
    ],
    correctIndex: 1,
    explanation:
      'Zone.js patches async APIs. Angular wraps its code in `NgZone`, which listens for zone task completion. When an async operation (HTTP response, timer, user event) finishes, Angular is notified and runs change detection across the component tree — without you having to call `detectChanges` manually.',
  },

  // 35. Custom structural directive
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What injection tokens does a custom structural directive typically use to manipulate the DOM?',
    options: [
      { text: '`Renderer2` and `HostListener`' },
      { text: '`TemplateRef<any>` to get the embedded template and `ViewContainerRef` to create or destroy views' },
      { text: '`ElementRef` and `ChangeDetectorRef`' },
      { text: '`ComponentFactoryResolver` and `ApplicationRef`' },
    ],
    correctIndex: 1,
    explanation:
      'Structural directives receive a `TemplateRef` representing the template they are placed on (the `<ng-template>` the asterisk desugars to) and a `ViewContainerRef` which is the anchor in the DOM where views are created or cleared. Calling `viewContainerRef.createEmbeddedView(templateRef)` inserts the template.',
  },

  // 36. Content projection
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is the difference between `<ng-content>` and `<ng-content select="...">` in Angular?',
    options: [
      { text: '`<ng-content>` renders all projected content; `select` is a CSS selector that projects only matching elements into that slot' },
      { text: '`<ng-content select="...">` is deprecated; you should use `*ngProjectAs` instead' },
      { text: '`<ng-content>` projects named slots; `select` projects unnamed content' },
      { text: 'They are identical; `select` is an alias for the default slot' },
    ],
    correctIndex: 0,
    explanation:
      'Multi-slot content projection uses the `select` attribute as a CSS selector to route specific pieces of projected content into designated slots. `<ng-content>` without `select` acts as the default catch-all slot for any content not matched by a more specific selector.',
  },

  // 37. Lazy loading modules/routes
  {
    difficulty: 'HARD' as Difficulty,
    text: 'In Angular\'s router configuration, how do you lazy-load a feature module?',
    options: [
      { text: '`{ path: \'feature\', component: FeatureModule }` in the routes array' },
      { text: '`{ path: \'feature\', loadChildren: () => import(\'./feature/feature.module\').then(m => m.FeatureModule) }`' },
      { text: '`{ path: \'feature\', lazy: true, module: FeatureModule }`' },
      { text: '`{ path: \'feature\', preload: () => import(\'./feature/feature.module\') }`' },
    ],
    correctIndex: 1,
    explanation:
      '`loadChildren` accepts a function returning a dynamic import Promise. The router resolves the module only when the user navigates to the matching path. Angular\'s build tools split the module into a separate chunk that is fetched on demand.',
  },

  // 38. InjectionToken
  {
    difficulty: 'HARD' as Difficulty,
    text: 'When should you use `InjectionToken` instead of a class as a DI token in Angular?',
    options: [
      { text: 'When you want to inject a component into a service' },
      { text: 'When the value to inject is a primitive (string, number), a configuration object, or a function — i.e. anything that is not a class and therefore cannot be used as a token directly' },
      { text: 'When you need to inject a service with multiple instances' },
      { text: '`InjectionToken` is only needed for testing purposes' },
    ],
    correctIndex: 1,
    explanation:
      'DI tokens must be unique objects. Since primitives and plain objects are not unique, `InjectionToken` creates a typed, unique token that Angular can use as a key in the injector. A common use case is injecting app configuration: `new InjectionToken<AppConfig>(\'APP_CONFIG\')`.',
  },

  // 39. APP_INITIALIZER
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is `APP_INITIALIZER` in Angular and when would you use it?',
    options: [
      { text: 'A lifecycle hook that runs after the first component is rendered' },
      { text: 'A multi-provider token that registers factory functions Angular calls (and awaits if they return Promises/Observables) before bootstrapping the app — used to load config or auth state before the first render' },
      { text: 'A decorator that marks a class as the root application component' },
      { text: 'An Angular CLI flag that initialises a new project with a default template' },
    ],
    correctIndex: 1,
    explanation:
      '`APP_INITIALIZER` is a multi-token. You provide factory functions that return Promises (or Observables converted to Promises). Angular awaits all of them before rendering the root component, ensuring config, feature flags, or authentication data are ready before the app becomes interactive.',
  },

  // 40. Angular CDK
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is the Angular CDK (Component Dev Kit) and how does it differ from Angular Material?',
    options: [
      { text: 'The CDK is the CLI tool for generating components; Material is the UI component library' },
      { text: 'The CDK provides unstyled, behaviour-only primitives (drag-and-drop, overlays, virtual scrolling, a11y utilities) that Material builds on — giving developers the logic without forcing Material\'s visual design' },
      { text: 'The CDK is for server-side rendering; Material is for client-side rendering' },
      { text: 'They are the same library under different names' },
    ],
    correctIndex: 1,
    explanation:
      'The CDK abstracts common interaction patterns without any visual styling. `@angular/cdk/drag-drop`, `@angular/cdk/overlay`, and `@angular/cdk/a11y` give you accessible, polished behaviours you can style however you like. Angular Material sits on top of the CDK and applies the Material Design visual layer.',
  },
];
