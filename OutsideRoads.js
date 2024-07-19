class OutsideRoads {
    constructor(bigPixels) {
        this.bigPixels = bigPixels;
        this.a = bigPixels.length;
        this.b = bigPixels[0].length;
        this.point = { x: 0, y: 0 };
    }

    isInTable(x, y) {
        return (x > -1 && x < this.b && y > -1 && y < this.a);
    }

    check(x, y) {
        var tabX = [x, x - 1, x, x + 1];
        var tabY = [y + 1, y, y - 1, y];
        for (let i = 0; i < 4; i++) {
            if (this.isInTable(tabX[i], tabY[i]) && this.bigPixels[tabY[i]][tabX[i]] < 4) {
                return true;
            }
        }
        return false;
    }

    randomPoint(x, y) {
        var x2, y2;
        if (y < this.a / 2) {
            y2 = 0;
        } else {
            y2 = this.a - 1;
        }
        if (x < this.b / 2) {
            x2 = 0;
        } else {
            x2 = this.b - 1;
        }
        //this.bigPixels[y2][x] = 15;
        //this.bigPixels[y][x2] = 15;
        if (Math.random() > Math.abs(x2-x)/(Math.abs(x2-x)+Math.abs(y2-y))) {
            this.point.x = Math.floor(Math.random() * (Math.abs(x2 - x) + 1));
            this.point.x = x2 > x ? this.point.x + x : x - this.point.x; // Adjust x coordinate
            this.point.y = y2;
            //this.bigPixels[y2][this.point.x] = 5;
        }
        else {
            this.point.x = x2;
            this.point.y = Math.floor(Math.random() * (Math.abs(y2 - y) + 1));
            this.point.y = y2 > y ? this.point.y + y : y - this.point.y; // Adjust y coordinate
            //this.bigPixels[this.point.y][x2] = 5;
        }
    }
    

    road(x, y) {

        this.bigPixels[y][x] = 50;

        if (x == this.point.x && y == this.point.y) {
            return;
        }
        
        var tabX = [x, x + 1, x, x - 1];
        var tabY = [y + 1, y, y - 1, y];
        for(let i=0; i<4; i++){
            if(this.isInTable(tabX[i],tabY[i]) && this.bigPixels[tabY[i]][tabX[i]] == 5){
                return;
            }
        }
        var full = Math.abs(this.point.x - x) + Math.abs(this.point.y - y);
        var prob = [Math.abs(this.point.x - x) / full, Math.abs(this.point.y - y) / full];
        var prob2 = Math.random();
        var ifFail = false;
        if (prob2 < prob[0]) {
            if (this.point.x > x) {
                if (this.isInTable(x + 1, y)) {
                    if(this.bigPixels[y][x + 1] < 4){
                        this.road(x + 1, y);
                        return;
                    }
                }
            } else {
                if (this.isInTable(x - 1, y)) {
                    if(this.bigPixels[y][x - 1] < 4){
                        this.road(x - 1, y);
                        return; 
                    }
                }
            }
            ifFail = true;
        }
        if (prob2 >= prob[0] || ifFail) {
            if (this.point.y > y) {
                if (this.isInTable(x, y + 1)) {
                    if(this.bigPixels[y + 1][x] < 4){
                        this.road(x, y + 1);
                    return;
                    }
                }
            } else {
                if (this.isInTable(x, y - 1)) {
                    if(this.bigPixels[y - 1][x] < 4){
                        this.road(x, y - 1);
                        return;
                    }
                }
            }
            ifFail = true;
        }
        if (ifFail) {
            for (let i = 0; i < 4; i++) {
                if (this.isInTable(tabX[i], tabY[i])) {
                    if(this.bigPixels[tabY[i]][tabX[i]] < 4){
                        this.road(tabX[i], tabY[i]);
                        return;
                    }
                }
            }
        }
    }
    
    colorUp(){
        for(let i=0; i<this.a; i++){
            for(let j=0; j<this.b; j++){
                if(this.bigPixels[i][j] == 50){
                    this.bigPixels[i][j] = 5;
                }
            }
        }
    }

    countPoints() {
        var sum = 0;
        for (let i = 0; i < this.a; i++) {
            for (let j = 0; j < this.b; j++) {
                if (this.bigPixels[i][j] == 6 && this.check(j, i)) {
                    //this.bigPixels[i][j] = 5;
                    this.randomPoint(j, i);
                    this.road(j, i);
                    this.colorUp();
                    sum++;
                }
            }
        }
        for (let i = 0; i < this.a; i++) {
            for (let j = 0; j < this.b; j++) {
                if (this.bigPixels[i][j] == 5) {
                    this.bigPixels[i][j] = 6;
                }
            }
        }
        console.log("Punkty wyjscia: " + sum);
    }
}
