// pages/api/devices.js

export default async function handler(req, res) {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization?.replace('Bearer ', '');

        // Check if the token is present
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Make a request to your API with the provided token
        const data = await sendRequest('/gps/devices', 'GET', null, {
            Authorization: `Bearer ${token}`,
        });

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Your sendRequest function (as defined in a separate file)
const BASE_URL = 'http://localhost:4000';

export const sendRequest = async (url, method = 'GET', body = null, headers = {}) => {
    const requestOptions = {
        method,
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        requestOptions.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${url}`, requestOptions);
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Something went wrong');
        }

        return responseData;
    } catch (error) {
        throw new Error('Network error or server unreachable');
    }
};
