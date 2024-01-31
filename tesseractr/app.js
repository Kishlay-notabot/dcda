const { createWorker, createScheduler } = require('tesseract.js');

const runRecognition = async () => {
  const scheduler = createScheduler();
  const worker1 = await createWorker('eng');
  const worker2 = await createWorker('eng');

  scheduler.addWorker(worker1);
  scheduler.addWorker(worker2);

  /** Add 10 recognition jobs */
  const results = await Promise.all(Array(10).fill(0).map(() => (
    scheduler.addJob('recognize', 'https://tesseract.projectnaptha.com/img/eng_bw.png')
  )));

  console.log(results);
  await scheduler.terminate(); // It also terminates all workers.
};

// Call the asynchronous function
runRecognition();
