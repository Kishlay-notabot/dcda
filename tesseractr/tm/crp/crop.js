const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

function drawRectangle() {
    
    const canvas = createCanvas();
    const ctx = canvas.getContext('2d');

    loadImage('tss.jpg').then((image) => {
        
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);

        const rectWidth = 100;
        const rectHeight = 100;

        const rectLeft = (canvas.width - rectWidth) / 2;
        const rectTop = (canvas.height - rectHeight) / 2;

        ctx.strokeStyle = 'red';
        ctx.strokeRect(rectLeft, rectTop, rectWidth, rectHeight);
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync('output.png', buffer);
    });
}

drawRectangle();
