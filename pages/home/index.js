import AppLayout from "components/AppLayout"
import { useEffect, useState } from "react"
import Devit from "components/Devit"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
  }, [])

  return (
    <>
      <AppLayout>
        <div>
          <header>
            <h2>Inicio</h2>
          </header>
          <section>
            {timeline.map((devit) => {
              return (
                <Devit
                  key={devit.id}
                  id={devit.id}
                  avatar={devit.avatar}
                  username={devit.username}
                  message={devit.message}
                />
              )
            })}
          </section>
          <nav></nav>
        </div>
      </AppLayout>
      <style jsx>{`
        header {
          height: 49px;
          position: absolute;
          top: 0;
          border-bottom: 1px solid #ccc;
          width: 100%;
        }
        article {
          display: flex;
          padding: 10px 15px;
          border-bottom: 1px solid #ccc;
        }
        h2 {
          font-size: 21px;
          font-weight: 800;
        }
        section {
          padding-top: 56px;
        }
        nav {
          height: 49px;
          position: absolute;
          bottom: 0;
          border-top: 1px solid #ccc;
          width: 100%;
        }
      `}</style>
    </>
  )
}
