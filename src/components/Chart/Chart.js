import React, { useState } from 'react';

function Chart({ searchField }) {
  const [metadata, setMetadata] = useState({});

  const getDailyChart = (ticker) => {
    console.log('starting fetch');
    fetch(`http://localhost:3000/chart/daily/${ticker}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
          setMetadata(data.body['Meta Data']);
          console.log(metadata['2. Symbol']);
        }
      });
  };

  const onClick = () => {
    console.log(searchField);
    getDailyChart(searchField);
  };

  return (
    <div>
      <button onClick={onClick}>Search</button>
      <p>{metadata['2. Symbol']}</p>
    </div>
  );
}

export default Chart;
