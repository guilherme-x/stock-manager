const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./swaggerDefinitions.json');
const app = express();


const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const saleRoutes = require('./routes/saleRoutes');

const port = process.env.PORT || 3000;
const connectToDatabase = require('./config/database');

connectToDatabase();

app.use(bodyParser.json());


app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/sales', saleRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));


app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});
