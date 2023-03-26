const redis = require('redis');

// Create a client and connect to Redis.
const client = redis.createClient({
  host: '127.0.0.1',
  port: 6000,
  // password: 'password',
});

// Run a Redis command, receive response in callback.
client.set('hello', 'world', (err, reply) => {
  console.log(reply); // OK

  // Run a second Redis command now we know that the
  // first one completed.  Again, response in callback.
  client.get('hello', (getErr, getReply) => {
    console.log(getReply); // world

    // Quit client and free up resources.
    client.quit();
  });
});
