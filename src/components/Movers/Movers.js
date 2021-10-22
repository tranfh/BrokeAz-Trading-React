import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import './Movers.css';

function Movers() {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  return (
    <div className="flex justify-center pa3 mh7 mv1 movers">
      <div className="pa2 ma2 w-50 gainers">
        <h3 className="gainers">
          Today's Gainers<span class="shade">&nbsp;</span>
        </h3>

        <Table striped bordered hover variant="dark" size="sm">
          <thead>
            <th>Symbol</th>
            <th>Last Price</th>
            <th>% Change</th>
          </thead>
          <tbody>
            {gainers.map(({ symbol, price, changePercentage }) => {
              return (
                <tr>
                  <td>{symbol}</td>
                  <td>{price}</td>
                  <td>{changePercentage}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div className="pa2 ma2 w-50">
        <h3 className="losers">
          Today's Losers<span class="shade">&nbsp;</span>
        </h3>
        <Table striped bordered hover variant="dark" size="sm">
          <thead>
            <th>Symbol</th>
            <th>Last Price</th>
            <th>% Change</th>
          </thead>
          <tbody>
            {losers.map(({ symbol, price, changePercentage }) => {
              return (
                <tr>
                  <td>{symbol}</td>
                  <td>{price}</td>
                  <td>{changePercentage}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Movers;
