const rp = require('request-promise');

const options = {
  uri: 'https://rest.hggrup.com/firmalar',
  method: 'GET',
  headers: {
    authorization: 'Bearer 8fe7057d-01a7-464b-8daf-56903d8b6ad8',
    accept: 'application/json'
  },
  json: true, // JSON parse otomatik olsun
  timeout: 30000,
  gzip: true,
  rejectUnauthorized: true,
};

rp(options)
  .then(response => {
    console.log('Response:', response);
  })
  .catch(err => {
    console.error('Hata:', err.message);
  });
