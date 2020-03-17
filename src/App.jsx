import React, { useState, useMemo, memo, useCallback } from 'react';

const Counter =  memo(function Counter(props) {
  console.log('Counter render')
  return (
    <h1 onClick={props.onClick}>{props.count}</h1>
  )
})

function App() {
  const [ count, setCount ] = useState(0)

  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  const half = useMemo(() => {
    return double / 4
  }, [double])

  // const onClick = useMemo(() => {
  //   return () => console.log('click')
  // }, [])

  const onClick = useCallback(() => { // 与上面那个useMemo等价  如果useMemo返回一个函数，则等价于useCallback
    console.log('click')
  }, [])

  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        Add {count} Double {double} half {half}
      </button>
      <Counter count={double} onClick={onClick} />
    </div>
  )
}

export default App;
