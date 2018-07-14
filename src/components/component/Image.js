import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'

export default class Button extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.shadow}>
          <Image style={styles.image} source={this.props.source} />
        </View>
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
