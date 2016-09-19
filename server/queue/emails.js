// Socket Client
const io = require('socket.io-client');
const ServiceSocket = io('http://localhost:8080');

// REDIS CONFIGURATION

let redisConfig;
if(process.env.NODE_ENV === 'production') {
  redisConfig = {
    redis : {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      auth: process.env.REDIS_PASS
    }
  }
} else {
  redisConfig = {};
}

// Initializtion

const queue = require('kue').createQueue(redisConfig);

queue.watchStuckJobs(6000); // guards against stuck or stalled jobs

queue.on('ready', () => {
  console.info('Queue is ready!'); // optional
});

queue.on('error', (err) => {
  //handle connection errors here
  console.log('There was an error in the main queue', err, err.stack);
});

// CREATING JOBS

function sendEmail(data, done) {  
  queue.create('email', data)
    .priority('critical')
    .attempts(8)
    .backoff(true)
    .removeOnComplete(false)
    .save((err) => {
      if (err) {
        console.error(err);
        done(err);
      }
      if (!err) {
        done();
      }
    });
}

// Process up to 20 jobs concurrently
queue.process('email', 20, (job, done) => {  
  // This is the data we sent into the #create() function call earlier
  // We're setting it to a constant here so we can do some guarding against accidental writes
  const data = job.data;
  //... do other stuff with the data.
  console.log('about to do stuff with this data...', data);
  ServiceSocket.emit('send_email', data);
  // NEXT CONDITIONAL SET THIS DONE ONLY IF MAIL IS SENT????
  done();
});

module.exports = {  
  create: (data, done) => {
    sendEmail(data, done);
  }
};








