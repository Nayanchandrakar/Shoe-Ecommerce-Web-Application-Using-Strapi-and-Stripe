import axios from "axios"

const url = import.meta.env.VITE_REACT_STRAPI_URL

const param = {
    headers: {
        Authorization: "Bearer " + import.meta.env.VITE_REACT_STRAPI_KEY,
    },
}

const fetchdata = async endpoint => {
    try {
        const { data } = await axios.get(`${url}/${endpoint}`, param)
        return data
    } catch (error) {
        window.alert(error)
        console.log(error)
    }
}

export { fetchdata }
