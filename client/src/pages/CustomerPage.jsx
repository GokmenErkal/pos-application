import React, { useState } from 'react'
import Header from '../components/Header/Header'
import { Table } from 'antd'

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const CustomerPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header />
      <div className='px-6'>
        <h1 className='text-4xl font-bold text-center mb-4'>Müşterilerim</h1>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          bordered
        />
      </div>
    </>
  )
}

export default CustomerPage
