class District {
    constructor(a,b,type, cityProperties, number){
        this.a=a;
        this.b=b;
        this.type = type;
        this.cP= cityProperties;
        this.number = number;
        this.nearWater = false;
        this.points = [];
        this.PMap = new Map();
        this.terrainUnder = -1;
        this.neighbours = new Map();
        this.size = 0;
    }
    async addPoint(x,y){
        this.points.push({ x: x, y: y });
        this.PMap.set(x*this.a+y,1);
        this.size++;
    }
    async setTerrian(terrain){
        this.terrainUnder=terrain;
    }
    async addNeighbour(neighbour){
        if(this.neighbours.get(neighbour)!=1){
            this.neighbours.set(neighbour,1);
        }
    }
    async setNW(nearWater){
        this.nearWater = nearWater;
    }
}