import * as React from "react"
import { GatsbyImage, getImage  } from "gatsby-plugin-image"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import GitHubHeatmap from "../functions/githubHeatMap";
import GitHubContributionsChart from "../functions/GitHubContributionsChart";
import GitHubContributionsLines from "../functions/GithubContributionsLines";
import LanguagePieChart from "../functions/LanguagePieChart";

const HomePage = (contentfulPage) => {

  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const username = 'axxcident';

      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`);
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
        const eventsResponse = await axios.get(`https://api.github.com/users/${username}/events/public`);

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
          <h3>Antal Repositories: {JSON.stringify(data.repositories.length, null, 2)}</h3>
          <LanguagePieChart />
          <GitHubContributionsLines />
          <GitHubContributionsChart />
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
