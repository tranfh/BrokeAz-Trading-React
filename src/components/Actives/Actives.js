import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

function Actives() {
  const [mostActives, setMostActive] = useState([]);

  useEffect(() => {
    const getActives = async () => {
      const response = await fetch('http://localhost:3000/mostactives', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Couldn't Fetch Losers ${response.status}`);
      }
      const data = await response.json();
      setMostActive(data.body.slice(0, 5));
    };
    getActives();
  }, []);
  return (
    <div className="flex justify-center mh7">
      <div className="pa2 ma2 w-100">
        <h4 className="font">Most Active</h4>

        <Table striped bordered hover variant="dark" size="sm">
          <thead>
            <th>Symbol</th>
            <th>Name</th>
            <th>Last Price</th>
            <th>Change</th>
            <th>% Change</th>
          </thead>
          <tbody>
            {mostActives.map(
              ({ ticker, companyName, price, changes, changesPercentage }) => {
                return (
                  <tr>
                    <td>{ticker}</td>
                    <td>{companyName}</td>
                    <td>{price}</td>
                    <td>{changes}</td>
                    <td>{changesPercentage}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Actives;
