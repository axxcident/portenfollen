import * as React from "react"
import { GatsbyImage, getImage  } from "gatsby-plugin-image"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import GitHubHeatmap from "../functions/githubHeatMap";
import GitHubContributionsChart from "../functions/GitHubContributionsChart";

const HomePage = (contentfulPage) => {

  // const fetchData2 = async () => {
  //   const axios = require('axios');
  //   const token = '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';
  //   const apiUrl = 'https://api.github.com/graphql';

  //   const response = await axios.post(
  //     apiUrl,
  //     {
  //       query: `
  //         query {
  //           viewer {
  //             contributionsCollection {
  //               contributionCalendar {
  //                 totalContributions
  //                 weeks {
  //                   contributionDays {
  //                     contributionCount
  //                     date
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       `,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );

  //   const data2 = response.data.data;
  //   // Process and use the data for your chart.
  // };

  // fetchData2();


  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const username = 'axxcident';

      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`);
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
        const eventsResponse = await axios.get(`https://api.github.com/users/${username}/events`);

        const userInfo = userResponse.data;
        const repositories = reposResponse.data;
        const contributions = eventsResponse.data;

        setData({ userInfo, repositories, contributions });
      } catch (error) {
        console.error('Error fetching GitHub data:', error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <h2>{contentfulPage.titel}</h2>
      {documentToReactComponents(JSON.parse(contentfulPage.content.raw))}
      <div className="gitHubInformation">
      {data && (
        <div>
          <h3>Mitt användarnamn på Github: {JSON.stringify(data.userInfo.login, null, 2)}</h3>
          {/* <pre>{JSON.stringify(data.userInfo.login, null, 2)}</pre> */}

          <h3>Antal Repositories: {JSON.stringify(data.repositories.length, null, 2)}</h3>
          {/* <pre>{JSON.stringify(data.repositories.length, null, 2)}</pre> */}


          <GitHubContributionsChart contributions={data.contributions} />
          {/* <GitHubHeatmap contributions={data.contributions} /> */}
          {/* <pre>{JSON.stringify(data.contributions.length, null, 2)}</pre> */}
          {/* <pre>{JSON.stringify(data.contributions.created_at, null, 2)}</pre> */}
        </div>
      )}
    </div>
      <GatsbyImage className="homepage-bild" image={getImage(contentfulPage.bilden.gatsbyImage)} alt={contentfulPage.titel} />
    </>
  );
}
export default HomePage;
