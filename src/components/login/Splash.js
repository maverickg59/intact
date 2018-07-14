import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TextInput, StatusBar } from 'react-native'
import { Actions } from 'react-native-router-flux'

const { height } = Dimensions.get('window')

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    console.log('mounted')
  }
  render() {
    const barrick = {
      uri: 'https://www.featuredcustomers.com/media/Company.logo/barrick_gold_ABX.png'
    }
    const intact = require('../images/Intact-Logo.png')
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.box1}>
          <Image style={styles.barrickLogo} source={barrick} />
        </View>

        <View style={styles.box2}>
          <View style={styles.center}>
            <Image style={styles.logo} source={intact} />
            <Text style={styles.tagline}>Make it home in one piece.</Text>
          </View>
        </View>

        <View style={styles.box3}>
          <Text style={styles.copyright}>© 2017 Risk Ninjas. All Rights Reserved.</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  box1: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  box2: {
    flex: 1,
    justifyContent: 'center'
  },
  box3: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  copyright: {
    fontSize: 15,
    padding: 10,
    fontWeight: 'bold',
    paddingBottom: 15
  },
  barrickLogo: {
    marginTop: 80,
    width: 200,
    height: 80
  },
  logo: {
    width: 300,
    height: 100
  },
  tagline: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  center: {
    alignItems: 'center'
  }
})
