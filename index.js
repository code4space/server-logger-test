require('dotenv').config();

const cors = require('cors');
const express = require('express');
const { connectToDatabase } = require('./config/config');
const http = require('http');
const Loggers = require('./model/logger');

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/logger', async (req, res) => {
    try {
        const data = await Loggers.find()
        res.status(200).json({ data: data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

app.post('/logger', async (req, res) => {
    try {
        const { description } = req.body
        await Loggers.create({ description, createdAt: new Date(), status: false })
        res.status(200).json({ message: 'logger berhasil dibuat' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

app.patch('/logger', async (req, res) => {
    try {
        await Loggers.updateMany({}, { $set: { status: true } })
        res.status(200).json({ message: 'logger berhasil diupdate' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

const server = http.createServer(app);

connectToDatabase()
    .then(() => {
        server.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    });