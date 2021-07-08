import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import MagicDropzone from 'react-magic-dropzone'
import { loadModels, getFullFaceDescription } from '../api/face'
import './image.css'

const startstate = {
  preview: '',
  fullDesc: null,
  detections: null,
  tinyface: []
}

export class Image extends Component {
  constructor(props) {
    super(props)
    this.state = { ...startstate }
  }

  onDrop = (accepted, rejected, links) => {
    this.resetState()
    accepted = accepted.map(value => value.preview)
    let newPreviews = [...accepted, ...links]
    this.setState({
      preview: newPreviews
    })

    this.handleImage(newPreviews)
  }

  resetState = () => {
    this.setState({ ...startstate })
  }

  componentWillMount = async () => {
    await loadModels()
    console.log('200')
  }

  handleImage = async img => {
    await getFullFaceDescription(img).then(fullDesc => {
      if (!!fullDesc) {
        this.setState({
          fullDesc,
          detections: fullDesc.map(fd => fd.detection),
          descriptors: fullDesc.map(fd => fd.descriptor)
        })
      }
      const { descriptors } = this.state
      const arr = descriptors[0].values()
      this.setState({ tinyface: [...arr] })
    })
  }

  render() {
    //    const { preview, detections } = this.state

    // let drawBox = null
    // if (!!detections) {
    //   drawBox = detections.map(detection => {
    //     let _H = detection.box.height
    //     let _W = detection.box.width
    //     let _X = detection.box._x
    //     let _Y = detection.box._y
    //     return (
    //       <div>
    //         <div
    //           style={{
    //             position: 'absolute',
    //             border: 'solid',
    //             borderColor: 'blue',
    //             height: _H,
    //             width: _W,
    //             transform: `translate(${_X}px,${_Y}px)`
    //           }}
    //         />
    //       </div>
    //     )
    //   })
    // }

    return (
      <div className="Dropzone-page">
        <MagicDropzone
          className="Dropzone"
          accept="image/jpeg, image/png, .jpg, .jpeg, .png"
          multiple={false}
          onDrop={this.onDrop}
        >
          <div className="Dropzone-content">
            {this.state.preview ? (
              <img
                alt="upload preview"
                className="Dropzone-img"
                src={this.state.preview}
              />
            ) : (
              'Choose or drop a image'
            )}
          </div>
        </MagicDropzone>
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

export default withRouter(Image)
