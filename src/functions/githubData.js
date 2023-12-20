// functions/githubData.js
const axios = require('axios');

exports.handler = async (event, context) => {
  const username = 'axxcident';

  try {
    const userResponse = await axios.get(`https://api.github.com/users/${username}`);
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
    const eventsResponse = await axios.get(`https://api.github.com/users/${username}/events`);

    const userInfo = userResponse.data;
    const repositories = reposResponse.data;
    const contributions = eventsResponse.data;

    return {
      statusCode: 200,
      body: JSON.stringify({ userInfo, repositories, contributions }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
