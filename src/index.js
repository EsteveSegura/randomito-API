require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');

const randomFloat = require('./useCases/randomFloat');
const promClient = require('prom-client');
promClient.collectDefaultMetrics({timeout: 5000});

const counter = new promClient.Counter({
  name: 'node_request_random_floats_query_total',
  help: 'The total number of proccessed request for generating random floats',
});

const PORT = process.env.PORT || 3000;
app.use(morgan(`:method :url port=${PORT} :status :res[content-length] - :response-time ms`));

app.get('/api/v1/number', (req, res) => {
  const value = randomFloat.randomFloat();
  counter.inc();
  res.json({value, port: PORT});
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Randomito API running on port ${PORT}`);
});
