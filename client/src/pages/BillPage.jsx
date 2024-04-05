import React, { useState } from 'react'
import Header from '../components/Header/Header'
import { Table, Card, Button, Modal } from 'antd'
import PrintBill from '../components/Bill/PrintBill';

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

const BillPage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Header />
            <div className='px-6'>
                <h1 className='text-4xl font-bold text-center mb-4'>Faturalar</h1>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    bordered
                />
                <div className="cart-total flex justify-end mt-4">
                    <Card className='w-72 '>
                        <Button
                            type='primary'
                            className='w-full mt-2'
                            size='large'
                            onClick={() => setIsModalOpen(true)}
                        >
                            Yazdır
                        </Button>
                    </Card>
                </div>
            </div>
            <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    )
}

export default BillPage
