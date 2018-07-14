import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  Alert,
  AsyncStorage
} from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      employee: 1,
      id: '',
      name: '',
      department: '',
      sup: ''
    }
  }

  componentWillMount() {
    return fetch('https://intact.herokuapp.com/api/v1/employees')
      .then(response => response.json())
      .then(responseJson => {
        employees = responseJson
        this.setState({
          id: employees[0].id,
          name: employees[0].name,
          department: employees[0].department_id,
          sup: employees[0].is_supervisor
        })
        AsyncStorage.setItem('EmpInfo', JSON.stringify(this.state))
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <StatusBar barStyle="dark-content" />
        <TextInput
          placeholder="Employee ID"
          placeholderTextColor="rgba(128, 128, 128, 0.8)"
          onSubmitEditing={() => this.passwordInput.focus()}
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          onChangeText={text => this.setState({ employee: text })}
        />

        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="rgba(128, 128, 128, 0.8)"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          returnKeyType="go"
          ref={input => (this.passwordInput = input)}
          onChangeText={text => this.setState({ password: text })}
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={Actions.FlraOne} title="Press Me">
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    marginTop: 15,
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: 'rgba(128, 128, 128, .8)',
    marginTop: 15,
    marginLeft: 70,
    marginRight: 70,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5
  },
  buttonText: {
    color: 'black',
    fontWeight: '900'
  }
})
