### 1.2 Architecture Decision

<!-- 01 : State management strategy -->

 >>> Use Redux Toolkit  + React Query. Efficient update management + scalable
 >>> 500+ stocks with frequent updates need a single source of truth.
 >>> Normalized state structure (by stock ID) for fast lookups.
 >>> Selected stock filters
 >>> Server-state caching
 >>> Background refetching
 >>> Pagination, stale time, and revalidation

Justification:
 >>> Redux provides predictable and debuggable state.

 >>> React Query minimizes re-fetching and provides built-in cache & synchronization, perfect for high-frequency updates.

 <!-- 2. Real-Time Data Handling -->

 >>> Throttling (Lodash throttle):
        Limit UI updates to 2-3/sec (user can’t perceive faster changes).
        batch updates every 500ms to avoid UI bottlenecks.
 >>> WebSockets (not polling):
        10+ updates/sec/stock → Polling would overload the server.

Justification:
 >>> REST or polling can't keep up with 10+ updates/sec for 500 stocks.

 >>> WebSocket + throttling ensures low-latency and reduced memory pressure.

 <!-- 3. Performance Optimizations -->

 >>> Virtualized Lists (React-Window):
        Render only visible stocks (1000+ users → DOM nodes kill performance).

 >>> Memoization (React.memo, useMemo, useCallback):
        Avoid unnecessary renders for child components.

 >>> Code Splitting:
        Load charts and advanced analytics lazily using React.lazy and Suspense.

Justification:

 >>> Virtualization ensures the app remains responsive even with large datasets.

 >>> Memoization reduces re-render costs, boosting performance in frequently updating UIs.

 >>> Code splitting optimizes load time by only loading what’s needed, improving perceived performance.

 <!-- Error handling and reliability measures  -->

 >>> Error Boundaries:
        Use componentDidCatch or React.ErrorBoundary to catch UI crashes.

 >>> Using State for Error Handling and debugging:
        Define state for errors and Clear error messages quickly identify and fix issues. 
 
 >>> Retry & Fallback
        Use React Query's retry mechanism for failed requests.
        Display fallback UI for charts or feeds if data is unavailable.

Justification:

 >>> Error boundaries prevent the entire app from crashing due to a single component failure, improving stability.

 >>> Storing and displaying errors in state helps with quick debugging and better user feedback.

 >>> Retry and fallback mechanisms ensure higher reliability and better UX, especially in unstable network conditions.

 <!-- Mobile / Low-Bandwidth Considerations -->

 >>> Adaptive data loading:
    Limit data payloads on initial load (e.g., only top 50 stocks on mobile).

 >>> Image and chart optimization:
    Use lightweight SVGs or canvas-based charts; avoid heavy libraries on mobile.

 >>> Network-aware features:
    Detect connection speed using Network Information API.
    Disable auto-refresh or reduce update frequency on slow connections.

 >>> Responsive design:
    Use Tailwind/Media Queries to adapt layout and UX for small screens.

Justification:

 >>> Mobile users often experience limited bandwidth and  processing power—smaller payloads and optimized rendering reduce load times and improve usability.
 >>> Detecting and adjusting for network speed ensures the app remains usable even in poor conditions.
 >>> Responsive UI improves accessibility and engagement across all device sizes.