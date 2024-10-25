import axios from 'axios';

export const apiRequest = async (endpoint: string, token: string) => {
    try {
        const response = await axios.get(`https://api.fortnox.se/3/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('API Request failed:', error);
        throw error;
    }
};