import React, { Component } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import { storage } from './firebase';
// import axios from 'axios';
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
      image: null,
      url: '',
      progress: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage
      .ref(`lift-email-images/${image.name}`)
      .put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref('lift-email-images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            this.setState({ url });
          });
      }
    );
  };

  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
  }

  render() {
    const style = {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>LIFT Email Reusable Images</h1>
        <FilePond
          ref={ref => (this.pond = ref)}
          files={this.state.files}
          instantUpload={false}
          allowMultiple={true}
          maxFiles={3}
          server={this.handleUpload}
          oninit={() => this.handleInit()}
          onupdatefiles={fileItems => {
            this.setState({
              files: fileItems.map(fileItem => fileItem.file)
            });
          }}
        ></FilePond>
        <div style={style}>
          <progress value={this.state.progress} max="100" />
          <br />
          <input type="file" onChange={this.handleChange} />
          <button onClick={this.handleUpload}>Upload</button>
          <br />
          <img
            src={this.state.url || 'http://via.placeholder.com/400x300'}
            alt="Uploaded images"
            height="300"
            width="400"
          />
        </div>
      </div>
    );
  }
}

export default App;
