import React, { Component } from 'react'
import { Router, Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import Home from './views/Home'
import VideoInput from './views/Camera'
import TrainInput from './views/Train'
import ImageInput from './views/Image'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={createHistory({ basename: process.env.PUBLIC_URL })}>
          <div className="route">
            <Route exact path="/" component={Home} />
            <Route exact path="/video" component={VideoInput} />
            <Route exact path="/profile" component={TrainInput} />
            <Route exact path="/photo" component={ImageInput} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App

// import React from 'react'
// import MagicDropzone from 'react-magic-dropzone'

// import * as mobilenet from '@tensorflow-models/mobilenet'
// import '@tensorflow/tfjs'
// import './styles.css'

// class App extends React.Component {
//   state = {
//     model: null,
//     preview: '',
//     predictions: []
//   }

//   componentDidMount() {
//     mobilenet.load().then(model => {
//       this.setState({
//         model: model
//       })
//     })
//   }

//   onDrop = (accepted, rejected, links) => {
//     this.setState({ preview: accepted[0].preview || links[0] })
//   }

//   onImageChange = e => {
//     this.state.model.classify(e.target).then(predictions => {
//       this.setState({ predictions: predictions })
//     })
//   }

//   render() {
//     return (
//       <div className="Dropzone-page">
//         {this.state.model ? (
//           <MagicDropzone
//             className="Dropzone"
//             accept="image/jpeg, image/png, .jpg, .jpeg, .png"
//             multiple={false}
//             onDrop={this.onDrop}
//           >
//             <div className="Dropzone-content">
//               {this.state.preview ? (
//                 <img
//                   alt="upload preview"
//                   onLoad={this.onImageChange}
//                   className="Dropzone-img"
//                   src={this.state.preview}
//                 />
//               ) : (
//                 'Choose or drop a file.'
//               )}
//             </div>
//           </MagicDropzone>
//         ) : (
//           <div className="Dropzone">Loading model...</div>
//         )}
//         <div>
//           {this.state.predictions.map(item => (
//             <div className="prediction" key={item.className}>
//               <div>{item.className}</div>
//               <div>{item.probability.toFixed(2)}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     )
//   }
// }

// export default App
