//Assumption: Board is of 5x5 matrix. This can be changed to make it dynamic.
module.exports = class board {
    #boardActualData;
    #boardData = [];
    #boardNumberSum = {rowSum:[5,5,5,5,5],colSum:[5,5,5,5,5]};

    constructor (data){
        this.#boardActualData = JSON.parse(JSON.stringify(data));
        for(let i=0; i<5; i++){
            for(let j=0; j<5; j++){
                this.#boardData.push(parseInt(data[i][j]));
            }
        }
    }

    #updateBoardNumberSum = (row, col)=>{
        this.#boardNumberSum.rowSum[row] = this.#boardNumberSum.rowSum[row] - 1;
        this.#boardNumberSum.colSum[col] = this.#boardNumberSum.colSum[col] - 1;
    }
    markNunmberOnBoard = (choosenNumber)=>{
        let markIndex = this.#boardData.indexOf(choosenNumber), row, col;
        if(markIndex != -1){
            row = parseInt(markIndex / 5);
            col = parseInt(markIndex % 5);
            this.#updateBoardNumberSum(row, col);
            this.#boardData[markIndex] = -1;
        }
    }
    checkBoardForWin = ()=>{
        if(this.#boardNumberSum.rowSum.indexOf(0) != -1 || this.#boardNumberSum.colSum.indexOf(0) != -1){
            return true;
        }else{
            return false;
        }
    }
    calcWinScore = ()=>{        
        return this.#boardData.reduce((sum, value)=>{return value != -1? sum+value : sum;}, 0);
    }
}