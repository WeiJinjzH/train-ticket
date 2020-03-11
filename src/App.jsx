import React, { useState } from 'react';
import './App.css';

class App1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }
  render() {
    const { count } = this.state

    return (
      <div>
        <button type="button" onClick={() => this.setState({ count: count + 1 })}>Add {count}</button>
      </div>
    )
  }
}

function App() {
  const [ count, setCount ] = useState(0)
  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>Add {count}</button>
    </div>
  )
}

export default App;
