import React from 'react'
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native'
import { Camera, Video, FileSystem, Permissions, Vibration } from 'expo'
import { Actions } from 'react-native-router-flux'

import Button from '../component/Button'

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    data: '',
    uri: '',
    photoId: 1
  }
  componentDidUpdate() {
    AsyncStorage.setItem('uri', JSON.stringify(this.state))
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }
  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync().then(photo => {
        this.setState({
          photoId: this.state.photoId + 1,
          uri: photo
        })
        console.log(this.state.photoUri)
      })
    }
  }
  render() {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end'
                }}
              >
                <Button
                  buttonName="Flip"
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                    })
                  }}
                />
                <Button buttonName="Snap" onPress={this.snap} />
                <Button
                  buttonName="Back"
                  onPress={() => {
                    Actions.pop()
                  }}
                />
              </View>
            </View>
          </Camera>
        </View>
      )
    }
  }
}
