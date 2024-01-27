const Ts =  require("tesseract.js")
Ts.recognize('./tss.jpg','eng',{logger: e =>console.log(e),
  tessedit_char_whitelist: '0123456789'},1)
    .then(out=> console.log(out))