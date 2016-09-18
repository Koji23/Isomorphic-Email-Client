import React from 'react';
import io from 'socket.io-client'

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      mainSocket: io('http://localhost:3000')
    };
  }
  componentDidMount() {
    this.state.mainSocket.on('mail_enqueued', function(data) {
      console.log(data);
    });
  }
  _handleClick(e) {
    e.preventDefault();
    let data = {
      from_email: from_email.value,
      to_email: to_email.value,
      subject: subject.value,
      body: body.value,
    }
    // console.log(data);
    this.state.mainSocket.emit('send_mail', data);
    from_email.value = '';
    to_email.value = '';
    subject.value = '';
    body.value = '';
  }
  render() {
    let from_email, to_email, subject, body;
    return (
      <html>
        <head>  
          <title>{this.props.title}</title>
          <link rel='stylesheet' href="/styles.css" />
        </head>
        <body>
          <main>
            <h1>{this.props.title}</h1>
            <form onSubmit={this._handleClick.bind(this)}>
              <label htmlFor="from_email">From email address:</label>
              <input ref={(node) => { from_email = node; }} id="from_email" type='text' required />
              <label htmlFor="to_email">To email address:</label>
              <input ref={(node) => { to_email = node; }} id="to_email" type='text' required />
              <label htmlFor="subject">Subject:</label>
              <input ref={(node) => { subject = node; }} id="subject" type='text' required />
              <label htmlFor="body">Message:</label>
              <textarea id="body" required/>
              <button type="submit">SEND</button>
            </form>
          </main>
          <script dangerouslySetInnerHTML={{
            __html: 'window.PROPS=' + JSON.stringify(this.props)
          }} />
          <script src='/bundle.js' />
        </body>
      </html>
    );
  }
}


module.exports = App; // module.exports is required since server doesn't have es6









