const fs = require('fs').promises;
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

async function cropWordsFromImages(ocrResultsPath, outputFolder) {
  try {

    const ocrResults = await fs.readFile(ocrResultsPath, 'utf-8');
    const ocrData = JSON.parse(ocrResults);

    const outputFolderPath = path.resolve(__dirname, outputFolder);
    await fs.mkdir(outputFolderPath, { recursive: true });

    for (const result of ocrData) {
      const imagePath = path.resolve(__dirname, 'testing', result.imageName);

      const image = await loadImage(imagePath);

      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);

      for (const word of result.words) {
        const { bbox } = word;

        // Create a new canvas for the cropped word
        const croppedCanvas = createCanvas(bbox.width, bbox.height);
        const croppedCtx = croppedCanvas.getContext('2d');

        croppedCtx.drawImage(canvas, bbox.x, bbox.y, bbox.width, bbox.height, 0, 0, bbox.width, bbox.height);

        const outputFilePath = path.resolve(outputFolderPath, `${result.imageName}_${word.text}.png`);
        await fs.writeFile(outputFilePath, croppedCanvas.toBuffer());

        console.log(`Cropped word saved: ${outputFilePath}`);
      }
    }

    console.log('Cropping and saving completed.');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const ocrResultsPath = path.resolve(__dirname, 'testing', 'ocr_results.json');
const outputFolder = 'cropped_images';
cropWordsFromImages(ocrResultsPath, outputFolder);