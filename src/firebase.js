    
const config = {
    apiKey: 'AIzaSyAb0XyD6AgOfybvYqAE-pkS4sPyrMdqh38',
    authDomain: 'e2p-web.firebaseapp.com',
    databaseURL: 'https://e2p-web.firebaseio.com',
    projectId: 'e2p-web',
    storageBucket: 'e2p-web.appspot.com',
    messagingSenderId: '226326778642',
  }
  
  let firebaseCache
  
  export const getUiConfig = firebase => ({
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/'
  })
  
  const getFirebase = firebase => {
    if (firebaseCache) {
      return firebaseCache
    }
  
    firebase.initializeApp(config)
    firebaseCache = firebase
    return firebase
  }
  
  export default getFirebase
