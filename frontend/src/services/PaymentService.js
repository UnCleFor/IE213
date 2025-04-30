import axios from "axios"

export const getClientId = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/payment/paypal/get-client-id`)
    return res.data
}