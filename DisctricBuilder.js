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
                    this.districts[bigPixels[y][x] - 7].addNeighbour(this.bigPixels[tabY[i]][tabX[i]]);
                }
            }
        }
    }

    constructor(type, size, cP) {
        var tabSize = [6, 9, 10];

        this.numOfD = tabSize[size] + Math.round(Math.random() * 2 - 1);
        this.type = type;
        this.cP = cP;
        this.port = false;
        if (cP.numOfRB != 0) {
            this.port = true;
        }
        this.districts = [];
    }
    numOfDist() {
        return this.numOfD;
    }
    buildDist(bigPixels) {
        this.bigPixels = bigPixels;
        var distTab = new Array(this.numOfD).fill(0);
        for (let i = 0; i < bigPixels.length; i++) {
            for (let j = 0; j < bigPixels[0].length; j++) {
                if (bigPixels[i][j] > 6) {
                    if (distTab[bigPixels[i][j] - 7] == 0) {
                        var district = new District(bigPixels[0].length, bigPixels.length, 0, this.cP, bigPixels[i][j]);
                        this.districts[bigPixels[i][j] - 7] = district;
                        distTab[bigPixels[i][j] - 7] = 1;
                    }
                    this.districts[bigPixels[i][j] - 7].addPoint(j, i);
                    this.border(j, i);
                }
            }
        }
    }
}