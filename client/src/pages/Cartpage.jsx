import React, { useState } from 'react'
import Header from '../components/Header/Header'
import CreateBill from '../components/Cart/CreateBill';

import { Table, Card, Button, message, Popconfirm } from 'antd'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from "react-redux"
import { increase, decrease, deleteCart } from '../../src/redux/cartSlice';

const Cartpage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const columns = [
        {
            title: 'Ürün Görseli',
            dataIndex: 'img',
            key: 'img',
            width: "125px",
            render: (text) => {
                return (
                    <img className='w-full h-20 object-cover' src={text} alt="" />
                )
            }
        },
        {
            title: 'Ürün Adı',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Kategori',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Ürün Fiyatı',
            dataIndex: "price",
            key: "price",
            render: (text) => {
                return (
                    <span>{text}{" "}$</span>
                )
            }
        },
        {
            title: 'Ürün Adeti',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => {
                return (
                    <div className='flex items-center justify-center'>
                        <Button
                            className='w-full rounded-full'
                            type='primary'
                            size='small'
                            icon={<PlusCircleOutlined />}
                            onClick={() => dispatch(increase(record))}
                        />
                        <span className='font-bold w-6 inline-block text-center'>{record.quantity}</span>
                        <Button
                            className='w-full rounded-full'
                            type='primary'
                            size='small'
                            icon={<MinusCircleOutlined />}
                            onClick={() => {
                                if (record.quantity === 1) {
                                    if (window.confirm("Ürün Silinsin Mi?")) {
                                        dispatch(decrease(record))
                                        message.success("Ürün Sepetten Silindi.")
                                    }
                                }
                                if (record.quantity > 1) {
                                    dispatch(decrease(record))
                                    message.success("Ürün Sepetten Silindi.")
                                }
                            }}
                        />
                    </div>
                )
            }
        },
        {
            title: 'Toplam Fiyat',
            dataIndex: 'total',
            key: 'total',
            render: (text) => {
                return (
                    <span>{text}{" "}$</span>
                )
            }
        },
        {
            title: 'Actions',
            render: (_, record) => {
                return (
                    <Popconfirm
                        title="Silmek için emin misin?"
                        onConfirm={() => {
                            dispatch(deleteCart(record));
                            message.success("Ürün Sepetten Silindi.")
                        }}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <Button
                            type='link'
                            danger
                        >
                            Sil
                        </Button>
                    </Popconfirm>

                )
            }
        },
    ];
    return (
        <>
            <Header />
            <div className='px-6'>
                <Table
                    dataSource={cart.cartItems}
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
                        <Button
                            type='primary'
                            className='w-full mt-2'
                            size='large'
                            onClick={() => setIsModalOpen(true)}
                        >
                            Sipariş Oluştur
                        </Button>
                    </Card>
                </div>
            </div>
            <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    )
}

export default Cartpage
