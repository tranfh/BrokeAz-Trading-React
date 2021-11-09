import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Loading from '../Loading/Loading';
import './News.css';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newsContent, setNewsContent] = useState(<Loading />);
  const [newsHeader, setNewsHeader] = useState('');

  useEffect(() => {
    const getNews = (ticker = '') => {
      console.log('Retrieving News...');
      return fetch(
        `https://enigmatic-brook-28051.herokuapp.com/news/${ticker}`,
        {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.headlineResults) {
            setNews([]);
            for (let page = 0; page < 2; page++) {
              for (let headline in data.headlineResults[page].headline) {
                let newHeadline = data.headlineResults[page].headline[headline];
                setNews((headlines) => [...headlines, newHeadline]);
                setLoading(false);
              }
            }
          }
        });
    };
    getNews();
  }, []);

  const displayNews = (resId) => {
    fetch(
      `https://fidelity-investments.p.rapidapi.com/news/get-details?resId=${resId}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'fidelity-investments.p.rapidapi.com',
          'x-rapidapi-key':
            '265252c1d9msh67900f76ecdfef2p1080bfjsnb825b758299c',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setNewsHeader(data.story.title);
        setNewsContent(data.story.text);
        console.log(data.story.title);
        console.log(data.story.text);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className="news">
        {loading ? (
          <Loading />
        ) : (
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
              <th className="tc">Headlines</th>
              <th></th>
            </thead>
            <tbody>
              {news.map(
                ({ text, receivedDate, receivedTime, provider, resId }) => {
                  return (
                    <tr onClick={() => displayNews(resId)}>
                      <td className="newsDetails">{receivedDate}</td>
                      <td className="newsDetails">{receivedTime}</td>
                      <td>{text}</td>
                      <td className="newsDetails">{provider}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default News;
