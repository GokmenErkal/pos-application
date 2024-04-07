import React from 'react'

const AuthCarousel = ({ img, title, description }) => {
    return (
        <>
            <div className="!flex flex-col items-center justify-center h-full mb-10 px-6">
                <img
                    src={img}
                    className="w-[600px] h-[500px]"
                />
                <h3 className="text-4xl text-center text-white font-bold">{title}</h3>
                <p className="text-white mt-5 text-2xl text-center">{description}</p>
            </div>
        </>
    )
}

export default AuthCarousel
