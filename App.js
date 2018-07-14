import React from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import { Actions, Router, Scene, Tabs } from 'react-native-router-flux'

import Splash from './src/components/login/Splash'
import Login from './src/components/login/Login'
import FlraOne from './src/components/flra/FlraOne'
import FlraTwo from './src/components/flra/FlraTwo'
import FlraSummary from './src/components/flra/FlraSummary'
import Profile from './src/components/profile/Profile'
import SupView from './src/components/supervisor/SupView'
import SupSum from './src/components/supervisor/SupSummary'
import Camera from './src/components/component/Camera'
import Image from './src/components/component/ImageDisplay'
import WebView from './src/components/component/WebView'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene tabBarStyle={styles.tabBarStyle} labelStyle={styles.tabs} key="root">
          <Scene key="Intro" initial={true}>
            <Scene key="Splash" hideNavBar={true} component={Splash} />
            <Scene key="Login" hideNavBar={true} component={Login} initial={true} />
          </Scene>
          <Scene tabs={true} hideNavBar={true}>
            <Scene key="FLRA" tabStyle={styles.tabs}>
              <Scene key="FlraOne" hideNavBar={true} component={FlraOne} initial={true} />
              <Scene key="FlraTwo" hideNavBar={true} component={FlraTwo} />
              <Scene key="FlraSummary" hideNavBar={true} component={FlraSummary} />
              <Scene key="Camera" component={Camera} title="Go Back" />
              <Scene key="Image" component={Image} />
            </Scene>
            <Scene key="CHAT" hideNavBar={true} component={Splash} />
            <Scene key="SUM">
              <Scene key="SupView" hideNavBar={true} component={SupSum} />
              <Scene key="SupSum" hideNavBar={true} component={SupSum} />
            </Scene>
            <Scene key="PROF" hideNavBar={true} component={Profile} initial={true} />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBarStyle: {
    borderTopWidth: 0.5,
    backgroundColor: '#5e6266',
    opacity: 1
  },
  tabs: {
    fontSize: 25,
    fontWeight: '700',
    color: 'white',
    padding: 5
  }
})
