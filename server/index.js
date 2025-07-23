const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const auth = require('./middleware/auth.js')
require('./config/db');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute')
app.use(express.json())
app.use(cors());


app.use('/api/user', userRoute);
app.use('/api/product', auth, productRoute)


const PORT = process.env.PORT;


app.get('/', (req, res) => {
    res.send(productRoute)
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})