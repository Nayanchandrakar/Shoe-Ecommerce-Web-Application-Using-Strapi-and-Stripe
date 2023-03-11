import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { shallow } from "zustand/shallow"
import {
    usebookStore,
    close,
    pluse,
    minus,
    SaveLocalstorage,
    makePaymentRequest,
} from "../Files/Exporter.js"
import { loadStripe } from "@stripe/stripe-js"

const Cart = () => {
    const {  cartlogic, cartfalse } = usebookStore(
        state => ({
            cartlogic: state.cartlogic,
            cartfalse: state.cartfalse,
        }),
        shallow
    )
    const [finalprice, setfinalprice] = useState([])

    const { cartMaindataStore, removestore, Updatestore } = SaveLocalstorage(
        state => ({
            cartMaindataStore: state.cartMaindataStore,
            removestore: state.removestore,
            Updatestore: state.Updatestore,
        }),
        shallow
    )

    useEffect(() => {
        let total = 0
        cartMaindataStore?.map(e => (total += e?.oldprice * e?.quantity))
        setfinalprice(total)
    }, [cartMaindataStore])

    const stripePromise = loadStripe(
        import.meta.env.VITE_REACT_STRIPE_PUBLISHABLE_KEY
    )

    const handlePaymentGate = async () => {
        if (cartMaindataStore.length !== 0) {
            try {
                const stripe = await stripePromise
                const { data } = await makePaymentRequest(
                    "/api/orders",
                    cartMaindataStore
                )

                await stripe.redirectToCheckout({
                    sessionId: data.stripeSession.id,
                })
            } catch (error) {
                console.log(error)
                window.alert(alert?.message)
            }
        } else {
            window.alert("Your Cart is Empty please add a shoe")
        }
    }

    return (
        <section
            className={`right-0 w-full lg:w-[18rem]  bg-white text-black h-[100vh] fixed top-0 bottom-0 z-30 overflow-y-auto ${
                cartlogic
                    ? "translate-x-[0rem]"
                    : "translate-x-[50rem] md:translate-x-[80rem] lg:translate-x-[50rem]"
            } transition-all h-full`}
        >
            <div className="p-3">
                <div className=" flex justify-start mb-3">
                    <img
                        src={close}
                        onClick={cartfalse}
                        className="w-6 cursor-pointer "
                        alt=""
                    />
                </div>

                {cartMaindataStore.map(e => {
                    return (
                        <>
                            <div className="w-full  transition-all group mb-5  relative bg-slate-100 p-2 rounded-lg stripe_shadow">
                                <div className="flex justify-center items-center zoomEffect hover:bg-[#E0E0E0] rounded-lg transition-colors bg-[#E8E8E8]">
                                    <img
                                        src={e?.image}
                                        className="w-[8rem]"
                                        alt=""
                                    />
                                </div>

                                <div className="flex flex-row justify-between items-center">
                                    <span className="text-base text-bold text-black">
                                        ₹ {e?.price}
                                    </span>

                                    <div className="flex w-[6rem] max-w-[7rem] mt-2 justify-between flex-row gap-2 bg-indigo-600 py-1 rounded-full mb-2 px-2 text-white">
                                        <img
                                            src={pluse}
                                            onClick={() =>
                                                Updatestore(
                                                    e?.id,
                                                    "increment",
                                                    e?.quantity
                                                )
                                            }
                                            className="w-5 invert"
                                            alt=""
                                        />
                                        <span className="">{e?.quantity}</span>
                                        <img
                                            src={minus}
                                            onClick={() =>
                                                Updatestore(
                                                    e?.id,
                                                    "decrement",
                                                    e?.quantity
                                                )
                                            }
                                            className="w-5 invert"
                                            alt=""
                                        />
                                    </div>
                                </div>

                                <span className="absolute top-2 w-6 h-6 hidden justify-center items-center rounded-full bg-red-800  group-hover:flex">
                                    <img
                                        src={close}
                                        onClick={() => removestore(e?.id)}
                                        className="w-5 invert"
                                        alt=""
                                    />
                                </span>
                                <p className="w-full text-justify">
                                    {e?.title}
                                </p>
                            </div>
                        </>
                    )
                })}

                {cartMaindataStore.length == 0 && (
                    <div className="h-[80vh] xl:h-[80vh] flex justify-center items-center">
                        <span className="text-2xl font-semibold font-Cabin text-gray-500">
                            Your Cart is Empty....
                        </span>
                    </div>
                )}

                <div className="flex bg-white justify-center flex-col sticky bottom-0 mt-8">
                    <div className="flex flex-row justify-between">
                        <span className="text-lg mb-3 text-bold text-black uppercase">
                            subtotal:
                        </span>
                        <span className="text-lg mb-3 text-bold text-indigo-600 uppercase">
                            ₹ {finalprice}
                        </span>
                    </div>
                    <button
                        type="button"
                        className=" bg-indigo-600 py-2 rounded-md text-white  w-full"
                        onClick={handlePaymentGate}
                    >
                        Checkout Now
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Cart
