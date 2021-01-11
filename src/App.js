import logo from './logo.svg';
import './App.css';
import workerFile from './worker.js'
// console.log(workerFile)
function createWorker(fn) {
  var blob = new Blob(["self.onmessage =", fn.toString()], { type: "text/javascript" });
  var url = URL.createObjectURL(blob);
  
  return new Worker(url);
}

function App() {
  const worker = createWorker(workerFile);

  worker.addEventListener("message", e => {
    console.log(e);
  })

  worker.addEventListener("error", e => {
    console.warn(e);
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
