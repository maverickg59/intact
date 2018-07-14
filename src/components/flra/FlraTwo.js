import React, { Component } from 'react'
import { View, StyleSheet, AsyncStorage, Alert, KeyboardAvoidingView } from 'react-native'
import { Actions } from 'react-native-router-flux'

import Banner from '../component/Banner'
import Input from '../component/Input'
import Label from '../component/Label'
import Slider from '../component/Slider'
import Button from '../component/Button'
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
      like: 1,
      emp: 1,
      oth: 1,
      eid: ''
    }
  }
  componentDidMount() {
    this._loadInitialState()
    this.setItemToStorage()
  }
  setItemToStorage() {
    AsyncStorage.setItem('FlraData', JSON.stringify(this.state))
  }
  async _loadInitialState() {
    try {
      let FlraOne = await AsyncStorage.getItem('FlraOne')
      let parsed = JSON.parse(FlraOne)
      if (parsed !== null) {
        this.setState({
          cat: parsed.cat,
          task: parsed.task,
          risk: parsed.risk,
          mit: parsed.mit,
          eid: parsed.eid
        })
        if (parsed.team === true) {
          this.setState({ team: 'true' })
        } else {
          this.setState({ team: 'false' })
        }
      } else {
        console.log(`I haven't been filled out yet!`)
      }
    } catch (error) {
      alert(error)
    }
  }
  render() {
    let riskTotal = this.state.like + this.state.emp + this.state.oth
    let theTeam = this.state.team
    const likelihood = `How likely am I to be injured?`
    const severity = `How severe will it be?`
    const other = `How severe can others be hurt?`
    return (
      <View style={styles.container}>
        <Banner style={styles.box} bannerMessage={bannerMessage} />
        <Label style={styles.label} labelText={likelihood} />
        <Slider
          style={styles.box}
          onValueChange={value => this.setState({ like: value })}
          onSlidingComplete={() => {
            AsyncStorage.setItem('FlraData', JSON.stringify(this.state))
          }}
        />
        <Label style={styles.label} labelText={severity} />
        <Slider
          style={styles.box}
          onValueChange={value => this.setState({ emp: value })}
          onSlidingComplete={() => {
            AsyncStorage.setItem('FlraData', JSON.stringify(this.state))
          }}
        />
        <Label style={styles.label} labelText={other} />
        <Slider
          style={styles.box}
          onValueChange={value => this.setState({ oth: value })}
          onSlidingComplete={() => {
            AsyncStorage.setItem('FlraData', JSON.stringify(this.state))
          }}
        />
        <View style={styles.button}>
          <Button buttonName="Back" onPress={Actions.FlraOne} />
          <Button onPress={Actions.Camera} buttonName="+ Photo" style={styles.button2} />
          <Button
            buttonName="Next"
            onPress={() => {
              if (
                (theTeam === 'false' && riskTotal > 10) ||
                (theTeam === 'false' && this.state.like > 3) ||
                (theTeam === 'false' && this.state.emp > 3) ||
                (theTeam === 'false' && this.state.oth > 3)
              ) {
                Alert.alert(
                  'This should be a team effort!',
                  'Press OK to go back and make this a team FLRA.',
                  [{ text: 'OK', onPress: () => Actions.FlraOne() }],
                  { cancelable: false }
                )
              } else {
                AsyncStorage.setItem('FlraData', JSON.stringify(this.state))
                console.log(this.state.team)
                Actions['FlraSummary'].call()
              }
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  box: {
    flexDirection: 'row'
  },
  label: {
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  input: {
    flexDirection: 'row'
  },
  button2: {
    borderWidth: 1,
    borderColor: 'black'
  }
})
