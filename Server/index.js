const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const register = require('./Routing/register');
const mainPage = require('./Routing/Details');
const verify = require('./Verification/verify');
const addJob = require('./Routing/AddJob');
const mongoose = require('mongoose');
const app = express();


dotenv.config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;

mongoose.connect('mongodb+srv://vc1710varun:EhSToTplKypJjVA5@companyinfo.nwud5.mongodb.net/')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));


app.use('/api', register);
app.use('/api',mainPage);
app.use('/api',verify,addJob);


app.listen(port, () => {
    console.log(`Server is listening at PORT ${port}`);
});
