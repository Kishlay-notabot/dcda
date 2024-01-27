const Ts = require("tesseract.js");

Ts.recognize('./processed_GARHvUFWwAAVF9N_binary.png', 'eng', {
  logger: e => console.log(e),
  tessedit_pageseg_mode: Ts.PSM.SINGLE_CHAR,
  tessedit_char_whitelist: '0123456789',
})
  .then(out => console.log(out))
