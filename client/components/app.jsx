import React from 'react';

class App extends React.Component{
  constructor(props) {
    super(props);
  }
  _handleClick() {
    alert('hi');
  }
  render() {
    return (
      <html>
        <head>  
          <title>{this.props.title}</title>
          <link rel='stylesheet' href="/styles.css" />
        </head>
        <body>
          <h1>{this.props.title}</h1>
          <p>Isnt't server side rendering wonderful?</p>
          <button onClick={this._handleClick}>Click Me</button>
          <script dangerouslySetInnerHTML={{
            __html: 'window.PROPS=' + JSON.stringify(this.props)
          }} />
          <script src='/bundle.js' />
        </body>
      </html>
    );
  }
}

module.exports = App; // required since server doesn't have es6