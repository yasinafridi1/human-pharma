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


mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true
}).then(() => {
    console.log("database connected");
}).catch((err) => {
    console.log(err);
})



const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('server start');
})