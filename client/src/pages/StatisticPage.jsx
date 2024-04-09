import React, { useEffect, useState } from 'react'
import axios from "axios"
import Header from '../components/Header/Header'
import StatisticsCard from '../components/Statistics/StatisticsCard'
import { Area, Pie } from "@ant-design/plots"

const StatisticPage = () => {

  const [data, setData] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bills/get-all");
        setData(res.data)
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/get-all");
        setProducts(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getBills();
    getProducts();
  }, [])

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return amount;
  }

  const config = {
    data: data,
    xField: "customerName",
    yField: 'subTotal',
  };

  const config2 = {
    data: data,
    angleField: 'subTotal',
    colorField: 'customerName',
    paddingRight: 80,
    innerRadius: 0.6,
    label: {
      text: 'subTotal',
      style: {
        fontSize: 20,
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: 'text',
        style: {
          text: 'Toplam\nDeğer',
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 40,
          fontStyle: 'bold',
        },
      },
    ],
  };

  return (
    <>
      <Header />
      <div className='px-6 pb-20 md:pb-0'>
        <h1 className='text-4xl font-bold text-center mb-4'>İstatistiklerim</h1>
        <div className='statistic-section'>
          <h2 className='text-lg'>Hoş geldin <span className='text-green-700 font-bold text-xl'>Admin</span></h2>
          <div className='statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4'>
            <StatisticsCard title="Toplam Müşteri" amount={data?.length} image="user" />
            <StatisticsCard
              title="Toplam Kazanç"
              image="money"
              amount={totalAmount()}
            />
            <StatisticsCard title="Toplam Satış" amount={data?.length} image="sale" />
            <StatisticsCard title="Toplam Ürün" amount={products?.length} image="product" />
          </div>
          <div className='flex justify-between gap-10 lg:flex-row flex-col items-center'>
            <div className='lg:w-1/2 lg:h-full h-72'>
              <Area {...config} />
            </div>
            <div className='lg:w-1/2 lg:h-full h-72'>
              <Pie {...config2} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StatisticPage
