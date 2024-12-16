const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 5500;

app.use(express.json());

let refreshTokens = [];

app.post('/refreshToken', (req, res) => {
    console.log(req.body.token);
    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401);

    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if (err) res.sendStatus(403);
        const accessToken = jwt.sign({ user: data.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
        res.json({ accessToken });
    });
});

app.post('/login', (req, res) => {
    // Authentication
    // Authorization
    // {username: 'Test'}
    const data = req.body;
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({ accessToken, refreshToken });
    console.log(refreshTokens);
});

app.post('/logout', (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`My is running at http://localhost:${PORT}`);
});
