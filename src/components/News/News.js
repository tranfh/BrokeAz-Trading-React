import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './News.css';

function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = (ticker = '') => {
    console.log('Retrieving News...');
    return fetch(`http://localhost:3000/news/${ticker}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.headlineResults) {
          setNews([]);
          for (let page = 0; page < 2; page++) {
            for (let headline in data.headlineResults[page].headline) {
              let newHeadline = data.headlineResults[page].headline[headline];
              setNews((headlines) => [...headlines, newHeadline]);
            }
          }
        }
      });
  };

  return (
    <div>
      <div className="pa3 mh7 mv1">
        <Table
          striped
          bordered
          hover
          variant="dark"
          size="sm"
          className="newsfeed"
        >
          <thead>
            <th></th>
            <th></th>
            <th>Headlines</th>
            <th></th>
          </thead>
          <tbody>
            {news.map(({ text, receivedDate, receivedTime, provider }) => {
              return (
                <tr>
                  <td className="newsDetails">{receivedDate}</td>
                  <td className="newsDetails">{receivedTime}</td>
                  <td>{text}</td>
                  <td className="newsDetails">{provider}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default News;
