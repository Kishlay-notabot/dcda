const Tesseract=require('tesseract.js');
const fs=require('fs').promises;

async function performOCR() {
  try {
    const {data: {text}, confidence} = await Tesseract.recognize('./tss.jpg', 'hin', {logger: info => console.log(info)});

    console.log('Recognized Text:', text);
    console.log('Confidence Values:', confidence);

    await fs.writeFile('output.txt', text);
    console.log('Recognized text saved to output.txt');

  } catch (error) {
    console.error('Error during OCR:', error);
  }
}

performOCR();
