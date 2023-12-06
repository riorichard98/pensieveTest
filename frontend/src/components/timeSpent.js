// TimeSpentOnLocations.js

import React from 'react';

const TimeSpent = ({ data }) => {
  return (
    <div className="text-center">
      <div className="font-bold mb-2">% Time spent on each location</div>
      {data.map((item) => (
        <div key={item.location} className="mb-2">
          <div>{'\u2022'} {item.location}</div>
          <div>{item.percentage.split(".")[0]}%</div>
        </div>
      ))}
    </div>
  );
};

export default TimeSpent;
