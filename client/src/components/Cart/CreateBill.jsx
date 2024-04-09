import React from 'react'
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { reset } from '../../redux/cartSlice'
import { Modal, Form, Input, Select, Card, Button, message } from "antd"
import { useNavigate } from "react-router-dom"

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const res = await axios.post("http://localhost:5000/api/bills/add-bill", {
                ...values,
                subTotal: cart.total,
                tax: ((cart.total * cart.tax) / 100).toFixed(2),
                totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
                cartItems: cart.cartItems,
            })

            if (res.status === 200) {
                message.success("Fatura Başarıyla Oluşturuldu.")
                dispatch(reset())
                navigate("/bills")
            }
        } catch (error) {
            message.error("Bir şeyler yanlış gitti.")
            console.log(error);
        }
    }

    return (
        <>
            <Modal
                title="Fatura Oluştur"
                footer={false}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item
                        label="Müşteri Adı"
                        rules={[{ required: true, message: "Müşteri adı alanı boş geçilemez!" }]}
                        name={"customerName"}
                    >
                        <Input placeholder='Bir müşteri adı yazınız...' />
                    </Form.Item>
                    <Form.Item
                        label="Tel No"
                        rules={[{ required: true, message: "Tel No alanı boş geçilemez!" }]}
                        name={"customerPhoneNumber"}
                    >
                        <Input placeholder='Bir telefon numrası yazınız...' maxLength={11} />
                    </Form.Item>
                    <Form.Item
                        label="Ödeme Yöntemi"
                        rules={[{ required: true, message: "Ödeme yöntemi alanı boş geçilemez!" }]}
                        name={"paymentMode"}
                    >
                        <Select placeholder="Ödeme Yöntemi Seçiniz">
                            <Select.Option value="Nakit">Nakit</Select.Option>
                            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
                        </Select>
                    </Form.Item>
                    <Card>
                        <div className='flex justify-between'>
                            <span>Ara Toplam</span>
                            <span>{(cart.total).toFixed(2) > 0 ? (cart.total).toFixed(2) : 0}$</span>
                        </div>
                        <div className='flex justify-between my-2'>
                            <span>KDV %{cart.tax}</span>
                            <span className='text-red-500'>{(cart.total * cart.tax) / 100}$</span>
                        </div>
                        <div className='flex justify-between'>
                            <b>Toplam</b>
                            <b>{cart.total + (cart.total * cart.tax) / 100}$</b>
                        </div>
                        <Button
                            type='primary'
                            className='w-full mt-2'
                            size='large'
                            htmlType='submit'
                            onClick={() => setIsModalOpen(true)}
                        >
                            Sipariş Oluştur
                        </Button>
                    </Card>
                </Form>
            </Modal>
        </>
    )
}

export default CreateBill
