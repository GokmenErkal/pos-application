import React, { useState, useRef } from 'react'
import Header from '../components/Header/Header'
import CreateBill from '../components/Cart/CreateBill';
import Highlighter from "react-highlight-words";

import { Table, Card, Button, message, Popconfirm, Input, Space } from 'antd'
import { PlusCircleOutlined, MinusCircleOutlined, SearchOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from "react-redux"
import { increase, decrease, deleteCart } from '../../src/redux/cartSlice';

const Cartpage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1890ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

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
            ...getColumnSearchProps("title")
        },
        {
            title: 'Kategori',
            dataIndex: 'category',
            key: 'category',
            ...getColumnSearchProps("category")
        },
        {
            title: 'Ürün Fiyatı',
            dataIndex: "price",
            key: "price",
            render: (text) => {
                return (
                    <span>{text}{" "}$</span>
                )
            },
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Ürün Adeti',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, record) => {
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
            render: (_, record) => {
                console.log(record);
                return (
                    <span>{record.price * record.quantity}{" "}$</span>
                )
            }
        },
        {
            title: 'Actions',
            dataIndex: "actions",
            key: "actions",
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
                    scroll={{
                        x: 1200,
                        y: 300
                    }}
                />
                <div className="cart-total flex justify-end mt-4">
                    <Card className='w-72 '>
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
                            onClick={() => setIsModalOpen(true)}
                            disabled={cart.cartItems.length === 0}
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
