import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class BannerBox extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.message}>{this.props.bannerMessage}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 23,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#5e6266'
  },
  message: {
    flex: 1,
    fontSize: 25,
    padding: 10,
    fontWeight: '700',
    paddingLeft: 10,
    color: 'white',
    textAlign: 'center'
  }
})
