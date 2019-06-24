const express = require('express');
const app = express();

date = new Date();

app.use((req, res, next) => {
   res.status(200).json({
     status: {
       status: 'online',
       runningSince: date
     },
     tusername: '@corusmbot',
     dusername: '@ropbot'
   })
})

module.exports = app;
