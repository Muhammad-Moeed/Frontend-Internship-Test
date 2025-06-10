# React Performance Optimization

## 🔍 Investigation Approach

### 1 Bundle Size Reduction**
- **Tools Used:**  
  - Webpack Bundle Analyzer  
  - `source-map-explorer`  
- **Causes:**  
  - Unused dependencies .  
  - No code splitting/lazy loading.  
- **Solutions:**  
  - Replaced heavy libraries with lightweight alternatives. 
  - Implemented **code splitting** using `React.lazy()` and `Suspense`.  
  - Added **tree shaking** in Webpack.  

### 2 Network Requests Optimization
- **Tools Used:**  
  - Chrome DevTools (Network Tab)  
  - Lighthouse Audit  
- **Causes:**  
  - Multiple render-blocking CSS/JS files.  
  - Unoptimized images (PNG/JPG instead of WebP).  
  - No caching for static assets.  
- **Solutions:**  
  - Merged and minified CSS/JS.  
  - Converted images to **WebP** format.  
  - Added `Cache-Control` headers for assets.  

### 3 Main Thread Blocking
- **Tools Used:**  
  - Chrome DevTools (Performance Tab)  
  - React DevTools Profiler  
- **Causes:**  
  - Expensive re-renders due to unoptimized hooks.  
  - Long-running synchronous tasks.  
- **Solutions:**  
  - Optimized Optimize expensive operations with `React.memo`, `useMemo`, and `useCallback`.  
  - Deferred non-critical JS using `async/defer`.  
  - Used **Web Workers** for heavy computations.  

