import logo from './logo.svg';
import { useEffect, useRef } from 'react';
import './App.css';

function createWorker() {
  var blob = new Blob([`
  self.addEventListener('message', e => {
    if (e.data) {
      self.postMessage("This is the worker. I have recieved: " + e.data);
    }
  })
  `], { type: "text/javascript" });
  var url = URL.createObjectURL(blob);
  
  return new Worker(url);
}

function App() {
  const workerRef = useRef(createWorker());

  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.addEventListener("message", e => {
        console.log(e.data);
      })
  
      workerRef.current.addEventListener("error", e => {
        console.warn(e);
      })
      
    }
  }, [])

  const handlePostMessageClick = e => {
    workerRef.current.postMessage("Hello World!")
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          onClick={handlePostMessageClick}
        >
          Post message to Worker
        </button>
      </header>
    </div>
  );
}

export default App;
