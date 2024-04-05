import React from 'react'
import { Modal, Form, Input, Select, Card, Button } from "antd"

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {

    const onFinish = (values) => {
        console.log("Received values of form:", values);
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
                        name={"phoneNumberp"}
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
                        <div className='flex justify-end'>
                            <Button
                                type='primary'
                                className=' mt-4'
                                size='large'
                                onClick={() => setIsModalOpen(true)}
                                htmlType='submit'
                            >
                                Sipariş Oluştur
                            </Button>
                        </div>
                    </Card>
                </Form>
            </Modal>
        </>
    )
}

export default CreateBill
