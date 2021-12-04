const express = require('express');
const proxy = require('./proxy');
const app = express();
app.use(express.json());

app.get('/adventofcode/:day/:part/:type', (req, res)=>{
    const {day, part, type} = req.params;
    const logic = new proxy(day);
    let output = type == 'test'? logic.calcTestOutput(part) : logic.calcOutput(part);
    res.status(200).send({output:output});
})

app.listen(1000,()=>{
    console.log('App is listening on port 1000');
})