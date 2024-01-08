import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const LanguagePieChart = () => {
  const [languagesData, setLanguagesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const username = 'axxcident';

      try {
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const reposData = await reposResponse.json();

        // Extract language data from repositories
        const languages = reposData.map((repo) => repo.language).filter((lang) => lang);

        // Count occurrences of each language
        const languageCount = languages.reduce((acc, lang) => {
          acc[lang] = (acc[lang] || 0) + 1;
          return acc;
        }, {});

        // Convert languageCount object to an array of { language, count } objects
        const languageArray = Object.entries(languageCount).map(([language, count]) => ({
          language,
          count,
        }));

        // Set the data for rendering
        setLanguagesData(languageArray);
      } catch (error) {
        console.error('Error fetching GitHub data:', error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Render pie chart using Chart.js
    if (languagesData.length > 0) {
      const ctx = document.getElementById('languagePieChart');

      // Extract labels and data for Chart.js
      const labels = languagesData.map((data) => data.language);
      const data = languagesData.map((data) => data.count);

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [
            {
              data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)',
              ],
            },
          ],
        },
      });
    }
  }, [languagesData]);

  return (
    <div className='LanguagePieChart'>
      <h1>GitHub Language Distribution</h1>
      <canvas id="languagePieChart" width="400" height="400"></canvas>
    </div>
  );
};

export default LanguagePieChart;
