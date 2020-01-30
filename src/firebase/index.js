import firebase from 'firebase/app';
import 'firebase/storage';

require('dotenv').config();

var config = {
  apiKey: 'AIzaSyC39R_f7Be4jMo7Row5GRdLEbCZdcOucIw',
  authDomain: 'lift-reusable-images.firebaseapp.com',
  databaseURL: 'https://lift-reusable-images.firebaseio.com',
  projectId: 'lift-reusable-images',
  storageBucket: 'lift-reusable-images.appspot.com',
  messagingSenderId: '606961759609',
  appId: '606961759609:web:3ea221bdd62b62093caba8'
};

firebase.initializeApp(config);

const storage = firebase.storage();
export { storage, firebase as default };
