import React, { useEffect, useState } from "react"
import ContentWrapper from "../Utils"
import { usebookStore } from "../store"
import Skeleton from "react-loading-skeleton"

const Categories = () => {
    const { categoryapi, callcategoryapi } = usebookStore(state => ({
        callcategoryapi: state.callcategoryapi,
        categoryapi: state.categoryapi,
    }))
    const [loader, setloader] = useState(false)

    useEffect(() => {
        const callingcat = async () => await callcategoryapi()
        callingcat()
    }, [])

    return (
        <section className="mt-6">
            <ContentWrapper>
                <div className="grid grid-cols-1 mobile:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categoryapi?.data?.map(e => {
                        return (
                            <>
                                {loader ? null : (
                                    <Skeleton className="w-full h-[12rem]" />
                                )}
                                <div
                                    className={`justify-center cursor-pointer items-center w-full h-[12rem] relative overflow-hidden zoomEffect ${
                                        loader ? "flex" : "hidden"
                                    }`}
                                >
                                    <img
                                        src={
                                            e?.attributes?.image?.data
                                                ?.attributes?.url
                                        }
                                        className="relative w-full h-full object-cover"
                                        onLoad={() => setloader(true)}
                                        alt=""
                                    />
                                    <span className="absolute bg-black/[0.4] w-full top-0  flex justify-center align items-center h-full text-white text-3xl text-white/[.9] uppercase">
                                        {e?.attributes?.title}
                                    </span>
                                </div>
                            </>
                        )
                    })}
                </div>
            </ContentWrapper>
        </section>
    )
}

export default Categories
