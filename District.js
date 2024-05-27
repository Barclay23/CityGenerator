class District {
    constructor(a,b,type, cityProperties, number){
        this.a=a;
        this.b=b;
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
    }
    async addPoint(x,y){
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
}