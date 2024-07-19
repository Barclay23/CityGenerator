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
                    this.districts[bigPixels[y][x] - 7].addNeighbour(this.bigPixels[tabY[i]][tabX[i]] - 7);
                }
            }
        }
    }
    choosingTypes() {
        var used = new Array(this.numOfD).fill(-1);
        var howMany = 0;
        var which = -1;
        var whichType = 0;
        for (let i = 0; i < 3; i++) {
            while (howMany != i + 1) {
                which = Math.round(Math.random() * (this.numOfD - 1));
                if (!used.includes(which)) {
                    if (i < 1) {
                        if (this.mandatoryDis[this.type] == 3) {
                            if (this.districts[which].ifNearWater()) {
                                this.districts[which].setType(this.mandatoryDis[this.type]);
                                this.listOfTypes.push(this.mandatoryDis[this.type]);
                                used[howMany] = which;
                                howMany++;
                            }
                        }
                        else if (this.mandatoryDis[this.type] == 4) {
                            var cuSize = 0;
                            var cuDis = which;
                            for (let j = 0; j < this.numOfD; j++) {
                                if (this.districts[j].getSize() > cuSize && !used.includes(this.districts[j])) {
                                    cuDis = j;
                                    cuSize = this.districts[j].getSize();
                                }
                            }
                            this.districts[cuDis].setType(this.mandatoryDis[this.type]);
                            used[howMany] = cuDis;
                            this.listOfTypes.push(this.mandatoryDis[this.type]);
                            howMany++;
                        }
                        else {
                            this.districts[which].setType(this.mandatoryDis[this.type]);
                            this.listOfTypes.push(this.mandatoryDis[this.type]);
                            used[howMany] = which;
                            howMany++;
                        }

                    }
                    else {
                        this.districts[which].setType(i - 1);
                        this.listOfTypes.push(i - 1);
                        used[howMany] = which;
                        howMany++;
                    }
                }
            }
        }
        while (howMany < this.numOfD) {
            whichType = (Math.random() * 100);
            var sum = 0;
            for (let i = 0; i < this.tabTypePos[0].length; i++) {
                sum += this.tabTypePos[this.type][i];
                if (sum >= whichType) {
                    whichType = i;
                    break;
                }
            }
            if (this.ifPossible[whichType] == 0) {
                which = Math.round(Math.random() * (this.numOfD - 1));
                if (!used.includes(which) && (whichType != 3 || this.districts[which].ifNearWater())) {
                    if (whichType == 4) {
                        var cuSize = 0;
                        var cuDis = which;
                        for (let j = 0; j < this.numOfD; j++) {
                            if (this.districts[j].getSize() > cuSize && !used.includes(this.districts[j])) {
                                cuDis = j;
                                cuSize = this.districts[j].getSize();
                            }
                        }
                        this.districts[cuDis].setType(whichType);
                        used[howMany] = cuDis;
                    }
                    else {
                        used[howMany] = which;
                        this.districts[which].setType(whichType);
                    }
                    if (whichType == 2 || whichType == 3 || whichType == 4) {
                        this.ifPossible[whichType] = 1;
                    }
                    this.listOfTypes.push(whichType);
                    howMany++;
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

        this.buildingTypes = [6];
        this.buildingTypes[0] = [0, 1, 2, 3];
        this.buildingTypes[1] = [6, 5, 4];
        this.buildingTypes[2] = [9, 8, 7, 0];
        this.buildingTypes[3] = [10, 11, 5];
        this.buildingTypes[4] = [12, 13, 6];
        this.buildingTypes[5] = [1, 14, 12];

        this.tabTypePos = [3];
        this.tabTypePos[0] = [30, 30, 0, 15, 10, 15];
        this.tabTypePos[1] = [30, 25, 20, 15, 0, 10];
        this.tabTypePos[2] = [30, 25, 20, 0, 10, 15];
        this.ifPossible = new Array(6).fill(0);
        this.mandatoryDis = [2, 4, 3];
        this.listOfTypes = new Array();
        if (this.port == false) {
            this.ifPossible[2] = 1;
            if (type == 2) {
                this.mandatoryDis[2] = 2;
            }
        }
        this.ifPossible[this.mandatoryDis[type]] = 1;
    }
    numOfDist() {
        return this.numOfD;
    }
    buildDist(bigPixels) {
        this.bigPixels = bigPixels;
        var distTab = new Array(this.numOfD).fill(0);
        var ter = new Array(this.numOfD);
        for (let i = 0; i < this.numOfD; i++) {
            ter[i] = new Array(4).fill(0);
        }
        for (let i = 0; i < bigPixels.length; i++) {
            for (let j = 0; j < bigPixels[0].length; j++) {
                if (bigPixels[i][j] > 6) {
                    if (distTab[bigPixels[i][j] - 7] == 0) {
                        var district = new District(bigPixels[0].length, bigPixels.length, 0, this.cP, bigPixels[i][j] - 7);
                        this.districts[bigPixels[i][j] - 7] = district;
                        distTab[bigPixels[i][j] - 7] = 1;
                    }
                    ter[bigPixels[i][j] - 7][this.terrainUnder[i][j]]++;
                    this.districts[bigPixels[i][j] - 7].addPoint(j, i);
                    this.border(j, i);
                }
            }
        }
        for (let i = 0; i < this.numOfD; i++) {
            var what = 0;
            var most = 0;
            for (let j = 0; j < 4; j++) {
                if (ter[i][j] > most) {
                    most = ter[i][j];
                    what = j;
                }
            }
            this.districts[i].setTerrian(what);
            this.districts[i].setCenter();
        }
        this.choosingTypes();
    }
    async showTypes() {
        this.listOfTypes.sort();
        console.log(this.listOfTypes);
    }
    async whichColor(x, y) {
        var dist = this.bigPixels[y][x] - 7;
        this.bigPixels[y][x] = this.districts[dist].getType() + 18;
    }
    colorDistricts() {
        for (let i = 0; i < this.bigPixels.length; i++) {
            for (let j = 0; j < this.bigPixels[0].length; j++) {
                if (this.bigPixels[i][j] > 6) {
                    this.whichColor(j, i);
                }
            }
        }
    }
    async randomBuilding(district) {
        var size = district.getSize();
        var howMany = 1;
        if (size > 500) {
            howMany++;
        }
        if (size > 1000) {
            howMany++;
        }
        var num = 0;
        var rand1, rand2, point;
        var used = new Array(this.buildingTypes[district.getType()].length).fill(false);
        var timeout = 0;
        var ifGood = true;

        while (num < howMany) {
            ifGood = true;
            timeout++;
            if (timeout > 1000) {
                num = howMany;
            }
            rand1 = Math.floor(Math.random() * this.buildingTypes[district.getType()].length);
            rand2 = Math.floor(Math.random() * district.getSize());
            point = district.getPoint(rand2);
            var tabX = [point.x - 1, point.x, point.x + 1, point.x];
            var tabY = [point.y, point.y - 1, point.y, point.y + 1];
            for(let i=0; i<4; i++){
                if(!district.ifInDistrict(tabX[i],tabY[i])){
                    ifGood = false;
                    break;
                }
            }
            if (ifGood && !used[rand1] && this.bigPixels[point.y][point.x] > 6) {
                used[rand1] = true;
                district.addBuilding(this.buildingTypes[district.getType()][rand1], point.x, point.y);
                for (let i = -3; i < 4; i++) {
                    for (let j = -3; j < 4; j++) {
                        if (district.ifInDistrict(point.x + i, point.y + j) && this.bigPixels[point.y + j][point.x + i] > 6) {
                            this.bigPixels[point.y + j][point.x + i] = 5;
                        }
                    }
                }
                num++;
            }
        }
    }
    async cleanUp(district) {
        var size = district.getSize();
        var point;
        var type = district.getType() + 18;
        for (let i = 0; i < size; i++) {
            point = district.getPoint(i);
            if (this.bigPixels[point.y][point.x] != type && this.bigPixels[point.y][point.x] != 6) {
                this.bigPixels[point.y][point.x] = type;
            }
        }
    }
    lSystem(x, y, district, which) {
        this.bigPixels[y][x] = 6;
        var tabX = [x - 1, x, x + 1, x];
        var tabY = [y, y - 1, y, y + 1];
        for(let i=0; i<4; i++){
            if(!district.ifInDistrict(tabX[i],tabY[i])){
                return;
            }
        }
        var direction;
        direction = Math.floor(Math.random() * this.possible[0].length);
        var x2 = x + this.possible[which][direction].dx;
        var y2 = y + this.possible[which][direction].dy;
        if (district.ifInDistrict(x2, y2) && this.bigPixels[y2][x2] != 6) {
            this.lSystem(x2, y2, district, which);
        }
    }
    async extraRoads(district) {
        var point;
        var which1 = 0;
        var which2 = 1;
        for (let i = 0; i < district.getBuildingsNumber(); i++) {
            point = district.getBuildingPoint(i);
            which1 = Math.floor(Math.random() * 4);
            which2 = (which1+2)%4;
            //console.log(which1+" "+which2);
            this.lSystem(point.x, point.y, district, which1);
            this.lSystem(point.x, point.y, district, which2);
        }
    }
    async addBuildings() {
        this.possible = [4];
        this.possible[0] = [{ dx: 1, dy: 0 }, { dx: 0, dy: -1 },{ dx: 1, dy: -1 }];
        this.possible[1] = [{ dx: 1, dy: 0 }, { dx: 0, dy: 1 },{ dx: 1, dy: 1 }];
        this.possible[2] = [{ dx: -1, dy: 0 }, { dx: 0, dy: 1 },{ dx: -1, dy: 1 }];
        this.possible[3] = [{ dx: -1, dy: 0 }, { dx: 0, dy: -1 },{ dx: -1, dy: -1 }];
        for (let i = 0; i < this.districts.length; i++) {
            await this.randomBuilding(this.districts[i]);
        }
        for (let i = 0; i < this.districts.length; i++) {
            await this.cleanUp(this.districts[i]);
        }
        for (let i = 0; i < this.districts.length; i++) {
            await this.extraRoads(this.districts[i]);
        }
    }
    async showSizes() {
        for (let i = 0; i < this.numOfD; i++) {
            console.log(i + " " + this.districts[i].getSize());
        }
    }
    getDist(num) {
        return this.districts[num];
    }
}