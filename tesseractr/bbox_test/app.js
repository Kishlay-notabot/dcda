const Tesseract = require('tesseract.js');
const imagePath = 'photo.jpg';

Tesseract.recognize(
  imagePath,
  'hin',
  {
    tessedit_pageseg_mode: 'SINGLE_CHAR',
  }
)
  .then((result) => {
    console.log('Recognized Text:');
    console.log(result.data.text);
    console.log('\nBounding Box Data:');
    result.data.words.forEach((word, index) => {
      console.log(`Word ${index + 1}:`, word.text, 'Bounding Box:', word.bbox);
    });
  })
  .catch((error) => console.error('Error during OCR:', error));
