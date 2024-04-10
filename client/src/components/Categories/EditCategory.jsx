import React, { useState } from 'react'
import { Modal, Form, Table, Input, Button, message } from "antd"
import axios from "axios"

const EditCategory = ({ isEditModalOpen, setIsEditModalOpen, categories, setCategories }) => {

    const [editingRow, setEditingRow] = useState({})

    const columns = [
        {
            title: "Category Title",
            dataIndex: "title",
            render: (_, record) => {
                if (record._id === editingRow._id) {
                    return (
                        <Form.Item className='mb-0' name="title">
                            <Input defaultValue={record.title} />
                        </Form.Item>
                    )
                }
                else {
                    return <p>{record.title}</p>
                }
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return (
                    <div>
                        <Button type='link' onClick={() => setEditingRow(record)}>Düzenle</Button>
                        <Button type='text' htmlType='submit'>Kaydet</Button>
                        <Button type='text' danger onClick={() => deleteCategory(record._id)}>Sil</Button>
                    </div>
                )
            }
        }
    ]

    const onFinish = async (values) => {
        try {
            await axios.put(process.env.REACT_APP_SERVER_URL + "/api/categories/update-category", { ...values, categoryId: editingRow._id });
            message.success("Kategori başarıyla güncellendi")
            setCategories(categories.map(item => {
                if (item._id === editingRow._id) {
                    return { ...item, title: values.title }
                }
                return item;
            }))
        } catch (error) {
            message.error("Bir şeyler ters gitti")
            console.log(error);
        }
    }

    const deleteCategory = async (categoryId) => {
        if (window.confirm("Emin misiniz?")) {
            try {
                await axios.delete(process.env.REACT_APP_SERVER_URL + "/api/categories/delete-category", { data: { categoryId } })
                
                setCategories(categories.filter((item) => item._id !== categoryId))
                message.success("Kategori başarıyla silindi.");

            } catch (error) {
                message.error("Bir şeyler ters gitti")
                console.log(error);
            }
        }
    }

    return (
        <>
            <Modal
                open={isEditModalOpen}
                onCancel={() => setIsEditModalOpen(false)}
                title="Kategori İşlemleri"
                footer={false}
            >
                <Form onFinish={onFinish}>
                    <Table bordered dataSource={categories} columns={columns} rowKey={"_id"} />
                </Form>
            </Modal>
        </>
    )
}

export default EditCategory
