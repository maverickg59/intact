import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'

import Button from './Button'

export default class ImageDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uri: ''
    }
  }

  componentWillMount() {
    this._loadUri().done()
  }

  async _loadUri() {
    try {
      let uri = await AsyncStorage.getItem('uri')
      let puri = JSON.parse(uri)
      if (puri !== null) {
        this.setState({
          uri: puri.uri
        })
      } else {
        console.log('Take some photos!')
      }
    } catch (error) {
      alert(error)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <Image
            style={{ height: this.state.uri.height / 4, width: this.state.uri.width / 4 }}
            source={{ uri: this.state.uri.uri }}
          />
        </View>
        <Button
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
          }}
          onPress={Actions.FlraSummary}
          buttonName="Back"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  shadow: {
    marginTop: 15,
    borderRadius: 15,
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5
  },
  image: {
    height: 260,
    width: 285,
    borderRadius: 15
  }
})
