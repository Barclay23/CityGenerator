class View {
    constructor() {
        this.map =
            [[128, 128, 128],
            [38, 127, 0],
            [76, 255, 0],
            [255, 216, 0],
            [0, 38, 255],
            [0, 0, 0],
            [255, 255, 255],

            [251, 188, 255],
            [255, 136, 0],
            [255, 12, 16],
            [127, 250, 255],
            [206, 255, 117],
            [255, 0, 182],
            [127, 0, 0],
            [0, 127, 127],
            [127, 106, 0],
            [231, 127, 70],
            [137, 255, 172],

            [190, 127, 70],
            [255, 136, 0],
            [218, 0, 0],
            [127, 0, 0],
            [119, 86, 101],
            [127, 106, 0],
            [63, 24, 0],
            [181, 155, 161]];

        this.buildingIcons = {
            0: "icons/church.png",
            1: "icons/well.png",
            2: "icons/inn.png",
            3: "icons/school.png",
            4: "icons/garner.png",
            5: "icons/workshop.png",
            6: "icons/stables.png",
            7: "icons/market.png",
            8: "icons/town_hall.png",
            9: "icons/relais.png",
            10: "icons/tavern.png",
            11: "icons/crane.png",
            12: "icons/chapel.png",
            13: "icons/arsenal.png",
            14: "icons/gin_mill.png",
        };
    }
    randomize(color) {
        var color2 = [0, 0, 0];
        var randa = Math.floor(Math.random() * 10) - 5;
        var randb = Math.floor(Math.random() * 10) - 5;
        var randc = Math.floor(Math.random() * 10) - 5;
        if (color[0] + randa > -1 && color[0] + randa < 256) {
            color2[0] = color[0] + randa;
        } else {
            color2[0] = color[0];
        }
        if (color[1] + randb > -1 && color[1] + randb < 256) {
            color2[1] = color[1] + randb;
        } else {
            color2[1] = color[1];
        }
        if (color[2] + randc > -1 && color[2] + randc < 256) {
            color2[2] = color[2] + randc;
        } else {
            color2[2] = color[2];
        }
        return color2;
    }
    colormapToRgb(a) {
        if (this.map[a] != null) {
            return this.randomize(this.map[a]);
        }
        else {
            return this.randomize(this.map[18]);
        }
    }
    async show(bigPixels, names, disBuilder) {
        const canvas = document.getElementById("result");
        const ctx = canvas.getContext('2d');
        const y = bigPixels.length * maskSize;
        const x = bigPixels[0].length * maskSize;
        var imageData = canvas.getContext('2d').getImageData(0, 0, x, y);
        for (let i = 0; i < bigPixels.length; i++) {
            for (let j = 0; j < bigPixels[i].length; j++) {
                let color = this.colormapToRgb(bigPixels[i][j]);
                if (typeof color !== 'undefined') {
                    for (let k = i * maskSize; k < maskSize * (i + 1); k++) {
                        for (let l = j * maskSize; l < maskSize * (j + 1); l++) {
                            imageData.data[4 * (l + k * x)] = color[0];
                            imageData.data[4 * (l + k * x) + 1] = color[1];
                            imageData.data[4 * (l + k * x) + 2] = color[2];
                            imageData.data[4 * (l + k * x) + 3] = 255;
                        }
                        //console.log(i+" "+k);
                    }
                }
            }
        }
        canvas.getContext('2d').putImageData(imageData, 0, 0);

        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve(img);
                img.onerror = (err) => reject(err);
            });
        };

        for (let i = 0; i < disBuilder.numOfDist(); i++) {
            let district = disBuilder.getDist(i);
            for (let j = 0; j < district.getBuildingsNumber(); j++) {
                let building = district.getBuildingType(j);
                let img = await loadImage(this.buildingIcons[building]);
                let point = district.getBuildingPoint(j);
                let posX = point.x * maskSize-12;
                let posY = point.y * maskSize-12;
                ctx.drawImage(img, posX, posY);
            }
        }

        ctx.fillStyle = 'black';
        ctx.font = '18px Bell MT';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < names.length; i++) {
            let district = names[i].district;
            let posX = district.x * maskSize + maskSize / 2;
            let posY = district.y * maskSize + maskSize / 2;
            let text = names[i].name;
            let lines = text.split(' ');
            if (lines.length === 2) {
                ctx.fillText(lines[0], posX, posY - 10);
                ctx.fillText(lines[1], posX, posY + 10);
            } else {
                ctx.fillText(text, posX, posY);
            }
        }
    }
}