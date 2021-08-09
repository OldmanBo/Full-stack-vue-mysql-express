const express = require('express');
const mysql = require('mysql2');
const { db } = require('./db/config.js');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const blogsRoute = require('./routes/blogs')

//Middleware
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
// app.use(cors());
// app.options('*', cors());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
app.use('/public', express.static(__dirname + '/public'))

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/blogs', blogsRoute);

// *******no need to look down here yet*******

db.connect((err) => {
    if (err) {
        console.log(`error connection to the database`);
        console.log(err);
        return;
    }
    console.log(`connection to the database established`);
});

const port = 3000;
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});
