import * as React from "react"
import { GatsbyImage, getImage  } from "gatsby-plugin-image"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = (contentfulPage) => {
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
          <h2>User Info:</h2>
          <pre>{JSON.stringify(data.userInfo.login, null, 2)}</pre>

          <h2>Repositories:</h2>
          <pre>{JSON.stringify(data.repositories.length, null, 2)}</pre>

          <h2>Contributions:</h2>
          <pre>{JSON.stringify(data.contributions.length, null, 2)}</pre>
          {/* <pre>{JSON.stringify(data.contributions.created_at, null, 2)}</pre> */}
        </div>
      )}
    </div>
      {/* <p>{contentfulPage.url}</p> */}
      <GatsbyImage className="homepage-bild" image={getImage(contentfulPage.bilden.gatsbyImage)} alt={contentfulPage.titel} />

    </>
  );
}

export default HomePage;
