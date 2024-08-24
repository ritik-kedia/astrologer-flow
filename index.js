const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const flowRoutes = require('./routes/flowRoutes');
require('dotenv').config();
const Astrologer = require('./models/astrologer');


const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', flowRoutes);

const prepopulateDatabase = async () => {
    const count = await Astrologer.countDocuments();
    if (count === 0) {
        await Astrologer.insertMany([
            { name: 'Astrologer A', isTopAstrologer: true },
            { name: 'Astrologer B' },
            { name: 'Astrologer C', isTopAstrologer: true },
            { name: 'Astrologer D' }
        ]);
        console.log('Database prepopulated with default astrologers');
    } else {
        console.log('Astrologers already exist in the database');
    }
};

prepopulateDatabase();


mongoose.connect(
    process.env.MONGODB_URL,
    {
        dbName: process.env.DB_NAME
    }
).then(
    () => {
        console.log("DB Connected");
        app.listen(
            process.env.PORT,
            () => {
                console.log("server started")
            }
        )
    }
).catch(
    () => {
        console.log("Something Wrong error");
    }
)


