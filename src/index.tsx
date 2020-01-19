import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './global.scss';
import * as serviceWorker from './serviceWorker';
import { addMockData, enableMocking } from 'utils/MockIntercepter';

addMockData('https://dog.ceo/api/breeds/list/all', { data: { mock: 'dogs' } });
addMockData('https://dog.ceo/404-page', { status: 404, message: 'whoops' });

enableMocking(true);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
