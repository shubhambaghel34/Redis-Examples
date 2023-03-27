const redis = require('redis');

// Create a client which will connect to Redis server.
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6000,
});


client.set('name', 'devtoUser', (err, response) => {
  console.log(response); // This will return OK as result

  
  client.get('name', (err, getResponse) => {
    console.log(getResponse); // devToUser

    // close client
    client.quit();
  });
});
