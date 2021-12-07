const fs = require('fs');
const { parse } = require('path');

module.exports = class day6 {

    #readData = path=>{
        return fs.readFileSync(__dirname+path, 'UTF-8');
    }

    #calcProductionCount = (lanternfish, noOfDays)=>{
        let fishTimerCount=[],invalidTimers=[], i, total=0,index,timerValue; 
        lanternfish.forEach((fishTimerDays) => {
            timerValue = parseInt(fishTimerDays)
            index = fishTimerCount.findIndex(fishTimer=>fishTimer.timer === timerValue)
            index != -1? fishTimerCount[index].count += 1: fishTimerCount.push({timer:timerValue, count:1});
        }); 
        
        for(i=0; i<noOfDays; i++){
            fishTimerCount.map(fishTimer=>{fishTimer.timer=fishTimer.timer-1; return fishTimer});
            invalidTimers   = fishTimerCount.filter(fishTimer=>fishTimer.timer < 0);
            fishTimerCount  = fishTimerCount.filter(fishTimer=>fishTimer.timer >= 0);
            if(invalidTimers.length==0){continue;}
            let index6 = fishTimerCount.findIndex(fishTimer=>fishTimer.timer === 6), index8;
            invalidTimers.forEach(fishTimer=>{
                index6 != -1? fishTimerCount[index6].count += fishTimer.count: fishTimerCount.push({timer:6, count: fishTimer.count});
                index8 = fishTimerCount.findIndex(fishTimer=>fishTimer.timer === 8)
                index8 != -1? fishTimerCount[index8].count += fishTimer.count: fishTimerCount.push({timer:8, count: fishTimer.count});
            })
        }
        total = fishTimerCount.reduce((sum, fishTimer)=>{
            return sum+fishTimer.count;
        },0)
        return total;
    }

    #logic1 = data=>{                              
        return this.#calcProductionCount(data[0].split(','), 80);
    }

    #logic2 = data=>{
        return this.#calcProductionCount(data[0].split(','), 256);
    }

    calcOutput = (part)=>{
        let fileContent = this.#readData('\\input.txt')
        let inputData = fileContent.split('\n');
        return part == 'part1'?this.#logic1(inputData):this.#logic2(inputData);
    };

    calcTestOutput = (part)=>{
        let fileContent = this.#readData('\\testinput.txt')
        let inputData = fileContent.split('\n');
        return part=='part1'?this.#logic1(inputData):this.#logic2(inputData);
    }

}

