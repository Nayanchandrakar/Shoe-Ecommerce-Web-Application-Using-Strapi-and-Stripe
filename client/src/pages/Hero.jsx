import React from "react"
import ContentWrapper from "../Utils"
import { NavLink } from "react-router-dom"

const Hero = () => {
    return (
        <section className="bg-gradinet h-auto">
            <ContentWrapper>
                <div className="grid flex-col lg:grid-cols-2 gap-2">
                    <div className="flex flex-col items-center mt-[4rem]">
                        <h1 className="text-white text-[6rem] lg:text-[10rem] font-Cabin font-extrabold">
                            SHOES
                        </h1>
                        <p className="text-gray-200  text-base opacity-90 text-justify font-Cabin max-w-[32rem] ">
                            Welcome to our online shoe store where we offer the
                            latest collection of high-quality shoes to meet your
                            style and comfort needs.
                        </p>

                        <div className="flex flex-row gap-5 mt-9">
                            <NavLink className="flex cursor-pointer w-[7rem] justify-center items-center px-4 py-2 font-Cabin text-sm font-bold bg-transpaent border border-white text-white ">
                                READ MORE
                            </NavLink>
                            <NavLink className="flex cursor-pointer w-[7rem] justify-center items-center px-4 py-2 font-Cabin text-sm font-bold bg-transparent border border-white text-white ">
                                SHOP NOW
                            </NavLink>
                        </div>
                    </div>
                    <div className=" Custom_animation flex justify-center items-center col-span-1">
                        <img
                            src="./logo/Hero1.png"
                            className=" overflow-hidden  h-[75%] lg:h-[80%]"
                            alt=""
                        />
                    </div>
                </div>
            </ContentWrapper>
        </section>
    )
}

export default Hero
