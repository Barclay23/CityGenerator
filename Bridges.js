class Bridges {
    addNeighbours(index){
        var tab = this.disBuilder.getDist(index).getNeighbours();
        for(let i=0; i<tab.length; i++){
            if(this.list[tab[i]] == -1){
                this.list[tab[i]] = this.which;
                this.addNeighbours(tab[i]);
            }
        }
    }
    constructor(disBuilder, bigPixels){
        this.disBuilder = disBuilder;
        var parts =[];
        this.which = 0;
        var index = 0;
        this.list = new Array(disBuilder.numOfDist()).fill(-1);
        while (this.list.includes(-1)){
            parts[this.which] = [];
            for(let i=0; i<disBuilder.numOfDist(); i++){
                if(this.list[i] == -1){
                    index = i;
                    break;
                }
            }
            this.list[index] = this.which;
            this.addNeighbours(index);
            for(let i = 0; i<this.list.length; i++){
                if(this.list[i] == this.which){
                    parts[this.which].push(i);
                }
            }
            this.which++;
        }
        console.log("Części: "+this.which);
    }
}