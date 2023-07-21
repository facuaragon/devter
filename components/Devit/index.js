import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
import useDateTimeFormat from "../../hooks/useTimeFormat"
import Link from "next/link"
import { useRouter } from "next/router"
export default function Devit({
  avatar,
  content,
  createdAt,
  id,
  likesCount,
  sharedCount,
  userId,
  userName,
  img,
}) {
  const timeago = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }
  return (
    <>
      <article key={id} onClick={handleArticleClick}>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <Link
              href={`/status/${id}`}
              className="link"
              style={{ textDecoration: "none" }}
            >
              <time title={createdAtFormated}>{timeago}</time>
            </Link>
          </header>

          <p>{content}</p>

          {img && (
            <div className="img-container">
              <img src={img} />
            </div>
          )}
        </section>
      </article>
      <style jsx>{`
        div {
          padding-right: 10px;
        }

        article {
          display: flex;
          padding: 10px 15px;
          border-bottom: 1px solid #eee;
          max-width: 100%;
        }
        article:hover {
          background: #f5f8fa;
          cursor: pointer;
        }
        section {
          max-width: 100%;
        }
        .img-container {
          max-width: 100%;
          max-height: 400px;
          margin-top: 10px;
          overflow: hidden;
        }
        .img-container img {
          max-width: 100%;
          max-height: 400px;
          object-fit: cover;
          display: block;
        }
        img {
          height: auto;
          width: auto;
          border-radius: 10px;
        }
        p {
          line-height: 1.3125;
          margin: 0;
          max-width: 100%;
          overflow-wrap: anywhere;
          overflow: hidden;
        }
        time {
          align-items: center;
          color: #555;
          font-size: 14px;
        }
        time:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
