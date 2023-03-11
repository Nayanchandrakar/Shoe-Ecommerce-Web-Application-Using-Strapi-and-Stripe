import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { shallow } from "zustand/shallow"
import { ContentWrapper, close, Filter, usebookStore } from "../Files/Exporter"

const Search = () => {
    const navigation = useNavigate()

    const { Apidata, searchfalse, searchlogic } = usebookStore(
        state => ({
            Apidata: state.Apidata,
            searchfalse: state.searchfalse,
            searchlogic: state.searchlogic,
        }),
        shallow
    )

    const [filterdata, setfilter] = useState("")
    const [apifilter, setfilterdata] = useState([])

    const handlefilter = e => {
        setfilter(e.target.value)

        setTimeout(() => {
            setfilterdata(
                Apidata?.data?.filter(e =>
                    e?.attributes?.title?.toLowerCase().includes(filterdata)
                )
            )
        }, 500)

        clearTimeout()
    }

    const navstate = id => {
        navigation(`/productdetails/${id}`)
        searchfalse()
    }

    return (
        <div
            className={` transition bg-white z-30 absolute ${
                searchlogic ? "translate-y-[0rem]" : "translate-y-[-50rem]"
            } w-full`}
        >
            <ContentWrapper>
                <div className=" w-full flex justify-between">
                    <input
                        type="text"
                        className="w-[90%] py-1 outline-none text-xl"
                        placeholder="Search shoes..."
                        onChange={handlefilter}
                    />
                </div>

                <div className="flex relative  items-center">
                    <img
                        src={close}
                        onClick={searchfalse}
                        className="absolute right-0 bottom-1 opacity-80 w-8"
                        alt="close"
                    />
                </div>

                <div className="flex flex-col gap-4 mt-8 h-full overflow-y-auto">
                    {searchlogic &&
                        apifilter.map(e => {
                            return (
                                <div onClick={() => navstate(e?.id)}>
                                    <Filter
                                        title={e?.attributes?.title}
                                        price={e?.attributes?.price}
                                        image={e?.attributes?.images?.data?.[0]?.attributes?.url
                                        }
                                    />
                                </div>
                            )
                        })}
                </div>
            </ContentWrapper>
        </div>
    )
}

export default Search
