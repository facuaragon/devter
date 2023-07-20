import AppLayout from "components/AppLayout"
import Button from "components/Button"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react"
import { addDevit, uploadImage } from "../../../firebase/client"
import { useRouter } from "next/router"
import Head from "next/head"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGES_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const router = useRouter()
  const user = useUser()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const [drag, setDrag] = useState(DRAG_IMAGES_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  useEffect(() => {
    if (task) {
      setImgURL(task)
      console.log(imgURL)
    }
  }, [task])

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    const post = await addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.name,
      img: imgURL,
    })
    post ? setStatus(COMPOSE_STATES.SUCCESS) : setStatus(COMPOSE_STATES.ERROR)
    post && router.push("/home")
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGES_STATES.DRAG_OVER)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGES_STATES.NONE)
  }
  const handleDrop = async (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGES_STATES.NONE)

    const file = e.dataTransfer.files[0]
    try {
      const task = await uploadImage(file)
      setTask(task)
    } catch (error) {
      console.log(error)
    }
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING
  return (
    <>
      <AppLayout>
        <Head>
          <title>Crear Devit / Devter</title>
        </Head>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="¿Qué esta pasando?"
            value={message}
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          ></textarea>
          {imgURL && (
            <section>
              <button onClick={() => setImgURL(null)}>x</button>
              <img src={imgURL} alt="image" />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }
        form {
          margin: 10px;
        }
        textarea {
          outline: 0;
          border: ${drag === DRAG_IMAGES_STATES.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"};
          border-radius: 10px;
          padding: 15px;
          resize: none;
          font-size: 21px;
          min-height: 200px;
          width: 100%;
        }
        section {
          position: relative;
        }
        button {
          background: rgba(0, 0, 0, 0.4);
          color: #fff;
          font-size: 24px;
          font-weight: 500;
          border: 0;
          border-radius: 999px;
          position: absolute;
          height: 32px;
          width: 32px;
          top: 15px;
          right: 15px;
        }
        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }
      `}</style>
    </>
  )
}
