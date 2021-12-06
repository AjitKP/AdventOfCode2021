module.exports = class Coordinate {
    constructor (x,y){
        this.x = parseInt(x);
        this.y = parseInt(y);
    }

    static factory = point=>{
        let values=point.split(',');
        return new Coordinate(values[0], values[1]);
    }

    static getLineCoordinates = (c1, c2)=>{

        let lineCoordinates = [], xstep,ystep,i, from, to;

        //DiagonalLine
        if(c1.x!=c2.x && c1.y!=c2.y){
            xstep= (c2.x-c1.x)/Math.abs(c2.x-c1.x),ystep= (c2.y-c1.y)/Math.abs(c2.y-c1.y);
            for(i=0; i<=Math.abs(c2.x-c1.x); i++){
                lineCoordinates.push(new Coordinate(c1.x+(i*xstep),c1.y+(i*ystep)));
            }
            return lineCoordinates;
        }

        //HorizontalLine
        if(c1.y==c2.y){
            if(c1.x < c2.x){
                from=c1.x;
                to=c2.x;
            }else{
                from=c2.x;
                to=c1.x;
            }
            for(i=from; i<=to; i++){
                lineCoordinates.push(new Coordinate(i,c1.y));
            }
            return lineCoordinates;            
        }

        //VerticalLine
        if(c1.x==c2.x){
            if(c1.y < c2.y){
                from=c1.y;
                to=c2.y;
            }else{
                from=c2.y;
                to=c1.y;
            }  
            for(i=from; i<=to; i++){
                lineCoordinates.push(new Coordinate(c1.x,i));
            }    
            return lineCoordinates;                              
        }

    }
}