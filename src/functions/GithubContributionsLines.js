import React, { useEffect, useState } from 'react';

const GitHubContributionsLines = () => {
  const [totalAddedLines, setTotalAddedLines] = useState(0);
  const [totalRemovedLines, setTotalRemovedLines] = useState(0);

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
        await Promise.all(
          reposData.map(async (repo) => {
            const repoName = repo.name;
            let retryCount = 3; // Number of times to retry

            while (retryCount > 0) {
              const codeFrequencyResponse = await fetch(
                `https://api.github.com/repos/${username}/${repoName}/stats/code_frequency`,
                {
                  headers: {
                    Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`,
                  },
                }
              );
              const codeFrequencyData = await codeFrequencyResponse.json();

              // Ensure that codeFrequencyData is an array before attempting to reduce
              if (Array.isArray(codeFrequencyData)) {
                const addedLines = codeFrequencyData.reduce((total, day) => total + day[1], 0);
                const removedLines = codeFrequencyData.reduce((total, day) => total + day[2], 0);

                setTotalAddedLines((prevTotal) => prevTotal + addedLines);
                setTotalRemovedLines((prevTotal) => prevTotal + removedLines);
                break; // Exit the loop if successful
              } else {
                console.error('Failed to fetch code frequency data for repo', repoName);
                retryCount--;

                if (retryCount === 0) {
                  console.error('Maximum retries reached for repo', repoName);
                } else {
                  console.log(`Retrying... ${retryCount} attempts remaining for repo`, repoName);
                }
              }
            }
          })
        );
      } catch (error) {
        console.error('Error fetching GitHub data:', error.message);
      }
    };

    fetchData();

  }, []);

  return (
    <div className='GitHubContributionsLines'>
      <h3>Totalt antal skrivna rader kod sedan<br/>jag började på ITHS:</h3>
      <p>Adderade Rader: <span className='adderade'>{totalAddedLines}</span></p>
      <p>Borttagna Rader: <span className='borttagna'>{totalRemovedLines}</span></p>
    </div>
  );
};

export default GitHubContributionsLines;
