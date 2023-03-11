import React, { useEffect, useState } from "react"
import { shallow } from "zustand/shallow"
import ContentWrapper from "../Utils"
import { Stylish, Cards, Button, usebookStore } from "../Files/Exporter.js"
import { NavLink } from "react-router-dom"

const Product = () => {
    const { Apidata, callApi } = usebookStore(
        state => ({ Apidata: state.Apidata, callApi: state.callApi }),
        shallow
    )
    const [buttondata, setbutton] = useState(null)

    useEffect(() => {
        const CallingFunct = async () => await callApi()
        CallingFunct()
    }, [])

    let handlechange = () =>
        Apidata?.data?.filter(e =>
            buttondata == "Relevant" ? e : e?.attributes?.price >= 3000
        )

    return (
        <section className="">
            <ContentWrapper>
                <NavLink className="flex justify-between mb-7">
                    <Stylish Text="Products" />
                    <Button
                        data={["Relevant", "Premium"]}
                        validation={setbutton}
                    />
                </NavLink>

                <div className="grid grid-cols-1 mobile:grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                    {handlechange()?.map(e => {
                        return (
                            <>
                                <NavLink
                                    id="RouterProducts"
                                    className="inline-block"
                                    to={`/productdetails/${e?.id}`}
                                >
                                    <Cards
                                        id={e?.id}
                                        key={e?.attributes?.slug}
                                        image={
                                            e?.attributes?.images?.data?.[0]
                                                ?.attributes?.url
                                        }
                                        title={e?.attributes?.title}
                                        price={e?.attributes?.price}
                                    />
                                </NavLink>
                            </>
                        )
                    })}
                </div>
            </ContentWrapper>
        </section>
    )
}

export default Product
