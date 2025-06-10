# Event Handling Puzzle Solution

## Console Output Order
1. Container clicked
2. Button clicked
3. Button clicked again

1. **Capture Phase** (Top-down):
   - Events travel from window down to target
   - Listeners with useCapture: true execute here
   - container's listener runs first

2. **Target Phase**:
   - Event reaches the actual target (button)
   - All target handlers execute in registration order
   - e.stopPropagation() called here

3. **Bubble Phase** (Bottom-up):
   - Normally would propagate back up
   - Stopped by stopPropagation() in this case

### Why This Order?
container.addEventListener('click', handler, true);  
// 1. Capture phase (runs first)
button.addEventListener('click', handler1);         
// 2. First target handler
button.addEventListener('click', handler2);       
// 3. Second target handler