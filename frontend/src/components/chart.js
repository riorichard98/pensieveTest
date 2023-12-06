import React from 'react';

const PieChart = ({ data }) => {
  let cumulativePercentage = 0;

  return (
    <div className="relative w-24 h-24">
      {data.map((item, index) => {
        const percentage = parseFloat(item.percentage);
        const rotate = cumulativePercentage * 360;
        cumulativePercentage += percentage;

        const clipPath = `polygon(50% 50%, 100% 0, 100% 100%)`;

        return (
          <div
            key={index}
            className={`absolute w-full h-full transform -rotate-${rotate}`}
            style={{
              clipPath: cumulativePercentage < 1 ? clipPath : '',
              backgroundColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default PieChart;
