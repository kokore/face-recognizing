import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Webcam from 'react-webcam'
import fs from 'fs'
import {
  loadModels,
  getFullFaceDescription,
  getFaceDescriptor
} from '../api/face'

const WIDTH = 800
const HEIGHT = 600
const inputSize = 160

export class Train extends Component {
  constructor(props) {
    super(props)
    this.webcam = React.createRef()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      detections: null,
      descriptors: null,
      tinyface: []
    }
  }

  componentWillMount = async () => {
    await loadModels()
    this.setInputDevice()
  }

  setInputDevice = () => {
    navigator.mediaDevices.enumerateDevices().then(this.startCapture())
  }

  startCapture() {
    this.interval = setInterval(() => {
      this.capture()
    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  capture = async () => {
    try {
      if (!!this.webcam.current) {
        await getFullFaceDescription(
          this.webcam.current.getScreenshot(),
          inputSize
        ).then(fullDesc => {
          if (!!fullDesc) {
            this.setState({
              detections: fullDesc.map(fd => fd.detection),
              descriptors: fullDesc.map(fd => fd.descriptor)
            })
          }
        })
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { descriptors } = this.state
    //const newitem = Object.assign({}, ...descriptors, this.input.value)
    const arr = descriptors[0].values()
    this.setState({ tinyface: [...arr] })

    // for (let i = 0; i < 100; i++) {
    //   console.log(arr[i].value)
    // }
  }

  render() {
    const { detections } = this.state
    let videoConstraints = null

    videoConstraints = {
      width: WIDTH,
      height: HEIGHT
    }

    let drawBox = null
    if (!!detections) {
      drawBox = detections.map(detection => {
        let _H = detection.box.height
        let _W = detection.box.width
        let _X = detection.box._x
        let _Y = detection.box._y
        return (
          <div>
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: 'blue',
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            />
          </div>
        )
      })
    }

    return (
      <div
        className="Camera"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <p>Camera</p>
        <div
          style={{
            width: WIDTH,
            height: HEIGHT
          }}
        >
          <div style={{ position: 'relative', width: WIDTH }}>
            {!!videoConstraints ? (
              <div style={{ position: 'absolute' }}>
                <Webcam
                  audio={false}
                  width={WIDTH}
                  height={HEIGHT}
                  ref={this.webcam}
                  screenshotFormat="image"
                  videoConstraints={videoConstraints}
                />
              </div>
            ) : null}
            {!!drawBox ? drawBox : null}
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Submit" />
        </form>
        <div>
          {this.state.tinyface.map(m => (
            <p>
              {' '}
              {m} ,<br />
            </p>
          ))}
        </div>
      </div>
    )
  }
}

export default withRouter(Train)
