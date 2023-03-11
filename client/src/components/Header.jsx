import React, { useState, useEffect } from "react"
import { like, cart, search } from "../assets/index.js"
import { NavLink } from "react-router-dom"
import { usebookStore, SaveLocalstorage } from "../Files/Exporter.js"
import { shallow } from "zustand/shallow"

const Header = () => {
    const { carttrue, searchtrue, searchfalse } = usebookStore(
        state => ({
            carttrue: state.carttrue,
            searchfalse: state.searchfalse,
            searchtrue: state.searchtrue,
        }),
        shallow
    )
    const { cartMaindataStore } = SaveLocalstorage(
        state => ({ cartMaindataStore: state.cartMaindataStore }),
        shallow
    )
    const [scroll, setscroll] = useState("visible")
    const [histroyscrollY, setscrollY] = useState(0)

    const ScrollEvent = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > histroyscrollY) {
                searchfalse()
                setscroll("translate-y-[-5rem]")
            } else {
                setscroll("translate-y-[0rem] bg-black/[0.7] backdrop-blur")
            }
        } else {
            setscroll("translate-y-[0rem]")
        }
        setscrollY(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener("scroll", ScrollEvent)
        return () => {
            window.removeEventListener("scroll", ScrollEvent)
        }
    }, [window.scrollY])

    return (
        <>
            <header
                className={`h-[76px] overflow-hidden z-20 w-full px-4 sm:px-8 sticky top-0 transition-all ${scroll} bg-black`}
            >
                <nav className="flex justify-between  flex-row items-center h-full max-w-7xl mx-auto z-40">
                    <ul className="hidden md:flex flex-row gap-6 text-white font-Cabin font-semibold text-base items-center justify-center">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="">About</NavLink>
                        <NavLink to="">Categories</NavLink>
                    </ul>

                    <NavLink
                        to="/"
                        className="text-4xl font-bold first-letter:text-red-500 first-letter:text-5xl first-letter:italic text-white"
                    >
                        WALKWISE
                    </NavLink>

                    <div className="flex flex-row gap-6 items-center relative">
                        <img
                            src={search}
                            onClick={searchtrue}
                            className="w-6 cursor-pointer"
                            alt=""
                        />
                        <img src={like} className="w-6 cursor-pointer" alt="" />
                        <img
                            onClick={carttrue}
                            src={cart}
                            className="w-6"
                            alt=""
                        />
                        <span
                            onClick={carttrue}
                            className="absolute cursor-pointer bg-white w-4 h-4 text-[13px] flex justify-center items-center rounded-full font-semibold transition-all right-3 top-3"
                        >
                            {cartMaindataStore?.length}
                        </span>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header
