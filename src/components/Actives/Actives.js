import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

function Actives() {
  const [smallCaps, setSmallCaps] = useState([]);
  const [mostActives, setMostActive] = useState([]);
  return (
    <div className="flex justify-center pa3 mh7 mv1">
      <div className="pa2 ma2 w-50">
        <h4 className="font">Most Active</h4>

        <Table striped bordered hover variant="dark" size="sm">
          <thead>
            <th>Symbol</th>
            <th>Last Price</th>
            <th>% Change</th>
          </thead>
          <tbody>
            {mostActives.map(({ symbol, price, changePercentage }) => {
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
        <h4 className="font">Small Cap Gainers</h4>
        <Table striped bordered hover variant="dark" size="sm">
          <thead>
            <th>Symbol</th>
            <th>Last Price</th>
            <th>% Change</th>
          </thead>
          <tbody>
            {smallCaps.map(({ symbol, price, changePercentage }) => {
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

export default Actives;
