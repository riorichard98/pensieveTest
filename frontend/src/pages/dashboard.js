import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Dropdown from '../components/dropdown';
import GpsDataTable from '@/components/gpsDataTable';
import handleGetDevicesId from '../usecase/getDevicesId';
import handleGetDeviceDetail from '../usecase/getDeviceDetail';
import TimeSpent from '@/components/timeSpent';

export default () => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState(null);
    const [devicesId, setDevicesId] = useState([]);
    const [deviceDetails, setDeviceDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await handleGetDevicesId();

                if (data) {
                    setDevicesId(data);

                    // Fetch details for the first element of devicesId and setDeviceDetails
                    if (data.length > 0) {
                        const initialDetails = await handleGetDeviceDetail(data[0].device_id);
                        setDeviceDetails(initialDetails);
                        // Optionally set the selected option to the first device_id
                        setSelectedOption(data[0]);
                    }
                } else {
                    console.log('Redirecting to login');
                    // router.push('/login');
                }
            } catch (error) {
                console.error('Error during devicesId data fetch:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchDeviceDetails = async () => {
            try {
                if (selectedOption) {
                    const details = await handleGetDeviceDetail(selectedOption.device_id);

                    if (details) {
                        setDeviceDetails(details);
                    } else {
                        console.log('Error fetching device details');
                        // Handle the case where details cannot be fetched
                    }
                }
            } catch (error) {
                console.error('Error during device details fetch:', error);
            }
        };

        fetchDeviceDetails();
    }, [selectedOption]);

    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();

        // Redirect to login
        router.push('/login');
    };

    return (
        <div className="min-w-screen min-h-screen flex flex-col items-center justify-center text-white">
            {/* Logout Button */}
            <button className="absolute top-2 right-2 text-white" onClick={handleLogout}>
                Logout
            </button>

            <div className="w-screen h-screen sm:h-[70vh] sm:w-[70vw] p-4 rounded-lg border border-solid border-[#3e3e3e]">
                <div className="flex-1 p-4 ml-5">
                    <div className='mb-2'>Choose the device_id:</div>
                    <Dropdown options={devicesId} selected={selectedOption?.device_id} onSelect={(value) => setSelectedOption(value)} />
                </div>
                <div className="flex-1 p-4 ml-5">
                    {selectedOption ? selectedOption.device_id : 'Select a device id'}
                </div>
                {deviceDetails && (
                    <div className="flex-1 flex flex-row p-4 ml-5 m-0">
                        <div className="flex-1 mr-4 p-4 rounded-lg border border-solid border-[#3e3e3e]">
                            <GpsDataTable gpsData={deviceDetails.gpsData} />
                        </div>
                        <div className="flex-1 item-center">
                            <TimeSpent data={deviceDetails.percentage} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
