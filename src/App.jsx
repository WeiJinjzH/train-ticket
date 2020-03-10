import React, { lazy, Suspense } from 'react';
import './App.css';

const About =  lazy(() => import(/* webpackChunkName: "about" */'./About.jsx'))

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hasError: false,
    }
  }
  componentDidCatch() {
    this.setState({ hasError: true })
  }
  render() {
    if (this.state.hasError) {
      return <div>error</div>
    }
    return (
      <Suspense fallback={<div>loading</div>}>
        <About />
      </Suspense>
    )
  }
}

export default App;
