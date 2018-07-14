import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage, Alert, KeyboardAvoidingView, Linking } from 'react-native'
import { Actions } from 'react-native-router-flux'
import ModalDropdown from 'react-native-modal-dropdown'

import Banner from '../component/Banner'
import Button from '../component/Button'
import WebView from '../component/WebView'
import { bannerMessage } from '../component/Message'

export default class FlraTwo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      departments: '',
      department: '',
      employee: '',
      employees: '',
      flra: '',
      flras: ''
    }
  }
  componentWillMount() {
    return fetch('https://intact.herokuapp.com/api/v1/departments')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          departments: responseJson
        })
        AsyncStorage.setItem('deps', JSON.stringify(this.state.departments))
        console.log('this is working')
      })
      .then(() => {
        return fetch('https://intact.herokuapp.com/api/v1/employees')
          .then(response => response.json())
          .then(responseJson => {
            this.setState({
              employees: responseJson
            })
            AsyncStorage.setItem('emps', JSON.stringify(this.state.employees))
            console.log('this is working well')
          })
      })
      .then(() => {
        return fetch('https://intact.herokuapp.com/api/v1/flras')
          .then(response => response.json())
          .then(responseJson => {
            this.setState({
              flras: responseJson
            })
            AsyncStorage.setItem('flras', JSON.stringify(this.state.flras))
            console.log('this is working really well')
          })
      })
      .catch(error => {
        console.error(error)
      })
  }
  componentDidMount() {
    this._accessData()
  }
  _link() {
    Linking.openURL('https://intact2-fbb97.firebaseapp.com')
  }

  async _accessData() {
    try {
      let deps = await AsyncStorage.getItem('deps')
      let emps = await AsyncStorage.getItem('emps')
      let flras = await AsyncStorage.getItem('flras')
      let parseddeps = JSON.parse(deps)
      let parsedemps = JSON.parse(emps)
      let parsedflras = JSON.parse(flras)
      for (var i = 0; i < parsedflras.length; i++) {
        departments.push(parsedflras[i].flra_id)
        console.log(this.state)
      }
    } catch (error) {
      alert(error)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Banner style={styles.banner} bannerMessage={bannerMessage} />
        <ModalDropdown
          style={styles.box1}
          options={riskassess}
          defaultValue={'FLRAS'}
          textStyle={styles.drop}
          dropdownTextStyle={styles.drop2}
          onSelect={(idx, newState) => this.setState({ flra: newState })}
        />
        <View style={styles.box}>
          <Button
            buttonName="Supervisor"
            onPress={{() => Linking.openURL('https://intact2-fbb97.firebaseapp.com')}}
          />
        </View>
      </View>
    )
  }
}
const FLRA_API_URL = 'https://intact.herokuapp.com/api/v1/flras'
const EMPLOYEES_API_URL = 'https://intact.herokuapp.com/api/v1/employees'
const DEPARTMENT_API_URL = 'https://intact.herokuapp.com/api/v1/departments'
window.serverData = {}
const departments = []
const employees = []
const riskassess = []

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  box1: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  drop: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
    justifyContent: 'center',
    alignItems: 'center'
  },
  drop2: {
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
    width: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  banner: {
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5
  }
})
