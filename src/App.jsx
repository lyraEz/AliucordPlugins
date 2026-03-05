// Original code here

import React from 'react';

const App = () => {
    return (
        <div>
            <h1>Welcome to My App</h1>
            <button onClick={() => window.open(`https://github.com/lyraEz/plugin-repo/archive/refs/heads/main.zip`)}>Download Plugin</button>
        </div>
    );
};

export default App;