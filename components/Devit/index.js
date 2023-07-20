import Avatar from "components/Avatar"
export default function Devit({
  avatar,
  content,
  createdAt,
  id,
  likesCount,
  sharedCount,
  userId,
  userName,
}) {
  return (
    <>
      <article key={id}>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · {createdAt}</span>
          </header>
          <p>{content}</p>
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
