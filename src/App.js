import { useEffect, useState } from 'react';
import './App.css';

const worker = new Worker("./worker.js")

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (worker) {
      worker.addEventListener("message", e => {
        setLoading(false);
        setData(e.data);
      })

      worker.addEventListener("error", e => {
        console.error(e);
      })

      return () => worker.terminate()
    }
  }, [])

  // EXAMPLE 2: ===================

  // Example of a heavy computation which would block the UI if executed on the main thread
  const heavilyComputatedValue = () => {
    var x = 0;
    for (var i = 0; i < 999999999; i++) {
      x = x + i;
    }
    return x;
  }


  const loadResult = e => {
    setLoading(true);
    setData(null);

    // EXAMPLE A
    const value = heavilyComputatedValue();
    setData(value);
    setLoading(false);


    // EXAMPLE B
    // worker.postMessage(null)
  }

  return (
    <div style={{ display: "grid", gridTemplateRows: "1fr 1fr 2fr 10fr" }}>
      {(!data && loading) ? <p>loading</p> : <p>{data}</p>}

      <button
        style={{ cursor: "pointer" }}
        onClick={loadResult}
      >
        Load result
        </button>
    </div>
  );
}

export default App;















// // INLINE WORKER EXAMPLE ========
// const createInlineWorker = (workerFunc) => {
//   const workerFunctionBody = workerFunc.toString().replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '');

//   return new Worker(URL.createObjectURL(
//     new Blob([workerFunctionBody], { type: 'text/javascript' })
//   ));
// }

// const worker = createInlineWorker(() => {
//   function heavilyComputatedValue() {
//     var x = 0;
//     for (var i = 0; i < 999999999; i++) {
//       x = x + i;
//     }
//     return x;
//   }

//   // eslint-disable-next-line no-restricted-globals
//   self.addEventListener('message', e => {
//     // eslint-disable-next-line no-restricted-globals
//     self.postMessage(heavilyComputatedValue());
//   })
// })