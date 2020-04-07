import React, { useState, useMemo, PureComponent, memo, useEffect, useCallback, useRef } from 'react';

// const Counter =  memo(function Counter(props) {
//   console.log('Counter render')
//   return (
//     <h1 onClick={props.onClick}>{props.count}</h1>
//   )
// })

class Counter extends PureComponent {
  speak() {
    console.log('new counter is:' + this.props.count)
  }
  render() {
    const { props } = this
    return (
      <h1 onClick={props.onClick}>{props.count}</h1>
    )
  }
}

function App() {
  const [ count, setCount ] = useState(0)
  const counterRef = useRef()
  const it = useRef()

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
    counterRef.current.speak()
  }, [])

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

  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        Add {count} Double {double} half {half}
      </button>
      <Counter ref={counterRef} count={double} onClick={onClick} />
    </div>
  )
}

export default App;
