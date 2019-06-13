import React, { Component } from 'react'
import { Card } from 'antd'
import logo from '../logo_404.svg';

export class notfound extends Component {
  render() {
    return (
      <Card style={{ minHeight: '100vh'}}>
        <h1 style={{ textAlign: 'center' }}>Error 404 Not Found</h1>
        <img src={logo} className="App-logo" alt="logo" style={{ display: 'block', marginLeft: 'auto', marginRight:'auto'}} />
      </Card>
    )
  }
}

export default notfound
