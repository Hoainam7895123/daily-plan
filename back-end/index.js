const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const db = require('./src/configs/db');
const apiRoutes = require('./src/routers/api.routes');

db.connect();

app.use(
    cors({
        origin: 'http://localhost:5173',
    }),
);

// app.use(morgan('combined'));

app.use(express.json());

app.use('/api', apiRoutes);

// Lắng nghe trên cổng 3000
app.listen(PORT, () => {
    console.log(`My is running at http://localhost:${PORT}`);
});
