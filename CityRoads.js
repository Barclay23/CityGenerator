class CityRoads {
    isInTable(x, y) {
        var a = this.bigPixels.length;
        var b = this.bigPixels[0].length;
        if ((x) > -1 && (x) < b && (y) > -1 && (y) < a) {
            return true;
        }
        return false;
    }
    ifBorder(x, y, dist) {
        var white = 0;
        var ifMore = 0;
        var tabX = [x, x + 1, x, x - 1];
        var tabY = [y + 1, y, y - 1, y];
        for (let i = 0; i < 4; i++) {
            if (this.isInTable(tabX[i], tabY[i])) {
                if (this.bigPixels[tabY[i]][tabX[i]] > 6 && !dist.ifInDistrict(tabX[i],tabY[i])) {
                    ifMore = 1;
                }
            }
        }
        for (let i = 0; i < 4; i++) {
            if (this.isInTable(tabX[i], tabY[i]) && this.bigPixels[tabY[i]][tabX[i]] == 6) {
                white++;
            }
        }
        if (ifMore > 0 && white < 2) {
            this.bigPixels[y][x] = 6;
        }
    }
    constructor(bigPixels, distBuld, cP) {
        this.bigPixels = bigPixels;
        this.cP = cP;
        for (let i = 0; i < distBuld.numOfDist(); i++) {
            for (let j = 0; j < distBuld.getDist(i).getSize(); j++) {
                var point = distBuld.getDist(i).getPoint(j);
                this.ifBorder(point.x,point.y,distBuld.getDist(i));
            }
        }

    }
}