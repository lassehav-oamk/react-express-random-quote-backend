import React from 'react';
import './App.css';
import RandomMovieQuote from './components/RandomMovieQuote';

function App() {
  return (
    <div className="App">
      <h1>Random Movie Quote App</h1>
      <div>This app loads random movie quotes from HTTP API.</div>
      <RandomMovieQuote count={3}/>
    </div>
  );
}

export default App;