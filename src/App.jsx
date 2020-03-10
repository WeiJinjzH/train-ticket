import React, { PureComponent } from 'react';
import './App.css';

class Foo extends PureComponent {
  render() {
    console.log('Foo render')
    return 1
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }
  render() {
    return (
      <div>
        <button type="button" onClick={() => this.setState({ count: this.state.count + 1 })}>Add</button>
        <Foo name="mike" />
      </div>
    )
  }
}

export default App;
