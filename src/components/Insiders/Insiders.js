import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import SearchBar from '../SearchBar';
import Navigation from '../Navigation/Navigation';
import Loading from '../Loading/Loading';
import './Insiders.css';

const Insiders = () => {
  const [insiders, setInsiders] = useState([]);
  const [specificInsider, setSpecificInsider] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDailyInsiders = async () => {
      const response = await fetch(
        'https://enigmatic-brook-28051.herokuapp.com/insiders',
        {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!response.ok) {
        throw new Error(`Couldn't Fetch Losers ${response.status}`);
      }
      const data = await response.json();
      setInsiders(data.body);
    };

    getDailyInsiders();
    setLoading(false);
  }, []);

  const getSpecificInsider = (symbol) => {
    let myHeaders = new Headers();
    myHeaders.append('apikey', 'gdmhYIcjbeoXsZPTtVKGTv3c9Ffz8Nyu');

    let requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };

    fetch(`https://api.promptapi.com/sec_filings/${symbol}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  return (
    <div>
      <Navigation />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex justify-center mh7">
          <div className="ma2 w-100">
            <h4 className="font tc">Daily Insider Trading</h4>
            <Table striped bordered hover variant="dark" size="sm">
              <thead>
                <th>Symbol</th>
                <th>Owner</th>
                <th>Relationship</th>
                <th>Date</th>
                <th>Transaction</th>
                <th>Shares</th>
                <th>Value($)</th>
                <th>SEC Form 4</th>
              </thead>
              <tbody>
                {insiders.map(
                  ({
                    symbol,
                    reportingName,
                    typeOfOwner,
                    transactionDate,
                    transactionType,
                    securitiesTransacted,
                    price,
                    link,
                    filingDate,
                  }) => {
                    return (
                      <tr>
                        <td>{symbol}</td>
                        <td>{reportingName}</td>
                        <td>{typeOfOwner}</td>
                        <td>{transactionDate}</td>
                        <td>{transactionType}</td>
                        <td>{securitiesTransacted}</td>
                        <td>{price}</td>
                        <td>
                          <a href={link}>{filingDate}</a>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </Table>
            <SearchBar />
          </div>
        </div>
      )}
    </div>
  );
};

export default Insiders;
