import React from 'react';
import './App.css';

const App = ({ plugin }) => {
    return (
        <div className="App">
            <h1>{plugin.name}</h1>
            <p>{plugin.description}</p>
             {/* Other components and code */}
            <button onClick={() => window.open(`https://github.com/${plugin.repo}/archive/refs/heads/main.zip`, '_blank')}>Download</button>
            {/* Other components and code */}
        </div>
    );
};

export default App;