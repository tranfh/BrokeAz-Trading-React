import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Loading from '../Loading/Loading';
import './Forex.css';

const Forex = () => {
  const [loading, setLoading] = useState(true);
  const [exchangeRate1, setExchangeRate1] = useState([
    { pair: 'EUR/USD', price: 0.0 },
    { pair: 'GBP/USD', price: 0.0 },
    { pair: 'EUR/USD', price: 0.0 },
    { pair: 'USD/JPY', price: 0.0 },
  ]);
  const [exchangeRate2, setExchangeRate2] = useState([
    { pair: 'USD/CAD', price: 0.0 },
    { pair: 'USD/CHF', price: 0.0 },
    { pair: 'AUD/USD', price: 0.0 },
    { pair: 'NZD/USD', price: 0.0 },
  ]);
  const [exchangeRate3, setExchangeRate3] = useState([
    { pair: 'GBP/JPY', price: 0.0 },
    { pair: 'BTC/USD', price: 0.0 },
    { pair: 'AUD/JPY', price: 0.0 },
    { pair: 'EUR/GBP', price: 0.0 },
  ]);

  useEffect(() => {
    const getExchangeRates = (array) => {
      let newArr = [...array];
      newArr.map(async (item) => {
        const response = await fetch(
          `https://enigmatic-brook-28051.herokuapp.com/forex/${item.pair}`,
          {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (!response.ok) {
          throw new Error(`Couldn't Fetch Losers ${response.status}`);
        }
        const data = await response.json();
        if (data['Realtime Currency Exchange Rate']) {
          item.price =
            data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
          console.log(newArr);
          setExchangeRate1(newArr);
        }
      });

      setLoading(false);
    };
    getExchangeRates(exchangeRate1, setExchangeRate1);
    // getExchangeRates(exchangeRate2, setExchangeRate2);
    // getExchangeRates(exchangeRate3, setExchangeRate3);
  }, []);

  return (
    <div>
      <h2 className="font tc">Foreign Exchange Rates</h2>
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Row>
              {exchangeRate1.map(({ pair, price }) => {
                return (
                  <Col className="card" sm>
                    <div className="forex-content">
                      <h4>{pair}</h4>
                      <p>{price}</p>
                    </div>
                  </Col>
                );
              })}
            </Row>
            <Row>
              {exchangeRate2.map(({ pair, price }) => {
                return (
                  <Col className="card" sm>
                    <div className="forex-content">
                      <h4>{pair}</h4>
                      <p>{price}</p>
                    </div>
                  </Col>
                );
              })}
            </Row>
            <Row>
              {exchangeRate3.map(({ pair, price }) => {
                return (
                  <Col className="card" sm>
                    <div className="forex-content">
                      <h4>{pair}</h4>
                      <p>{price}</p>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Forex;
