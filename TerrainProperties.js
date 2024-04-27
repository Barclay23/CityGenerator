class TerrainProperties{
    constructor(variant){
        var chances=[0.1,0.3,0.6,0.75];
        this.terrain=[];
        for(let i=0;i<6;i++){
            this.terrain[i]=new Array(6);
            this.terrain[i].fill(0);
        }
        for(let i=0;i<4;i++){
            for(let j=0;j<4;j++){
                if(j!=i){
                    if(chances[j]>Math.random()){
                        this.terrain[i][j]=1;
                    }
                }
                else{
                    if(variant==2){
                        this.terrain[i][j]=0.54;
                    }
                    else{
                        this.terrain[i][j]=0.5;
                    }
                }
            }
        }
        for(let i=0;i<6;i++){
            this.terrain[i][5]=1;
            this.terrain[5][i]=1;
        }
        if(variant!=0){
            for(let i=0;i<6;i++){
                this.terrain[i][4]=1;
                this.terrain[4][i]=1;
            }
        }
        else{
            for(let i=0;i<6;i++){
                this.terrain[i][4]=0;
                this.terrain[4][i]=0;
            }
        }
    }
    final(){
        return this.terrain;
    }
    show(){
        var nazwy=["Góry ","Las ","Łąka ","Pole ","Rzeka ","Miasto "]
        var string="    ";
        for(let i=0;i<6;i++){
            string+=nazwy[i];
        }
        console.log(string);
        for(let i=0;i<6;i++){
            string="";
            string+=nazwy[i];
            for(let j=0;j<6;j++){
                string+=this.terrain[i][j]+" ";
            }
            console.log(string);
        }
    }
}