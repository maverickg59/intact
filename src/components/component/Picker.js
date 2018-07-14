import React, { Component } from 'react'
import { View, StyleSheet, Picker, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class PickerButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { category: props.category }
    this.dataChanged = props.dataChanged
  }

  onValueChange(key, value) {
    console.log('hi')
    this.setState({ category: value })
  }
  render() {
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.category}
          onValueChange={(itemValue, itemIndex) => this.dataChanged(itemValue)}
        >
          <Picker.Item label="Technology" value="technology" />
          <Picker.Item label="Business" value="business" />
          <Picker.Item label="Cooking" value="cooking" />
        </Picker>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

// onValueChange={this.onValueChange.bind(this, 'category')}

// onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
