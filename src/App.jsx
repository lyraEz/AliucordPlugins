import React from 'react';

const App = () => {
    return (
        <div>
            <h1>Plugins</h1>
            {/* existing plugins data and components */}
            {plugins.map(plugin => (
                <div key={plugin.id}>
                    <h2>{plugin.name}</h2>
                    <p>{plugin.description}</p>
                    <button onClick={() => window.open(`https://github.com/${plugin.repo}/archive/refs/heads/main.zip`, '_blank')}>Download</button>
                </div>
            ))}
        </div>
    );
};

export default App;
