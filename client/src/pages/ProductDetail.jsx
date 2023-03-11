import React, { useEffect, useState } from "react"
import { shallow } from "zustand/shallow"
import {
    ContentWrapper,
    share,
    usebookStore,
    SaveLocalstorage,
    pluse,
    minus,
    linkedin,
    twitter,
    facebook,
    instagram,
    Cards,
    Stylish,
} from "../Files/Exporter.js"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { NavLink, useParams } from "react-router-dom"
import Skeleton from "react-loading-skeleton"

const ProductDetail = () => {
    const { id } = useParams()
    const { Apidata, callApi, increment, decrement, getquantity } =
        usebookStore(
            state => ({
                Apidata: state.Apidata,
                callApi: state.callApi,
                increment: state.increment,
                decrement: state.decrement,
                getquantity: state.getquantity,
                cartstorefun: state.cartstorefun,
                cartstore: state.cartstore,
            }),
            shallow
        )
    const [imageload, setimageLoading] = useState(true)
    const { handledatastore, cartMaindataStore } = SaveLocalstorage(
        state => ({
            handledatastore: state.handledatastore,
            cartMaindataStore: state.cartMaindataStore,
        }),
        shallow
    )

    // MAIN API CALL TOP PREFERENCE
    useEffect(() => {
        const Productdetails = async () => await callApi()
        Productdetails()
    }, [])

    // RESETTING INCREMENT AND DECREMENT
    useEffect(() => {
        usebookStore.setState({ getquantity: 1 })
    }, [increment, decrement])

    const data = Apidata?.data?.filter(e => id == e?.id)
    const suggested = Apidata?.data?.filter(e => e?.id !== id)

    const CartHandledata = () => {
        handledatastore(
            {
                id: data?.[0]?.id,
                image: data?.[0]?.attributes?.images?.data?.[0]?.attributes
                    ?.url,
                title: data?.[0]?.attributes?.title,
                description: data?.[0]?.attributes?.description,
                price: data?.[0]?.attributes?.price * getquantity,
                quantity: getquantity,
                oldprice: data?.[0]?.attributes?.price,
                slug: data?.[0]?.attributes?.slug,
            },
            data?.[0]?.attributes?.price
        )
    }

    return (
        <section className="">
            <ContentWrapper>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mt-6">
                    {imageload ? (
                        <Skeleton className="w-full h-[100vh] 2xl:h-[60vh]" />
                    ) : null}

                    <div
                        className={`${
                            imageload ? "hidden" : "flex"
                        } justify-center items-center bg-gray-300/[.6] rounded-lg hover:bg-gray-300/[.8] transition-colors zoomEffect overflow-hidden w-full h-[35rem]`}
                    >
                        <img
                            src={
                                data?.[0]?.attributes?.images?.data?.[0]
                                    ?.attributes?.url
                            }
                            className="w-full object-contain h-full"
                            alt=""
                            onLoad={() => setimageLoading(false)}
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        {imageload ? (
                            <>
                                <Skeleton className="w-[8rem] h-7" />
                                <Skeleton className="w-full" count={10} />
                            </>
                        ) : (
                            <>
                                <h3 className="text-2xl font-semibold">
                                    {data?.[0]?.attributes?.title}
                                </h3>
                                <span className="text-2xl">
                                    ₹{data?.[0]?.attributes?.price}
                                </span>
                                <p className="text-justify text-gray-500">
                                    {data?.[0]?.attributes?.description}
                                </p>
                            </>
                        )}

                        <div className="flex flex-row gap-4 mt-4">
                            <div className="flex flex-row w-[8rem] items-center bg-indigo-500 rounded-full p-1">
                                <span className="cursor-pointer  bg-indigo-600 rounded-full">
                                    <img
                                        src={pluse}
                                        className="w-[2rem] invert"
                                        alt=""
                                        onClick={increment}
                                    />
                                </span>
                                <span className="text-2xl text-center text-white w-[4rem]">
                                    {getquantity}
                                </span>
                                <span className="cursor-pointer bg-indigo-600 rounded-full">
                                    <img
                                        src={minus}
                                        className="w-[2rem] invert"
                                        alt=""
                                        onClick={decrement}
                                    />
                                </span>
                            </div>

                            <div className="">
                                <button
                                    type="button"
                                    onClick={CartHandledata}
                                    className=" bg-indigo-600 py-2 rounded-md text-white  w-full px-5"
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-row justify-start gap-5 mt-7">
                            <img src={share} className="w-6 " alt="" />
                            <img src={facebook} className="w-6 " alt="" />
                            <img src={instagram} className="w-6 " alt="" />
                            <img src={twitter} className="w-6 " alt="" />
                            <img src={linkedin} className="w-6 " alt="" />
                        </div>
                    </div>
                </div>

                <div className="w-full mt-[8rem]">
                    <span className="">
                        <Stylish Text="Suggestions" />
                    </span>

                    <div className="my-[3rem]">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
                                // when window width is >= 640px
                                640: {
                                    width: 640,
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                },
                                // when window width is >= 768px
                                768: {
                                    width: 768,
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                            }}
                            className="mySwiper"
                        >
                            {suggested?.map(e => {
                                return (
                                    <>
                                        <SwiperSlide key={e?.attributes?.slug}>
                                            <NavLink
                                                to={`/productdetails/${e?.id}`}
                                                className="min-w-[20rem]"
                                            >
                                                <Cards
                                                    id={e?.id}
                                                    key={e?.attributes?.slug}
                                                    image={
                                                        e?.attributes?.images
                                                            ?.data?.[0]
                                                            ?.attributes?.url
                                                    }
                                                    title={e?.attributes?.title}
                                                    price={e?.attributes?.price}
                                                />
                                            </NavLink>
                                        </SwiperSlide>
                                    </>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
            </ContentWrapper>
        </section>
    )
}

export default ProductDetail
