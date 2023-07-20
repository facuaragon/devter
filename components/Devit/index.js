import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
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
  return (
    <>
      <article key={id}>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · {timeago}</span>
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
        }
        span {
          align-items: center;
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
