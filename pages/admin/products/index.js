'use client'
import { useEffect, useState } from 'react'
import Subheading from '../../../shared/components/admin/Subheading'
import AdminLayout from '../../../shared/components/layout/admin'
import {
  getProducts,
  getRestaurantById,
  getRestaurants,
} from '../../../shared/services/axios'
import ProductsItem from '../../../shared/components/admin/ProductsItem'
import AuthCheck from '../../../shared/components/admin/authCheck'
import { useGlobalStore } from '../../../shared/services/provider'

const Products = () => {
  const [restaurants, setRestaurants] = useState([])
  const [restaurant, setRestaurant] = useState()
  const { products, setProducts } = useGlobalStore()
  const { refresh } = useGlobalStore()

  const getAllRestaurants = async () => {
    const allRestaurantsData = await getRestaurants()
    const allRestaurants = allRestaurantsData?.data.result.data
    setRestaurants(allRestaurants)
  }

  const getProductsByRestaurant = async (id) => {
    const restaurant = await getRestaurantById(id)
    setRestaurant(restaurant)
    const products = restaurant.products
    setProducts(products)
  }

  const getAllProducts = async () => {
    const response = await getProducts()
    setProducts(response.data.result.data)
  }

  const renderRestaurants = async () => {
    const res = await getRestaurants()
    let item = res?.data.result.data.map((i) => i.name)
    setRestaurants(item)
  }

  useEffect(() => {
    renderRestaurants()
  }, [])

  useEffect(() => {
    getAllProducts()
  }, [refresh])

  return (
    <AuthCheck>
      <AdminLayout>
        <Subheading
          text={'Products'}
          type={'Restaurant'}
          state={restaurants}
          handleClick={getAllRestaurants}
          handleSearchByType={getProductsByRestaurant}
        />
        <main style={{ margin: '0 25px 0 50px' }}>
          <ProductsItem products={products} restaurant={restaurant} />
        </main>
      </AdminLayout>
    </AuthCheck>
  )
}
export default Products
