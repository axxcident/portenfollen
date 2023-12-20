import * as React from "react"
// import { Link } from "gatsby"
import Layout from "../components/layout"

import { useState, useEffect } from 'react';
import axios from 'axios';
//react-component
//alla componenter under /src/pages blir automatiskt sidor
//sidans namn = namnet på javascript-filen (dock - index.js = sajtens första sida)
const IndexPage = () => {

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
  // useEffect(() => {                         gammal kod för att hämta data från github genom netlify
  //   const fetchData = async () => {
  //     try {
  //       // const response = await axios.get('http://localhost:8000/.netlify/functions/githubData');
  //       // const response = await axios.get('/.netlify/functions/githubData');
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching GitHub data:', error.message);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
  <Layout>
    {/* <Link to="/portfolio">Se min portfolio</Link> */}
    <div>
      <h1>GitHub Information</h1>
      {data && (
        <div>
          <h2>User Info:</h2>
          <pre>{JSON.stringify(data.userInfo.login, null, 2)}</pre>

          <h2>Repositories:</h2>
          <pre>{JSON.stringify(data.repositories.length, null, 2)}</pre>

          <h2>Contributions:</h2>
          <pre>{JSON.stringify(data.contributions, null, 2)}</pre>
          {/* <pre>{JSON.stringify(data.contributions.created_at, null, 2)}</pre> */}
        </div>
      )}
    </div>
  </Layout>
)
  }

export const Head = () => <title>Hemsidan</title>

export default IndexPage;
