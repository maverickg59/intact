import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, AsyncStorage, Alert, Linking } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

import Banner from '../component/Banner'
import Input from '../component/Input'
import Label from '../component/Label'
import Slider from '../component/Slider'
import Button from '../component/Button'
import Switch from '../component/Switch'
import PComponent from '../component/Picker'
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
      eid: ''
    }
  }
  componentDidMount() {}

  onPressButton = () => {
    this.postRating()
    console.log('hi')
    Alert.alert(
      'Your rating is submitted!',
      'What time did the pirate go to the dentist? Tooth hurty!',
      [
        { text: 'OK', onPress: () => Actions.FlraOne() },
        { text: 'Cancel', onPress: () => console.log('Cancelled'), style: 'Cancel' }
      ],
      { cancelable: false }
    )
  }

  postRating = () => {
    let flra = {
      task: this.state.task,
      is_team: this.state.team,
      date: new Date().toISOString(),
      employee_id: this.state.eid
    }
    let risk = {
      risk_name: this.state.risk,
      category: this.state.cat
    }
    let flra_risk = {
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
    return fetch('https://intact.herokuapp.com/api/v1/flras' + id, settings)
      .then(res => res.json())
      .then(function(response) {
        console.log(response)
        return response
      })
      .catch(function(error) {
        console.log('Looks like there was a problem: \n', error)
      })
  }
  render() {
    let id = '12'
    const cat = 'Category:'
    const task = 'Task:'
    const risk = 'Risk:'
    const mit = 'Mitigation:'
    const team = 'Team:'
    const like = 'Likelihood:'
    const emp = 'Severity to Me:'
    const oth = 'Severity to Others:'
    const pics = 'Photos:'
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
      ['']
    ]

    return (
      <View style={styles.container}>
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
          <Button
            buttonName="Supervisor"
            onPress={() => Linking.openURL('https://intact2-fbb97.firebaseapp.com')}
          />
        </View>
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
