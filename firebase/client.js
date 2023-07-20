import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore"
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8N1NDFWYcAkFUK6kUON07p36A9gUCSf8",
  authDomain: "devter-30d46.firebaseapp.com",
  projectId: "devter-30d46",
  storageBucket: "devter-30d46.appspot.com",
  messagingSenderId: "270633502622",
  appId: "1:270633502622:web:d1988be9b53e1ba042b88f",
  measurementId: "G-51X6GXTL2Q",
  // storageBucket: "gs://devter-30d46.appspot.com",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

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

export const addDevit = async ({ avatar, content, userId, userName, img }) => {
  try {
    await addDoc(collection(db, "devits"), {
      avatar,
      content,
      userId,
      userName,
      createdAt: Timestamp.fromDate(new Date()),
      likesCount: 0,
      sharedCount: 0,
      img,
    })
    return true
  } catch (e) {
    console.error("Error adding devit: ", e)
    return false
  }
}

export const fetchLatestDevits = () => {
  const devitsRefs = collection(db, "devits")
  const q = query(devitsRefs, orderBy("createdAt", "desc"))

  return getDocs(q)
    .then((querySnapshot) => {
      const devits = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data
        devits.push({
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        })
      })
      return devits
    })
    .catch((e) => {
      console.error(e)
    })
}

export const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const metadata = {
      contentType: "image/jpeg",
    }
    const storageRef = ref(storage, `images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file, metadata)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is " + progress + "% done")
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused")
            break
          case "running":
            console.log("Upload is running")
            break
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break
          case "storage/canceled":
            // User canceled the upload
            break

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL)
          })
          .catch((e) => reject(e))
      },
    )
  })
}
