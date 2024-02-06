const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

function drawRectanglesFromJson(jsonFilePath) {
    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    jsonData.forEach(({ imageName, words }) => {
        // Create a canvas
        const canvas = createCanvas();
        const ctx = canvas.getContext('2d');

        // Load the image
        loadImage(imageName).then((image) => {
            // Set canvas size to match the image size
            canvas.width = image.width;
            canvas.height = image.height;

            // Draw the image on the canvas
            ctx.drawImage(image, 0, 0);

            // Draw rectangles based on the coordinates from JSON
            words.forEach(({ bbox }) => {
                const { x0, y0, x1, y1 } = bbox;

                // Draw the rectangle
                ctx.strokeStyle = 'red';
                ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
            });

            // Save the canvas as an image
            const outputFilePath = `output_${imageName}`;
            const buffer = canvas.toBuffer('image/png');
            fs.writeFileSync(outputFilePath, buffer);
        });
    });
}

const jsonFilePath = 'bbox_data.json'; // Replace with your actual JSON file path
drawRectanglesFromJson(jsonFilePath);
