import React, { useState, useEffect } from 'react';
import './App.css';

class App1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      },
    }
  }

  onResize = () => {
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      }
    })
  }

  componentDidMount() {
    document.title = this.state.count

    window.addEventListener('resize', this.onResize, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false)
  }

  componentDidUpdate() {
    document.title = this.state.count
  }

  render() {
    const { count, size } = this.state

    return (
      <div>
        <button type="button" onClick={() => this.setState({ count: count + 1 })}>
          Add {count}
          size {size.width} x {size.height}
        </button>
      </div>
    )
  }
}

function App() {
  const [ count, setCount ] = useState(0)
  const [ size, setSize ] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }

  useEffect(() => { // 当count变化之后，才会触发打印日志
    console.log('count', count)
  }, [count])

  useEffect(() => {
    document.title = count
  })

  useEffect(() => { // useEffect的第二个参数是可选的数组，只有数组里面的每一项都不变的时候，才不会执行，若是不传数组的话，则表示每次渲染之后都执行useEffect，传入空数组则表示只执行一次
    window.addEventListener('resize', onResize, false)

    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  useEffect(() => {
    document.querySelector('#size').addEventListener('click', onClick, false)
    return ()=> {
      document.querySelector('#size').removeEventListener('click', onClick, false)
    }
  })

  const onClick = () => {
    console.log('click')
  }

  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        Add {count}
      </button>
      {
        count % 2 ?
        <span id="size">
        size {size.width} x {size.height}
      </span> :
      <p id="size">
        size {size.width} x {size.height}
      </p>
      }
    </div>
  )
}

export default App;
