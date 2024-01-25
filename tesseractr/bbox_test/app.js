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



  // add params, and whitelist. [block level] [granularity] 
  // अ आ इ ई उ ऊ ए ऐ ओ औ अं अः क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष श्र स ह क्ष त्र ज्ञ 


// 33 below
  // क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह क्ष त्र ज्ञ श्र ड़ ढ़
// 13 vowels 
// अ आ इ ई उ ऊ ए ऐ ओ औ अं अः ऋ अं अः 


  .catch((error) => console.error('Error during OCR:', error));
