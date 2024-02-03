const { createWorker, createScheduler } = require('tesseract.js');
const path = require('path');
const fs = require('fs').promises;

async function processImages() {
  const folderPath = path.resolve(__dirname, './testing'); // Specify the folder path

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

    const resArr2 = Array(imageArr.length);

    for (let i = 0; i < imageArr.length; i++) {
      const imagePath = imageArr[i];
      resArr2[i] = scheduler.addJob('recognize', imagePath).then((x) => console.log(x.data.text));
    }

    await Promise.all(resArr2);

    await scheduler.terminate(); //terminate workers
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the async function
processImages();
