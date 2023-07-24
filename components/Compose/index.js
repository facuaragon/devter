import Button from "../Button"
import useUser from "../../hooks/useUser"
import { useEffect, useState } from "react"
import { addDevit, uploadImage } from "../../firebase/client"
import { useRouter } from "next/router"
import Avatar from "../Avatar"

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

export default function Compose() {
  const router = useRouter()
  const user = useUser()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)

  const [drag, setDrag] = useState(DRAG_IMAGES_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const currentURL = router.asPath

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
    post && setMessage("")
    currentURL !== "/home" && router.push("/home")
    setImgURL(null)
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
      <section className="form-container">
        {user && (
          <section className="avatar">
            <Avatar alt={user.userName} src={user.avatar} />
          </section>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="¡¿Qué esta pasando?!"
            value={message}
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          ></textarea>
          {imgURL && (
            <section className="remove-image">
              <button onClick={() => setImgURL(null)}>x</button>
              <img src={imgURL} alt="image" />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </section>
      <style jsx>{`
        div {
          padding: 15px;
        }
        form {
          margin: 10px;
          width: 100%;
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
          min-height: ${currentURL === "/home" ? "50px" : "200px"};
          width: 100%;
        }
        .form-container {
          display: flex;
          align-items: flex-start;
          width: 100%;
        }
        .avatar {
          padding-top: 15px;
          padding-left: 10px;
        }
        .remove-image {
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
