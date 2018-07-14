import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

export default class SwitchButton extends Component {
  constructor(props) {
    super(props)
    this.state = { toggle: true }
  }
  _onPress() {
    const newState = !this.state.toggle
    this.setState({ toggle: newState })
  }
  render() {
    const { toggle } = this.state
    const textValue = toggle ? 'INDIVIDUAL ASSESSMENT' : 'TEAM ASSESSMENT'
    const buttonBg = toggle ? '#ea882d' : 'white'
    const textColor = toggle ? 'white' : '#ea882d'
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._onPress()}
          onPressIn={this.props.onPressIn}
          onPressOut={this.props.onPressOut}
          onSelect={this.props.onSelect}
          style={{
            flexDirection: 'row',
            flex: 1,
            height: 70,
            backgroundColor: buttonBg,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: textColor,
              textAlign: 'center',
              fontSize: 25,
              fontWeight: '700',
              flexWrap: 'nowrap'
            }}
          >
            {textValue}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
})
