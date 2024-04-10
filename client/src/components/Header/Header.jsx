import React from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import "./index.css"

import { Badge, Input, message } from "antd"
import {
    SearchOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    CopyOutlined,
    UserOutlined,
    BarChartOutlined,
    LogoutOutlined
} from '@ant-design/icons';

import { Link } from 'react-router-dom';

const Header = ({ setSearch }) => {

    const cart = useSelector((state) => state.cart)
    const cartCounter = cart.cartItems.length
    const navigate = useNavigate();

    const logOut = () => {
        if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
            localStorage.removeItem("posUser")
            navigate("/login");
            message.success("Çıkış işlemi başarılı")
        }
    }

    return (
        <div className='border-b mb-6'>
            <header className='py-4 px-6 flex justify-between items-center gap-10'>
                <div className="logo">
                    <a href="">
                        <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
                    </a>
                </div>
                <div className="header-search flex-1 flex justify-center">
                    <Input
                        size="large"
                        placeholder="Ürün ara..."
                        prefix={<SearchOutlined />}
                        className='rounded-full max-w-[800px]'
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    />
                </div>
                <div className="menu-links">
                    <Link to='/' className='menu-link'>
                        <HomeOutlined className='justify-center md:text-2xl text-xl' />
                        <span className='md: text-xs text-[10px]'>Ana Sayfa</span>
                    </Link>
                    <Badge
                        count={cartCounter}
                        className='md:flex hidden'
                    >
                        <Link to='/cart' className='menu-link'>
                            <ShoppingCartOutlined className='justify-center md:text-2xl text-xl' />
                            <span className='md: text-xs text-[10px]'>Sepet</span>
                        </Link>
                    </Badge>
                    <Link to='/bills' className='menu-link'>
                        <CopyOutlined className='justify-center md:text-2xl text-xl' />
                        <span className='md: text-xs text-[10px]'>Faturalar</span>
                    </Link>
                    <Link to='/customers' className='menu-link'>
                        <UserOutlined className='justify-center md:text-2xl text-xl' />
                        <span className='md: text-xs text-[10px]'>Müşteriler</span>
                    </Link>
                    <Link to='/statistic' className='menu-link'>
                        <BarChartOutlined className='justify-center md:text-2xl text-xl' />
                        <span className='md: text-xs text-[10px]'>İstatistikler</span>
                    </Link>
                    <Link to='/login' className='menu-link' onClick={logOut}>
                        <LogoutOutlined className='justify-center md:text-2xl text-xl' />
                        <span className='md: text-xs text-[10px]'>Çıkış</span>
                    </Link>
                </div>
                <Badge count={cart.cartItems.length} className='md:hidden flex'>
                    <Link to='/' className='menu-link'>
                        <ShoppingCartOutlined className='justify-center text-2xl' />
                        <span className='md: text-xs text-[10px]'>Sepet</span>
                    </Link>
                </Badge>
            </header>
        </div>
    );
};

export default Header;