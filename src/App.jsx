import React, { useState, useMemo, PureComponent, memo, useEffect, useCallback, useRef } from 'react';

// const Counter =  memo(function Counter(props) {
//   console.log('Counter render')
//   return (
//     <h1>{props.count}</h1>
//   )
// })

// class Counter extends PureComponent {
//   render() {
//     const { props } = this
//     return (
//       <h1>{props.count}</h1>
//     )
//   }
// }

function useCounter(count) {
  return (
    <h1>{count}</h1>
  )
}

function useCount(defaultCount) {
  const [ count, setCount ] = useState(defaultCount)
  const it = useRef()

  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current)
    }
  })
  return [count, setCount]
}

function useSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })
  const onResize = useCallback(() => {

  }, [])
  useEffect(() => {
    window.addEventListener('resize', onResize, false)

    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])
  return size
}

function App() {
  const [ count, setCount ] = useCount(0)
  const Counter = useCounter(count)
  const size = useSize()
  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        Add {count} {size.width} X {size.height}
      </button>
      {Counter}
    </div>
  )
}

export default App;
