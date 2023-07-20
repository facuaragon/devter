import AppLayout from "components/AppLayout"
import { useEffect, useState } from "react"
import Devit from "components/Devit"
import useUser from "hooks/useUser"
import { fetchLatestDevits } from "../../firebase/client"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()
  useEffect(() => {
    user &&
      fetchLatestDevits()
        .then((devits) => setTimeline(devits))
        .catch((e) => {
          console.log(e)
        })
  }, [user])

  return (
    <>
      <AppLayout>
        <div>
          <header>
            <h2>Inicio</h2>
          </header>
          <section>
            {timeline?.map(
              ({
                avatar,
                content,
                createdAt,
                id,
                likesCount,
                sharedCount,
                userId,
                userName,
              }) => {
                return (
                  <Devit
                    key={id}
                    id={id}
                    avatar={avatar}
                    userName={userName}
                    content={content}
                    createdAt={createdAt}
                    likesCount={likesCount}
                    sharedCount={sharedCount}
                    userId={userId}
                  />
                )
              },
            )}
          </section>
          <nav></nav>
        </div>
      </AppLayout>
      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #eee;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          height: 49px;
          position: sticky;
          top: 0;
          width: 100%;
        }
        article {
          display: flex;
          padding: 10px 15px;
          border-bottom: 1px solid #eee;
        }
        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }
        section {
          padding-top: 5px;
          min-height: 80vh;
        }
        nav {
          background: #fff;
          height: 49px;
          position: sticky;
          bottom: 0;
          border-top: 1px solid #ccc;
          width: 100%;
          margin: 0;
        }
      `}</style>
    </>
  )
}
