const Ts = require("tesseract.js");

Ts.recognize('./processed_GARHvUFWwAAVF9N_binary.png', 'hin+eng+jpn', {
  logger: e => console.log(e),
  tessedit_pageseg_mode: Ts.PSM.SINGLE_CHAR,
})
  .then(out => console.log(out))
