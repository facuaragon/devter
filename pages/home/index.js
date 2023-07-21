import { useEffect, useState } from "react"
import Devit from "components/Devit"
import useUser from "hooks/useUser"
import { fetchLatestDevits } from "../../firebase/client"
import Link from "next/link"
import Create from "components/Icons/Create"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import { colors } from "styles/theme"
import Head from "next/head"
import Compose from "components/Compose"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const [counter, setCounter] = useState(0)
  const user = useUser()
  useEffect(() => {
    user &&
      fetchLatestDevits()
        .then((devits) => setTimeline(devits))
        .catch((e) => {
          console.log(e)
        })
  }, [user, counter])

  const reloadHome = () => {
    setCounter(counter + 1)
  }

  return (
    <>
      <Head>
        <title>Inicio / Devter</title>
      </Head>
      <div>
        <header>
          <h2>Inicio</h2>
        </header>
        <Compose reloadHome={reloadHome} />
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
              img,
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
                  img={img}
                />
              )
            },
          )}
        </section>
        <nav>
          <div className="button">
            <Link href="/home">
              <Home width={32} height={32} stroke="#09f" className="link" />
            </Link>
          </div>
          <div className="button">
            <Link href="/search">
              <Search width={32} height={32} stroke="#09f" />
            </Link>
          </div>
          <div className="button">
            <Link href="/compose/tweet">
              <Create width={32} height={32} stroke="#09f" />
            </Link>
          </div>
        </nav>
      </div>
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
          flex: 1;
          max-width: 100%;
        }
        nav {
          background: #fff;
          height: 49px;
          position: sticky;
          bottom: 0;
          border-top: 1px solid #ccc;
          width: 100%;
          margin: 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .button {
          padding: 5px;
        }
        .button:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        nav .button:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}
