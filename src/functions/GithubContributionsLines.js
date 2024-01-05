import React, { useEffect, useState } from 'react';

const GitHubContributionsLines = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const username = 'axxcident';

      try {
        // Step 1: Get the list of repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`,
          },
        });
        const reposData = await reposResponse.json();

        // Step 2: Fetch and process code frequency data for each repository
        const contributionsData = await Promise.all(
          reposData.map(async (repo) => {
            const repoName = repo.name;
            const codeFrequencyResponse = await fetch(
              `https://api.github.com/repos/${username}/${repoName}/stats/code_frequency`,
              {
                headers: {
                  Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`,
                },
              }
            );
            const codeFrequencyData = await codeFrequencyResponse.json();
            // Process and use codeFrequencyData as needed for each repository
            // console.log(`Code frequency data for ${repoName}:`, codeFrequencyData);
            // Return a simplified object with repo name and contributions
            return {
              repoName,
              contributions: codeFrequencyData,
            };
          })
        );

        // Set the data for rendering
        setData(contributionsData);
      } catch (error) {
        console.error('Error fetching GitHub data:', error.message);
      }
    };

      fetchData();

  }, []);

  return (
    <div>
      <h1>GitHub Contributions Lines</h1>
      <ul>
      {data &&
          data.map((repoData) => (
            <li key={repoData.repoName}>
              <strong>{repoData.repoName}</strong>: {JSON.stringify(repoData.contributions)}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GitHubContributionsLines;
