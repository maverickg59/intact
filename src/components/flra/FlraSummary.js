import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  AsyncStorage,
  Alert,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

import Banner from '../component/Banner'
import Input from '../component/Input'
import Label from '../component/Label'
import Button from '../component/Button'
import { bannerMessage } from '../component/Message'

export default class FlraSummary extends React.Component {
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
      eid: '',
      uri: ''
    }
  }
  componentWillMount() {
    this._loadUri().done()
  }
  componentDidMount() {
    this._loadInitialState().done()
  }
  clearData() {
    let keys = ['uri']
    AsyncStorage.multiRemove(keys, err => {
      console.log(this.state)
    })
  }
  async _loadUri() {
    try {
      let uri = await AsyncStorage.getItem('uri')
      let puri = JSON.parse(uri)
      if (puri !== null) {
        this.setState({
          uri: puri.uri
        })
      } else {
        console.log('Take some photos!')
      }
    } catch (error) {
      alert(error)
    }
  }
  async _loadInitialState() {
    try {
      let FlraOne = await AsyncStorage.getItem('FlraData')
      let parsed = JSON.parse(FlraOne)
      if (parsed !== null) {
        this.setState({
          cat: parsed.cat,
          task: parsed.task,
          risk: parsed.risk,
          mit: parsed.mit,
          team: parsed.team,
          like: parsed.like,
          emp: parsed.emp,
          oth: parsed.oth,
          eid: parsed.eid
        })
      } else {
        Alert.alert(
          'You need to fill me out!',
          'Press OK to start over or press Cancel to see a blank summary!',
          [
            { text: 'OK', onPress: () => Actions.FlraOne() },
            { text: 'Cancel', onPress: () => console.log('Cancelled'), style: 'Cancel' }
          ],
          { cancelable: false }
        )
      }
    } catch (error) {
      alert(error)
    }
  }
  postFlra = () => {
    var flra = {
      task: this.state.task,
      is_team: this.state.team,
      date: new Date().toISOString(),
      employee_id: this.state.eid
    }
    var risk = {
      risk_name: this.state.risk,
      category: this.state.cat
    }
    var flra_risk = {
      mitigation: this.state.mit,
      likelihood: this.state.like,
      severity_employee: this.state.emp,
      severity_others: this.state.oth
    }
    let settings = {
      // mode: cors,
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        flra,
        risk,
        flra_risk
      })
    }
    return fetch('https://intact.herokuapp.com/api/v1/flras', settings)
      .then(console.log(flra))
      .then(res => res.json())
      .then(function(response) {
        console.log(response)
        return response
      })
      .catch(function(error) {
        console.log('Looks like there was a problem: \n', error)
      })
  }
  onPressButton = () => {
    console.log('Button Pressed')
    this.postFlra()
    this.clearData()
    Alert.alert(
      'Your FLRA is submitted!',
      'What time did the pirate go to the dentist? Tooth hurty!',
      [
        { text: 'OK', onPress: () => Actions.FlraOne() },
        { text: 'Cancel', onPress: () => console.log('Cancelled'), style: 'Cancel' }
      ],
      { cancelable: false }
    )
  }
  render() {
    const cat = 'Category:'
    const task = 'Task:'
    const risk = 'Risk:'
    const mit = 'Mitigation:'
    const team = 'Team:'
    const like = 'Likelihood:'
    const emp = 'Severity to Me:'
    const oth = 'Severity to Others:'
    const pics = (
      <TouchableOpacity
        style={{
          width: 90,
          height: 25,
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={Actions.Image}
      >
        <Text style={styles.text}>Photo:</Text>
      </TouchableOpacity>
    )
    const tableTitle = [cat, task, risk, mit, team, like, emp, oth, pics]
    const tableData = [
      [this.state.cat],
      [this.state.task],
      [this.state.risk],
      [this.state.mit],
      [this.state.team],
      [this.state.like],
      [this.state.emp],
      [this.state.oth],
      [this.state.uri.uri, this.state.uri.width, this.state.uri.height]
    ]
    return (
      <View style={styles.container}>
        <ScrollView style={styles.box}>
          <Table style={styles.box}>
            <TableWrapper style={{ flexDirection: 'row', marginTop: 30 }}>
              <Col
                data={tableTitle}
                style={styles.title}
                heightArr={[60, 60, 60, 60, 60, 60, 60, 60, 60]}
                textStyle={styles.text}
              />
              <Rows data={tableData} flexArr={[2]} style={styles.row} textStyle={styles.rowText} />
            </TableWrapper>
          </Table>
          <View style={styles.button}>
            <Button buttonName="Back" onPress={Actions.FlraTwo} />
            <Button buttonName="+ Photo" onPress={Actions.Camera} />
            <Button buttonName="Submit" onPress={this.onPressButton} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  title: {
    flex: 1,
    backgroundColor: '#f6f8fa'
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700'
  },
  row: {
    height: 60
  },
  rowText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500'
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
})
