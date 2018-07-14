import React, { Component } from 'react'
import { View, StyleSheet, Picker, Alert, Text, AsyncStorage } from 'react-native'
import { Actions, ActionConst } from 'react-native-router-flux'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

import Banner from '../component/Banner'
import Input from '../component/Input'
import Label from '../component/Label'
import Slider from '../component/Slider'
import Button from '../component/Button'
import Image from '../component/Image'
import { bannerMessage } from '../component/Message'

export default class FlraMainTwo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { name: '', eid: '', dep: '' }
  }

  clearData() {
    let keys = ['EmpInfo']
    AsyncStorage.multiRemove(keys, err => {
      console.log('data cleared')
    })
  }

  componentWillMount() {
    this._loadInitialState().done()
  }

  async _loadInitialState() {
    try {
      let EmpInfo = await AsyncStorage.getItem('EmpInfo')
      let parsed = JSON.parse(EmpInfo)
      if (parsed !== null) {
        this.setState({
          name: parsed.name,
          eid: parsed.employee,
          dep: parsed.department
        })
        console.log(this.state)
      } else {
        Alert.alert(
          `You're not logged in!`,
          'Press OK to log in.',
          [
            { text: 'OK', onPress: () => Actions.Login() },
            { text: 'Cancel', onPress: () => console.log('Cancelled'), style: 'Cancel' }
          ],
          { cancelable: false }
        )
      }
    } catch (error) {
      alert(error)
    }
  }
  onPressButton = () => {
    this.clearData()
    console.log(this.state)
    Alert.alert(
      `You're logged out!`,
      'What do prisoners use to call each other? Cell phones!',
      [{ text: 'OK', onPress: () => Actions.Login() }],
      {
        cancelable: false
      }
    )
  }
  render() {
    const image = {
      uri:
        'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAOaAAAAJGI4MTgxYTY2LWQ1MmQtNDA4OC04NDRjLTA3OGI1YjllYWExZQ.jpg'
    }
    const name = 'Name:'
    const eid = 'Emp ID:'
    const dep = 'Dep:'
    const tableTitle = [name, eid, dep]
    const tableData = [[this.state.name], [this.state.eid], [this.state.dep]]
    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <Banner bannerMessage={bannerMessage} />
        </View>
        <Image source={image} />
        <TableWrapper style={{ flexDirection: 'row', marginTop: 30 }}>
          <Col
            data={tableTitle}
            style={styles.title}
            heightArr={[60, 60, 60]}
            textStyle={styles.text}
          />
          <Rows data={tableData} flexArr={[2]} style={styles.row} textStyle={styles.rowText} />
        </TableWrapper>
        <View style={styles.box}>
          <Button buttonName="Logout" onPress={this.onPressButton} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  box: {
    flexDirection: 'row'
  },
  box1: {
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5
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
  }
})
