import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TextInput, StatusBar } from 'react-native'
import LoginForm from './LoginForm'

const { height } = Dimensions.get('window')

export default class LoginScreen extends React.Component {
  render() {
    const bLogo = { uri: 'https://www.featuredcustomers.com/media/Company.logo/barrick_gold_ABX.png' }
    const iLogo = require('../images/Intact-Logo.png')
    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <Image style={styles.barrickLogo} source={bLogo} />
        </View>

        <View style={styles.box2}>
          <View style={styles.center}>
            <Image style={styles.logo} source={iLogo} />
            <Text style={styles.tagline}>Make it home in one piece.</Text>
          </View>
          <LoginForm />
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
    justifyContent: 'center'
  },
  box1: {
    flex: 0.33,
    justifyContent: 'flex-start'
  },
  box2: {
    flex: 3,
    justifyContent: 'flex-end'
  },
  box3: {
    flex: 0.5,
    justifyContent: 'flex-end'
  },
  copyright: {
    fontSize: 15,
    padding: 10,
    fontWeight: 'bold'
  },
  barrickLogo: {
    marginTop: 50,
    width: 200,
    height: 80
  },
  logo: {
    width: 300,
    height: 100
  },
  tagline: {
    marginBottom: 50,
    fontSize: 15,
    fontWeight: 'bold'
  },
  center: {
    alignItems: 'center'
  }
})
