import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Insiders from './components/Insiders/Insiders';
import Navigation from './components/Navigation/Navigation';
import Forex from './components/Forex/Forex';
import News from './components/News/News';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'tachyons';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/insiders" element={<Insiders />}></Route>
      <Route
        path="/forex"
        element={
          <>
            <Navigation />
            <Forex />
          </>
        }
      ></Route>
      <Route
        path="/news"
        element={
          <>
            <Navigation />
            <News />
          </>
        }
      ></Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
