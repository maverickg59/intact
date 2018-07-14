import React, { Component } from 'react'
import { WebView } from 'react-native'

class MyWeb extends Component {
  render() {
    return (
      <WebView
        source={{ uri: 'https://intact2-fbb97.firebaseapp.com' }}
        style={{ marginTop: 20 }}
      />
    )
  }
}
