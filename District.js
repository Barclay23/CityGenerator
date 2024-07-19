class District {
    constructor(a,b,type, cityProperties, number){

        this.a=a;
        this.b=b;
        this.x=0;
        this.y=0;
        this.xSum=0;
        this.ySum=0;
        this.type = type;
        this.cP = cityProperties;
        this.number = number;
        this.nearWater = false;
        this.points = [];
        this.PMap = new Map();
        this.terrainUnder = -1;
        this.nMAP = new Map();
        this.neighbours = [];
        this.size = 0;
        this.buildings = [];
        this.buildingPoints = [];
    }
    async addPoint(x,y){
        this.xSum+=x;
        this.ySum+=y;
        if(!this.points.includes({x,y})){
            this.points.push({ x: x, y: y });
            this.PMap.set(x*this.a+y,1);
            this.size++;
        }
    }
    async setTerrian(terrain){
        this.terrainUnder=terrain;
    }
    async addNeighbour(neighbour){
        if(this.nMAP.get(neighbour)!=1 && neighbour != this.number){
            this.nMAP.set(neighbour,1);
            this.neighbours.push(neighbour);
        }
    }
    async setNW(nearWater){
        this.nearWater = nearWater;
    }
    setType(type){
        this.type = type;
    }
    getNeighbours(){
        return this.neighbours;
    }
    getType(){
        return this.type;
    }
    ifNearWater(){
        return this.nearWater;
    }
    getTerrain(){
        return this.terrainUnder;
    }
    getSize(){
        return this.size;
    }
    getPoint(num){
        return this.points[num];
    }
    setCenter(){
        this.x = this.xSum/this.size;
        this.y = this.ySum/this.size;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    ifInDistrict(x, y) {
        return this.PMap.has(x * this.a + y);
    }
    async addBuilding(type, x, y){
        if(!this.buildings.includes(type) && !this.buildingPoints.includes({x,y})){
            this.buildings.push(type);
            this.buildingPoints.push({ x: x, y: y });
        }
    }
    getBuildingType(index){
        if(index<this.buildings.length){
            return this.buildings[index];
        }
    }
    getBuildingPoint(index){
        if(index<this.buildings.length){
            return this.buildingPoints[index];
        }
    }
    getBuildingsNumber(){
        return this.buildings.length;
    }
}