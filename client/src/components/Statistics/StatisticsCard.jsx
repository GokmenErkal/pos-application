import React from 'react'

const StatisticsCard = ({ image, title, amount }) => {
    return (
        <>
            <div className='card-item bg-gray-800 rounded-lg p-8'>
                <div className='flex items-center gap-x-4'>
                    <div className='bg-white rounded-full w-16 h-16 p-3'>
                        <img src={`/images/${image}.png`} alt="" />
                    </div>
                    <div className='text-white'>
                        <p className='mb-2 text-lg font-medium text-gray-500'>{title}</p>
                        <p className='text-xl font-semibold text-gray-200'>{amount?.toFixed(2)}$</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatisticsCard
