import React from 'react'
import Header from '../components/Header/Header'
import EditProduct from '../components/Products/EditProduct'

const ProductPage = () => {
    return (
        <>
            <Header />
            <div className='px-6'>
                <h1 className='text-4xl font-bold text-center mb-4'>Ürünler</h1>
                <EditProduct />
            </div>
        </>
    )
}

export default ProductPage
