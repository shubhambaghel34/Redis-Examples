const redis = require('redis');
const axios = require('axios');

const REDIS_PORT = process.env.REDIS_PORT || 6000;
const client = redis.createClient(REDIS_PORT);

// Fetch data from the API and cache it in Redis
async function fetchData() {
  try {
    // First, check if data is already cached in Redis
    const cachedData = await client.get('users');

    if (cachedData) {
      console.log('Data retrieved from Redis cache');
      return JSON.parse(cachedData);
    }

    // If data is not cached, fetch it from the API and store it in Redis for next time
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const data = response.data;

    await client.set('users', JSON.stringify(data));
    console.log('Data retrieved from API and cached in Redis');

    return data;
  } catch (error) {
    console.error(error);
  }
}

// Call the fetchData function to fetch and cache data from the API
fetchData();
