import React from 'react';
import ReactDOM from 'react-dom';
// store関連
import { Provider } from 'react-redux';
import { createStore } from './redux/store/store';
import { ConnectedRouter } from 'connected-react-router';
import * as History from "history";
//Mui関連
import {MuiThemeProvider} from '@material-ui/core';
import {theme} from "./assets/theme";
// 他
import App from './App';
import reportWebVitals from './reportWebVitals';


const history = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
