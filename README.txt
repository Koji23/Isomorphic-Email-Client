Jordan Chong 
github.com/koji23
linkedin.com/in/jordankchong

////////////////////////////////////////////////////////////////////////////////

Gettings Started

Isomorphic Email App (current repo)

Start
1.) Start Redis on seperate terminal tab - 'redis-server'
2.) Start app by running - 'npm start'
3.) Available on port 3000

Simple Email Service

Start
1.)  Start service by running - 'npm start'
2.) Available on port 8080

////////////////////////////////////////////////////////////////////////////////

Problem: 

  Build an email service that is scalable at high volume and tolerant to failover. 

Solution: 
  
  Full-stack, SOA
  
  This solution isolates message creation and message consumption into two seperate applications. Messages are created by placing them into a queue for later processing. This queue is highly available and lives independent of either application. Therefore multiple instances of each app can be spun up without affecting the queue. 

  Multiple email provider API's are enabled for redundancy. If the primary provider's API goes down it will failover to the secondary provider automatically.

  As an additional feature, server side javascript is rendered isomorphically on the server to decrease load times and improve SEO. Granted there isn't much in this example for indexing.

  Both client to server and server to server connections as handled via socket.io to minimize overhead and increase bidirectional communication speed.

Next steps:

  Enable Cluster for parallel job processing.
  Enable stored mailing lists and delayed processing for bulk email campaigning


////////////////////////////////////////////////////////////////////////////////

Control Flow:

- React email client is rendered server side and provided on default route
- Data from the email client is sent to server via socket connection on submit
- Email server adds email data to a Redis queue for job processing
- Email jobs are processed by Simple Email Service 
- Email service recieves jobs via socket connection
- Email service will attempt to send email via SendGrid first
- Failed attempts with SendGrid will default to Mailgun
- Successful attempts with either API will fire a completion event back to Isomorphic Email App Server
- Failed attempts with both API's will fire an error event
  - Redis queue will notice error events and will make up to 3 additional attempts to process job
  - Redis queue will wait 3 seconds between each attempt
  - if final attempt does not succeed, email job will be saved to failed jobs (http://localhost:3000/queue/failed)
  - * click Kue UI button to view Redis Queue status board