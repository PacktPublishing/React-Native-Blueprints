import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "<Your Firebase API key>",
  authDomain: "<Your Firebase Auth domain>",
  databaseURL: "<Your Firebase database URL>",
  projectId: "<Your Firebase projectId>",
  storageBucket: "<Your Firebase storageBucket>",
  messagingSenderId: "<Your messaging SenderId>"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
