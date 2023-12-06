export default () => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';').map(cookie => cookie.trim());
    
    // Find the cookie with the name 'token'
    const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
    
    if (tokenCookie) {
        // Extract the token value from the cookie
        const token = tokenCookie.split('=')[1];
        return token;
    } else {
        // If the cookie is not found, return null or handle accordingly
        return null;
    }
};
