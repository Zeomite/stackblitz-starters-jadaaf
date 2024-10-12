const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

let stocks = require('./stocks.js');
stocks = stocks.stocks;

app.get('/stocks/sort/pricing', (req, res) => {
  const sortedStocks = stocks.slice().sort((a, b) => b.price - a.price);
  res.json({ stocks: sortedStocks });
});

app.get('/stocks/sort/growth', (req, res) => {
  const sortedStocks = stocks.slice().sort((a, b) => a.growth - b.growth);
  res.json({ stocks: sortedStocks });
});

app.get('/stocks/filter/exchange', (req, res) => {
  const exchange = (req.query.exchange || '').toLowerCase();
  const filteredStocks = stocks.filter(
    (stock) => stock.exchange.toLowerCase() === exchange
  );
  res.json( filteredStocks );
});

app.get('/stocks/filter/industry', (req, res) => {
  const industry = (req.query.industry || '').toLowerCase();
  const filteredStocks = stocks.filter(
    (stock) => stock.industry.toLowerCase() === industry
  );
  res.json( filteredStocks );
});

app.get('/stocks', (req, res) => {
  res.json({ stocks });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
