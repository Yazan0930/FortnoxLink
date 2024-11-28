import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
let token = process.env.ACCESS_TOKEN;

export const getFortnoxResource = async (endpoint: string) => {
    try {
        const response = await axios.get(`https://api.fortnox.se/3/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token }`,
                Accept: 'application/json',
            },
        });
        return(response.data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        } else {
            console.error('API request error:', (error as Error).message);
        }
    }
};