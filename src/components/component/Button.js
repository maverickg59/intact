import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class Button extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPressOut={this.props.out}
          onPress={this.props.onPress}
          icon={this.props.icon}
        >
          <Text style={styles.buttonText}>{this.props.buttonName}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  buttonContainer: {
    backgroundColor: '#ea882d',
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 25
  }
})
