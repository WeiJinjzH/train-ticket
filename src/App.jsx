import React, { useState, useMemo } from 'react';

function Counter(props) {
  return (
    <h1>{props.count}</h1>
  )
}

function App() {
  const [ count, setCount ] = useState(0)

  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  const half = useMemo(() => {
    return double / 4
  }, [double])

  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        Add {count} Double {double} half {half}
      </button>
      <Counter count={count} />
    </div>
  )
}

export default App;
