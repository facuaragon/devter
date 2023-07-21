import Devit from "components/Devit"

export default function DevitPage(props) {
  if (!props.id) return "loading...."
  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}
// export const getStaticPaths = async () => {
//   return {
//     paths: [
//       {
//         params: {
//           id: "iCnkDlWilkyQRpbz0AsG",
//         },
//       },
//     ],
//     fallback: true, // false or "blocking"
//   }
// }
// export const getStaticProps = async (context) => {
//   try {
//     const { id } = context.params
//     const data = await fetch(`http://localhost:3000/api/devits/${id}`)
//     const json = await data.json()
//     console.log(json)
//     return { props: json }
//   } catch (error) {
//     console.log(error)
//   }
// }

export const getServerSideProps = async (context) => {
  // params, req, res, query
  const { res } = context
  try {
    const { id } = context.params
    const data = await fetch(`http://localhost:3000/api/devits/${id}`)
    const json = await data.json()
    return { props: json }
  } catch (error) {
    res.writeHead(301, { Location: "/home" }).end()
  }
}

// DevitPage.getInitialProps = async (context) => {
//   const { res } = context
//   try {
//     const { id } = context.query
//     const res = await fetch(`http://localhost:3000/api/devits/${id}`)
//     const json = await res.json()
//     return json
//   } catch (error) {
//     res.writeHead(301, { Location: "/home" }).end()
//   }
// }
