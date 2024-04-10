import { useEffect, useState } from "react";
import CartTotals from "../components/Cart/CartTotals";
import Categories from "../components/Categories/Categories";
import Header from "../components/Header/Header";
import Products from "../components/Products/Products";
import axios from "axios"
import { Spin } from "antd"

const HomePage = () => {

    const [categories, setCategories] = useState();
    const [products, setProducts] = useState();
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("")

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/categories/get-all");
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

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/api/products/get-all");
                setProducts(res.data)
                console.log(products);
            } catch (error) {
                console.log(error);
            }
        }
        getProducts();
    }, [])

    return (
        <>
            <Header setSearch={setSearch} />
            {
                products && categories ? (
                    <div className="home flex flex-col md:flex-row justify-between px-6 gap-10 md:pb-0 pb-24 h-screen">
                        <div className="categories pb-4 overflow-auto max-h-[calc(100vh_-_112px)]">
                            <Categories categories={categories} setCategories={setCategories} setFiltered={setFiltered} products={products} />
                        </div>
                        <div className="products flex-[8] overflow-auto pb-4 max-h-[calc(100vh_-_112px)] min-h-[500px]">
                            <Products
                                categories={categories}
                                filtered={filtered}
                                products={products}
                                setProducts={setProducts}
                                search={search}
                            />
                        </div>
                        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
                            <CartTotals />
                        </div>
                    </div>
                ) :
                    <Spin size="large" className="absolute h-screen w-screen top-1/2 flex justify-center" />
            }
        </>
    )
}

export default HomePage
