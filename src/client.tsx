import 'regenerator-runtime/runtime';
import * as React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import App from './client/App';

const fromBase64 = (base64String: string) =>
  JSON.parse(window.atob(base64String).toString());

const firebaseConfig = fromBase64(process.env.FIREBASE_CONFIG);
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('app'));
