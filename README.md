# BrokeAz-Trading-React

Demo : https://brokeaz-trading.herokuapp.com/

### Note:
For best viewing results please open via a web browser.

On initial load due to the nature of the free subscription to Heroku, the server is shutdown when idle so it may take time to load. 

## Introduction

This is a Full Stack project that uses the PERN/MERN(?) stack.

(PostGresSQL, ExpressJS, React, NodeJS)

The database has not been built as it currently isnt require because the backend caches recent fetched data and the site is read-heavy

The dashboard is a tool used to just help provide daily market informations including: news, most actives and daily gainers/losers.

Using multiple API calls, we're able to webscrape Twitter, Reddit and Stocktwits to also provide the most trending stocks as well!

## Installation

Download the repo to your local desktop

Ensure you have the latest version of NodeJS and run npm install

This will install all the dependencies

Then simply npm start.

The frontend is reliant on the backend so please be sure to run the backend first.


## Features

- [x] News
- [x] Insider Info
- [x] Foreign Exchange Rates
- [x] Daily Gainers/Losers
- [x] Fintwit Trendings 

## Additional Comments

Next Steps:
- [ ] Futures (A page that lists all futures and commodities pricing)
- [ ] Crypto (A page that will list all the major cryptocurrencies)
- [ ] Charts (Interactive Chart for a specified stock)
- [ ] Stock Finanical Details (Provide more insight on a company)
- [ ] Login/Registration (database required)
- [ ] Database (Start logging and storing collected data from trending fintwits to provide a longer scope)
- [ ] Watchlist
