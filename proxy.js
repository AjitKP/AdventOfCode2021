const { append } = require('vary');
const day1 = require('./day1/day1');
const day2 = require('./day2/day2');
const day3 = require('./day3/day3');

const days = {day1, day2, day3};

module.exports = class {
    constructor (dayId){
        return new days[dayId]();
    }
}