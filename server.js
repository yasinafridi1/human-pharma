require("dotenv").config();
const express = require('express');
const app = express();
const Router = require('./web/routes');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');


app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api', Router);
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }
    )
})
const port = process.env.PORT || 8000

mongoose.connect(process.env.MONGO_URL || "mongodb://humansteriodspharma:abc7777578@ac-olmdg0d-shard-00-00.hgrkylq.mongodb.net:27017,ac-olmdg0d-shard-00-01.hgrkylq.mongodb.net:27017,ac-olmdg0d-shard-00-02.hgrkylq.mongodb.net:27017/humansteroid?replicaSet=atlas-12oyil-shard-0&ssl=true&authSource=admin", {
    useUnifiedTopology: true
}).then(() => {
    console.log('Welcome to Human Pharma Steriods');
    app.listen(port, () => {
        console.log('server start');
    })

}).catch((err) => {
    console.log(err);
})



