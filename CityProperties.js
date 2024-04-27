class CityProperties {
    constructor(a,b) {
        this.a = a;
        this.b = b;
        this.allPoints = [];
        this.borderPoints = [];
        this.riverPoints = [];
        this.PMap = new Map();
        this.BMap = new Map();
        this.RBMap = new Map();
    }

    async add(x, y) {
        this.allPoints.push({ x: x, y: y });
        this.PMap.set(x*this.a+y,1);
    }

    async addBor(x, y) {
        this.borderPoints.push({ x: x, y: y });
        this.BMap.set(x*this.a+y,1);
    }
    async addRB(x, y) {
        this.riverPoints.push({ x: x, y: y });
        this.RBMap.set(x*this.a+y,1);
    }

    numOfP() {
        return this.allPoints.length;
    }

    numOfB() {
        return this.borderPoints.length;
    }
    numOfRB(){
        return this.riverPoints.length;
    }

    getP(n) {
        if (n > this.allPoints.length - 1||n<0) {
            return null;
        }
        return this.allPoints[n];
    }

    getB(n) {
        if (n > this.borderPoints.length - 1||n<0) {
            return null;
        }
        return this.borderPoints[n];
    }

    getRB(n){
        if (n > this.riverPoints.length - 1||n<0) {
            return null;
        }
        return this.riverPoints[n];
    }

    isInP(x,y){
        if(this.PMap.get(x * this.a +y)==1){
            return true;
        }
        return false;
    }
    isInB(x,y){
        if(this.BMap.get(x * this.a+y)==1){
            return true;
        }
        return false;
    }

    isInRB(x,y){
        if(this.RBMap.get(x * this.a+y)==1){
            return true;
        }
        return false;
    }
}