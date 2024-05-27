class CityBorders {
    isInTable(x, y) {
        if ((x) > -1 && (x) < this.b && (y) > -1 && (y) < this.a) {
            return true;
        }
        return false;
    }
    isInRadius(x, y, variant) {
        return (Math.pow(this.middle.m1 - x, 2) + Math.pow(this.middle.m2 - y, 2) < (this.radius2 / variant));
    }
    whatMore(x, y, what, version) {
        if (this.isInRadius(x, y, 1)) {
            if (version == 1) {
                return this.whatMoreVer1(x, y, what);
            }
            if (version == 2) {
                return this.whatMoreVer2(x, y, what);
            }
        }
        return 0;
    }
    whatMoreVer1(x, y, what) {
        var city = 0;
        for (let i = y - 1; i < y + 2; i++) {
            for (let j = x - 1; j < x + 2; j++) {
                if (this.isInTable(j, i) && this.otherPixels[i][j] === what && this.bigPixels[i][j] != 4) {
                    city++;
                }
            }
        }
        if (city > 1) {
            return what;
        }
        return 0;
    }
    whatMoreVer2(x, y, what) {
        var city = 0;
        var tabX = [x, x, x + 1, x - 1];
        var tabY = [y + 1, y - 1, y, y];
        for (let i = 0; i < 4; i++) {
            if (this.isInTable(tabX[i], tabY[i]) && this.bigPixels[tabY[i]][tabX[i]] === what && this.bigPixels[tabY[i]][tabX[i]] != 4) {
                city++;
            }
        }
        if (city > 2) {
            return what;
        }
        return 0;
    }
    isBorder(x1, y1, previousColor) {
        var color = this.bigPixels[y1][x1];
        //if(color==previousColor){
        //    console.log(this.isInRadius(x1,y1,4));
        //}
        if (previousColor == 4 && this.previousColors[color] === 0) {
            return 1;
        }
        //console.log(this.terrain[previousColor][color]);
        if (color === 5 || previousColor === 5) {
            return 0;
        }
        if ((color !== previousColor) && (this.terrain[previousColor][color] === 0)) {
            //console.log(previousColor+" "+color);
            return 1;
        }
        if (color == previousColor && !this.isInRadius(x1, y1, 2)) {
            var proc = Math.random();
            if (proc > this.terrain[color][color]) {
                return 2
            }
        }
        return 0;
    }
    async fillCity(x, y) {
        var previousColor = this.bigPixels[y][x];
        this.previousColors[previousColor] = 1;
        this.otherPixels[y][x] = 20;
        var tabX = [x, x, x + 1, x - 1];
        var tabY = [y + 1, y - 1, y, y];
        //console.log(x+" "+y+" "+previousColor);
        for (let i = 0; i < 4; i++) {
            if (this.isInTable(tabX[i], tabY[i])) {
                if (this.otherPixels[tabY[i]][tabX[i]] < 20 && this.isInRadius(tabX[i], tabY[i], 1)) {
                    if (this.isBorder(tabX[i], tabY[i], previousColor) == 2) {
                        this.otherPixels[tabY[i]][tabX[i]] = 21;
                    }
                    if (this.isBorder(tabX[i], tabY[i], previousColor) == 0) {
                        this.fillCity(tabX[i], tabY[i]);
                    }
                }
            }
        }
    }
    cityNearby(x, y) {
        for (let i = y - 5; i < y + 5; i++) {
            for (let j = x - 5; j < x + 5; j++) {
                if (this.isInTable(j, i)) {
                    if (this.otherPixels[i][j] === 20) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    async average() {
        var result = 0;
        for (let i = 0; i < this.a; i++) {
            for (let j = 0; j < this.b; j++) {
                if ((this.otherPixels[i][j] === 20 || this.whatMore(j, i, 20, 1) === 20) && this.bigPixels[i][j] !== 4) {
                    this.bigPixels[i][j] = 5;
                }
            }
        }
        for (let i = 0; i < this.a; i++) {
            for (let j = 0; j < this.b; j++) {
                if ((this.bigPixels[i][j] === 5 || this.whatMore(j, i, 5, 2) === 5) && this.bigPixels[i][j] !== 4) {
                    this.otherPixels[i][j] = 20;
                }
                if (this.otherPixels[i][j] != 20) {
                    this.otherPixels[i][j] = 0;
                }
            }
        }
        for (let i = 0; i < this.a; i++) {
            for (let j = 0; j < this.b; j++) {
                if (this.otherPixels[i][j] < 20 && this.isInRadius(j, i, 1) && this.cityNearby(j, i)) {
                    result = this.bfs(j, i);
                    if (result === 1) {
                        for (let k = 0; k < this.a; k++) {
                            for (let l = 0; l < this.b; l++) {
                                if (this.otherPixels[k][l] === 21) {
                                    this.otherPixels[k][l] = 0;
                                }
                            }
                        }
                    }
                    else {
                        for (let k = 0; k < this.a; k++) {
                            for (let l = 0; l < this.b; l++) {
                                if (this.otherPixels[k][l] === 21) {
                                    this.otherPixels[k][l] = 20;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    bfs(x, y) {
        //console.log(x+" "+y);
        this.otherPixels[y][x] = 21;
        var tabX = [x, x, x + 1, x - 1];
        var tabY = [y + 1, y - 1, y, y];
        for (let i = 0; i < 4; i++) {
            if (!this.isInRadius(tabX[i], tabY[i], 1)) {
                return 1;
            }
            if (this.isInTable(tabX[i], tabY[i]) && this.otherPixels[tabY[i]][tabX[i]] < 20) {
                if (this.bfs(tabX[i], tabY[i]) != 0) {
                    return 1;
                }
                //console.log(tabX[i]+" "+tabY[i]);
            }
        }
        return 0;
    }
    async isRB(x,y){
        var tabX = [x, x, x + 1, x - 1];
        var tabY =[y+1,y-1,y,y];
        for(let i=0;i<4; i++){
            if(this.isInTable(tabX[i],tabY[i])  && this.bigPixels[tabY[i]][tabX[i]] === 4){
                this.cP.addRB(x,y);
                return;
            }
        }
    }
    isBorderCP(x, y) {
        for (let i = -1; i < 2; i++) {
            for(let j=-1;j<2;j++){
                if (this.isInTable(x+j, y+i) && this.bigPixels[y+i][x+j] != 5) {
                    this.isRB(x,y);
                    return true;
                }
            }
        }
        return false;
    }
    cityProperties() {
        for (let i = 0; i < this.a; i++) {
            for (let j = 0; j < this.b; j++) {
                if (this.bigPixels[i][j] === 5) {
                    this.cP.add(j, i);
                    if (this.isBorderCP(j, i)) {
                        this.cP.addBor(j, i);
                    }
                }
            }
        }
    }
    constructor(bigPixels, middle2, variant, terrain, cP) {
        this.a = bigPixels.length;
        this.b = bigPixels[0].length;
        this.cP = cP;
        this.previousColors = [0, 0, 0, 0, 0, 0];
        this.terrain = terrain;
        this.middle = middle2;
        this.bigPixels = bigPixels;
        var m1 = middle2.m1;
        var m2 = middle2.m2;
        const tab = [13, 23, 33];
        const size = (tab[variant] + Math.round(Math.random() * 8) - 4) / 100;
        console.log("Procent pokrycia: " + size);
        this.radius2 = Math.round(this.bigPixels.length * this.bigPixels[0].length * size / 3.14);
        this.radius = Math.round(Math.sqrt(this.radius2));
        var sum = 0;
        var realSize = 0;
        var numOfTries = 0;
        this.finalPixels = [];
        this.otherPixels = [];
        for (let i = 0; i < this.a; i++) {
            this.otherPixels[i] = new Array(this.b);
        }
        while (realSize < size && numOfTries < 100) {
            for (let i = 0; i < bigPixels.length; i++) {
                this.otherPixels[i].fill(0);
            }
            numOfTries++;
            this.fillCity(m1, m2);
            for (let i = 0; i < this.a; i++) {
                for (let j = 0; j < this.b; j++) {
                    if (this.otherPixels[i][j] === 20) {
                        sum++;
                    }
                }
            }
            realSize = sum / (this.a * this.b);
            sum = 0;
            this.radius += 2;
            this.radius2 = Math.pow(this.radius, 2);
        }
        this.average();
        for (let i = 0; i < this.a; i++) {
            for (let j = 0; j < this.b; j++) {
                if (this.otherPixels[i][j] === 20 && this.bigPixels[i][j] !== 4) {
                    this.bigPixels[i][j] = 5;
                }
            }
        }
        this.cityProperties();
        console.log(size + " do " + realSize);
    }
    final() {
        return this.bigPixels;
    }
    radiusS(){
        return this.radius;
    }

    radiusB(){
        return this.radius2;
    }
}