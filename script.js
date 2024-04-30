const map = [[128, 128, 128], [38, 127, 0], [76, 255, 0], [255, 216, 0], [0, 38, 255], [0, 0, 0], [255, 255, 255],[251,188,255],[255,136,0],[255,12,16],[127,250,255],[206,255,117],[255,0,182],[127,0,0],[0,127,127],[127,106,0],[231,127,70]]
var bigPixels;
var terrainUnder;
var maskSize;
var citySize;
var cityType;
var selectedSizeOption = "option1";
var selectedMaskOption = "option3";
var selectedTypeOption = "option1";
function selectSizeOption() {
    selectedSizeOption = document.getElementById("sizeOptions").value;
    updateSizes();
}

function selectMaskOption() {
    selectedMaskOption = document.getElementById("maskOptions").value;
    updateSizes();
}

function selectTypeOption() {
    selectedTypeOption = document.getElementById("typeOptions").value;
    updateSizes();
    
}
function updateSizes(){
    switch (selectedTypeOption) {
        case "option1":
            cityType = 0;
            break;
        case "option2":
            cityType = 1;
            break;
        case "option3":
            cityType = 2;
            break;
        default:
            cityType = 0;
            break;
    }
    switch (selectedMaskOption) {
        case "option1":
            maskSize = 1;
            break;
        case "option2":
            maskSize = 2;
            break;
        case "option3":
            maskSize = 5;
            break;
        case "option4":
            maskSize = 10;
            break;
        default:
            maskSize = 5;
            break;
    }
    switch (selectedSizeOption) {
        case "option1":
            citySize = 0;
            break;
        case "option2":
            citySize = 1;
            break;
        case "option3":
            citySize = 2;
            break;
        default:
            citySize = 0;
            break;
    }
}
function colormapToRgb(a) {
    return map[a]
}
async function show() {
    const canvas = document.getElementById("result");
    const y = bigPixels.length * maskSize;
    const x = bigPixels[0].length * maskSize;
    var imageData = canvas.getContext('2d').getImageData(0, 0, x, y);
    for (let i = 0; i < bigPixels.length; i++) {
        //const row = document.createElement('tr');
        for (let j = 0; j < bigPixels[i].length; j++) {
            let color = colormapToRgb(bigPixels[i][j]);
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
}

async function test() {
    const startTime = Date.now();
    selectedMaskOption = document.getElementById("maskOptions").value;
    selectedSizeOption = document.getElementById("sizeOptions").value;
    selectedTypeOption = document.getElementById("typeOptions").value;
    updateSizes();
    const fileInput = document.getElementById("pngFileInput");
    const file = fileInput.files[0];
    if (!file) {
        console.error("No PNG choosen.");
        return;
    }
    const scanner = new ImageScanner(file, maskSize);
    bigPixels = await scanner.scanWithMask();
    terrainUnder = scanner.terrainUnder();
    var m1;
    var m2;
    var middle = { m1, m2 };
    middle = new CityFinder(bigPixels);
    var ter = new TerrainProperties(citySize);
    var terrain = ter.final();
    var cityProperties = new CityProperties(bigPixels[0].length, bigPixels.length);
    var borders = new Cityborders(bigPixels, middle, citySize, terrain, cityProperties);
    console.log("Ilosc punktow: " + cityProperties.numOfP() + " Ilosc granicznych: " + cityProperties.numOfB() + " Ilosc przy rzece: "+ cityProperties.numOfRB());
    bigPixels = borders.final();
    var radius = borders.radiusS();
    var disBuilder = new DistricBuilder(cityType,citySize,cityProperties, terrainUnder);
    var numOfDist = disBuilder.numOfDist();
    var cityRoads = new CityRoads(bigPixels, cityProperties, radius, numOfDist, middle, citySize);
    disBuilder.buildDist(bigPixels);
    show();
    //disBuilder.showNeighbors();
    const endTime = Date.now();
    console.log("Czas trwania:" + (endTime - startTime) / 1000);
}