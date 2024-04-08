import { Button, Form, Input, message, Modal, Table, Select } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios"

const EditProduct = () => {

  const [form] = Form.useForm()
  const [products, setProducts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({})
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories/get-all");
        const data = res.data;
        setCategories(
          data.map((item) => {
            return { ...item, value: item.title }
          })
        )
      } catch (error) {
        console.log(error);
      }
    }
    getCategories();
  }, [])

  const onFinish = async (values) => {
    try {
      await axios.put("http://localhost:5000/api/products/update-product",
        { ...values, productId: editingItem._id }
      )

      message.success("Ürün başarıyla güncellendi.");
      setProducts(
        products.map((item) => {
          if (item._id === editingItem._id) {
            return values;
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch("http://localhost:5000/api/categories/delete-category", {
          method: "DELETE",
          body: JSON.stringify({ categoryId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Kategori başarıyla silindi.");
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir şeyler yanlış gitti.");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "title",
      width: "8%",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => {
        return (
          <img src={record.img} alt="" className="w-full h-20 object-cover" />
        );
      },
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (_, record) => {
        return (
          <div className="flex justify-evenly">
            <Button type="link" className="pl-0" onClick={() => {
              setIsEditModalOpen(true)
              setEditingItem(record)
            }}
            >
              Düzenle
            </Button>
            <Button
              type="link"
              danger
              onClick={() => deleteCategory(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Form onFinish={onFinish}>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        scroll={{
          x: 1000,
          y: 600,
        }}
      />
      <Modal
        title="Yeni Ürün Ekle"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={editingItem}
        >
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
            <Button type="primary" htmlType="submit">Güncelle</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Form>
  );
};

export default EditProduct;