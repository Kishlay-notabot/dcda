const { createWorker, createScheduler } = require('tesseract.js');
const path = require('path');
const fs = require('fs').promises;

async function processImages() {
  const folderPath = path.resolve(__dirname, './testing');

  try {
    const files = await fs.readdir(folderPath);

    if (files.length === 0) {
      throw new Error('No image files found in the specified folder.');
    }

    const imageArr = files.map(file => path.join(folderPath, file));

    const scheduler = createScheduler();

    const workerGen = async () => {
      const worker = await createWorker("hin", 1, { logger: m => { console.log(m) }, cachePath: "." });
      scheduler.addWorker(worker);
    }

    const workerN = 2;

    const resArr = Array(workerN);
    for (let i = 0; i < workerN; i++) {
      resArr[i] = workerGen();
    }
    await Promise.all(resArr);

    const results = [];

    for (let i = 0; i < imageArr.length; i++) {
      const imagePath = imageArr[i];
      const out = await scheduler.addJob('recognize', imagePath);
      const result = {
        imageName: path.basename(imagePath),
        words: out.data.words.map(word => ({
          text: word.text,
          confidence: word.confidence.toFixed(2),
          bbox: word.bbox,
        })),
      };
      results.push(result);
    }

    await scheduler.terminate(); //terminate workers

    // Save the results as a JSON file
    const jsonFilePath = path.resolve(__dirname, 'ocr_results.json');
    await fs.writeFile(jsonFilePath, JSON.stringify(results, null, 2));

    console.log('OCR results saved to:', jsonFilePath);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

processImages();
