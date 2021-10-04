import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@popperjs/core'
import App from './App';
import './index.css';
import { PostContextProvider } from './globalcontext/post';
import { IsLoggedContextProvider, NotificationContextProvider } from './globalcontext/isLogged';
import { LikerContextProvider } from './globalcontext/likers';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter >
      <LikerContextProvider>
        <IsLoggedContextProvider>
          <NotificationContextProvider>
          <PostContextProvider>
            <App />
          </PostContextProvider>
          </NotificationContextProvider>
        </IsLoggedContextProvider>
      </LikerContextProvider>
    </HashRouter >
  </React.StrictMode>,
  document.getElementById('root')
);

