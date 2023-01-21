import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyB6VWGHhQTbNAGb8jqJp_Ac6sLk0WlTJ-Q',
  authDomain: 'youpixels.firebaseapp.com',
  projectId: 'youpixels',
  storageBucket: 'youpixels.appspot.com',
  messagingSenderId: '36544663310',
  appId: '1:36544663310:web:c9e0cb94f5be55c27ed15f',
  measurementId: 'G-TXBB2TCDCS',
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

export default app
