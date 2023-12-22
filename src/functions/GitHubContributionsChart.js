import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Chart from 'chart.js/auto';

const GitHubContributionsChart = () => {
  const chartRef = useRef(null);

  // Fetch GitHub contributions using GraphQL
  const { githubData } = useStaticQuery(
    graphql`
      query {
        githubData {
          data {
            user {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  const contributions = githubData.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
    (week) => week.contributionDays
  );

    // Transform date strings to represent the month
    const contributionsByMonth = contributions.reduce((acc, day) => {
      const month = day.date.slice(0, 7); // Extract YYYY-MM
      acc[month] = (acc[month] || 0) + day.contributionCount;
      return acc;
    }, {});

  useEffect(() => {
    if (chartRef.current && contributionsByMonth) {
      const ctx = chartRef.current.getContext('2d');

      // Extract data from contributions
      // const data = contributions.map((day) => day.contributionCount || 0);
      // const labels = contributions.map((day) => day.date);
      const labels = Object.keys(contributionsByMonth);
      const data = Object.values(contributionsByMonth);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Contributions per Month',
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
  }, [chartRef, contributionsByMonth]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default GitHubContributionsChart;
