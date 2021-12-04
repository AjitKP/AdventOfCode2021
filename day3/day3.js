const fs = require('fs');

module.exports = class day3 {

    #readData = path=>{
        return fs.readFileSync(__dirname+path, 'UTF-8');
    }

    #logic1 = data=>{
        let diagnosticBinValue='',diagnosticBinLength=data[0].toString().length, bitCntList=[], i, j, bitCnt={"bit0":0, "bit1":0}, gammaRateBin='', epsilonRateBin='';
        for(j=0; j<diagnosticBinLength; j++){
            bitCntList.push(JSON.parse(JSON.stringify(bitCnt)));
        }
        for(i=0; i<data.length; i++){
            diagnosticBinValue = data[i].toString();
            for(j=0; j<diagnosticBinLength; j++){
                if(diagnosticBinValue[j]=='0'){
                    bitCntList[j].bit0=bitCntList[j].bit0+1;
                }else{
                    bitCntList[j].bit1=bitCntList[j].bit1+1;
                }
            }
        }
        for(j=0; j<bitCntList.length; j++){
            if(bitCntList[j].bit0==bitCntList[j].bit1){
                console.log("Same No Exist");
            }
            if(bitCntList[j].bit0>bitCntList[j].bit1){
                gammaRateBin = gammaRateBin + "0";
                epsilonRateBin = epsilonRateBin + "1";
            }else{
                gammaRateBin = gammaRateBin + "1";
                epsilonRateBin = epsilonRateBin + "0";
            }
        }
        return parseInt(gammaRateBin, 2) * parseInt(epsilonRateBin, 2);

    }

    #logic2 = data=>{
        let diagnosticBinValue='',diagnosticBinLength=data[0].toString().length,i,j, bit0Cnt=0, bit1Cnt=0, currData,nextData, bitValue, oxygenBin, scrubberBin;
        
        //Oxygen Rating
        nextData = JSON.parse(JSON.stringify(data));
        for(i=0; i<diagnosticBinLength; i++){
            bit0Cnt=0;bit1Cnt=0;
            currData = JSON.parse(JSON.stringify(nextData));
            for(j=0;j<currData.length; j++){
                diagnosticBinValue = currData[j];
                if(diagnosticBinValue[i]=="0"){
                    bit0Cnt = bit0Cnt + 1;
                }else{
                    bit1Cnt = bit1Cnt + 1;
                }
            }
            if(bit0Cnt>bit1Cnt){
                bitValue='0';
            }
            else{
                bitValue='1';
            }
            nextData=[];
            for(j=0;j<currData.length; j++){
                diagnosticBinValue = currData[j];
                if(diagnosticBinValue[i]==bitValue){
                    nextData.push(diagnosticBinValue);
                }
            }
            if(nextData.length==1){
                oxygenBin = nextData[0];
                break;
            }
        }

        //Scrubber Rating
        nextData = JSON.parse(JSON.stringify(data));
        for(i=0; i<diagnosticBinLength; i++){
            bit0Cnt=0;bit1Cnt=0;
            currData = JSON.parse(JSON.stringify(nextData));
            for(j=0;j<currData.length; j++){
                diagnosticBinValue = currData[j];
                if(diagnosticBinValue[i]=="0"){
                    bit0Cnt = bit0Cnt + 1;
                }else{
                    bit1Cnt = bit1Cnt + 1;
                }
            }
            if(bit0Cnt>bit1Cnt){
                bitValue='1';
            }
            else{
                bitValue='0';
            }
            nextData=[];
            for(j=0;j<currData.length; j++){
                diagnosticBinValue = currData[j];
                if(diagnosticBinValue[i]==bitValue){
                    nextData.push(diagnosticBinValue);
                }
            }      
            if(nextData.length==1){
                scrubberBin = nextData[0];
                break;
            }                  
        }     
        
        return parseInt(oxygenBin, 2) * parseInt(scrubberBin, 2);

    }

    calcOutput = (part)=>{
        let fileContent = this.#readData('\\input.txt')
        let inputData = fileContent.split('\n');
        return part == 'part1'?this.#logic1(inputData):this.#logic2(inputData);
    };

    calcTestOutput = (part)=>{
        let fileContent = this.#readData('\\testinput.txt')
        let inputData = fileContent.split('\r\n');
        console.log(inputData);
        return part=='part1'?this.#logic1(inputData):this.#logic2(inputData);
    }

}

