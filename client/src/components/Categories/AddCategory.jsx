import React from 'react'
import { Modal, Form, Button, Input, message } from "antd"
import axios from "axios"

const AddCategory = ({ isAddModalOpen, setIsAddModalOpen, categories, setCategories }) => {
    const [form] = Form.useForm()

    const onFinish = async (values) => {
        try {
            await axios.post(process.env.REACT_APP_SERVER_URL + "/api/categories/add-category", values);
            message.success("Kategori başarıyla eklendi");
            setCategories([
                ...categories,
                {
                    _id: Math.random(),
                    title: values.title,
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
                title="Yeni Kategori Ekle"
                open={isAddModalOpen}
                onCancel={() => setIsAddModalOpen(false)}
                footer={false}
            >
                <Form layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item name="title" label="Kategori Ekle" rules={[{ required: true, message: "Kategori adı alanı boş geçilemez!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item className="flex justify-end mb-0">
                        <Button type="primary" htmlType="submit">Oluştur</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddCategory
