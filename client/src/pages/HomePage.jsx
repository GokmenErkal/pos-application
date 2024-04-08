import { useEffect, useState } from "react";
import CartTotals from "../components/Cart/CartTotals";
import Categories from "../components/Categories/Categories";
import Header from "../components/Header/Header";
import Products from "../components/Products/Products";
import axios from "axios"

const HomePage = () => {

    const [categories, setCategories] = useState([]);

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


    return (
        <>
            <Header />
            <div className="home flex flex-col md:flex-row justify-between px-6 gap-10 md:pb-0 pb-24">
                <div className="categories pb-4 overflow-auto max-h-[calc(100vh_-_112px)]">
                    <Categories categories={categories} setCategories={setCategories} />
                </div>
                <div className="products flex-[8] overflow-auto pb-4 max-h-[calc(100vh_-_112px)]">
                    <Products categories={categories} />
                </div>
                <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
                    <CartTotals />
                </div>
            </div>
        </>
    )
}

export default HomePage
