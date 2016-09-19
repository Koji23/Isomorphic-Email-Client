const expect = require('chai').expect;
const emails = require('../server/queue/emails.js');

describe('emails job queue', function() {
  before(function() {
    //By default jobs aren't processed when created during test mode. 
    emails.queue.testMode.enter();
  });
  afterEach(function() {
    emails.queue.testMode.clear();
  });
  after(function() {
    emails.queue.testMode.exit()
  });
  it('should be an instance of "kue"', function() {
    expect(emails.queue.name).to.equal('kue');
  });
  it('should contain an email job enqueue function', function() {
    expect(typeof emails.create).to.equal('function');
  });
  it('should put jobs on the queue', function() {
    emails.queue.createJob('myJob', { foo: 'bar' }).save();
    emails.queue.createJob('anotherJob', { baz: 'bip' }).save();
    expect(emails.queue.testMode.jobs.length).to.equal(2);
    expect(emails.queue.testMode.jobs[0].type).to.equal('myJob');
    expect(emails.queue.testMode.jobs[0].data).to.eql({ foo: 'bar' });
  });
});