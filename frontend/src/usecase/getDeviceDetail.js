export default async (deviceId) => {
    try {
        const token = localStorage.getItem('token');
        if(!token){
            return false
        }
        const response = await fetch(`/api/device-detail?deviceId=${deviceId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response)
        if (response.ok) {
            // Successful get data devices id
            console.log('success get data device detail');
            const data = await response.json();
            // console.log('Success:', data);
            return data.data;
        } else {
            console.log("failed get devices")
            return false
        }
    } catch (error) {
        console.error('Error during get devicesId:', error);
        return false
    }
};