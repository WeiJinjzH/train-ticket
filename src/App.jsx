import React, { Component, createContext } from 'react';
import './App.css';

const BetteryContext = createContext()
const OnlineContext = createContext()

class Leaf extends Component {
  static contextType = BetteryContext

  render() {
    const bettery = this.context
    return (
          <h1>bettery: {bettery}</h1>
        )
  }
}

class Middle extends Component {
  render() {
    return <Leaf />
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      bettery: 0,
      online: false,
    }
  }
  render() {
    return (
      <BetteryContext.Provider value={this.state.bettery}>
      <OnlineContext.Provider value={this.state.online}>
        <button onClick={() => this.setState({ bettery: this.state.bettery + 1 })} type="button">Press</button>
        <button onClick={() => this.setState({ online: !this.state.online })} type="button">Switch</button>
        <Middle />
      </OnlineContext.Provider>
      </BetteryContext.Provider>
    )
  }
}

export default App;
