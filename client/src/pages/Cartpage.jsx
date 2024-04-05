import React from 'react'
import Header from '../components/Header/Header'
import { Table, Card, Button } from 'antd'

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

const Cartpage = () => {
    return (
        <>
            <Header />
            <div className='px-6'>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    bordered
                />
                <div className="cart-total flex justify-end mt-4">
                    <Card className='w-72 '>
                        <div className='flex justify-between'>
                            <span>Ara Toplam</span>
                            <span>549.00$</span>
                        </div>
                        <div className='flex justify-between my-2'>
                            <span>KDV Toplam %8</span>
                            <span className='text-red-500'>+43.92$</span>
                        </div>
                        <div className='flex justify-between'>
                            <b>Toplam</b>
                            <b>592.92$</b>
                        </div>
                        <Button type='primary' className='w-full mt-2' size='large'>Sipariş Oluştur</Button>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Cartpage
