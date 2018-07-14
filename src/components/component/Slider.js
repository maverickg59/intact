import React, { Component } from 'react'
import { View, StyleSheet, Slider, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class SliderButton extends React.Component {
  state = {
    riskStart: 1
  }

  onValueChange(key, value) {
    this.setState({ riskStart: value })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            step={1}
            minimumValue={1}
            maximumValue={5}
            value={this.state.riskStart}
            onSlidingComplete={this.props.onSlidingComplete}
            onValueChange={this.props.onValueChange}
          />
        </View>
        <View style={styles.label}>
          <View style={styles.box0}>
            <Text style={styles.text}>1</Text>
          </View>
          <View style={styles.box1}>
            <Text style={styles.text}>2</Text>
          </View>
          <View style={styles.box2}>
            <Text style={styles.text}>3</Text>
          </View>
          <View style={styles.box3}>
            <Text style={styles.text}>4</Text>
          </View>
          <View style={styles.box4}>
            <Text style={styles.text}>5</Text>
          </View>
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
  slider: {
    width: 330,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    opacity: 0.75
  },
  label: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  text: {
    fontSize: 25,
    fontWeight: '500'
  },
  sliderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  box0: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00FF00'
  },
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#99ff00'
  },
  box2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFF00'
  },
  box3: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff6600'
  },
  box4: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3300'
  }
})
