const { createWorker, createScheduler } = require('tesseract.js');
const path = require('path');
const fs = require('fs').promises;

async function processImages() {
  const folderPath = path.resolve(__dirname, './testing');

  try {
    // Read image files from the specified folder
    console.log('Reading files from the specified folder:', folderPath);
    const files = await fs.readdir(folderPath);

    if (files.length === 0) {
      throw new Error('No image files found in the specified folder.');
    }

    console.log('Number of image files found:', files.length);

    const imageArr = files.map(file => path.join(folderPath, file));

    // Create a scheduler and workers
    const scheduler = createScheduler();

    const workerGen = async (index) => {
      const worker = await createWorker("hin", 1, { logger: m => console.log(`[Worker ${index}] ${m}`), cachePath: "." });
      scheduler.addWorker(worker);
    };

    const workerN = 7; // Adjust worker pool size as needed
    await Promise.all(Array(workerN).fill(0).map(async (_, index) => await workerGen(index))); // Create workers concurrently

    // Process images in parallel
    console.log('Processing images and performing OCR:');

    const jobPromises = imageArr.map(async (imagePath) => {
      console.log(`Scheduling image processing for: ${imagePath}`);
      const out = await scheduler.addJob('recognize', imagePath);
      console.log(`[Main] Processing completed for: ${imagePath}`);
      
      return {
        imageName: path.basename(imagePath),
        words: out.data.words.map(word => ({
          text: word.text,
          confidence: word.confidence.toFixed(2),
          bbox: word.bbox,
        })),
      };
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

processImages();
