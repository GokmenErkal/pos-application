import React from 'react'
import { Modal, Form, Button, Input, message, Select } from "antd"
import axios from "axios"

const AddProduct = ({ isAddModalOpen, setIsAddModalOpen, categories, products, setProducts }) => {
    const [form] = Form.useForm()

    const onFinish = async (values) => {
        try {
            await axios.post("http://localhost:5000/api/products/add-product", values);
            message.success("Ürün başarıyla eklendi");
            setProducts([
                ...products,
                {
                    ...values,
                    _id: Math.random(),
                    price: Number(values.price),
                }
            ])
            form.resetFields()
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Modal
                title="Yeni Ürün Ekle"
                open={isAddModalOpen}
                onCancel={() => setIsAddModalOpen(false)}
                footer={false}
            >
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item
                        name="title"
                        label="Ürün Adı"
                        rules={[{ required: true, message: "Ürün adı alanı boş geçilemez!" }]}
                    >
                        <Input placeholder='Ürün adı giriniz.' />
                    </Form.Item>
                    <Form.Item
                        name="img"
                        label="Ürün Görseli"
                        rules={[{ required: true, message: "Ürün görseli alanı boş geçilemez!" }]}
                    >
                        <Input placeholder='Ürün görseli ekleyiniz.' />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Ürün Fiyatı"
                        rules={[{ required: true, message: "Ürün fiyatı alanı boş geçilemez!" }]}
                    >
                        <Input placeholder='Ürün fiyatı giriniz.' />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label="Kategoris Seç"
                        rules={[{ required: true, message: "Ürün fiyatı alanı boş geçilemez!" }]}
                    >
                        <Select
                            showSearch
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.title ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.title ?? '').toLowerCase().localeCompare((optionB?.title ?? '').toLowerCase())
                            }
                            options={categories}
                        />
                    </Form.Item>
                    <Form.Item className="flex justify-end mb-0">
                        <Button type="primary" htmlType="submit">Oluştur</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddProduct
