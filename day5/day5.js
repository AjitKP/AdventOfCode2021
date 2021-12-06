const fs = require('fs');
const Coordinate = require('./coordinate');

module.exports = class day5 {
 
    #readData = path=>{
        return fs.readFileSync(__dirname+path, 'UTF-8');
    }

    #createBoard = (x,y)=>{
        const board = [];
        for (let i = 0; i < x; i++) {
          board[i] = new Array(y).fill(0);
        }
        return board;      
    }

    #logic1 = fileData=>{
        let paths = fileData.map(row=>row.split(' -> ').map(c=>Coordinate.factory(c)));
        let allPoints = paths.flatMap(path=>path[0].x != path[1].x && path[0].y != path[1].y?[]:Coordinate.getLineCoordinates(path[0], path[1]))
        const maxCX = allPoints.sort((c1, c2) => c1.x - c2.x).reverse()[0].x + 1;
        const maxCY = allPoints.sort((c1, c2) => c1.y - c2.y).reverse()[0].y + 1;
        const board = this.#createBoard(maxCX, maxCY);
        allPoints.map(point=>++board[point.x][point.y]);
        const overlappingPoints = board.flatMap(x=>x).filter(cnt=>cnt>1).length;
        return overlappingPoints;
    }

    #logic2 = fileData=>{
        let paths = fileData.map(row=>row.split(' -> ').map(c=>Coordinate.factory(c)));
        let allPoints = paths.flatMap(path=>Coordinate.getLineCoordinates(path[0], path[1]))
        const maxCX = allPoints.sort((c1, c2) => c1.x - c2.x).reverse()[0].x + 1;
        const maxCY = allPoints.sort((c1, c2) => c1.y - c2.y).reverse()[0].y + 1;
        const board = this.#createBoard(maxCX, maxCY);
        allPoints.map(point=>++board[point.x][point.y]);
        const overlappingPoints = board.flatMap(x=>x).filter(cnt=>cnt>1).length;
        return overlappingPoints;
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