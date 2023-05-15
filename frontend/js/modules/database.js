/* eslint-disable no-undef */
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocFromCache,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// configuração firebase
const email = 'israeldesigner@icloud.com'
const password = '6klzKIaA*hfKTa31'
// const firebaseConfig = {
//   apiKey: 'AIzaSyAl3Z8cGE62ZNFc__yLCktbvqyhXTVsGi8',
//   authDomain: 'moqatrama-prod.firebaseapp.com',
//   projectId: 'moqatrama-prod',
//   storageBucket: 'moqatrama-prod.appspot.com',
//   messagingSenderId: 1058408189763,
//   appId: '1:1058408189763:web:fdac184953248dde9d69f6',
//   measurementId: 'G-CWNNPY01JF',
// }
const firebaseConfig = {
  apiKey: 'AIzaSyAtn_0eGG5dRv1UMX_T4AsoCGR92EwpB94',
  authDomain: 'moqatrama-stg.firebaseapp.com',
  projectId: 'moqatrama-stg',
  storageBucket: 'moqatrama-stg.appspot.com',
  messagingSenderId: '293229535405',
  appId: '1:293229535405:web:2617f6a807e76f60de2624',
}

// inicializa o Firebase
const app = initializeApp(firebaseConfig)

// Inicializando serviço de Firestore
const db = getFirestore(app)
const dataReal = collection(db, 'system-1')
const tiqam392 = query(collection(db, 'system-1'), where('moqaID', '==', 'tiqam392'))
const objects392 = []
const getMoq392 = onSnapshot(tiqam392, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    objects392.push(doc.data())
  })
})

class City {
  constructor(moqaID, pm25, hum) {
    this.moqaID = moqaID
    this.pm25 = pm25
    this.hum = hum
  }
  toString() {
    return this.moqaID + ', ' + this.pm25 + ', ' + this.hum
  }
}

const cityConverter = {
  toFirestore: (city) => ({
    moqaID: city.moqaID,
    pm25: city.pm25,
    hum: city.hum,
  }),
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)
    return new City(data.moqaID, data.pm25, data.hum)
  },
}

// const docRef = doc(db, 'system-1',)

// {
//   "Pres": 101151.04688,
//   "erroLog": 0,
//   "moqaID": "tiqam392",
//   "intTemp": 26.99,
//   "msdLog": 0,
//   "cddLog": 0,
//   "adc0": 400,
//   "pm25": 2,
//   "adc1": 10576,
//   "myTimestamp": {
//       "seconds": 1683940480,
//       "nanoseconds": 710000000
//   },
//   "co2": 403,
//   "pmsLog": 0,
//   "tvocs": 0,
//   "hora": "22:14:40",
//   "hum": 44,
//   "adc2": 10624,
//   "rtcLog": 0,
//   "adsLog": 0,
//   "adc3": 10432,
//   "pm10": 3,
//   "data": "12/05/2023",
//   "extTemp": 0,
//   "pm1": 0
// }

// inicializa a autenticação
const auth = getAuth(app)
const checkAut = async () => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      getMoq392
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode)
      console.log(errorMessage)
    })
}

export { checkAut, objects392 }
