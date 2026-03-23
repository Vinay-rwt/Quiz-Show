import type { Difficulty } from '@prisma/client';

interface SeedQuestion {
  difficulty: Difficulty;
  text: string;
  options: { text: string }[];
  correctIndex: number;
  explanation: string;
}

export const systemDesignQuestions: SeedQuestion[] = [
  // ─── EASY (15) ────────────────────────────────────────────────────────────

  // 1. Client-server model
  {
    difficulty: 'EASY' as Difficulty,
    text: 'In the client-server model, what is the role of the server?',
    options: [
      { text: 'To render the UI in the browser.' },
      { text: 'To listen for requests, process them, and send responses back to clients.' },
      { text: 'To store browser cookies on behalf of users.' },
      { text: 'To act as an intermediary that hides the client from the internet.' },
    ],
    correctIndex: 1,
    explanation:
      'A server is a process that waits for incoming requests from clients, performs the requested work (data retrieval, computation, etc.), and returns a structured response. The client initiates communication; the server reacts to it.',
  },

  // 2. HTTP methods
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which HTTP method is semantically correct for updating an existing resource in a RESTful API?',
    options: [
      { text: 'GET' },
      { text: 'POST' },
      { text: 'PUT' },
      { text: 'DELETE' },
    ],
    correctIndex: 2,
    explanation:
      'PUT replaces an existing resource with the request payload. PATCH is used for partial updates. GET retrieves data, POST creates new resources, and DELETE removes them. Using the correct verb communicates intent and enables caching/idempotency semantics.',
  },

  // 3. HTTP status codes
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does an HTTP 404 status code indicate?',
    options: [
      { text: 'The server encountered an internal error.' },
      { text: 'The request was successful.' },
      { text: 'The requested resource was not found on the server.' },
      { text: 'The client is not authorized to access the resource.' },
    ],
    correctIndex: 2,
    explanation:
      '404 Not Found means the server could not locate the requested URL. 200 means success, 401 means unauthorized, 403 means forbidden (authenticated but not permitted), and 500 means server error.',
  },

  // 4. REST principles
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which constraint is fundamental to the REST architectural style?',
    options: [
      { text: 'All communication must use WebSockets.' },
      { text: 'The server must store session state between requests.' },
      { text: 'Each request from a client must contain all information needed to fulfill it (statelessness).' },
      { text: 'Resources must be represented only as XML.' },
    ],
    correctIndex: 2,
    explanation:
      'Statelessness is a core REST constraint: every request is self-contained. The server does not store client session state between requests, which improves scalability because any server instance can handle any request.',
  },

  // 5. SQL vs NoSQL basics
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which of the following is a key advantage of SQL (relational) databases over NoSQL databases?',
    options: [
      { text: 'Horizontal scaling is simpler.' },
      { text: 'Schema-less storage allows flexible data shapes.' },
      { text: 'ACID transactions and strong consistency guarantees across related data.' },
      { text: 'Better suited for unstructured, high-velocity data ingestion.' },
    ],
    correctIndex: 2,
    explanation:
      'Relational databases enforce schemas and provide full ACID (Atomicity, Consistency, Isolation, Durability) transaction support, making them ideal for financial records or any domain requiring strict data integrity and complex joins.',
  },

  // 6. Vertical vs horizontal scaling
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the difference between vertical scaling ("scaling up") and horizontal scaling ("scaling out")?',
    options: [
      { text: 'Vertical scaling adds more machines; horizontal scaling adds more CPU/RAM to one machine.' },
      { text: 'Vertical scaling adds more CPU/RAM to one machine; horizontal scaling adds more machines.' },
      { text: 'They are synonyms for the same technique.' },
      { text: 'Vertical scaling is only for databases; horizontal scaling is only for web servers.' },
    ],
    correctIndex: 1,
    explanation:
      'Vertical scaling upgrades a single machine (bigger CPU, more RAM, faster disk). Horizontal scaling adds more machines to distribute load. Horizontal scaling is preferred for high availability and theoretically unlimited throughput, but requires distributed system design.',
  },

  // 7. CDN purpose
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What is the primary purpose of a Content Delivery Network (CDN)?',
    options: [
      { text: 'To compile and bundle JavaScript on the server.' },
      { text: 'To serve static assets from edge servers geographically close to users, reducing latency.' },
      { text: 'To encrypt traffic between services inside a private network.' },
      { text: 'To store relational data closer to application servers.' },
    ],
    correctIndex: 1,
    explanation:
      'A CDN caches static content (images, JS, CSS, videos) on a global network of edge nodes. Requests are served from the nearest node, dramatically reducing round-trip latency and offloading traffic from the origin server.',
  },

  // 8. Load balancer basics
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does a load balancer do?',
    options: [
      { text: 'It compresses responses to reduce bandwidth usage.' },
      { text: 'It distributes incoming requests across multiple server instances to prevent any single server from being overwhelmed.' },
      { text: 'It encrypts data in transit between client and server.' },
      { text: 'It caches database query results in memory.' },
    ],
    correctIndex: 1,
    explanation:
      'A load balancer sits in front of a pool of servers and routes each incoming request to one of them using algorithms like round-robin, least connections, or IP hash. This improves throughput and resilience — if one server fails, traffic is redirected to healthy ones.',
  },

  // 9. Caching basics
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Where does an in-process application cache (such as a dictionary or LRU cache) sit relative to the database?',
    options: [
      { text: 'Between the client browser and the CDN.' },
      { text: 'Inside the application server, intercepting queries before they reach the database.' },
      { text: 'Inside the database, replacing the query planner.' },
      { text: 'At the DNS resolver level.' },
    ],
    correctIndex: 1,
    explanation:
      'An in-process cache lives within the application server\'s memory. When data is requested, the app checks the cache first. A cache hit returns data without a database round-trip; a miss queries the database and populates the cache. This reduces latency and database load.',
  },

  // 10. DNS lookup process
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Which component is ultimately responsible for translating a domain name (e.g., example.com) to an IP address?',
    options: [
      { text: 'The CDN edge node.' },
      { text: 'The load balancer.' },
      { text: 'An authoritative DNS server.' },
      { text: 'The TLS certificate authority.' },
    ],
    correctIndex: 2,
    explanation:
      'DNS resolution works recursively: the client queries a resolver, which traverses the DNS hierarchy (root → TLD → authoritative). The authoritative DNS server for a domain holds the actual A/AAAA records and returns the IP address.',
  },

  // 11. Stateless vs stateful servers
  {
    difficulty: 'EASY' as Difficulty,
    text: 'Why are stateless servers easier to scale horizontally than stateful servers?',
    options: [
      { text: 'Stateless servers use less RAM per request.' },
      { text: 'Any server instance can handle any request because no session state is stored locally, so new instances can be added without data migration.' },
      { text: 'Stateless servers do not need a load balancer.' },
      { text: 'Stateless servers process requests faster due to fewer network calls.' },
    ],
    correctIndex: 1,
    explanation:
      'Because stateless servers do not store per-user state in memory, a load balancer can send any request to any instance. Adding capacity is as simple as starting new instances. Stateful servers require sticky sessions or shared state stores to ensure correctness.',
  },

  // 12. HTTP GET idempotency
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does it mean for an HTTP method to be "idempotent"?',
    options: [
      { text: 'The server returns the same response body for every identical request.' },
      { text: 'Performing the same operation multiple times has the same effect as performing it once.' },
      { text: 'The request can be cached by any intermediate proxy.' },
      { text: 'The method does not require authentication.' },
    ],
    correctIndex: 1,
    explanation:
      'Idempotency means that repeating a request any number of times produces the same server-side state as a single request. GET, PUT, and DELETE are idempotent. POST is not, because each call typically creates a new resource.',
  },

  // 13. Caching – cache invalidation
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What problem does cache invalidation solve?',
    options: [
      { text: 'It prevents the cache from consuming too much memory.' },
      { text: 'It ensures stale cached data is removed or updated when the underlying source changes.' },
      { text: 'It stops unauthorized users from reading cached data.' },
      { text: 'It compresses cached responses to save disk space.' },
    ],
    correctIndex: 1,
    explanation:
      'Cache invalidation ensures that when the source of truth (e.g., the database) changes, the cached copy is either evicted or refreshed. Without it, clients may read outdated data. It is notoriously hard to implement correctly and is one of the two hard problems in computer science.',
  },

  // 14. REST – resource naming
  {
    difficulty: 'EASY' as Difficulty,
    text: 'According to REST conventions, which URL path best represents "get the orders belonging to user 42"?',
    options: [
      { text: '/getOrdersForUser?userId=42' },
      { text: '/users/42/orders' },
      { text: '/orders/getByUser/42' },
      { text: '/fetchOrders/user=42' },
    ],
    correctIndex: 1,
    explanation:
      'REST uses hierarchical, noun-based resource paths. `/users/42/orders` reads naturally as "the orders sub-resource of user 42" and uses HTTP GET to retrieve it. Verb-based paths like `/getOrders` are an RPC style, not REST.',
  },

  // 15. HTTP vs HTTPS
  {
    difficulty: 'EASY' as Difficulty,
    text: 'What does HTTPS add on top of HTTP?',
    options: [
      { text: 'Faster routing through dedicated fiber lines.' },
      { text: 'Encryption and authentication via TLS, protecting data in transit.' },
      { text: 'Automatic compression of all request and response bodies.' },
      { text: 'Support for bidirectional streaming.' },
    ],
    correctIndex: 1,
    explanation:
      'HTTPS is HTTP transmitted over a TLS (Transport Layer Security) connection. TLS encrypts data so eavesdroppers cannot read it and authenticates the server via a certificate, preventing man-in-the-middle attacks.',
  },

  // ─── MEDIUM (15) ──────────────────────────────────────────────────────────

  // 16. CAP theorem
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'According to the CAP theorem, what must a distributed system sacrifice during a network partition?',
    options: [
      { text: 'Either consistency or availability — it cannot guarantee both.' },
      { text: 'Either latency or throughput — it cannot guarantee both.' },
      { text: 'Either durability or atomicity — it cannot guarantee both.' },
      { text: 'Nothing — modern systems always achieve all three properties.' },
    ],
    correctIndex: 0,
    explanation:
      'CAP states that during a network partition (P), a distributed system can be either consistent (C — every read returns the latest write) or available (A — every request receives a response), but not both. Systems must choose CP or AP, influencing their design for failures.',
  },

  // 17. Database indexing
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'A B-tree index on a column significantly speeds up which type of query?',
    options: [
      { text: 'Full-text search across large document bodies.' },
      { text: 'Range queries and equality lookups on that column.' },
      { text: 'Aggregations that count rows across the entire table.' },
      { text: 'Joins between two unindexed columns.' },
    ],
    correctIndex: 1,
    explanation:
      'B-trees maintain sorted order, making them ideal for equality checks (`WHERE id = 5`) and range scans (`WHERE created_at BETWEEN ...`). Full-text search uses inverted indexes; aggregations over entire tables may still require full scans even with indexes.',
  },

  // 18. Sharding strategies
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What is the main drawback of range-based sharding (e.g., shard by user ID ranges 1–1M, 1M–2M)?',
    options: [
      { text: 'Range queries become impossible.' },
      { text: 'It requires consistent hashing to implement.' },
      { text: 'Hotspot problem: one shard may receive disproportionately more traffic if data or requests cluster in a range.' },
      { text: 'The database cannot enforce referential integrity across shards.' },
    ],
    correctIndex: 2,
    explanation:
      'Range-based sharding can create hotspots when traffic concentrates in one range (e.g., the most recently active users all fall in the highest ID shard). Hash-based sharding distributes data more uniformly but sacrifices range query efficiency.',
  },

  // 19. Leader-follower replication
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'In a leader-follower (primary-replica) database setup, what is a common trade-off when reading from replicas?',
    options: [
      { text: 'Reads from replicas are always slower than reads from the leader.' },
      { text: 'Reads from replicas may return stale data due to replication lag.' },
      { text: 'Replicas can only serve writes, not reads.' },
      { text: 'Reading from replicas violates ACID properties for all transactions.' },
    ],
    correctIndex: 1,
    explanation:
      'Asynchronous replication means followers may lag behind the leader. A read from a replica immediately after a write to the leader may return the old value — this is "eventual consistency". Applications must decide whether they can tolerate this lag or must always read from the leader.',
  },

  // 20. Message queues
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Which problem does introducing a message queue (e.g., Kafka, RabbitMQ) solve between two services?',
    options: [
      { text: 'It encrypts messages exchanged between services.' },
      { text: 'It decouples the producer and consumer in time, allowing the producer to continue without waiting for the consumer to be ready.' },
      { text: 'It enforces a strict request-response contract between services.' },
      { text: 'It replaces the need for a database in event-driven systems.' },
    ],
    correctIndex: 1,
    explanation:
      'Message queues provide temporal decoupling: the producer publishes a message and moves on; the consumer processes it at its own pace. This smooths out traffic spikes (buffering), improves resilience (no direct dependency on consumer availability), and enables async workflows.',
  },

  // 21. API Gateway
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What cross-cutting concerns does an API Gateway typically handle in a microservices architecture?',
    options: [
      { text: 'Database migrations and schema management.' },
      { text: 'Authentication, rate limiting, request routing, and SSL termination — so individual services do not need to implement them.' },
      { text: 'Compiling and deploying service code.' },
      { text: 'Storing and replicating service state.' },
    ],
    correctIndex: 1,
    explanation:
      'An API Gateway is the single entry point for clients. It offloads shared concerns (auth, rate limiting, logging, SSL termination, request routing) from individual microservices, keeping services focused on business logic and reducing duplication.',
  },

  // 22. Rate limiting – token bucket
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'In the token bucket rate-limiting algorithm, what happens to requests when the bucket is empty?',
    options: [
      { text: 'They are queued indefinitely until a token is available.' },
      { text: 'They are rejected or throttled until tokens replenish at the configured rate.' },
      { text: 'They bypass rate limiting and are sent directly to the server.' },
      { text: 'The bucket size is automatically doubled to accommodate the burst.' },
    ],
    correctIndex: 1,
    explanation:
      'The token bucket fills at a constant rate up to a maximum capacity. Each request consumes one token. When empty, further requests are dropped (rate limited) until tokens refill. The bucket capacity controls the allowed burst size, while the fill rate controls sustained throughput.',
  },

  // 23. Consistent hashing
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Why is consistent hashing preferred over simple modulo hashing when distributing keys across servers?',
    options: [
      { text: 'Consistent hashing guarantees even distribution with zero variance.' },
      { text: 'When a server is added or removed, only a fraction of keys need to be remapped, minimizing disruption.' },
      { text: 'Consistent hashing works without any hash function.' },
      { text: 'Modulo hashing is slower to compute than consistent hashing.' },
    ],
    correctIndex: 1,
    explanation:
      'With modulo hashing (key % N), changing N (adding/removing a server) remaps almost all keys, causing a cache stampede or massive data migration. Consistent hashing places servers on a ring so only O(K/N) keys move when a server joins or leaves.',
  },

  // 24. ACID properties
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What does the "I" (Isolation) in ACID guarantee?',
    options: [
      { text: 'Once a transaction commits, its changes are permanent even after a crash.' },
      { text: 'Concurrent transactions execute as if they were run serially, preventing dirty or phantom reads depending on the isolation level.' },
      { text: 'A transaction either fully completes or has no effect.' },
      { text: 'Data written to disk is consistent with the relational schema.' },
    ],
    correctIndex: 1,
    explanation:
      'Isolation ensures concurrent transactions do not interfere with each other in ways that violate correctness. Different isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) trade strictness for performance. Full serializability means concurrent transactions produce the same result as any serial execution.',
  },

  // 25. NoSQL types
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Which NoSQL database type is best suited for representing and querying highly connected data, such as a social network graph?',
    options: [
      { text: 'Key-value store (e.g., Redis).' },
      { text: 'Document store (e.g., MongoDB).' },
      { text: 'Column-family store (e.g., Cassandra).' },
      { text: 'Graph database (e.g., Neo4j).' },
    ],
    correctIndex: 3,
    explanation:
      'Graph databases store entities as nodes and relationships as edges with properties on both. They use traversal-optimized storage and query languages (e.g., Cypher) that make multi-hop relationship queries orders of magnitude faster than equivalent SQL joins on relational data.',
  },

  // 26. Leaky bucket algorithm
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'What distinguishes the leaky bucket algorithm from the token bucket algorithm for rate limiting?',
    options: [
      { text: 'Leaky bucket allows bursts up to the bucket capacity; token bucket enforces a constant output rate.' },
      { text: 'Token bucket allows bursts up to the bucket capacity; leaky bucket processes requests at a constant output rate, smoothing bursts into a steady stream.' },
      { text: 'They are identical — the names are interchangeable.' },
      { text: 'Leaky bucket is used only for network traffic; token bucket only for API calls.' },
    ],
    correctIndex: 1,
    explanation:
      'The leaky bucket queues incoming requests and drains them at a fixed rate, enforcing a smooth, steady output regardless of bursty input — excess is dropped if the queue overflows. Token bucket permits bursts up to the bucket size, then sustains the token refill rate, giving more flexibility for legitimate bursts.',
  },

  // 27. Database indexing – when not to index
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'When might adding a database index actually hurt performance?',
    options: [
      { text: 'On columns with very high cardinality (many distinct values).' },
      { text: 'On a small table where a full scan is already fast, or on columns updated very frequently because each write must also update the index.' },
      { text: 'On columns used in WHERE clauses.' },
      { text: 'On primary key columns.' },
    ],
    correctIndex: 1,
    explanation:
      'Indexes speed up reads but add overhead to every INSERT, UPDATE, and DELETE because the index structure must also be maintained. On small tables, a full scan may be faster than an index lookup plus random I/O. Heavy write workloads can become bottlenecked by index maintenance.',
  },

  // 28. Read replicas use case
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Which workload benefits most from routing traffic to read replicas?',
    options: [
      { text: 'Financial transactions requiring serializable isolation.' },
      { text: 'Analytics dashboards and reporting queries that read large amounts of data but can tolerate slight staleness.' },
      { text: 'User authentication that must immediately reflect a password change.' },
      { text: 'Batch write jobs that insert millions of rows.' },
    ],
    correctIndex: 1,
    explanation:
      'Read replicas are ideal for read-heavy, latency-tolerant workloads like analytics, reports, and search — tasks where slight replication lag is acceptable. Latency-sensitive reads requiring the freshest data (authentication, inventory checks) should still hit the primary.',
  },

  // 29. CAP – AP vs CP
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'A financial trading platform requires that account balances are always accurate. During a network partition, which CAP trade-off should it choose?',
    options: [
      { text: 'AP — always return a response, even if it may be stale.' },
      { text: 'CP — reject or block requests rather than risk returning inconsistent data.' },
      { text: 'CA — maintain both consistency and availability by eliminating partitions.' },
      { text: 'Neither — financial systems bypass CAP entirely.' },
    ],
    correctIndex: 1,
    explanation:
      'A CP (Consistent + Partition-tolerant) system prioritizes correctness over availability. During a partition it may refuse to serve requests rather than return potentially wrong data. This is essential for financial systems where stale balance data could cause double-spends or overdrafts.',
  },

  // 30. Message queue vs direct call
  {
    difficulty: 'MEDIUM' as Difficulty,
    text: 'Service A calls Service B synchronously via HTTP. What is the main resilience risk compared to using a message queue?',
    options: [
      { text: 'HTTP is inherently insecure compared to a message queue.' },
      { text: 'If Service B is down or slow, Service A is also blocked or fails — the two services are tightly coupled in availability.' },
      { text: 'Synchronous HTTP does not support JSON payloads.' },
      { text: 'Service A cannot retry failed HTTP requests.' },
    ],
    correctIndex: 1,
    explanation:
      'Synchronous coupling means Service A\'s availability directly depends on Service B\'s availability and latency. A slow or unavailable Service B causes cascading failures into Service A. A message queue decouples them: Service A publishes and continues; Service B consumes when it is healthy.',
  },

  // ─── HARD (10) ────────────────────────────────────────────────────────────

  // 31. Distributed consensus – Raft vs Paxos
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What problem does the Raft consensus algorithm primarily solve, and how does it differ from Paxos in its design goal?',
    options: [
      { text: 'Raft solves load balancing; Paxos solves data partitioning. They are not comparable.' },
      { text: 'Both solve the same problem (consensus in distributed systems), but Raft was designed to be more understandable by decomposing consensus into leader election, log replication, and safety, while Paxos is known for being harder to reason about and implement correctly.' },
      { text: 'Raft provides stronger safety guarantees than Paxos by using vector clocks.' },
      { text: 'Paxos requires a leader; Raft is leaderless.' },
    ],
    correctIndex: 1,
    explanation:
      'Both Raft and Paxos achieve fault-tolerant consensus in distributed systems (agreeing on a sequence of values despite node failures). Raft\'s primary contribution is understandability: it separates leader election, log replication, and membership changes into distinct, well-defined sub-problems, making it far easier to implement correctly than Paxos.',
  },

  // 32. Saga pattern
  {
    difficulty: 'HARD' as Difficulty,
    text: 'How does the Saga pattern handle a failure midway through a multi-service distributed transaction?',
    options: [
      { text: 'It uses two-phase commit to roll back all services atomically.' },
      { text: 'It executes compensating transactions in reverse order to undo the effects of steps that already completed.' },
      { text: 'It retries the failed step indefinitely until it succeeds.' },
      { text: 'It marks the entire transaction as failed and leaves the data in an inconsistent state.' },
    ],
    correctIndex: 1,
    explanation:
      'A saga is a sequence of local transactions, each publishing an event or message triggering the next step. If one step fails, the saga executes compensating transactions for each already-completed step to undo their effects. This provides eventual consistency without a distributed lock across services.',
  },

  // 33. Event sourcing and CQRS
  {
    difficulty: 'HARD' as Difficulty,
    text: 'In an event-sourced system, what is the "source of truth" for application state?',
    options: [
      { text: 'The current state snapshot stored in the main database table.' },
      { text: 'The append-only log of immutable domain events from which current state is derived by replaying them.' },
      { text: 'The read model maintained by the CQRS query side.' },
      { text: 'The most recent snapshot combined with a distributed lock.' },
    ],
    correctIndex: 1,
    explanation:
      'Event sourcing stores every state change as an immutable event in an append-only log. Current state is not stored directly; it is computed by replaying events. This enables full audit history, temporal queries, and event replay, but requires careful snapshot strategies for performance as the log grows.',
  },

  // 34. Two-phase commit
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What is the main vulnerability of the two-phase commit (2PC) protocol?',
    options: [
      { text: 'It cannot coordinate more than two participants.' },
      { text: 'If the coordinator crashes after sending "prepare" but before sending "commit/abort", participants are left in a blocking uncertain state until the coordinator recovers.' },
      { text: 'It requires all participants to share the same database engine.' },
      { text: 'It does not guarantee atomicity across participants.' },
    ],
    correctIndex: 1,
    explanation:
      'In 2PC, the coordinator sends "prepare" to all participants and waits for votes. If the coordinator crashes before broadcasting the final "commit" or "abort", participants are locked in an in-doubt state holding locks — they cannot proceed or roll back without the coordinator, creating a blocking protocol. Three-phase commit and Paxos-based protocols address this.',
  },

  // 35. Bloom filters
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What type of errors can a Bloom filter produce, and what type is it guaranteed to never produce?',
    options: [
      { text: 'It can produce false negatives but never false positives.' },
      { text: 'It can produce false positives (saying an element is present when it is not) but never false negatives (it will always identify truly absent elements as absent).' },
      { text: 'It can produce both false positives and false negatives.' },
      { text: 'It never produces errors — it is an exact data structure.' },
    ],
    correctIndex: 1,
    explanation:
      'A Bloom filter uses multiple hash functions to mark bits in a bit array. A "definitely not present" answer is always correct. A "possibly present" answer may be wrong (false positive) because different elements can hash to the same bits. This makes it ideal for quickly ruling out cache misses or unnecessary database lookups.',
  },

  // 36. LSM trees vs B-trees
  {
    difficulty: 'HARD' as Difficulty,
    text: 'Why do LSM tree-based storage engines (used in Cassandra, RocksDB) generally outperform B-tree engines on write-heavy workloads?',
    options: [
      { text: 'LSM trees use more RAM, which inherently speeds up all operations.' },
      { text: 'LSM trees batch writes into sequential I/O by accumulating changes in memory (memtable) and flushing to disk as sorted files, avoiding the random I/O that B-trees require for in-place updates.' },
      { text: 'LSM trees skip durability guarantees to speed up writes.' },
      { text: 'LSM trees compress data inline during writes, reducing I/O volume.' },
    ],
    correctIndex: 1,
    explanation:
      'B-trees perform random I/O for each update (finding and modifying the page in place). LSM trees buffer writes in memory and flush them sequentially as immutable SSTable files, converting random writes to sequential ones — which is dramatically faster on spinning disks and beneficial even on SSDs. The trade-off is higher read amplification (merging multiple levels) and background compaction CPU cost.',
  },

  // 37. Designing a URL shortener
  {
    difficulty: 'HARD' as Difficulty,
    text: 'When designing a URL shortener at scale, why is pre-generating short codes (using a counter or ID generator) preferable to hashing the long URL?',
    options: [
      { text: 'Hashing requires more storage than pre-generated codes.' },
      { text: 'Hash-based codes can collide (two different URLs producing the same hash), requiring collision detection and retry logic, while sequential IDs or globally unique counters guarantee uniqueness without collision checks.' },
      { text: 'Pre-generated codes are shorter in length than hash-based codes.' },
      { text: 'Hashing is CPU-intensive and becomes a bottleneck at scale.' },
    ],
    correctIndex: 1,
    explanation:
      'Truncated hashes (e.g., first 7 chars of MD5) save space but collisions are possible and require a lookup + retry loop. A distributed counter (e.g., using a sequence generator or Snowflake IDs) or a base-62 encoding of an auto-increment ID guarantees uniqueness and simplifies the generation path, though it requires a centralized or coordinated ID source.',
  },

  // 38. Write-ahead logging (WAL)
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What durability guarantee does write-ahead logging (WAL) provide in a database?',
    options: [
      { text: 'It ensures committed transactions are never lost by writing changes to a sequential log before modifying data pages, enabling recovery by replaying the log after a crash.' },
      { text: 'It prevents concurrent writes from interleaving by acting as a write lock.' },
      { text: 'It replicates writes to a standby node in real time.' },
      { text: 'It compresses write operations to reduce disk usage.' },
    ],
    correctIndex: 0,
    explanation:
      'WAL requires that every change be written to a sequential log file before the corresponding data page is modified. On crash recovery, the database replays the WAL to restore committed state and roll back incomplete transactions. Because sequential log writes are fast and durable (fsync), WAL enables both high performance and crash safety.',
  },

  // 39. Vector clocks
  {
    difficulty: 'HARD' as Difficulty,
    text: 'What problem do vector clocks solve in distributed systems?',
    options: [
      { text: 'They synchronize wall-clock time across nodes to sub-millisecond precision.' },
      { text: 'They track causal relationships between events across nodes, enabling detection of whether events are causally related or concurrent.' },
      { text: 'They elect a leader among distributed nodes.' },
      { text: 'They compress logs by deduplicating causally equivalent events.' },
    ],
    correctIndex: 1,
    explanation:
      'Vector clocks assign each node a logical counter. When events are sent between nodes, the vector is piggybacked and merged. By comparing vectors, the system determines if event A causally preceded B, B preceded A, or they are concurrent (neither happened-before the other). Concurrent updates signal a conflict that requires resolution (e.g., last-write-wins or merge).',
  },

  // 40. Gossip protocol
  {
    difficulty: 'HARD' as Difficulty,
    text: 'How does a gossip protocol achieve eventual consistency of cluster membership information without a central coordinator?',
    options: [
      { text: 'Each node broadcasts its state to all other nodes every second.' },
      { text: 'Each node periodically picks a random peer, exchanges state, and merges differences. Information spreads exponentially — like an epidemic — until all nodes converge.' },
      { text: 'A dedicated gossip server collects state from all nodes and distributes it.' },
      { text: 'Nodes form a ring and pass state sequentially around the ring.' },
    ],
    correctIndex: 1,
    explanation:
      'In a gossip protocol, each round every node randomly selects one or more peers and exchanges state (e.g., membership, heartbeats). The information diffusion follows an epidemic model: after O(log N) rounds, all N nodes have received the update with high probability. This is fully decentralized, robust to node failures, and scales without coordination overhead.',
  },
];
