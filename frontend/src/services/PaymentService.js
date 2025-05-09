import axios from "axios"

/**
 * Lấy PayPal Client ID từ server
 * @returns {Promise<Object>} - Đối tượng chứa Client ID
 */
export const getClientId = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/payment/paypal/get-client-id`)
    return res.data
}