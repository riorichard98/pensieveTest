// components/GpsDataTable.js

import React from 'react';

const GpsDataTable = ({ gpsData }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-black">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-gray-300">Timestamp</th>
            <th className="py-2 px-4 border-b text-gray-300">Location</th>
          </tr>
        </thead>
        <tbody>
          {gpsData.map((data, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-white flex justify-center">{data.timestamp}</td>
              <td className="py-2 px-4 border-b text-white justify-center">{data.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GpsDataTable;
