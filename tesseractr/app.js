const { createWorker } = require('tesseract.js');

(async () => {
  const worker = createWorker({
    logger: info => console.log(info),
  });

  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');

  await worker.setParameters({
    tessedit_char_whitelist: '0123456789',
  });

  try {
    const { data: { text } } = await worker.recognize('./tss.jpg');
    console.log(text);
  } finally {
    await worker.terminate();
  }
})();
