### Problem: Sticky header doesn't work

 >>> Sticky Header Not Working:
Problem:
 The sticky header needs a parent with defined height constraints

Fix:
 Add height: 100% to html/body and ensure proper stacking context

 >>> Sidebar Disappears on Mobile:
Problem:
 No responsive adaptation for smaller screens

Fix:
 Add media query to change flex-direction to column on mobile

 >>> Horizontal Scrolling:
Problem:
 Content overflowing container

Fix:
 Add box-sizing: border-box and constrain width


### Css

body {
    height: 100%;
    margin: 0;
    box-sizing: border-box;
}

*, *:before, *:after {
    box-sizing: inherit;
}

.container {
    display: flex;
    height: 100vh;
    flex-direction: column; 
}

.sidebar {
    flex: 0 0 auto; 
    width: 100%; 
    background: #f0f0f0;
    max-height: 200px;
    overflow-y: auto;
}

.content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    width: 100%;
}

.sticky-header {
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
    width: 100%;
}

@media (min-width: 768px) {
    .container {
        flex-direction: row; 
    }
    
    .sidebar {
        flex: 0 0 250px;
        width: auto;
        max-height: none;
    }
}

