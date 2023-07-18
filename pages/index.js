import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { colors } from '../styles/theme';
import Button from '../components/Button';
import GitHub from '../components/Icons/GitHub';
import {loginWithGitHub, authStateChanged} from "../firebase/client"
import { useEffect, useState } from 'react';

export default function Home() {
  
  const [user, setUser]=useState(undefined)

  useEffect(()=>{
    authStateChanged(user=>setUser(user))
  },[])

  const handleClick = ()=>{
    loginWithGitHub().then(user=>{
      const {avatar, email, name} = user
      setUser(user)
      // console.log(user);
    })
  }
  const onChange = (user)=>{
    setUser(user)
  }

  return (
    <>
      <Head>
        <title>Devter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <section>
          <img src="/dev-logo.png" alt="Logo"/>
          <h1>Devter</h1>
          <h2>Talk about development<br />with developers 👨‍💻</h2>

          <div>
            {
              user === null &&
              <Button onClick={handleClick} >
                <GitHub fill={colors.white} width={24} height={24}/>
                Login with GitHub
              </Button>
            }
            {
              user && user.avatar &&
              <div>
                <img src={user.avatar}/>
                <strong>{user.name}</strong>
              </div>
            }
          </div>
        </section>
      </AppLayout>
      <style jsx>{`
        img{
          width: 120px;
        }
        div {
          margin-top: 16px;
        }
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }
        h1{
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 16px;
        }
        h2{
          color: ${colors.primary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
