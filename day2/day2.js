const fs = require('fs');

module.exports = class day2 {

    #readData = path=>{
        return fs.readFileSync(__dirname+path, 'UTF-8');
    }

    #logic1 = data=>{
        let hpos=0, vpos=0, commandValues;
        for(let i=0; i<data.length; i++){
            commandValues = data[i].split(' ');
            switch (commandValues[0]) {
                case 'forward':
                    hpos = hpos + parseInt(commandValues[1]);
                    break;
                case 'up':
                    vpos = vpos - parseInt(commandValues[1]);
                    break;  
                case 'down':
                    vpos = vpos + parseInt(commandValues[1]);
                    break;                              
            }
        }
        return hpos*vpos;
    }

    #logic2 = data=>{
        let hpos=0, vpos=0,aim=0, commandValues;
        for(let i=0; i<data.length; i++){
            commandValues = data[i].split(' ');
            switch (commandValues[0]) {
                case 'forward':
                    hpos = hpos + parseInt(commandValues[1]);
                    vpos = vpos + (aim * commandValues[1]);
                    break;
                case 'up':
                    aim = aim - parseInt(commandValues[1]);
                    break;  
                case 'down':
                    aim = aim + parseInt(commandValues[1]);
                    break;                              
            }
        }
        return hpos*vpos;
    }

    calcOutput = (part)=>{
        let fileContent = this.#readData('\\input.txt')
        let inputData = fileContent.split('\n');
        return part == 'part1'?this.#logic1(inputData):this.#logic2(inputData);
    };

    calcTestOutput = (part)=>{
        let fileContent = this.#readData('\\testinput.txt')
        let inputData = fileContent.split('\r\n');
        return part=='part1'?this.#logic1(inputData):this.#logic2(inputData);
    }

}

