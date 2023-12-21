import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GitHubContributionsChart = ({ contributions }) => {
  const chartRef = useRef(null);
  // const data = contributions.map((day) => {
  //   console.log('data:', day); // Add this line to log the entire day object
  // });


  useEffect(() => {
    if (chartRef.current && contributions) {
      const ctx = chartRef.current.getContext('2d');

      // Extract data from contributions
      // const data = contributions.map((day) => day.payload.commits.length || 0);
          // Extract data from contributions
    const data = contributions.map((day) => {
      // Check if the event is a "PushEvent" and has commits
      if (day.type === 'PushEvent' && day.payload && day.payload.commits) {
        return day.payload.commits.length;
      }
      return 0;
    });
      const labels = contributions.map((day) => day.created_at);

      // Log the extracted data to ensure it's correct
      // console.log('Data:', data);
      // console.log('Labels:', labels);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Contributions per Day',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            x: {
              type: 'category', // Use category scale
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [chartRef, contributions]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default GitHubContributionsChart;
