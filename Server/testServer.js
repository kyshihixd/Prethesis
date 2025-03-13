const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./Server');
const userRoutes = require('../Routes/UserRoutes');
const loginRoutes = require('../Routes/LoginRoutes');
const mainRoutes = require('../Routes/mainRoutes');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, '../Public')));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Registration/registration.html'));
});


connectDB();

app.use('/', userRoutes);
app.use('/', loginRoutes);
app.use('/', mainRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});