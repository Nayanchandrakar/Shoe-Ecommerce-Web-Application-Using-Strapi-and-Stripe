import axios from "axios"

const url = import.meta.env.VITE_REACT_STRAPI_URL

const param = {
    headers: {
        Authorization: "Bearer " + import.meta.env.VITE_REACT_STRAPI_KEY,
    },
}

const postdata = async (endpoint, message) => {
    try {
        const data = await axios.post(
            `${url}/${endpoint}`,
            {
                data: {
                    Sendquery: message,
                },
            },
            param
        )
        return data
    } catch (error) {
        window.alert(error)
        console.log(error)
    }
}

const makePaymentRequest = async (sendedendpoint, receivedata) => {
    try {
        const stripedata = await axios.post(
            `${url}${sendedendpoint}`,
            {
                data: {
                    products: receivedata,
                },
            },
            param
        )
        return stripedata
    } catch (error) {
        window.alert(error)
        console.log(error)
    }
}

export { postdata, makePaymentRequest }
