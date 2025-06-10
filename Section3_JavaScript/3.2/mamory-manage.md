# Memory Mangement

## Identified Memory Leaks:

1. EVENTSOURCE LEAK:
   - Problem: EventSource connection remained open after component unmount
   - Fix: Added eventSourceRef and close() in cleanup

2. CHART INSTANCE LEAK: 
   - Problem: Chart.js instance wasn't destroyed
   - Fix: Stored chart in chartInstance ref and added destroy()

3. EVENT LISTENER LEAK:
   - Problem: visibilitychange listener wasn't removed
   - Fix: Added matching removeEventListener in cleanup

4. MISSING DEPENDENCIES:
   - Problem: handleVisibilityChange wasn't properly managed
   - Fix: Wrapped in useCallback and added to dependencies

## Fix :

1. REF MANAGEMENT:
   - Added useRef for chartInstance and eventSourceRef
   - These preserve references for proper cleanup

2. CLEANUP FUNCTION:
   - Comprehensive cleanup of all resources:
     * clearInterval()
     * eventSource.close() 
     * chartInstance.destroy()
     * removeEventListener()

3. FUNCTION STABILITY:
   - Used useCallback for handleVisibilityChange
   - Added to useEffect dependencies array
