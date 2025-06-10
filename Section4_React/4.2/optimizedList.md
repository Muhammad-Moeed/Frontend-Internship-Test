 ### Performance Optimization: ItemList Component

 ## Problem
Rendering a list of 10,000 items with complex calculations (heavyCalculation) causes lag and performance issues, especially during scrolling.

    >>> 1. Filtering
        Used useMemo to avoid recalculating items.filter(...) on every render.

        Dependency array includes only items and filters.

    >>> 2. Expensive Calculation
        Moved heavyCalculation(item) inside a useMemo() for each item to cache results unless item changes.

    >>> 3. Rendering
        Used react-window for virtualized rendering, so only visible items are rendered in the DOM.

        Prevents all 10,000 items from rendering at once.

    >>> 4. Component Re-renders
        Wrapped ExpensiveItem in React.memo() to avoid re-rendering unless its props change.

        Used useCallback() for event handler to maintain stable function reference.

    >>>5. User Experience
        Smooth scrolling is maintained with virtualization.



