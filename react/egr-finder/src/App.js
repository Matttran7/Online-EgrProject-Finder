import React from 'react';
import './style.css';


function App() {
  return (
    <div className="App">
       <div className="container"> {/* Added container */}
        <div className="header">
          <h1>project<br />monkey</h1>
        </div>
        <div className="search-container">
          <div className="search">
            <input type="text" id="input_box"></input>
            <div className="auto-complete-area"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
