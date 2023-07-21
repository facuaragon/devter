import { firestore } from "../../../firebase/admin"

export default (req, res) => {
  const { query } = req
  const { id } = query

  firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      if (!data) {
        throw new Error("devit not found")
      }
      const id = doc.id
      const { createdAt } = data
      res.json({
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      })
    })
    .catch((e) => {
      res.status(404).end()
    })
}
