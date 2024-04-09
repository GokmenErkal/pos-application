import React, { useState, useEffect } from 'react'
import axios from "axios"
import Header from '../components/Header/Header'
import { Table } from 'antd'

const CustomerPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billItems, setBillItems] = useState([]);

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bills/get-all");
        setBillItems(res.data)
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    getBills()
  }, [])

  const columns = [
    {
      title: 'Müşteri Adı',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Telefon Numarası',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
    },
    {
      title: 'İşlem Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
          return (
              <span>{text.substring(0, 10)}</span>
          )
      }
  },
  ];

  return (
    <>
      <Header />
      <div className='px-6'>
        <h1 className='text-4xl font-bold text-center mb-4'>Müşterilerim</h1>
        <Table
          dataSource={billItems}
          columns={columns}
          pagination={false}
          bordered
          scroll={{
            x: 1000,
            y: 300
          }}
        />
      </div>
    </>
  )
}

export default CustomerPage
