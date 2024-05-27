const map = 
[[128, 128, 128], 
[38, 127, 0], 
[76, 255, 0], 
[255, 216, 0], 
[0, 38, 255], 
[0, 0, 0], 
[255, 255, 255],

[251,188,255],
[255,136,0],
[255,12,16],
[127,250,255],
[206,255,117],
[255,0,182],
[127,0,0],
[0,127,127],
[127,106,0],
[231,127,70],
[137,255,172],

[190,127,70],
[255,136,0],
[218,0,0],
[127,0,0],
[119,86,101],
[127,106,0],];
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
    var borders = new CityBorders(bigPixels, middle, citySize, terrain, cityProperties);
    console.log("Ilosc punktow: " + cityProperties.numOfP() + " Ilosc granicznych: " + cityProperties.numOfB() + " Ilosc przy rzece: "+ cityProperties.numOfRB());
    bigPixels = borders.final();
    var radius = borders.radiusS();
    var disBuilder = new DistricBuilder(cityType,citySize,cityProperties, terrainUnder);
    var numOfDist = disBuilder.numOfDist();
    var distBorders = new DistricBorders(bigPixels, cityProperties, radius, numOfDist, middle, citySize);
    disBuilder.buildDist(bigPixels);
    disBuilder.colorDistricts();
    var cityRoad = new CityRoads(bigPixels, disBuilder,cityProperties);
    var view = new View();
    view.show(bigPixels);
    disBuilder.showTypes();
    const endTime = Date.now();
    console.log("Czas trwania:" + (endTime - startTime) / 1000);
}