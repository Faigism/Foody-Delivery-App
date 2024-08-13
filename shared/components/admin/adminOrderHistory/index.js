import { toast } from 'react-toastify'
import Modal from '../Modal'
import Button from '../Button'
import { useTranslation } from 'react-i18next'
import { useGlobalStore } from '../../../services/provider'
import { useState } from 'react'
import { deleteDoc, doc, getFirestore } from 'firebase/firestore'

const AdminOrderHistory = ({ data }) => {
  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { history, setHistory } = useGlobalStore()

  console.log(data)

  const handleButtonClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const db = getFirestore()

  const deleteOrderData = async (orderId) => {
    try {
      const orderDoc = doc(db, 'order-history', orderId)
      await deleteDoc(orderDoc)
      toast.success('Order deleted successfully!', {
        position: 'top-left',
        autoClose: 1000,
      })
      let filteredOrder = history.filter((item) => item.id !== orderId)
      setHistory(filteredOrder)
      handleModalClose()
    } catch (error) {
      console.log(error)
      toast.error('Failed to delete order.', {
        position: 'top-left',
      })
      handleModalClose()
    }
  }

  const formatDate = (timestamp) => {
    const currentDate = new Date()
    const date = new Date(timestamp)
    const timeDifference = currentDate.getTime() - date.getTime()
    const seconds = Math.floor(timeDifference / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`
    }
  }

  const truncateText = (text, length) => {
    if (text.length > length) {
      return text.slice(0, length) + ' ...'
    }
    return text
  }

  const addressText =
    data.delivery_address?.length > 20 ? (
      <span className="tooltip">
        {truncateText(data.delivery_address, 20)}
        <span className="tooltiptext">{data.delivery_address}</span>
      </span>
    ) : (
      data.delivery_address
    )

  const idText =
    data.id?.length > 5 ? (
      <span className="tooltip">
        {truncateText(data.id, 5)}
        <span className="tooltiptext" style={{ left: '80px' }}>
          {data.id}
        </span>
      </span>
    ) : (
      data.id
    )

  const idCustomer =
    data.customer_id?.length > 5 ? (
      <span className="tooltip">
        {truncateText(data.customer_id, 5)}
        <span className="tooltiptext" style={{ left: '80px' }}>
          {data.customer_id}
        </span>
      </span>
    ) : (
      data.customer_id
    )

  return (
    <>
      <tr className="h-14 text-center  border-slate-700  border-y text-gray-900 text-sm not-italic font-normal leading-5">
        <td>
          <div>
            <p className=" border-slate-700  border rounded-lg ml-2">
              {idText}
            </p>
          </div>
        </td>
        <td>
          <div className="flex justify-center">
            <p className=" border-slate-700  border rounded-lg px-2 ">
              {idCustomer}
            </p>
          </div>
        </td>
        <td>{formatDate(data.created)}</td>
        <td>{addressText}</td>
        <td>{data.payment_method == 1 ? 'Credit Card' : 'Pay Cash'}</td>
        <td>{data.amount}$</td>
        <td>+{data.contact}</td>
        <td>
          <img
            width="24"
            height="0"
            src="/cancel.svg"
            alt="deleteIcon"
            className="cursor-pointer transition-transform transform hover:scale-110"
            onClick={handleButtonClick}
          />
        </td>
      </tr>{' '}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="flex justify-between items-center">
          <p className="mx-auto text-3xl font-medium">{t('modalDesc')}</p>
          <Button
            className="text-mainRed text-lg"
            innerText="&#10006;"
            onClick={handleModalClose}
          />
        </div>
        <p className=" text-grayText1 w-2/3 mx-auto text-center my-5">
          {t('modalDesc2')}
        </p>
        <div className="mx-auto flex items-center justify-center gap-9">
          <Button
            className=" border-grayText1 text-grayText1 py-1 px-8 rounded-md border-2 shadow-md hover:scale-95 transition-all duration-500"
            innerText={t('modalDesc3')}
            onClick={handleModalClose}
          />
          <Button
            className="bg-mainRed border-2 text-white py-1 px-8 rounded-md border-mainRed shadow-md hover:scale-95 transition-all duration-500"
            innerText={t('modalDesc4')}
            onClick={() => deleteOrderData(data.id)}
          />
        </div>
      </Modal>
    </>
  )
}
export default AdminOrderHistory
