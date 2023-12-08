const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('./swaggerDefinitions.json');
const app = express();


const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const saleRoutes = require('./routes/saleRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const port = process.env.PORT || 3000;
const connectToDatabase = require('./config/database');
const { verifyToken, isAdmin } = require('./middlewares/authJwt');

connectToDatabase();

app.use(bodyParser.json());


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));
app.use('/auth', authRoutes);
app.use(verifyToken);
app.use('/products', productRoutes);
app.use('/users', isAdmin, userRoutes);
app.use('/cart', cartRoutes);
app.use('/sales', saleRoutes);


app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});
