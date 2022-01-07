const config = {
  apiKey: 'AIzaSyAfVnDS3ClZKlPV38aR4HW34IYS3xP7r44',
  authDomain: 'library-magocbi.firebaseapp.com',
  projectId: 'library-magocbi',
  storageBucket: 'library-magocbi.appspot.com',
  messagingSenderId: '1096179426777',
  appId: '1:1096179426777:web:23bfcf56302c24133765c8',
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error(
      `No firebase configuration object provided.
      Add your web app's configuration object to firebase-config.js`
    );
  } else {
    return config;
  }
}
