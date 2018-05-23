import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  // Populate your firebase configuration data here.
  apiKey: `AIzaSyAs4Y7mbwVmmpTinsvKh9TgfYVV-Vd6Elk`,
  authDomain: `todo-fancy-5d205.firebaseapp.com`,
  databaseURL: `https://todo-fancy-5d205.firebaseio.com`,
  projectId: `todo-fancy-5d205`,
  storageBucket: ``,
  messagingSenderId: `433582061791`
})

export const firebase = firebaseApp
