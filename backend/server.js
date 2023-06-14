const express = require('express');
const db = require('./config/DB');
const dotenv = require('dotenv').config();
const path = require('path');
const colors = require('colors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoute');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const {
  headersSentErrorMiddleware,
  headerSetMiddleware,
} = require('./middleware/headerMiddleware');
const mongoose = require('mongoose').set('strictQuery', true);

const app = express();
// This middleware logs all the api calls
app.use(loggerMiddleware);
app.use(express.json());
app.use(headerSetMiddleware);



db();

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', uploadRoutes);

// PAYPAL
app.get('/api/config/paypal', (req, res) =>
  res.json(process.env.PAYPAL_CLIENT_ID)
);

// making folder static
var __dirname = path.resolve();
app.use('/upload', express.static(path.join(__dirname, '/upload')));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*',(req,res) =>{
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}else{
  app.get('/', (req, res) => {
    res.send('API running');
  });
}

// Middlewares
app.use(notFound);
app.use(errorHandler);

// This middleware overrides the res.send, res.write, and res.end methods and throws an error if they are called after the headers have already been sent.
app.use(headersSentErrorMiddleware);
app.listen(
  process.env.PORT || 5000, 
  console.log(
    `Server running in ${process.env.NODE_ENV} under ${process.env.PORT} 🔥`
      .yellow.bold
  )
);
