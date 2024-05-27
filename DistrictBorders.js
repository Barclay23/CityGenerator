class DistricBorders {
    isInTable(x, y) {
        var a = this.roads.length;
        var b = this.roads[0].length;
        if ((x) > -1 && (x) < b && (y) > -1 && (y) < a) {
            return true;
        }
        return false;
    }
    async nearest(x, y) {
        if (this.bigPixels[y][x] < 5) {
            return;
        }
        var distance = Math.pow(this.bigPixels.length, 2);
        var point;
        for (let i = 0; i < this.tabRand.length; i++) {
            point = this.cP.getP(this.tabRand[i]);
            if (Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2) < distance) {
                distance = Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2);
                this.roads[y][x] = i;
            }
        }
    }
    bordering(x, y) {
        if (this.bigPixels[y][x] < 5) {
            return;
        }
        var tabX = [x - 1, x, x + 1, x];
        var tabY = [y, y - 1, y, y + 1];
        var chance = Math.random();
        for (let i = 0; i < 4; i++) {
            if (this.isInTable(tabX[i], tabY[i]) && this.roads[tabY[i]][tabX[i]] != this.roads[y][x] && this.bigPixels[tabY[i]][tabX[i]] > 4) {
                if (chance > this.sizeChance) {
                    this.roads[tabY[i]][tabX[i]] = this.roads[y][x];
                }
            }
        }
    }
    async color(x, y) {
        if (this.bigPixels[y][x] < 5) {
            return;
        }
        var tabX = [x - 1, x, x + 1, x];
        var tabY = [y, y - 1, y, y + 1];
        for (let i = 0; i < 4; i++) {
            if (this.isInTable(tabX[i], tabY[i]) && this.bigPixels[tabY[i]][tabX[i]] > 4) {
                this.bigPixels[y][x] = 7 + this.roads[tabY[i]][tabX[i]];
            }
        }
    }
    ifAlone(x, y) {
        this.nearestColor = -1;
        for (let i = 0; i < this.roads.length; i++) {
            for (let j = 0; j < this.roads[0].length; j++) {
                this.roads[i][j] = -10;
            }
        }
        this.whichNow = this.bigPixels[y][x] - 7;
        //console.log(this.whichNow-7);
        var point = this.cP.getP(this.tabRand[this.whichNow]);
        this.pointX = point.x;
        this.pointY = point.y;
        //console.log(point.x);

        if (this.bfs(x, y) == 1) {
            //console.log((this.whichNow + 7) + " " + this.nearestColor+" " + x +" "+y);
            if (this.nearestColor != -1) {
                this.bigPixels[y][x] = 6;
            }

        }
    }
    fillRest(x,y){
        this.nearestColor = -1;
        for (let i = 0; i < this.roads.length; i++) {
            for (let j = 0; j < this.roads[0].length; j++) {
                this.roads[i][j] = -10;
            }
        }
        this.whichNow = -1;
        this.pointX = -1;
        this.pointY = -1;
        this.bfs(x,y);
        for (let i = 0; i < this.roads.length; i++) {
            for (let j = 0; j < this.roads[0].length; j++) {
                if(this.bigPixels[i][j] == 6 && this.roads[i][j] == this.whichNow){
                    this.bigPixels[i][j] = this.nearestColor;
                }
            }
        }

    }
    bfs(x, y) {
        //console.log(x+" "+y);
        this.roads[y][x] = this.whichNow;
        if (x == this.pointX && y == this.pointY) {
            //console.log(x+" "+y+" "+this.whichNow);
            return 0;
        }
        var tabX = [x, x, x + 1, x - 1];
        var tabY = [y + 1, y - 1, y, y];
        var con = 1;
        for (let i = 0; i < 4; i++) {
            if (this.isInTable(tabX[i], tabY[i]) && this.bigPixels[tabY[i]][tabX[i]] > 3 && this.roads[tabY[i]][tabX[i]] == -10) {
                if (this.bigPixels[tabY[i]][tabX[i]] == (this.whichNow + 7)) {
                    con = this.bfs(tabX[i], tabY[i]);
                    if (con == 0) {
                        return 0;
                    }
                }
                else {
                    if (this.nearestColor == -1 && this.bigPixels[tabY[i]][tabX[i]] != 4) {
                        this.nearestColor = this.bigPixels[tabY[i]][tabX[i]];
                    }
                }

            }
        }
        return 1;
    }
    check(point, howMany){
        for (let i=0; i<howMany; i++){
            if(Math.pow(this.cP.getP(this.tabRand[i]).x - point.x, 2) + Math.pow(this.cP.getP(this.tabRand[i]).y - point.y, 2)<this.radius){
                return false;
            } 
        }
        return true;
    }
    constructor(bigPixels, cityProperties, radius, dist, middle, citySize) {
        this.bigPixels = bigPixels;
        this.roads = Array.from({ length: this.bigPixels.length }, () => Array(this.bigPixels[0].length).fill(-10));
        this.cP = cityProperties;
        this.size = citySize;
        var tabSize = [0.55, 0.5, 0.46];
        var tabRadius = [1, radius/6, radius/5];
        this.radius = radius*tabRadius[this.size];
        this.sizeChance = tabSize[citySize];
        this.whichNow = -1;
        var howMany = 0;
        this.tabRand = new Array(dist).fill(-1);
        while (howMany < this.tabRand.length) {
            var tmp = Math.round(Math.random() * (this.cP.numOfP() - 1));
            var point = this.cP.getP(tmp);
            if (!this.tabRand.includes(tmp) && this.check(point,howMany)) {  
                this.tabRand[howMany] = tmp;
                this.roads[point.y][point.x] = 2;
                howMany++;
                //console.log(howMany);
            }
        }
        for (let i = 0; i < this.bigPixels.length; i++) {
            for (let j = 0; j < this.bigPixels[0].length; j++) {
                this.nearest(j, i);
            }
        }
        for (let i = 0; i < this.roads.length; i++) {
            for (let j = 0; j < this.roads[0].length; j++) {
                this.bordering(j, i);
            }
        }
        for (let i = 0; i < this.roads.length; i++) {
            for (let j = 0; j < this.roads[0].length; j++) {
                this.color(j, i);
                // if( bigPixels[i][j]>4){
                //     this.bigPixels[i][j] = 7+this.roads[i][j];
                // }
            }
        }
        for (let i = 0; i < dist; i++) {
            point = this.cP.getP(this.tabRand[i]);
            bigPixels[point.y][point.x] = i + 7;
        }
        for (let i = 0; i < this.roads.length; i++) {
            for (let j = 0; j < this.roads[0].length; j++) {
                if (this.bigPixels[i][j] > 6 ) {
                    this.ifAlone(j, i);
                }
            }
        }
        for (let i = 0; i < this.roads.length; i++) {
            for (let j = 0; j < this.roads[0].length; j++) {
                if (this.bigPixels[i][j] == 6) {
                    this.fillRest(j, i);
                }
            }
        }
        // for (let i = 0; i < this.tabRand.length; i++) {
        //     var point = this.cP.getP(this.tabRand[i]);
        //     this.bigPixels[point.y][point.x] = 5;
        // }
    }
}