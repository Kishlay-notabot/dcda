const Ts =  require("tesseract.js")
Ts.recognize('./tss.jpg','eng',{logger: e =>console.log(e)})
    .then(out=> console.log(out))