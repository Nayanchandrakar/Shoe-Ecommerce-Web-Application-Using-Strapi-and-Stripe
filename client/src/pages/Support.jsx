import React, { useState } from "react"
import { usebookStore } from "../store"
import ContentWrapper from "../Utils"

const Support = () => {
    const [message, setmessage] = useState("")
    const { callmessageapipost } = usebookStore(state => ({
        callmessageapipost: state.callmessageapipost,
    }))

    const Handlequery = async () => {
        if (message.length > 0) {
            await callmessageapipost(message)
        } else {
            window.alert("Enter a text please")
        }
    }

    return (
        <section className="bg-Support_texture w-full flex items-center  h-[20rem]">
            <ContentWrapper>
                <div className="flex justify-center items-center flex-col gap-2 ">
                    <span className=" text-[1.7rem] sm:text-[2rem] text-white font-bold antialiased">
                        Contact Customer Support
                    </span>
                    <p className=" text-sm  text-gray-200 text-semibold">
                        Always available to help you from the crowd once.
                    </p>

                    <div className="flex justify-center mt-3 rounded-full">
                        <input
                            type="text"
                            className="py-3 px-5 outline-none rounded-l-full bg-white/[0.1] backdrop-blur  placeholder:text-white placeholder:text-medium text-white border-l border-t border-b"
                            placeholder="Enter your query"
                            onChange={e => setmessage(e?.target?.value)}
                        />
                        <button
                            onClick={() => Handlequery()}
                            type="button"
                            className="text-white  bg-white/[0.1] px-4 rounded-r-full backdrop-blur transition-colors border-white border-l border-r border-t border-b"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </ContentWrapper>
        </section>
    )
}

export default Support
