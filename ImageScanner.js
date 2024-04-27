class ImageScanner {
    constructor(pngFile, maskSize) {
        this.pngFile = pngFile;
        this.maskSize = maskSize;
        this.bigPixels = [];
        this.terrainUnd = [];
        this.colorCounts = new Array(6).fill(0);
    }
    terrainUnder() {
        return this.terrainUnd;
    }
    async scanWithMask() {
        try {
            const image = await this.loadImage(this.pngFile);
            if (!image) {
                console.error("Nie udało się wczytać obrazu PNG.");
                return;
            }
            this.processImageWithMask(image, this.maskSize);
        } catch (error) {
            console.error("Wystąpił błąd podczas skanowania obrazu:", error);
        }
        return this.bigPixels;
    }

    loadImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.onerror = (error) => reject(error);
                image.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    processImageWithMask(image, maskSize) {
        const width = image.width - image.width % maskSize;
        const height = image.height - image.width % maskSize;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d', { willReadFrequently: true });
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        for (let i = 0; i < height / maskSize; i++) {
            this.bigPixels[i] = new Array(width / maskSize);
            this.terrainUnd[i] = new Array(width / maskSize);
        }
        console.log("szerokosc = " + width);
        console.log("wysokosc = " + height);
        var result;

        var imageData = context.getImageData(0, 0, width, height);

        for (let y = 0; y <= height - maskSize; y += maskSize) {
            for (let x = 0; x <= width - maskSize; x += maskSize) {
                result = this.scanWithMaskAtPoint(imageData, maskSize, x, y, context);
                this.bigPixels[y / maskSize][x / maskSize] = result;
                this.terrainUnd[y / maskSize][x / maskSize] = result;
            }
        }
    }

    scanWithMaskAtPoint(imageData, maskSize, startX, startY, context) {
        var red;
        var green;
        var blue;
        var color;

        for (let y = startY; y < startY + maskSize; y++) {
            for (let x = startX; x < startX + maskSize; x++) {
                let idx = (y * imageData.width + x) * 4;
                red = imageData.data[0 + idx];
                green = imageData.data[1 + idx];
                blue = imageData.data[2 + idx];
                color = this.getPixelColor(red, green, blue);
                this.colorCounts[color]++;
            }
        }
        let mostCommonColor = 0;
        for (let i = 0; i < 6; i++) {
            if (this.colorCounts[i] > this.colorCounts[mostCommonColor]) {
                mostCommonColor = i;
            }
        }
        this.colorCounts.fill(0);
        return mostCommonColor;
    }

    colorDistance(a, b) {
        let dr = (a[0] - b[0]);
        let dg = (a[1] - b[1]);
        let db = (a[2] - b[2]);
        return dr * dr + dg * dg + db * db;
    }

    getPixelColor(red, green, blue) {
        let best = 0;

        let pixel = [red, green, blue];

        for (let i = 1; i < map.length; i++) {
            if (this.colorDistance(map[best], pixel) > this.colorDistance(map[i], pixel)) {
                best = i;
            }
        }

        return best;
    }
}