import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage, Alert, KeyboardAvoidingView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import ModalDropdown from 'react-native-modal-dropdown'
import { LinearGradient } from 'expo'

import Banner from '../component/Banner'
import Input from '../component/Input'
import Label from '../component/Label'
import Slider from '../component/Slider'
import Button from '../component/Button'
import Switch from '../component/Switch'
import { bannerMessage } from '../component/Message'

export default class FlraTwo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cat: '',
      task: '',
      risk: '',
      mit: '',
      team: '',
      like: '',
      emp: '',
      oth: '',
      eid: ''
    }
  }
  componentWillMount() {
    this.clearData()
    console.log('data cleared!')
  }
  componentDidMount() {
    this._loadInitialState().done()
  }
  async _loadInitialState() {
    try {
      let EmpInfo = await AsyncStorage.getItem('EmpInfo')
      let parsed = JSON.parse(EmpInfo)
      if (parsed !== null) {
        this.setState({
          eid: parsed.id
        })
      } else {
        console.log(`I haven't been filled out yet!`)
      }
    } catch (error) {
      alert(error)
    }
  }
  componentWillUpdate() {
    AsyncStorage.setItem('FlraOne', JSON.stringify(this.state))
  }
  clearData() {
    let keys = ['FlraOne', 'FlraTwo', 'FlraSummary', 'FlraData', 'uri']
    AsyncStorage.multiRemove(keys, err => {
      console.log(this.state)
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#9a9d9f', '#9a9d9f', '#9a9d9f']} style={styles.container2}>
          <Banner style={styles.banner} bannerMessage={bannerMessage} />
          <View style={styles.box2}>
            <ModalDropdown
              options={categories}
              defaultValue={'>  RISK CATEGORY  <'}
              textStyle={styles.drop}
              dropdownTextStyle={styles.drop2}
              onSelect={(idx, newState) => this.setState({ cat: newState })}
            />
          </View>
          <KeyboardAvoidingView style={styles.box} behavior="padding">
            <Input
              placeholderText={task}
              spell={true}
              textChange={text => this.setState({ task: text })}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView style={styles.box} behavior="padding">
            <Input
              placeholderText={risk}
              spell={true}
              textChange={text => this.setState({ risk: text })}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView style={styles.box} behavior="padding">
            <Input
              placeholderText={mitigation}
              spell={true}
              textChange={text => this.setState({ mit: text })}
            />
          </KeyboardAvoidingView>
          <Switch
            style={styles.box}
            onPressIn={value => this.setState({ team: !this.state.team })}
            onPressOut={() => {
              AsyncStorage.setItem('FlraOne', JSON.stringify(this.state))
            }}
            onSelect={console.log(this.state)}
          />
          <View style={styles.button}>
            <Button buttonName="NEXT" icon={{ name: 'cached' }} onPress={Actions.FlraTwo} />
          </View>
        </LinearGradient>
      </View>
    )
  }
}

const task = 'WHAT TASK WILL BE COMPLETED?'
const risk = 'WHAT IS THE PRIMARY RISK INVOLVED?'
const mitigation = 'HOW WILL THE RISK BE MITIGATED?'

const categories = [
  'Electrocution',
  'Slip/Trip/Fall',
  'Evisceration',
  'Air Quality',
  'Fire',
  'Water',
  'Kinesthetic',
  'Collision'
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#005C88'
  },
  container2: {
    flex: 1,
    flexDirection: 'column'
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box2: {
    flex: 0.55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    backgroundColor: '#ea882d'
  },
  drop: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
    backgroundColor: '#ea882d',
    color: 'white'
  },
  drop2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '500',
    width: 250
  },
  button: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderColor: '#9a9d9f'
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
