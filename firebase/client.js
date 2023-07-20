import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDocs,
} from "firebase/firestore"
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8N1NDFWYcAkFUK6kUON07p36A9gUCSf8",
  authDomain: "devter-30d46.firebaseapp.com",
  projectId: "devter-30d46",
  storageBucket: "devter-30d46.appspot.com",
  messagingSenderId: "270633502622",
  appId: "1:270633502622:web:d1988be9b53e1ba042b88f",
  measurementId: "G-51X6GXTL2Q",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, photoURL, email, uid } = user

  return {
    avatar: photoURL,
    name: displayName,
    email,
    uid,
  }
}
export const loginWithGitHub = () => {
  const auth = getAuth(app)
  const provider = new GithubAuthProvider()
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      // const credential = GithubAuthProvider.credentialFromResult(result)
      // const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      // console.log(user);

      // const userInfo = getAdditionalUserInfo(result)

      return mapUserFromFirebaseAuthToUser(user)
    })
    .catch((error) => {
      // // Handle Errors here.
      // const errorCode = error.code
      // const errorMessage = error.message
      // // The email of the user's account used.
      // const email = error.customData.email
      // // The AuthCredential type that was used.
      // const credential = GithubAuthProvider.credentialFromError(error)
      // // ...
      console.log(error)
    })
}

export const authStateChanged = (onChange) => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const normalizedUser = mapUserFromFirebaseAuthToUser(user)
      onChange(normalizedUser)
    } else {
      onChange(null)
    }
  })
}

export const addDevit = async ({ avatar, content, userId, userName }) => {
  try {
    await addDoc(collection(db, "devits"), {
      avatar,
      content,
      userId,
      userName,
      createdAt: Timestamp.fromDate(new Date()),
      likesCount: 0,
      sharedCount: 0,
    })
    return true
  } catch (e) {
    console.error("Error adding devit: ", e)
    return false
  }
}

export const fetchLatestDevits = () => {
  return getDocs(collection(db, "devits"))
    .then((querySnapshot) => {
      const devits = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data
        const date = new Date(createdAt.seconds * 1000)
        const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(
          date,
        )
        devits.push({
          ...data,
          id,
          createdAt: normalizedCreatedAt,
        })
      })
      return devits
    })
    .catch((e) => {
      console.error(e)
    })
  // try {
  //   const querySnapshot = await getDocs(collection(db, "devits"))
  //   return querySnapshot.docs.map((doc) => {
  //     const data = doc.data()
  //     const id = doc.id
  //     // const { createdAt } = data
  //     // const normalizedCreatedAt = new Date(createdAt.seconds).toString
  //     return {
  //       ...data,
  //       id,
  //       // createdAt: normalizedCreatedAt,
  //     }
  //   })
  // } catch (e) {
  //   console.error(e)
  // }
}
