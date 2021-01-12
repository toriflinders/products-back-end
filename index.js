require('dotenv').config();
const express = require('express');
const massive = require('massive');
const products_controller = require("./server/products_controller");

const app = express();



const {SERVER_PORT, CONNECTION_STRING} = process.env;




massive({
connectionString: CONNECTION_STRING, 
ssl: {rejectUnauthorized: false}
})
  .then(db => {
    app.set('db', db);
  })
  .catch(err => console.log(err));

// catch not necessary, server will throw error for you
// console log not necessary, but helps to visual ensure database and server are connected and server is listening 

app.use(express.json());

app.post('/api/products', products_controller.createOneProduct);
app.get('/api/products', products_controller.getAllProducts);
app.get('/api/products/:id', products_controller.getOneProduct);
app.put('/api/products/:id', products_controller.updateOneProduct)
app.delete('/api/products/:id', products_controller.deleteOneProduct);

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port: ${SERVER_PORT}`)
})