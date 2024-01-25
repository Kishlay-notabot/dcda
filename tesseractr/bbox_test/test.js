const Tesseract = require('tesseract.js');

const imageFilePath = 'photo.jpg';

Tesseract.recognize(
  imageFilePath,
  'hin', 
  {
    // psm
  }
).then(({ data: { blocks } }) => {
  blocks.forEach(block => {
    if (block.blocktype === 'fsn' || block.blocktype === 'bsn') {
      console.log(`Character: ${block.text}, Bounding Box: ${block.bbox}`);
    }
  });
}).catch((error) => {
  console.error('Error:', error);
});
