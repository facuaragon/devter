const admin = require("firebase-admin")

const serviceAccount = require("./firebase-keys.json")
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
} catch (error) {}

export const firestore = admin.firestore()
