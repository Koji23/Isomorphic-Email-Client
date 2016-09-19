import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';

const props = window.PROPS;
// console.log(props.mainSocket);
ReactDOM.render(<App {...props}/>, document); // rendering to the top level 'document' node is valide since the component renders a full html page. Otherwise there would be an invariant error here