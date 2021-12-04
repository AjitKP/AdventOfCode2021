const fs = require('fs');

module.exports = class day1 {

    #readData = path=>{
        return fs.readFileSync(__dirname+path, 'UTF-8');
    }

    #logic1 = data=>{
        let count=0;
        for(let i=1; i<data.length; i++){
            if(parseInt(data[i])>parseInt(data[i-1])){
                count++;
            }
        }
        return count;
    }

    #logic2 = data=>{
        let count=0, currWindowSum=0, prevWindowSum=0;
        for(let j=1; j<data.length-2; j++){
            currWindowSum = parseInt(data[j]) + parseInt(data[j+1]) + parseInt(data[j+2]);
            prevWindowSum = parseInt(data[j-1]) + parseInt(data[j]) + parseInt(data[j+1]);
            if(currWindowSum > prevWindowSum){
                count++;
            }
        }
        return count;
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

