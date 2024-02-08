const { createWorker, createScheduler } = require('tesseract.js');
const path = require('path');
const fs = require('fs').promises;

async function processImages() {
  const folderPath = path.resolve(__dirname, './input_images');

  try {
    // Read image files from the specified folder
    console.log('Reading files from the specified folder:', folderPath);
    const files = await fs.readdir(folderPath);

    if (files.length === 0) {
      throw new Error('No image files found in the specified folder.');
    }

    console.log('Number of image files found:', files.length);

    const imageArr = files.map(file => path.join(folderPath, file));

    // Define a whitelist of allowed characters
    const whitelist = new Set(['द']);

    // Create a scheduler and workers
    const scheduler = createScheduler();

    const workerGen = async () => {
      const worker = await createWorker("hin", 1, { logger: m => console.log(m), cachePath: "." });
      scheduler.addWorker(worker);
    };

    const workerN = 7; // Adjust worker pool size as needed
    await Promise.all(Array(workerN).fill(0).map(async () => await workerGen())); // Create workers concurrently

    // Process images in parallel
    console.log('Processing images and performing OCR:');

    const jobPromises = imageArr.map(async (imagePath) => {
      console.log(`Scheduling image processing for: ${imagePath}`);
      return scheduler.addJob('recognize', imagePath)
        .then(out => ({
          imageName: path.basename(imagePath),
          symbols: out.data.symbols
            .filter(symbol => whitelist.has(symbol.text.toLowerCase())) // Filter symbols based on the whitelist
            .map(symbol => ({
              text: symbol.text,
              confidence: symbol.confidence.toFixed(2),
              bbox: symbol.bbox,
            })),
        }))
        .catch(error => ({
          imageName: path.basename(imagePath),
          error: error.message,
        }));
    });

    const results = await Promise.all(jobPromises);

    // Terminate workers and save results
    await scheduler.terminate();

    console.log('OCR processing completed.');

    const jsonFilePath = path.resolve(__dirname, 'ocr_results.json');
    console.log('Exporting OCR results to JSON file:', jsonFilePath);
    await fs.writeFile(jsonFilePath, JSON.stringify(results, null, 2));

    console.log('OCR results saved to:', jsonFilePath);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the function to process images
processImages();
