class DistricBuilder {
    isInTable(x, y) {
        var a = this.bigPixels.length;
        var b = this.bigPixels[0].length;
        if ((x) > -1 && (x) < b && (y) > -1 && (y) < a) {
            return true;
        }
        return false;
    }
    async border(x, y) {
        var tabX = [x - 1, x, x + 1, x];
        var tabY = [y, y - 1, y, y + 1];
        for (let i = 0; i < 4; i++) {
            if (this.isInTable(tabX[i], tabY[i])) {
                if (this.bigPixels[tabY[i]][tabX[i]] == 4) {
                    this.districts[bigPixels[y][x] - 7].setNW(true);
                }
                if (this.bigPixels[tabY[i]][tabX[i]] > 6) {
                    this.districts[bigPixels[y][x] - 7].addNeighbour(this.bigPixels[tabY[i]][tabX[i]]-7);
                }
            }
        }
    }

    constructor(type, size, cP, terrainUnder) {
        var tabSize = [6, 9, 10];
        this.numOfD = tabSize[size] + Math.round(Math.random() * 2 - 1);
        this.type = type;
        this.cP = cP;
        this.terrainUnder = terrainUnder;
        this.port = false;
        if (cP.numOfRB != 0) {
            this.port = true;
        }
        this.districts = [];
        this.tabTypePos = [3];
        this.tabTypePos[0] = [30, 30, 0, 15, 10, 15];
        this.tabTypePos[1] = [30, 25, 20, 15, 0, 10];
        this.tabTypePos[2] = [30, 25, 20, 0, 10, 15];
    }
    numOfDist() {
        return this.numOfD;
    }
    buildDist(bigPixels) {
        this.bigPixels = bigPixels;
        var distTab = new Array(this.numOfD).fill(0);
        var ter = new Array(this.numOfD);
        for (let i=0; i<this.numOfD; i++){
            ter[i] = new Array(4).fill(0);
        }
        for (let i = 0; i < bigPixels.length; i++) {
            for (let j = 0; j < bigPixels[0].length; j++) {
                if (bigPixels[i][j] > 6) {
                    if (distTab[bigPixels[i][j] - 7] == 0) {
                        var district = new District(bigPixels[0].length, bigPixels.length, -1, this.cP, bigPixels[i][j]-7);
                        this.districts[bigPixels[i][j] - 7] = district;
                        distTab[bigPixels[i][j] - 7] = 1;
                    }
                    ter[bigPixels[i][j] - 7][this.terrainUnder[i][j]]++;
                    this.districts[bigPixels[i][j] - 7].addPoint(j, i);
                    this.border(j, i);
                }
            }
        }
        for (let i = 0; i<this.numOfD; i++){
            var what = 0;
            var most = 0;
            for (let j=0; j<4; j++){
                if(ter[i][j]>most){
                    most = ter[i][j];
                    what = j;
                }
            }
            this.districts[i].setTerrian(what);
        }
    }
    async showNeighbors(){
        for(let i=0; i<this.numOfD;i++){
            console.log("Dzielnica " + i + " "+this.districts[i].getTerrain());
            
        }
    }
}