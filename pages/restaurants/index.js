'use client'

import Head from 'next/head'
import ClientLayout from '../../shared/components/layout/client/Header'
import Sidebar from '../../shared/components/client/restaurants/Sidebar'
import Main from '../../shared/components/client/restaurants/Main'
import { getCategoriesFromDB } from '../../shared/services/axios'
import { useEffect, useState } from 'react'

const Restaurants = () => {
  const [categories, setCategories] = useState([])

  const getAllCategories = async () => {
    const categoriesData = await getCategoriesFromDB()
    // const uniqueCategories = response.map(item => item.name).filter((value, index, self) =>
    //   self.indexOf(value) === index);
    // console.log(uniqueCategories)
    setCategories(categoriesData)
  }
  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <>
      <Head>
        <title>Foody | Restaurants</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/mainBurger.svg" />
      </Head>

      <ClientLayout>
        <div className="flex gap-11 mx-[30px]">
          <Sidebar categories={categories} />
          <Main />
        </div>
      </ClientLayout>
    </>
  )
}
export default Restaurants
