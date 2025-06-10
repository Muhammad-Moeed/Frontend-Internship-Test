import React, { useMemo, useCallback } from 'react';
import { FixedSizeList as VirtualizedList } from 'react-window';

// Memoize ExpensiveItem to avoid unnecessary re-renders
const MemoizedExpensiveItem = React.memo(({ data, index, style }) => {
  const { filteredItems, onItemClick } = data;
  const item = filteredItems[index];

  // Avoid recalculating unless item changes
  const computed = useMemo(() => heavyCalculation(item), [item]);

  const handleClick = useCallback(() => onItemClick(item), [item, onItemClick]);

  return (
    <div style={style}>
      <ExpensiveItem item={item} computed={computed} onClick={handleClick} />
    </div>
  );
});

const ItemList = ({ items, onItemClick, filters }) => {
  // Memoize filter results to prevent recalculation on every render
  const filteredItems = useMemo(() => {
    return items.filter(item => matchesFilters(item, filters));
  }, [items, filters]);

  return (
    <VirtualizedList
      height={600} 
      width="100%"
      itemCount={filteredItems.length}
      itemSize={80}
      itemData={{ filteredItems, onItemClick }}
    >
      {MemoizedExpensiveItem}
    </VirtualizedList>
  );
};
