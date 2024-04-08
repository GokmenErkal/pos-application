import { useState, useEffect } from "react"
import axios from "axios"
import ProductItem from "./ProductItem"
import { PlusOutlined, EditOutlined } from "@ant-design/icons"
import AddProduct from "./AddProduct"
import { useNavigate } from "react-router-dom"

const Products = ({ categories }) => {

    const [products, setProducts] = useState([])
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products/get-all");
                setProducts(res.data)
                console.log(products);
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, [])

    return (
        <div className="products-wrapper grid grid-cols-card gap-4">
            {
                products.map((item) => (
                    <ProductItem key={item._id} item={item} />
                ))
            }
            <div
                className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-purple-800 flex justify-center items-center hover: opacity-90"
                onClick={() => setIsAddModalOpen(true)}
            >
                <PlusOutlined className="text-white md:text-2xl" />
            </div>
            <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none bg-orange-800 flex justify-center items-center hover: opacity-90 min-h-[180px]" onClick={() => navigate("/products")}>
                <EditOutlined className="text-white md:text-2xl" />
            </div>
            <AddProduct
                categories={categories}
                isAddModalOpen={isAddModalOpen}
                setProducts={setProducts}
                products={products}
                setIsAddModalOpen={setIsAddModalOpen}
            />
        </div>
    )
}

export default Products
