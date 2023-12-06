export const isAuthenticated = () => {
  // Check if the user is authenticated (adjust this based on your authentication method)
  const token = localStorage.getItem('token');
  return !!token;
};
