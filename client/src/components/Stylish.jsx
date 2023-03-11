import React from "react"

const Stylish = ({ Text }) => {
    return (
        <div className="relative group w-fit">
            <h2 className="text-3xl font-bold text-black">{Text}</h2>
            <span className="absolute w-[2rem] mt-1 transition-all group-hover:w-full h-1 rounded-full bg-red-600"></span>
        </div>
    )
}

export default Stylish
