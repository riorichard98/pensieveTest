import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ options, onSelect ,selected}) => {
    // State to manage the visibility of the dropdown
    const [isOpen, setIsOpen] = useState(false);

    // Ref to the dropdown container for detecting clicks outside
    const dropdownRef = useRef(null);

    // Handler for selecting an option
    const handleSelect = (value) => {
        onSelect(value);
        setIsOpen(false);
    };

    // Event handler to close the dropdown when clicking outside
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    // Add and remove the event listener when the component mounts and unmounts
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        // Cleanup: remove the event listener
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Auto-close the dropdown after 2 seconds when it opens
    useEffect(() => {
        let timeout;

        if (isOpen) {
            timeout = setTimeout(() => {
                setIsOpen(false);
            }, 2000);
        }

        // Cleanup: clear the timeout when the component unmounts or isOpen changes
        return () => {
            clearTimeout(timeout);
        };
    }, [isOpen]);

    return (
        // Dropdown container with ref
        <div className="relative" ref={dropdownRef}>
            {/* Label for the dropdown */}
            <div className="relative inline-block">
                {/* Toggle button for the dropdown */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 border rounded-md focus:outline-none focus:border-blue-500 cursor-pointer text-white"
                    // Dynamic styles for the dropdown button
                    style={{
                        backgroundColor: isOpen ? '#000' : '', // Black background when open
                        borderRadius: isOpen ? '0.375rem' : '', // Rounded-lg border when open
                        border: isOpen ? '1px solid #3e3e3e' : '', // Custom border color when open
                    }}
                >
                    {/* Display the selected option or default text */}
                    {/* {options.find((option) => option.device_id === onSelect)?.device_id || 'Select device id'} */}
                    {selected || 'Select device id'}
                </div>

                {/* Dropdown menu */}
                {isOpen && (
                    <ul className="absolute mt-2 py-2 w-44 bg-black rounded-md border border-solid border-[#3e3e3e] shadow-md text-white">
                        {/* Generate options */}
                        {options.map((option, index) => (
                            <li key={index}>
                                {/* Option within the dropdown */}
                                <a
                                    href="#"
                                    onClick={() => handleSelect(option)}
                                    className="block px-4 py-2 hover:bg-gray-100 text-white"
                                >
                                    {option.device_id}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CustomDropdown;
