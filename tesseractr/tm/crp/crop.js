const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

function cropImagesFromJson(jsonFilePath, outputFolder) {
    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    jsonData.forEach(({ imageName, words }) => {
        console.log(`Processing image: ${imageName}`);

        // Load the image
        loadImage(imageName).then((image) => {
            words.forEach(({ text, bbox }) => {
                const { x0, y0, x1, y1 } = bbox;

                // Calculate width and height of the cropped region
                const width = x1 - x0;
                const height = y1 - y0;

                // Create a canvas for cropping
                const canvas = createCanvas(width, height);
                const ctx = canvas.getContext('2d');

                // Crop the region from the original image
                ctx.drawImage(image, x0, y0, width, height, 0, 0, width, height);

                // Save the cropped image to the output folder
                const outputFilePath = path.join(outputFolder, `${text}_${imageName}`);
                const buffer = canvas.toBuffer('image/png');
                fs.writeFileSync(outputFilePath, buffer);

                console.log(`Cropped and saved: ${outputFilePath}`);
            });

            console.log(`Finished processing image: ${imageName}`);
        });
    });
}

const jsonFilePath = 'bbox_data.json'; // Replace with your actual JSON file path
const outputFolder = 'output_images'; // Replace with the desired output folder

// Create the output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

// Call the function to crop images and log the process
cropImagesFromJson(jsonFilePath, outputFolder);
