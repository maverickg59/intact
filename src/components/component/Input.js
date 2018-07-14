import React, { Component } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class InputBox extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={this.props.placeholderText}
          placeholderTextColor="rgba(128, 128, 128, 0.8)"
          autoCapitalize="sentences"
          multiline={this.props.multiline}
          style={styles.input}
          spellCheck={this.props.spell}
          onChangeText={this.props.textChange}
          value={this.props.value}
          onEndEditing={this.props.doneEditing}
        />
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
  input: {
    height: 60,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    textAlign: 'center'
  }
})
