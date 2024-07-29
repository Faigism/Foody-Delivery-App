import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import NavbarLangButton from '../../../shared/components/admin/navbarLangButton'
import Button from '../../../shared/components/admin/Button'
import AuthCheck from '../../../shared/components/admin/authCheck'
import { useRouter } from 'next/router'

const Login = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const localAdmin = localStorage.getItem('localAdmin')
    if (!localAdmin) {
      router.push('/admin/login')
    } else {
      router.push('/admin/dashboard')
    }
  }, [router])

  return (
    <div className=" min-h-screen bg-darkBlue_1">
      <Head>
        <title>Foody | Admin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/admin-icon.png" />
      </Head>
      <div>
        <ToastContainer />
        <header className="  mb-20  md:mb-44 pt-14  pl-8 ">
          <h1
            style={{ letterSpacing: '0.84px' }}
            className=" text-[#F5F5F5] font-extrabold text-[28px]  "
          >
            Foody{' '}
            <span
              style={{ letterSpacing: '0.84px' }}
              className=" text-[#EAAB00]"
            >
              .
            </span>{' '}
          </h1>
        </header>

        <main>
          <div className=" flex  justify-center pb-7 ">
            <div className=" flex flex-col-reverse   sm:flex-col-reverse  md:flex-row  ">
              <div className=" w-full sm:w-full md:w-1/2  md:bg-darkBlue_2 py-14  px-6 sm:px-7 md:px-12 ">
                <p className=" text-grayText font-bold text-4xl text-center  mb-10">
                  {t('adminDesc')}
                </p>
                <div className=" flex flex-col  gap-6 mb-9">
                  <input
                    ref={emailRef}
                    className=" rounded bg-lightGray text-grayText py-4 pl-10 font-medium text-lg "
                    placeholder={t('e-mail')}
                    type="text"
                  />
                  <input
                    ref={passwordRef}
                    className=" rounded   bg-lightGray text-grayText py-4 pl-10 font-medium text-lg "
                    placeholder={t('password')}
                    type="password"
                  />
                </div>
                <Button
                  innerText={isLoading ? '...' : t('signIn')}
                  // onClick={login}
                  className=" text-white font-medium text-2xl  w-full bg-lightPurple_3 py-3 rounded"
                />
              </div>
              <div className=" w-full sm:w-full relative md:w-1/2  py-14 px-7 md:bg-adminLogin">
                <div className=" absolute  top-2  right-3">
                  <NavbarLangButton bgDark />
                </div>
                <div className="">
                  <Image
                    className=" w-full"
                    src="/admin-login.svg"
                    width={0}
                    height={0}
                    alt=" admin-login"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
export default Login
