export default async (email,password) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        console.log(response)
        const data = await response.json();
        if (response.ok) {
            // Successful login, redirect or perform other actions
            console.log('Login successful',data);
            return data.data.token
        } else {
            // Handle login error
            console.error('Login failed:', data.message);
            return false
        }
    } catch (error) {
        console.error('Error during login:', error);
        return false
    }
};