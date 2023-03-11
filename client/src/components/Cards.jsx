import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

const Cards = ({ image, title, price, id }) => {
    const [loading, setloading] = useState(false)

    return (
        <div key={id} className="flex flex-col gap-3 bg-neutral-100 ">
            {loading ? null : (
                <Skeleton className="w-full h-[15rem] object-cover" />
            )}
            <div
                to={`/productdetails/${id}`}
                className={`${
                    loading ? "flex" : "hidden"
                } w-full overflow-hidden h-full rounded-md zoomEffect hover:bg-[#E0E0E0] bg-[#E8E8E8] justify-center items-center`}
            >
                {" "}
                <img
                    src={image}
                    className="object-cover w-[10rem] min-h-[15rem]"
                    alt={id}
                    onLoad={() => setloading(true)}
                />{" "}
            </div>

            <div className="flex flex-col gap-1 p-2">
                {!loading ? (
                    <Skeleton className="w-[15rem] mobile:w-[12rem] mobile_skeleton:w-[15rem]" />
                ) : (
                    <p className="text-base text-gray-600">{title}</p>
                )}
                {!loading ? (
                    <Skeleton className="w-[10rem]" />
                ) : (
                    <span className="text-base font-bold">{price}</span>
                )}
            </div>
        </div>
    )
}

export default Cards
