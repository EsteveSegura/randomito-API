require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');

const randomFloat = require('./useCases/randomFloat');

const PORT = process.env.PORT || 3000;
app.use(morgan(`:method :url port=${PORT} :status :res[content-length] - :response-time ms`));

app.get('/api/v1/number', (req, res) => {
  const value = randomFloat.randomFloat();
  res.json({value, port: PORT});
});

app.listen(PORT, () => {
  console.log(`Randomito API running on port ${PORT}`);
});
