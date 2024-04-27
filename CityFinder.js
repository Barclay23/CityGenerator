class CityFinder{
    constructor(bigPixels){
        const y = bigPixels.length;
        const x = bigPixels[0].length;
        var x2=-1;
        var x1=x+1;
        var y2=-1;
        var y1=y+1;
        for(let i=0; i<y; i++){
            for(let j=0; j<x; j++){
                if(bigPixels[i][j]===5){
                    if(i<y1){
                        y1=i;
                    }
                    if(i>y2){
                        y2=i;
                    }
                    if(j<x1){
                        x1=j;
                    }
                    if(j>x2){
                        x2=j;
                    }
                }
            }
        }
        var m1;
        var m2;
        var middle={m1,m2};
        if(x2==-1){
            middle.m1=-1;
            middle.m2=-1;
            return middle;
        }
        middle.m1=Math.round((x1+x2)/2);
        middle.m2=Math.round((y1+y2)/2);
        return middle;
    }
}