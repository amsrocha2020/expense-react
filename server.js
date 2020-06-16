const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env'});

connectDB();

const categories = require('./routes/categories');
const typeCategories = require('./routes/typeCategories');
const transactions = require('./routes/transactions');
//const signup = require('./routes/signin');

const app = express();

// Allows use body parser
app.use(express.json());

if(process.env.NODE_ENV === 'development') {
 app.use(morgan('dev'));
}

app.use('/categories', categories);
app.use('/dashboard', transactions);
app.use('/typecategories', typeCategories);
//app.use('/api/account/', signup);


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));