const { createWorker, createScheduler } = require('tesseract.js');
const path = require('path');
const [,, imagePath] = process.argv;

// Note: This example recognizes the same image 4 times in parallel 
// to show how schedulers can be used to speed up bulk jobs.
// In actual use you would (obviously) not want to run multiple identical jobs.


                // /   = Root directory
                // .   = This location
                // ..  = Up a directory
                // ./  = Current directory
                // ../ = Parent of current directory
                // ../../ = Two directories backwards

const image = path.resolve(__dirname, (imagePath || '../tss.jpg'));
const imageArr = [image];

const scheduler = createScheduler();

// Creates worker and adds to scheduler
const workerGen = async () => {
  const worker = await createWorker("hin", 1, {cachePath: "."});
  scheduler.addWorker(worker);
}

const workerN = 4;
(async () => {
  const resArr = Array(workerN);
  for (let i=0; i<workerN; i++) {
    resArr[i] = workerGen();
  }
  await Promise.all(resArr);

  const resArr2 = Array(imageArr.length);

  for (let i = 0; i < imageArr.length; i++) {
    resArr2[i] = scheduler.addJob('recognize', image).then((x) => console.log(x.data.text));
  }

  await Promise.all(resArr2);

  await scheduler.terminate(); // It also terminates all workers.
})();