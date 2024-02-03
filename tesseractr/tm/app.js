const { createWorker, createScheduler } = require('tesseract.js');
const path = require('path');
const fs = require('fs');


const imageFolder = path.resolve(__dirname, './testing');
const imageArr = fs.readdirSync(imageFolder)
  .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
  .map(file => path.resolve(imageFolder, file));
const scheduler = createScheduler();
// workers
const workerGen = async () => {
  const worker = await createWorker("hin", 1, { logger: m => { console.log(m) }, cachePath: "." });
  scheduler.addWorker(worker);
}

const workerN = 4;
(async () => {
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
})();