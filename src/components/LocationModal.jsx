// components/LocationModal.js
import React from 'react';

const LocationModal = ({ onClose }) => {
   
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Location Access Required</h2>
                <p className="mb-4">We need your location to provide weather information. Please allow location access.</p>
                
                <button className="ml-2 bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default LocationModal;
