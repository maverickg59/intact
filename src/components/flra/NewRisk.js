import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage, Text, Alert, KeyboardAvoidingView } from 'react-native'
import { Actions } from 'react-native-router-flux'

import Label from '../component/Label'
import Button from '../component/Button'
import Input from '../component/Input'

export default class FlraMainTwo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: '' }
  }

  render() {
    return (
      <View style={styles.container}>
        <Button buttonName={'Save'} onPress={this.saveData} />
        <Label labelText={this.state.name} style={styles.label} />
        <Button buttonName={'Change'} />

        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Input textChange={text => this.setState({ name: text })} doneEditing={text => AsyncStorage.setItem('name', this.state.name)} />
        </KeyboardAvoidingView>

        <Button buttonName={'Show'} onPress={this.showData} />
      </View>
    )
  }
  saveData() {
    let obj = {
      assessment: assessType,
      category: riskCat,
      task: taskName,
      risk: riskName
    }
    AsyncStorage.setItem('savedPageOne', JSON.stringify(obj))
  }
  showData = async () => {
    try {
      let savedName = await AsyncStorage.getItem('name')
      alert(savedName)
    } catch (error) {
      alert(error)
    }
  }
}

let assessType = 'Risk assessment type!'
let riskCat = 'Category of risk!'
let taskName = 'Name of task!'
let riskName = 'Name of risk!'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  label: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
})
