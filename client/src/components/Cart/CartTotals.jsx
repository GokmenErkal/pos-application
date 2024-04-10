import React from 'react'
import { Button, message } from 'antd'
import { useSelector, useDispatch } from "react-redux"
import { deleteCart, increase, decrease, reset } from '../../redux/cartSlice';
import { useNavigate } from "react-router-dom"

import { ClearOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

const CartTotals = () => {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className='cart h-full max-h-[calc(100vh_-_90px)] flex flex-col'>
            <h2 className='bg-blue-600 text-center text-white py-4 font-bold tracking-wide'>Sepetteki Ürünler</h2>
            <ul className="cart-items px-2 flex flex-col gap-y-3 pt-2 overflow-y-auto py-2">
                {
                    cart.cartItems.length > 0 ?
                        cart.cartItems.map((item) => (
                            <li key={item._id} className="cart-item flex justify-between items-center">
                                <div className='flex items-center'>
                                    <img
                                        src={item.img}
                                        className='w-16 h-16 object-cover cursor-pointer'
                                        onClick={() => {
                                            dispatch(deleteCart(item))
                                            message.success("Ürün Sepetten Silindi.")
                                        }}
                                    />
                                    <div className='flex flex-col ml-2'>
                                        <b>{item.title}</b>
                                        <span>{item.price}$ x {item.quantity}</span>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <Button
                                        className='w-full rounded-full'
                                        type='primary'
                                        size='small'
                                        icon={<PlusCircleOutlined />}
                                        onClick={() => dispatch(increase(item))}
                                    />
                                    <span className='font-bold w-6 inline-block text-center'>{item.quantity}</span>
                                    <Button
                                        className='w-full rounded-full'
                                        type='primary'
                                        size='small'
                                        icon={<MinusCircleOutlined />}
                                        onClick={() => {
                                            if (item.quantity === 1) {
                                                if (window.confirm("Ürün Silinsin Mi?")) {
                                                    dispatch(decrease(item))
                                                    message.success("Ürün Sepetten Silindi.")
                                                }
                                            }
                                            if (item.quantity > 1) {
                                                dispatch(decrease(item))
                                                message.success("Ürün Sepetten Silindi.")
                                            }
                                        }}
                                    />
                                </div>
                            </li>
                        )).reverse() :
                        "Sepetnizde hiç ürün yok..."
                }
            </ul>
            <div className="cart-totals mt-auto">
                <div className='border-t border-b'>
                    <div className='flex justify-between p-2'>
                        <b>Ara Toplam</b>
                        <span>{cart.total.toFixed(2)}$</span>
                    </div>
                    <div className='flex justify-between p-2'>
                        <b>KDV %{cart.tax}</b>
                        <span className='text-red-600'>{(cart.total * cart.tax) / 100}$</span>
                    </div>
                </div>
                <div className='border-b mt-4'>
                    <div className='flex justify-between p-2'>
                        <b className='text-xl text-green-500'>Genel Toplam</b>
                        <span className='text-xl'>{cart.total + (cart.total * cart.tax) / 100}$</span>
                    </div>
                </div>
                <div className='py-4 px-2'>
                    <Button
                        className='w-full'
                        type='primary'
                        size='large'
                        disabled={cart.cartItems.length === 0}
                        onClick={() => navigate("/cart")}
                    >
                        Sipariş Oluştur
                    </Button>
                    <Button
                        className='w-full mt-2 flex items-center justify-center'
                        type='primary'
                        danger
                        size='large'
                        icon={<ClearOutlined />}
                        disabled={cart.cartItems.length === 0}
                        onClick={() => {
                            if (window.confirm("Emin Misiniz?")) {
                                dispatch(reset());
                                message.success("Sepet Başarıyla Temizlendi.")
                            }
                        }}
                    >
                        Temizle
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CartTotals
