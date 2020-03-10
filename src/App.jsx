import React, { PureComponent, memo } from 'react';
import './App.css';

const Foo = memo(function Foo(props) {
    console.log('Foo render')
return <div>{props.person.age}</div>
})

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      person: {
        age: 0,
      },
    }
  }
  callback = () => {

  }
  render() {
    const { person } = this.state
    return (
      <div>
        <button type="button" onClick={() => {
          person.age ++
          this.setState({ person })
        }}>Add</button>
        <Foo name="mike" person={person} cb={this.callback} />
      </div>
    )
  }
}

export default App;
