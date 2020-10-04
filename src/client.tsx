import 'regenerator-runtime/runtime';
import * as React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import App from './client/App';

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('app'));
