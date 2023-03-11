import { create } from "zustand"
import { fetchdata, postdata } from "../Files/Exporter.js"
import { devtools, persist } from "zustand/middleware"

export const usebookStore = create((set, get) => ({
    cartlogic: false,
    searchlogic: false,
    Apidata: null,
    categoryapi: null,
    getquantity: 1,
    cartstore: null,
    cartquantity: 0,

    carttrue: () => set(state => ({ cartlogic: true })),
    cartfalse: () => set(state => ({ cartlogic: false })),
    searchtrue: () => set(state => ({ searchlogic: true })),
    searchfalse: () => set(state => ({ searchlogic: false })),
    callApi: async () => {
        const apires = await fetchdata("api/products?populate=*")
        set({ Apidata: apires ? apires : undefined })
    },

    callcategoryapi: async () => {
        const catres = await fetchdata("api/categories?populate=*")
        set({ categoryapi: catres ? catres : undefined })
    },
    callmessageapipost: async message => {
        const data = await postdata("api/messages", message)
        if (data?.status == 200) {
            window.alert("Query sent succefully to customer support")
        } else {
            window.alert("An Internal error Occured please retry")
        }
    },
    increment: () => {
        if (get().getquantity >= 10) {
            return set(state => ({ getquantity: 10 }))
        } else {
            return set(state => ({ getquantity: state.getquantity + 1 }))
        }
    },
    decrement: () => {
        if (get().getquantity == 1) {
            return set(state => ({ getquantity: 1 }))
        } else {
            return set(state => ({ getquantity: state.getquantity - 1 }))
        }
    },
    cartincrement: () => {
        if (get().cartquantity >= 10) {
            return set(state => ({ cartquantity: 10 }))
        } else {
            return set(state => ({ cartquantity: state.cartquantity + 1 }))
        }
    },
    cartdecrement: () => {
        if (get().cartquantity == 0) {
            return set(state => ({ cartquantity: 0 }))
        } else {
            return set(state => ({ cartquantity: state.cartquantity - 1 }))
        }
    },

    cartstorefun: data => {
        set(state => ({ cartstore: [data] }))
    },
}))

const useLocalStore = set => ({
    cartMaindataStore: [],

    handledatastore: (newdata, oldprice) => {
        let localstoragedata = JSON.parse(localStorage.getItem("cartlocaljs"))
            ?.state?.cartMaindataStore
        const checkfind = localstoragedata?.filter(e => e?.id == newdata?.id) //single matcning data
        const filter = localstoragedata.filter(e => e.id !== newdata?.id) //all the data except single matching data

        //    CHECKING FILTER HAVE DATA OR NOT IF NOT THEN 0 AND HAVING THEN 1
        if (checkfind.length == 1) {
            set(state => ({
                cartMaindataStore: [
                    ...filter,
                    {
                        ...checkfind[0],
                        quantity:
                            checkfind?.[0]?.quantity +
                            usebookStore.getState().getquantity,
                        price:
                            checkfind?.[0]?.price +
                            usebookStore.getState().getquantity * oldprice,
                    },
                ],
            }))
        } else {
            set(state => ({
                cartMaindataStore: [...state.cartMaindataStore, newdata],
            }))
        }
    },

    Updatestore: (cartid, type) => {
        let localstoragedata = JSON.parse(localStorage.getItem("cartlocaljs"))
            ?.state?.cartMaindataStore
        const checkfind = localstoragedata?.filter(e => e?.id == cartid) //single matcning data
        let filter = localstoragedata.filter(e => e.id !== cartid)
        const reversefilter = filter.reverse()

        set(state => ({
            cartMaindataStore: [
                {
                    ...checkfind[0],
                    quantity:
                        type == "increment"
                            ? checkfind?.[0]?.quantity + 1
                            : checkfind?.[0]?.quantity == 1
                            ? checkfind?.[0]?.quantity
                            : checkfind?.[0]?.quantity - 1,
                    price:
                        type == "increment"
                            ? checkfind?.[0]?.price +
                              Number(checkfind?.[0]?.oldprice)
                            : Number(checkfind?.[0]?.price) ==
                              Number(checkfind?.[0]?.oldprice)
                            ? Number(checkfind?.[0].oldprice)
                            : checkfind?.[0]?.price -
                              Number(checkfind?.[0]?.oldprice),
                },
                ...reversefilter,
            ],
        }))
    },

    removestore: courseid => {
        set(state => ({
            cartMaindataStore: state.cartMaindataStore.filter(
                e => e.id !== courseid
            ),
        }))
    },
})

export const SaveLocalstorage = create(
    devtools(
        persist(useLocalStore, {
            name: "cartlocaljs",
        })
    )
)
