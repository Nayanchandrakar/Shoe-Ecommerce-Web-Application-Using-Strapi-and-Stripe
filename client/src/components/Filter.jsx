import React from "react"
import { NavLink, useNavigation } from "react-router-dom"

const Filter = ({ image, title, price }) => {
    return (
        <NavLink className="flex flex-row justify-between min-h-[3rem] p-2 items-center transition-colors hover:bg-[#E0E0E0] bg-[#E8E8E8] rounded-md">
            <div className="w-10">
                <img src={image} className="w-full" alt={image} />
            </div>

            <span className="text-black">
                <span className="text-base  mr-7">{title}</span>
                <span className="text-lg font-bold">₹ {price}</span>
            </span>
        </NavLink>
    )
}

export default Filter
