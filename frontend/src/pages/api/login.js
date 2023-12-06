// pages/api/onboard/login.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { email, password } = req.body;
  
    try {
      // Make a request to the login API
      const apiUrl = 'http://localhost:4000/onboard/login';
      const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      // Check if the response was successful (status code 2xx)
      if (apiResponse.ok) {
        const responseData = await apiResponse.json();
  
        // Set the token in a cookie
      // res.setHeader('Set-Cookie', `token=${responseData.data.token}; Path=/; HttpOnly`);
  
        return res.status(200).json(responseData);
      } else {
        // If the response was not successful, handle the error
        const errorData = await apiResponse.json();
        return res.status(apiResponse.status).json(errorData);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  