import React from 'react'
import Header from '../components/Header/Header'
import StatisticsCard from '../components/Statistics/StatisticsCard'
import { Area, Pie } from "@ant-design/plots"

const StatisticPage = () => {
    const config = {
        data: {
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/aapl.json',
        },
        xField: (d) => new Date(d.date),
        yField: 'close',
    };

    const config2 = {
        data: [
          { type: '分类一', value: 27 },
          { type: '分类二', value: 25 },
          { type: '分类三', value: 18 },
          { type: '分类四', value: 15 },
          { type: '分类五', value: 10 },
          { type: '其他', value: 5 },
        ],
        angleField: 'value',
        colorField: 'type',
        paddingRight: 80,
        innerRadius: 0.6,
        label: {
          text: 'value',
          style: {
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
              text: 'AntV\nCharts',
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
            <div className='px-6 pb-20 md:pb-0  '>
                <h1 className='text-4xl font-bold text-center mb-4'>İstatistiklerim</h1>
                <div className='statistic-section'>
                    <h2 className='text-lg'>Hoş geldin <span className='text-green-700 font-bold text-xl'>Admin</span></h2>
                    <div className='statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4'>
                        <StatisticsCard title="Toplam Müşteri" amount="7" image="user" />
                        <StatisticsCard title="Toplam Kazanç" amount="1266.84 $" image="money" />
                        <StatisticsCard title="Toplam Satış" amount="15" image="sale" />
                        <StatisticsCard title="Toplam Ürün" amount="37" image="product" />
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
