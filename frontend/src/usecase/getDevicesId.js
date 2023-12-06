export default async () => {
    try {
        const token = localStorage.getItem('token');
        if(!token){
            return false
        }
        const response = await fetch('/api/devices', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response)
        if (response.ok) {
            // Successful get data devices id
            console.log('success get data devices id');
            const data = await response.json();
            // console.log('Success:', data);
            return data.data;
        } else {
            console.log("failed get devicesId")
            return false
        }
    } catch (error) {
        console.error('Error during get devicesId:', error);
        return false
    }
};