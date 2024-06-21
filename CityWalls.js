class CityWalls{
    constructor(bigPixels){
        this.bigPixels=bigPixels;
        for(let i=0; i<bigPixels.length; i++){
            for(let j=0; j<bigPixels[0].length; j++){
                //console.log(bigPixels[i][j]);
                if(bigPixels[i][j]>6){
                    this.ifBorder(j, i);
                }
            }
        }
    }
    isInTable(x, y) {
        var a = this.bigPixels.length;
        var b = this.bigPixels[0].length;
        if ((x) > -1 && (x) < b && (y) > -1 && (y) < a) {
            return true;
        }
        return false;
    }
    async ifBorder(x,y){
        //console.log("tutaj");
        var tabX = [x, x + 1, x, x - 1];
        var tabY = [y + 1, y, y - 1, y];
        for(let i=0; i<4; i++){
            if(this.isInTable(tabX[i],tabY[i]) && this.bigPixels[tabY[i]][tabX[i]]<4){
                this.bigPixels[y][x] = 24;
                break;
            }
        }
    }
}