const fs = require('fs');
const { parse } = require('path');
const board = require('./board');

 module.exports = class day4 {

    #readData = path=>{
        return fs.readFileSync(__dirname+path, 'UTF-8');
    }

    #logic1 = fileData=>{
        let randomDrawnNumbers = fileData[0].split(',');
        let allBoards = [], boardData=[], row, boardObjects=[];

        //Parse and Prepare All Boards
        for(let i=2; i<fileData.length; i++){
            row = fileData[i].toString().replace(/  /g,' ').trim().split(' ');
            if(row.length !=5){
                allBoards.push(JSON.parse(JSON.stringify(boardData)));
                boardObjects.push(new board(JSON.parse(JSON.stringify(boardData))));
                boardData=[];
                continue;
            }
            boardData.push(JSON.parse(JSON.stringify(row)));
            if(i == fileData.length-1){
                allBoards.push(JSON.parse(JSON.stringify(boardData)));
                boardObjects.push(new board(JSON.parse(JSON.stringify(boardData))));
                boardData=[];
            }
        }

        //Logic to Calc WinScore
        let WinScore=0, finalScore=0;
        randomDrawnNumbers:        
        for(let cnt=0; cnt<randomDrawnNumbers.length; cnt++){
            boardObjects:
            for(let boardNo=0; boardNo<boardObjects.length; boardNo++){
                boardObjects[boardNo].markNunmberOnBoard(parseInt(randomDrawnNumbers[cnt]));
                if(boardObjects[boardNo].checkBoardForWin() == true){
                    WinScore = boardObjects[boardNo].calcWinScore();
                    break boardObjects;
                }
            }
            if(WinScore != 0){
                console.log(WinScore, parseInt(randomDrawnNumbers[cnt]));
                finalScore = WinScore * parseInt(randomDrawnNumbers[cnt]);
                break randomDrawnNumbers;
            }
        }
        return finalScore;
    }

    #logic2 = fileData=>{
        let randomDrawnNumbers = fileData[0].split(',');
        let allBoards = [], boardData=[], row, boardObjects=[];

        //Parse and Prepare All Boards
        for(let i=2; i<fileData.length; i++){
            row = fileData[i].toString().replace(/  /g,' ').trim().split(' ');
            if(row.length !=5){
                allBoards.push(JSON.parse(JSON.stringify(boardData)));
                boardObjects.push(new board(JSON.parse(JSON.stringify(boardData))));
                boardData=[];
                continue;
            }
            boardData.push(JSON.parse(JSON.stringify(row)));
            if(i == fileData.length-1){
                allBoards.push(JSON.parse(JSON.stringify(boardData)));
                boardObjects.push(new board(JSON.parse(JSON.stringify(boardData))));
                boardData=[];
            }
        }

        //Logic to Calc WinScore
        let WinScore=0, finalScore=0;
        for(let cnt=0; cnt<randomDrawnNumbers.length; cnt++){
            for(let boardNo=0; boardNo<boardObjects.length; boardNo++){
                if(boardObjects[boardNo]==-1){continue;}
                boardObjects[boardNo].markNunmberOnBoard(parseInt(randomDrawnNumbers[cnt]));
                if(boardObjects[boardNo].checkBoardForWin() == true){
                    WinScore = boardObjects[boardNo].calcWinScore();
                    finalScore = WinScore * parseInt(randomDrawnNumbers[cnt]);
                    boardObjects[boardNo] = -1;
                }
            }
        }
        return finalScore;
    }

    calcOutput = (part)=>{
        let fileContent = this.#readData('\\input.txt')
        let inputData = fileContent.split('\n');
        return part == 'part1'?this.#logic1(inputData):this.#logic2(inputData);
    };

    calcTestOutput = (part)=>{
        let fileContent = this.#readData('\\testinput.txt')
        let fileData = fileContent.split('\r\n');       
        return part=='part1'?this.#logic1(fileData):this.#logic2(fileData)
    }

}
