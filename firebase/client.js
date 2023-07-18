import { initializeApp } from "firebase/app";
import {
  getAdditionalUserInfo,
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8N1NDFWYcAkFUK6kUON07p36A9gUCSf8",
  authDomain: "devter-30d46.firebaseapp.com",
  projectId: "devter-30d46",
  storageBucket: "devter-30d46.appspot.com",
  messagingSenderId: "270633502622",
  appId: "1:270633502622:web:d1988be9b53e1ba042b88f",
  measurementId: "G-51X6GXTL2Q",
};

const app = initializeApp(firebaseConfig);

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, photoURL, email } = user;

  return {
    avatar: photoURL,
    name: displayName,
    email,
  };
};
const loginWithGitHub = () => {
  const auth = getAuth(app);
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // console.log(user);

      // const userInfo = getAdditionalUserInfo(result)

      return mapUserFromFirebaseAuthToUser(user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
};

const authStateChanged = (onChange) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const normalizedUser = mapUserFromFirebaseAuthToUser(user);
      onChange(normalizedUser);
    } else {
      onChange(null);
    }
  });
};

export { loginWithGitHub, authStateChanged };
