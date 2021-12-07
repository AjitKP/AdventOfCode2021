const fs = require('fs');

module.exports = class day1 {

    #readData = path=>{
        return fs.readFileSync(__dirname+path, 'UTF-8');
    }

    #logic1 = data=>{
        let crabSubmarines = data.split(',').map(x=>parseInt(x)).sort((cs1, cs2)=>cs1-cs2);
        let minHPos = crabSubmarines[0], maxHPos = crabSubmarines.reverse()[0], minPos, minFuel,fuelConsumption;
        for(let i=minHPos; i<=maxHPos; i++){
            fuelConsumption=0;
            fuelConsumption = crabSubmarines.reduce((sum, value)=>{return sum+Math.abs(value-i);},0);
            if(minFuel==undefined || fuelConsumption<minFuel){
                minFuel=fuelConsumption, minPos=i;
            } 
        }
        return minFuel;
    }

    #logic2 = data=>{
        let crabSubmarines = data.split(',').map(x=>parseInt(x)).sort((cs1, cs2)=>cs1-cs2);
        let minHPos = crabSubmarines[0], maxHPos = crabSubmarines.reverse()[0], minPos, minFuel,fuelConsumption,noOfSteps;
        for(let i=minHPos; i<=maxHPos; i++){
            fuelConsumption=0;
            fuelConsumption = crabSubmarines.reduce((sum, value)=>{noOfSteps=Math.abs(value-i); return sum+(noOfSteps*(noOfSteps+1)/2);},0);
            if(minFuel==undefined || fuelConsumption<minFuel){
                minFuel=fuelConsumption, minPos=i;
            } 
        }
        return minFuel;
    }

    calcOutput = (part)=>{
        let fileContent = this.#readData('\\input.txt')
        //let inputData = fileContent.split('\n');
        return part == 'part1'?this.#logic1(fileContent):this.#logic2(fileContent);
    };

    calcTestOutput = (part)=>{
        let fileContent = this.#readData('\\testinput.txt')
        //let inputData = fileContent.split('\n');
        return part=='part1'?this.#logic1(fileContent):this.#logic2(fileContent);
    }

}

