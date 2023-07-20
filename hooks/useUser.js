import { useRouter } from "next/router"

const { useState, useEffect } = require("react")
const { authStateChanged } = require("../firebase/client")

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
}
export default function useUser() {
  const [user, setUser] = useState()
  const router = useRouter()
  useEffect(() => {
    authStateChanged((user) => setUser(user))
  }, [])
  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push("/")
  }, [user])
  return user
}
