import axios from 'axios';

export const forgotPassword = (email) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/user/forgot-password`, { email });
};

export const resetPassword = (data) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/user/reset-password`, data);
};