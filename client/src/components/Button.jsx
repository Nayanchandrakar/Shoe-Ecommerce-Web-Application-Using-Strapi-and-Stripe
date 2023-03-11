import React, { useState } from "react"
import { useEffect } from "react"

const Button = ({ data, validation }) => {
    const [position, setposition] = useState(0)
    const [defaultdata, setdefault] = useState(data[0])

    let checkdata = (e, index) => {
        setposition(index)
        setdefault(e)
    }

    useEffect(() => {
        validation(defaultdata)
    }, [defaultdata])

    return (
        <div className="flex justify-center items-center">
            <div
                className={`flex items-center bg-gray-400/[.4] h-[2.5rem] w-[80%] sm:w-full rounded-full overflow-x-hidden relative justify-around`}
            >
                {data.map((e, index) => {
                    return (
                        <span
                            key={index}
                            onClick={() => checkdata(e, index)}
                            className={`bg-transparent z-10  text-black w-[8rem] flex items-center justify-center font-semibold cursor-pointer ${
                                position == index ? "text-white" : ""
                            }`}
                        >
                            {e}
                        </span>
                    )
                })}
                <span
                    className={`absolute w-[48%] rounded-full bg-red-600 z-0 h-[80%] jusify-center flex items-center transition-all custom_translate${position}`}
                ></span>
            </div>
        </div>
    )
}

export default Button
