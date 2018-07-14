import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class LabelBox extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}>{this.props.labelText}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  text: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  }
})
