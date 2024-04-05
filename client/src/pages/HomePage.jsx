import CartTotals from "../components/Cart/CartTotals";
import Categories from "../components/Categories/Categories";
import Header from "../components/Header/Header";
import Products from "../components/Products/Products";

const HomePage = () => {
    return (
        <>
            <Header />
            <div className="home flex flex-col md:flex-row justify-between px-6 gap-10 md:pb-0 pb-24">
                <div className="categories pb-4 overflow-auto max-h-[calc(100vh_-_112px)]">
                    <Categories />
                </div>
                <div className="products flex-[8] overflow-auto pb-4 max-h-[calc(100vh_-_112px)]">
                    <Products />
                </div>
                <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
                    <CartTotals />
                </div>
            </div>
        </>
    )
}

export default HomePage
