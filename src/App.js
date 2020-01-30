import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import { FilePond, File, registerPlugin } from 'react-filepond';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [
        {
          source: 'index.html',
          options: {
            type: 'local'
          }
        }
      ]
    };
  }

  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
  }

  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>LIFT Email Reusable Images</h1>
        <FilePond
          ref={ref => (this.pond = ref)}
          files={this.state.files}
          allowMultiple={true}
          maxFiles={3}
          server="gs://lift-reusable-images.appspot.com"
          oninit={() => this.handleInit()}
          onupdatefiles={fileItems => {
            this.setState({
              files: fileItems.map(fileItem => fileItem.file)
            });
          }}
        ></FilePond>
      </div>
    );
  }
}

export default App;
