import Avatar from "components/Avatar"
export default function Devit({ avatar, username, message, id }) {
  return (
    <>
      <article key={id}>
        <div>
          <Avatar src={avatar} alt={username} />
        </div>
        <section>
          <strong>{username}</strong>
          <p>{message}</p>
        </section>
      </article>
      <style jsx>{`
        div {
          padding-right: 10px;
        }
        article {
          display: flex;
          padding: 10px 15px;
          border-bottom: 1px solid #eaf7ff;
        }
        p {
          line-height: 1.3125;
          margin: 0;
        }
      `}</style>
    </>
  )
}
