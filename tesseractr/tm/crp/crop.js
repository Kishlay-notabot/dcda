const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

function cropImagesFromJson(jsonFilePath, outputRootFolder) {
    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    let totalWordCount = 0;
    let croppedWordCount = 0;

    jsonData.forEach(({ imageName, words }) => {
        console.log(`Processing image: ${imageName}`);
        const imagePath = path.join(__dirname, imageName); 

        try {
            const image = loadImage(imagePath);

            // Handle image loading errors
            image.catch((error) => {
                console.error(`Error loading image: ${imageName}`, error);
            });

            image.then((image) => {
                const imageFolderName = path.basename(imageName, path.extname(imageName));
                const outputFolder = path.join(outputRootFolder, imageFolderName);

                // Create the output folder if it doesn't exist
                if (!fs.existsSync(outputFolder)) {
                    fs.mkdirSync(outputFolder);
                }

                words.forEach(({ text, bbox }, index) => {
                    totalWordCount++;

                    console.log(`Processing word: ${text}`);

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
                    const sanitizedText = text.replace(/[^a-zA-Z0-9]/g, '_');
                    const outputFilePath = path.join(outputFolder, `${imageFolderName}_${index + 1}_${sanitizedText}.png`);

                    try {
                        fs.writeFileSync(outputFilePath, canvas.toBuffer('image/png'));
                        console.log(`Cropped and saved: ${outputFilePath}`);
                        croppedWordCount++;
                    } catch (writeError) {
                        console.error(`Error writing file: ${outputFilePath}`, writeError);
                    }
                });

                console.log(`Finished processing image: ${imageName}`);
            });
        } catch (loadError) {
            console.error(`Error loading image: ${imageName}`, loadError);
        }
    });

    console.log(`Total number of words cropped: ${croppedWordCount} out of ${totalWordCount}`);
}

const jsonFilePath = 'ocr_results.json'; // Replace with your actual JSON file path
const outputRootFolder = 'output_images'; // Replace with the desired root output folder

// Create the root output folder if it doesn't exist
if (!fs.existsSync(outputRootFolder)) {
    fs.mkdirSync(outputRootFolder);
}

// Call the function to crop images and log the process
cropImagesFromJson(jsonFilePath, outputRootFolder);
