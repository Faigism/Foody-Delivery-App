'use client'

import React from 'react'
import basketItem from '../../../../../public/basket/basketItem.svg'
import coloredBasketItem from '../../../../../public/basket/coloredBasketItem.svg'
import styles from './restaurantBasketLayout.module.css'
import { useGlobalStore } from '../../../../services/provider'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import Image from 'next/image'
import { useRouter } from 'next/router'

const RestaurantBasketLayout = ({ children }) => {
  const {
    basketId,
    itemCount,
    totalPrice,
    deleteAllItemsFromBasket,
    setCheckout,
  } = useGlobalStore()

  const { push } = useRouter()

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex items-end justify-between mx-[16px] ">
        <div className="flex items-end gap-2 mt-[14px] ms-[16px]">
          <Image
            src={itemCount > 0 ? coloredBasketItem : basketItem}
            className={styles.headerImage}
            alt="basketItemImg"
          />
          <div
            className={`${styles.itemCount} ${itemCount > 0
                ? styles.coloredItemCount
                : styles.unColoredItemCount
              }`}
          >
            {itemCount} items
          </div>
        </div>
        <div>
          {itemCount > 0 && (
            <button
              onClick={() => {
                deleteAllItemsFromBasket(basketId)
              }}
            >
              <DeleteSweepIcon style={{ color: '#D63626' }} />
            </button>
          )}
        </div>
      </div>
      <div className={styles.main}> {children}</div>
      <div className="flex justify-center mb-[33px]">
        <div
          className={`${styles.basketFooter} ${itemCount > 0
              ? styles.coloredBasketFooter
              : styles.unColoredBasketFooter
            }`}
          onClick={() => {
            if (itemCount > 0) {
              setCheckout(true)
              push('/user-checkout')
            }
          }}
        >
          <div>Checkout</div>
          <div
            className={`${styles.checkout} ${itemCount > 0 ? styles.coloredCheckout : styles.unColoredCheckout
              }`}
          >
            ${totalPrice}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantBasketLayout
