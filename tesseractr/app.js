const Ts = require("tesseract.js");

Ts.recognize('./tss.jpg', 'hin', {
  logger: e => console.log(e),
  tessedit_pageseg_mode: Ts.PSM.SINGLE_CHAR,
})
  .then(out => console.log(out))
